from decimal import Decimal

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "categorías"

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    descuento = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(90)],
        help_text="Porcentaje de descuento (0 a 90). Con 0 el producto no está en oferta.",
    )
    imagen = models.URLField(blank=True)
    stock = models.PositiveIntegerField(default=0)
    stock_minimo = models.PositiveIntegerField(
        default=5,
        help_text="Si el stock es menor o igual a este valor, se muestra como stock bajo.",
    )
    activo = models.BooleanField(
        default=True,
        help_text="Si se desmarca, el producto no aparece en la tienda.",
    )
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.CASCADE,
        related_name="productos",
    )

    @property
    def estado_stock(self):
        if self.stock == 0:
            return "agotado"
        if self.stock <= self.stock_minimo:
            return "bajo"
        return "disponible"

    @property
    def precio_final(self):
        return (self.precio * (100 - self.descuento) / 100).quantize(Decimal("0.01"))

    def __str__(self):
        return self.nombre