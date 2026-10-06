"""
Modelos de Django ORM. Es el detalle de PERSISTENCIA 
(tablas relacionales). Solo se usan dentro de
infrastructure/; application/ y api/ nunca los importan.

Relacional vs NoSQL:
- La "coleccion" de Mongo se convierte en TABLA.
- "servicioId" (texto suelto) pasa a ser una ForeignKey real.
- El subdocumento "cliente" se aplana en columnas cliente_empresa, cliente_rut, y cliente_email.
"""

from django.db import models


class ServicioModel(models.Model):
    nombre = models.CharField(max_length=150)
    slug = models.SlugField(max_length=60, unique=True)
    resumen = models.CharField(max_length=200)
    detalle = models.TextField()

    class Meta:
        db_table = "gestoria_servicio"
        ordering = ["id"]

    def __str__(self):
        return self.nombre


class SolicitudModel(models.Model):
    # Subdocumento "cliente" aplanado
    cliente_empresa = models.CharField(max_length=150)
    cliente_rut = models.CharField(max_length=12)
    cliente_email = models.EmailField()

    # Relacion: la solicitud pertenece a un servicio 
    # (no se borra un servicio que tenga solicitudes)
    servicio = models.ForeignKey(
        ServicioModel, on_delete=models.PROTECT, related_name="solicitudes"
    )
    servicio_nombre = models.CharField(max_length=150)

    mensaje = models.TextField()
    estado = models.CharField(max_length=20, default="nuevo")
    fecha = models.DateField()

    class Meta:
        db_table = "gestoria_solicitudes"
        ordering = ["-id"]

    def __str__(self):
        return f"Solicitud #{self.pk} - {self.cliente_empresa} ({self.estado})"
