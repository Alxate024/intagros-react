from django.contrib import admin
from .models import Predio, Grupo, Especie, Arbol, RegistroSalud


@admin.register(Predio)
class PredioAdmin(admin.ModelAdmin):
    list_display = ["nombre", "key", "arbol_count"]
    prepopulated_fields = {"key": ("nombre",)}

    def arbol_count(self, obj):
        return obj.arboles.count()


@admin.register(Grupo)
class GrupoAdmin(admin.ModelAdmin):
    list_display = ["nombre", "color"]
    search_fields = ["nombre"]


@admin.register(Especie)
class EspecieAdmin(admin.ModelAdmin):
    list_display = ["nombre", "grupo", "nombre_cientifico"]
    list_filter = ["grupo"]
    search_fields = ["nombre", "nombre_cientifico"]


class RegistroSaludInline(admin.TabularInline):
    model = RegistroSalud
    extra = 0
    readonly_fields = ["fecha", "score", "estado"]
    max_num = 10


@admin.register(Arbol)
class ArbolAdmin(admin.ModelAdmin):
    list_display = ["codigo", "especie", "predio", "grupo_nombre"]
    list_filter = ["predio", "especie__grupo"]
    search_fields = ["codigo", "especie__nombre"]
    inlines = [RegistroSaludInline]

    def grupo_nombre(self, obj):
        return obj.especie.grupo.nombre


@admin.register(RegistroSalud)
class RegistroSaludAdmin(admin.ModelAdmin):
    list_display = ["arbol", "score", "estado", "fecha"]
    list_filter = ["estado", "fecha"]
    date_hierarchy = "fecha"
