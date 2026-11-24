from django.urls import path
from .views import CategoriaListView, ProductoListView, ProductoRecomendadosView

urlpatterns = [
    path("categorias/", CategoriaListView.as_view(), name="categorias"),
    path("productos/", ProductoListView.as_view(), name="productos"),
    path(
        "productos/<int:pk>/recomendados/",
        ProductoRecomendadosView.as_view(),
        name="recomendados",
    ),
]