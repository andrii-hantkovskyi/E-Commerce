from rest_framework import serializers

from main.models import Product, Category, CartProduct


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class CustomCategorySerializer(CategorySerializer):
    products = serializers.SerializerMethodField()

    @staticmethod
    def get_products(obj):
        return ProductSerializer(Product.objects.filter(category=obj), many=True).data


class CartProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartProduct
        fields = ['id', 'product', 'qty', 'final_price']
