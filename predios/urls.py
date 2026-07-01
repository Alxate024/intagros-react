from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PredioViewSet, GrupoViewSet, EspecieViewSet, ArbolViewSet, RegistroSaludViewSet

router = DefaultRouter()
router.register(r"predios", PredioViewSet)
router.register(r"grupos", GrupoViewSet)
router.register(r"especies", EspecieViewSet)
router.register(r"arboles", ArbolViewSet)
router.register(r"salud", RegistroSaludViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
