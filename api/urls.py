from rest_framework.routers import SimpleRouter

from api.cart.views import CartViewSet, OrderViewSet
from api.main.views import ProductViewSet, CategoryViewSet

router = SimpleRouter()

router.register('products', ProductViewSet, basename='products')
router.register('categories', CategoryViewSet, basename='categories')
router.register('carts', CartViewSet, basename='carts')
router.register('orders', OrderViewSet, basename='orders')

urlpatterns = []

urlpatterns += router.urls
