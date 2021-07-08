from rest_framework import serializers

from api.main.serializers import CartProductSerializer
from main.models import Customer, Cart, Order


class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = ['user', 'phone', 'address', 'orders']

    @staticmethod
    def get_user(obj):
        return ' '.join([obj.user.first_name, obj.user.last_name])


class CartSerializer(serializers.ModelSerializer):
    products = CartProductSerializer(many=True)
    owner = CustomerSerializer()

    class Meta:
        model = Cart
        fields = ['products', 'total_products', 'final_price', 'owner']


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'
