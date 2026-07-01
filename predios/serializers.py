from rest_framework import serializers
from .models import Predio, Grupo, Especie, Arbol, RegistroSalud


class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo
        fields = "__all__"


class EspecieSerializer(serializers.ModelSerializer):
    grupo_nombre = serializers.CharField(source="grupo.nombre", read_only=True)

    class Meta:
        model = Especie
        fields = ["id", "nombre", "grupo", "grupo_nombre", "nombre_cientifico", "wikipedia_query"]


class ArbolSerializer(serializers.ModelSerializer):
    especie_nombre = serializers.CharField(source="especie.nombre", read_only=True)
    grupo_nombre = serializers.CharField(source="especie.grupo.nombre", read_only=True)
    group = serializers.CharField(source="especie.grupo.nombre", read_only=True)
    species = serializers.CharField(source="especie.nombre", read_only=True)
    code = serializers.CharField(source="codigo", read_only=True)

    class Meta:
        model = Arbol
        fields = ["id", "predio", "codigo", "code", "especie", "especie_nombre", "species",
                  "grupo_nombre", "group", "x", "y", "lng", "lat", "fecha_siembra", "activo"]


class ArbolCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arbol
        fields = ["predio", "codigo", "especie", "x", "y", "lng", "lat", "fecha_siembra"]


class RegistroSaludSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroSalud
        fields = "__all__"


class PredioSerializer(serializers.ModelSerializer):
    arbol_count = serializers.SerializerMethodField()

    class Meta:
        model = Predio
        fields = ["id", "key", "nombre", "descripcion", "arbol_count"]

    def get_arbol_count(self, obj):
        return obj.arboles.count()
