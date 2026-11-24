from decimal import Decimal

from django.shortcuts import get_object_or_404
from rest_framework import filters, generics

from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer


class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all().order_by("id")
    serializer_class = CategoriaSerializer


class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.filter(activo=True).select_related("categoria").order_by("id")
    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre", "descripcion", "categoria__nombre"]
    ordering_fields = ["precio", "nombre"]


class ProductoRecomendadosView(generics.ListAPIView):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        base = get_object_or_404(Producto, pk=self.kwargs["pk"], activo=True)
        candidatos = (
            Producto.objects.filter(activo=True, stock__gt=0)
            .exclude(pk=base.pk)
            .select_related("categoria")
        )

        def puntaje(producto):
            puntos = 0
            if producto.categoria_id == base.categoria_id:
                puntos += 3
            diferencia = abs(producto.precio_final - base.precio_final)
            if diferencia <= base.precio_final * Decimal("0.5"):
                puntos += 2
            if producto.descuento > 0:
                puntos += 1
            return puntos

        return sorted(candidatos, key=puntaje, reverse=True)[:4]