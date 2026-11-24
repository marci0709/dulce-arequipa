from rest_framework import serializers
from .models import Categoria, Producto


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id", "nombre"]


class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.StringRelatedField()
    precio = serializers.DecimalField(
        max_digits=8, decimal_places=2, coerce_to_string=False
    )
    precio_final = serializers.DecimalField(
        max_digits=8, decimal_places=2, coerce_to_string=False, read_only=True
    )

    class Meta:
        model = Producto
        fields = [
            "id", "nombre", "descripcion", "precio", "descuento", "precio_final",
            "imagen", "stock", "estado_stock", "categoria",
        ]