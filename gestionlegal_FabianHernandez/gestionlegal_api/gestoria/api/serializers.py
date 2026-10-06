"""
Serializers: "traductores" entre JSON y las entidades de dominio.

SolicitudSerializer conserva el formato JSON 
(cliente anidado, servicioId, servicioNombre) 
y lo APLANA hacia las columnas de la tabla en validate().
"""

from rest_framework import serializers

from gestoria.domain.entities import ESTADOS_SOLICITUD


class ServicioSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    nombre = serializers.CharField(max_length=150)
    slug = serializers.SlugField(max_length=60)
    resumen = serializers.CharField(max_length=200)
    detalle = serializers.CharField()


class ClienteSerializer(serializers.Serializer):
    empresa = serializers.CharField(max_length=150)
    rut = serializers.CharField(max_length=12)
    email = serializers.EmailField()


class SolicitudSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    cliente = ClienteSerializer()
    servicioId = serializers.IntegerField(min_value=1)
    servicioNombre = serializers.CharField(read_only=True)
    mensaje = serializers.CharField()
    estado = serializers.ChoiceField(choices=ESTADOS_SOLICITUD, required=False)
    fecha = serializers.DateField(required=False)

    def validate(self, attrs):
        """JSON anidado -> dict plano (columnas de la tabla)."""
        plano = {}
        if "cliente" in attrs:
            for campo, valor in attrs["cliente"].items():
                plano[f"cliente_{campo}"] = valor
        if "servicioId" in attrs:
            plano["servicio_id"] = attrs["servicioId"]
        for campo in ("mensaje", "estado", "fecha"):
            if campo in attrs:
                plano[campo] = attrs[campo]
        return plano

    def to_representation(self, instance):
        """Entidad de dominio (como dict) -> JSON con el formato pedido."""
        fecha = instance["fecha"]
        return {
            "id": instance["id"],
            "cliente": {
                "empresa": instance["cliente_empresa"],
                "rut": instance["cliente_rut"],
                "email": instance["cliente_email"],
            },
            "servicioId": instance["servicio_id"],
            "servicioNombre": instance["servicio_nombre"],
            "mensaje": instance["mensaje"],
            "estado": instance["estado"],
            "fecha": fecha.isoformat() if fecha else None,
        }
