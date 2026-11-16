from rest_framework import generics
from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer


class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all().order_by("id")
    serializer_class = CategoriaSerializer


class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.select_related("categoria").order_by("id")
    serializer_class = ProductoSerializer