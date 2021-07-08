from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from main.models import Category, Product
from .serializers import CustomCategorySerializer, ProductSerializer
from ..pagination import CategoryProductsPagination
from ..utils import get_cart_and_products_in_cart


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CustomCategorySerializer
    permission_classes = []
    authentication_classes = []
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        return super(CategoryViewSet, self).list(request, *args, **kwargs)

    @action(methods=['get'], detail=True)
    def category_products(self, request, *args, **kwargs):
        self.pagination_class = CategoryProductsPagination
        products = Product.objects.filter(category=self.get_object())
        cart, products_in_cart = get_cart_and_products_in_cart(request)
        queryset = self.filter_queryset(products)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
            for product in serializer.data:
                product['in_cart'] = True if product['id'] in products_in_cart else False
            return self.get_paginated_response(serializer.data)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        cart, products_in_cart = get_cart_and_products_in_cart(request)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            if cart:
                for product in serializer.data:
                    product['in_cart'] = True if product['id'] in products_in_cart else False
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        if cart:
            for product in serializer.data:
                product['in_cart'] = True if product['id'] in products_in_cart else False
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        cart, products_in_cart = get_cart_and_products_in_cart(request)
        if cart:
            serializer.data['in_cart'] = True if instance.id in products_in_cart else False
        return Response(serializer.data)