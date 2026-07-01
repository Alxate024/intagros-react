from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Predio, Grupo, Especie, Arbol, RegistroSalud
from .serializers import (
    PredioSerializer, GrupoSerializer, EspecieSerializer,
    ArbolSerializer, ArbolCreateSerializer, RegistroSaludSerializer,
)


class PredioViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Predio.objects.all()
    serializer_class = PredioSerializer
    lookup_field = "key"


class GrupoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Grupo.objects.all()
    serializer_class = GrupoSerializer


class EspecieViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Especie.objects.all()
    serializer_class = EspecieSerializer
    filterset_fields = ["grupo"]


class ArbolViewSet(viewsets.ModelViewSet):
    queryset = Arbol.objects.select_related("especie__grupo").all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return ArbolCreateSerializer
        return ArbolSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        predio = self.request.query_params.get("predio")
        especie = self.request.query_params.get("especie")
        grupo = self.request.query_params.get("grupo")
        if predio:
            qs = qs.filter(predio__key=predio)
        if especie:
            qs = qs.filter(especie_id=especie)
        if grupo:
            qs = qs.filter(especie__grupo_id=grupo)
        return qs

    @action(detail=True, methods=["get"])
    def salud(self, request, pk=None):
        arbol = self.get_object()
        registros = arbol.registros_salud.all()[:20]
        return Response(RegistroSaludSerializer(registros, many=True).data)


class RegistroSaludViewSet(viewsets.ModelViewSet):
    queryset = RegistroSalud.objects.all()
    serializer_class = RegistroSaludSerializer
    filterset_fields = ["arbol", "estado"]
