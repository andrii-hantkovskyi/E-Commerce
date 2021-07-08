from django.contrib import admin

# Register your models here.
from .models import Customer, Cart, CartProduct, Product, Category, Order

admin.site.register(Customer)
admin.site.register(Cart)
admin.site.register(CartProduct)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Order)
