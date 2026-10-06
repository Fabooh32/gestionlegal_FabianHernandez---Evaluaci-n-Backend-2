"""
ADAPTADOR SECUNDARIO (Driven Adapter)
----------------------------------------
Implementacion CONCRETA de los puertos usando Django ORM + SQLite.
Traduce entre las entidades de dominio (dataclasses) y los modelos de
persistencia. En caso de cambiar de motor de BD, solo se reescribe ESTA capa.
"""

from typing import List, Optional

from gestoria.domain.entities import Servicio, Solicitud
from gestoria.domain.repositories import ServicioRepository, SolicitudRepository
from .models import ServicioModel, SolicitudModel


def _servicio_to_entity(m: ServicioModel) -> Servicio:
    return Servicio(
        id=m.id, nombre=m.nombre, slug=m.slug, resumen=m.resumen, detalle=m.detalle,
    )


def _solicitud_to_entity(m: SolicitudModel) -> Solicitud:
    return Solicitud(
        id=m.id,
        cliente_empresa=m.cliente_empresa, cliente_rut=m.cliente_rut,
        cliente_email=m.cliente_email,
        servicio_id=m.servicio_id, servicio_nombre=m.servicio_nombre,
        mensaje=m.mensaje, estado=m.estado, fecha=m.fecha,
    )


class DjangoServicioRepository(ServicioRepository):

    def listar(self) -> List[Servicio]:
        return [_servicio_to_entity(m) for m in ServicioModel.objects.all()]

    def obtener_por_id(self, servicio_id: int) -> Optional[Servicio]:
        m = ServicioModel.objects.filter(id=servicio_id).first()
        return _servicio_to_entity(m) if m else None

    def existe_slug(self, slug: str, excluir_id: Optional[int] = None) -> bool:
        qs = ServicioModel.objects.filter(slug=slug)
        if excluir_id is not None:
            qs = qs.exclude(id=excluir_id)
        return qs.exists()

    def tiene_solicitudes(self, servicio_id: int) -> bool:
        return SolicitudModel.objects.filter(servicio_id=servicio_id).exists()

    def guardar(self, servicio: Servicio) -> Servicio:
        if servicio.id is None:
            m = ServicioModel.objects.create(
                nombre=servicio.nombre, slug=servicio.slug,
                resumen=servicio.resumen, detalle=servicio.detalle,
            )
        else:
            m = ServicioModel.objects.get(id=servicio.id)
            m.nombre, m.slug = servicio.nombre, servicio.slug
            m.resumen, m.detalle = servicio.resumen, servicio.detalle
            m.save()
        return _servicio_to_entity(m)

    def eliminar(self, servicio_id: int) -> bool:
        borrados, _ = ServicioModel.objects.filter(id=servicio_id).delete()
        return borrados > 0


class DjangoSolicitudRepository(SolicitudRepository):

    def listar(self, estado: Optional[str] = None) -> List[Solicitud]:
        qs = SolicitudModel.objects.all()
        if estado:
            qs = qs.filter(estado=estado)
        return [_solicitud_to_entity(m) for m in qs]

    def obtener_por_id(self, solicitud_id: int) -> Optional[Solicitud]:
        m = SolicitudModel.objects.filter(id=solicitud_id).first()
        return _solicitud_to_entity(m) if m else None

    def guardar(self, solicitud: Solicitud) -> Solicitud:
        if solicitud.id is None:
            m = SolicitudModel.objects.create(
                cliente_empresa=solicitud.cliente_empresa,
                cliente_rut=solicitud.cliente_rut,
                cliente_email=solicitud.cliente_email,
                servicio_id=solicitud.servicio_id,
                servicio_nombre=solicitud.servicio_nombre,
                mensaje=solicitud.mensaje, estado=solicitud.estado,
                fecha=solicitud.fecha,
            )
        else:
            m = SolicitudModel.objects.get(id=solicitud.id)
            m.cliente_empresa = solicitud.cliente_empresa
            m.cliente_rut = solicitud.cliente_rut
            m.cliente_email = solicitud.cliente_email
            m.servicio_id = solicitud.servicio_id
            m.servicio_nombre = solicitud.servicio_nombre
            m.mensaje, m.estado, m.fecha = solicitud.mensaje, solicitud.estado, solicitud.fecha
            m.save()
        return _solicitud_to_entity(m)

    def eliminar(self, solicitud_id: int) -> bool:
        borrados, _ = SolicitudModel.objects.filter(id=solicitud_id).delete()
        return borrados > 0
