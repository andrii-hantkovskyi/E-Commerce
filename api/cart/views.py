from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from main.models import Cart, Product, CartProduct, Customer, Order
from .serializers import CartSerializer, OrderSerializer


class CartViewSet(ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()

    @staticmethod
    def get_cart(user):
        if user.is_authenticated:
            return Cart.objects.filter(owner=user.customer, for_anonymous_user=False).first()
        return Cart.objects.filter(for_anonymous_user=True).first()

    @staticmethod
    def _get_or_create_cart_product(customer: Customer, cart: Cart, product: Product):
        cart_product, created = CartProduct.objects.get_or_create(user=customer, product=product, cart=cart)
        return cart_product, created

    @action(methods=['get'], detail=False)
    def current_customer_cart(self, *args, **kwargs):
        cart = self.get_cart(self.request.user)
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data)

    @action(methods=['put'], detail=False, url_path='current_customer_cart/add_to_cart/(?P<product_id>\d+)')
    def product_add_to_cart(self, *args, **kwargs):
        cart = self.get_cart(self.request.user)
        product = get_object_or_404(Product, id=kwargs['product_id'])
        cart_product, created = self._get_or_create_cart_product(self.request.user.customer, cart, product)
        if created:
            cart.products.add(cart_product)
            cart.save()
            return Response({"detail": "Товар добавлен в корзину", "added": True})
        return Response({'detail': "Товар уже в корзине", "added": False}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["patch"], detail=False,
            url_path='current_customer_cart/change_qty/(?P<qty>\d+)/(?P<cart_product_id>\d+)')
    def product_change_qty(self, *args, **kwargs):
        cart_product = get_object_or_404(CartProduct, id=kwargs['cart_product_id'])
        cart_product.qty = int(kwargs['qty'])
        cart_product.save()
        cart_product.cart.save()
        return Response(status=status.HTTP_200_OK)

    @action(methods=["put"], detail=False, url_path='current_customer_cart/remove_from_cart/(?P<cproduct_id>\d+)')
    def product_remove_from_cart(self, *args, **kwargs):
        cart = self.get_cart(self.request.user)
        cproduct = get_object_or_404(CartProduct, id=kwargs['cproduct_id'])
        cart.products.remove(cproduct)
        cproduct.delete()
        cart.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    @staticmethod
    def get_orders(user):
        return Order.objects.filter(customer=user.customer)

    @staticmethod
    def _create_order(customer: Customer, cart: Cart, **kwargs):
        order = Order.objects.create(customer=customer, cart=cart, **kwargs)
        order.save()
        cart.products.all().delete()
        cart.save()

    @action(methods=['get'], detail=False)
    def current_customer_orders(self, *args, **kwargs):
        orders = self.get_orders(self.request.user)
        orders_serializer = OrderSerializer(orders, many=True)
        return Response(orders_serializer.data)

    @action(methods=['post'], detail=False, url_path='current_customer_orders/new_order')
    def new_order(self, *args, **kwargs):
        cart = CartViewSet.get_cart(self.request.user)
        self._create_order(self.request.user.customer, cart, **self.request.data)
        return Response(status=status.HTTP_201_CREATED)
