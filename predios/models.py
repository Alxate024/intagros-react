from django.db import models


class Predio(models.Model):
    key = models.SlugField(max_length=20, unique=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)

    class Meta:
        verbose_name = "Predio"
        verbose_name_plural = "Predios"

    def __str__(self):
        return self.nombre


class Grupo(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    color = models.CharField(max_length=7, default="#7b809a")

    class Meta:
        verbose_name = "Grupo"
        verbose_name_plural = "Grupos"

    def __str__(self):
        return self.nombre


class Especie(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    grupo = models.ForeignKey(Grupo, on_delete=models.PROTECT, related_name="especies")
    nombre_cientifico = models.CharField(max_length=200, blank=True)
    wikipedia_query = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name = "Especie"
        verbose_name_plural = "Especies"

    def __str__(self):
        return self.nombre


class Arbol(models.Model):
    predio = models.ForeignKey(Predio, on_delete=models.CASCADE, related_name="arboles")
    codigo = models.CharField(max_length=20, blank=True)
    especie = models.ForeignKey(Especie, on_delete=models.PROTECT, related_name="arboles")
    x = models.FloatField()
    y = models.FloatField()
    lng = models.FloatField(null=True, blank=True)
    lat = models.FloatField(null=True, blank=True)
    fecha_siembra = models.DateField(null=True, blank=True)
    activo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Árbol"
        verbose_name_plural = "Árboles"
        ordering = ["predio", "id"]

    def __str__(self):
        return f"{self.codigo or 'Árbol #' + str(self.id)} - {self.especie}"


class RegistroSalud(models.Model):
    ESTADOS = [
        ("optima", "Óptima"),
        ("buena", "Buena"),
        ("regular", "Regular"),
        ("critica", "Crítica"),
    ]

    arbol = models.ForeignKey(Arbol, on_delete=models.CASCADE, related_name="registros_salud")
    fecha = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField()
    estado = models.CharField(max_length=10, choices=ESTADOS)
    observaciones = models.TextField(blank=True)

    class Meta:
        verbose_name = "Registro de Salud"
        verbose_name_plural = "Registros de Salud"
        ordering = ["-fecha"]

    def __str__(self):
        return f"{self.arbol} - {self.get_estado_display()} ({self.score}%) - {self.fecha.date()}"
