from django.contrib import admin
from django.db.models import F
from django.utils.html import format_html
from .models import Categoria, Producto


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre",)


class EstadoStockFilter(admin.SimpleListFilter):
    title = "estado de stock"
    parameter_name = "estado_stock"

    def lookups(self, request, model_admin):
        return [("agotado", "Agotado"), ("bajo", "Stock bajo")]

    def queryset(self, request, queryset):
        if self.value() == "agotado":
            return queryset.filter(stock=0)
        if self.value() == "bajo":
            return queryset.filter(stock__gt=0, stock__lte=F("stock_minimo"))
        return queryset


class OfertaFilter(admin.SimpleListFilter):
    title = "promoción"
    parameter_name = "oferta"

    def lookups(self, request, model_admin):
        return [("si", "En oferta"), ("no", "Sin oferta")]

    def queryset(self, request, queryset):
        if self.value() == "si":
            return queryset.filter(descuento__gt=0)
        if self.value() == "no":
            return queryset.filter(descuento=0)
        return queryset


@admin.action(description="Reponer 10 unidades de stock")
def reponer_stock(modeladmin, request, queryset):
    queryset.update(stock=F("stock") + 10)


@admin.action(description="Aplicar 10%% de descuento")
def aplicar_descuento_10(modeladmin, request, queryset):
    queryset.update(descuento=10)


@admin.action(description="Aplicar 20%% de descuento")
def aplicar_descuento_20(modeladmin, request, queryset):
    queryset.update(descuento=20)


@admin.action(description="Quitar descuento")
def quitar_descuento(modeladmin, request, queryset):
    queryset.update(descuento=0)


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = (
        "nombre", "categoria", "precio", "descuento", "precio_oferta",
        "stock", "stock_minimo", "estado", "activo",
    )
    list_editable = ("descuento", "stock", "activo")
    list_filter = ("categoria", "activo", EstadoStockFilter, OfertaFilter)
    search_fields = ("nombre",)
    actions = [reponer_stock, aplicar_descuento_10, aplicar_descuento_20, quitar_descuento]

    @admin.display(description="Precio final")
    def precio_oferta(self, obj):
        return f"S/ {obj.precio_final}"

    @admin.display(description="Estado de stock")
    def estado(self, obj):
        colores = {"agotado": "#dc2626", "bajo": "#d97706", "disponible": "#16a34a"}
        return format_html(
            '<b style="color:{}">{}</b>',
            colores[obj.estado_stock],
            obj.estado_stock.capitalize(),
        )