"""
APPLICATION RING (Casos de uso)
---------------------------------
Aqui vive la Logica del Negocio; lo que el sistema hace, una clase por acción. 
Cada caso de uso recibe el/losrepositorios (los puertos, no una implementacion concreta) 
por constructor: inyeccion de dependencias. No importa Django ni DRF.

Reglas de negocio:
  - El slug de un Servicio no se puede repetir.
  - Un Servicio con solicitudes asociadas no se puede eliminar.
  - Al crear una Solicitud, servicioNombre se copia desde el Servicio
    (la solicitud conserva el nombre que tenia el servicio ese dia).
  - El estado de una Solicitud debe ser uno de ESTADOS_SOLICITUD y
    parte en "nuevo".
  - Si no se indica fecha, la solicitud toma la fecha de hoy.
"""

from datetime import date
from typing import List, Optional

from gestoria.domain.entities import (
    Servicio, Solicitud, ESTADOS_SOLICITUD, ESTADO_INICIAL,
)
from gestoria.domain.repositories import ServicioRepository, SolicitudRepository
from .exceptions import (
    ServicioNoEncontradoError, SlugDuplicadoError, ServicioConSolicitudesError,
    SolicitudNoEncontradaError, EstadoInvalidoError,
)


# ======================================================================
# SERVICIO (entidad principal / catalogo)
# ======================================================================

class ListarServiciosUseCase:
    def __init__(self, repo: ServicioRepository):
        self.repo = repo

    def ejecutar(self) -> List[Servicio]:
        return self.repo.listar()


class ObtenerServicioUseCase:
    def __init__(self, repo: ServicioRepository):
        self.repo = repo

    def ejecutar(self, servicio_id: int) -> Servicio:
        servicio = self.repo.obtener_por_id(servicio_id)
        if servicio is None:
            raise ServicioNoEncontradoError(f"No existe un servicio con id {servicio_id}")
        return servicio


class CrearServicioUseCase:
    def __init__(self, repo: ServicioRepository):
        self.repo = repo

    def ejecutar(self, datos: dict) -> Servicio:
        if self.repo.existe_slug(datos["slug"]):
            raise SlugDuplicadoError(f"Ya existe un servicio con el slug '{datos['slug']}'")

        servicio = Servicio(
            nombre=datos["nombre"], slug=datos["slug"],
            resumen=datos["resumen"], detalle=datos["detalle"],
        )
        return self.repo.guardar(servicio)


class ActualizarServicioUseCase:
    CAMPOS = ("nombre", "slug", "resumen", "detalle")

    def __init__(self, repo: ServicioRepository):
        self.repo = repo

    def ejecutar(self, servicio_id: int, datos: dict) -> Servicio:
        servicio = self.repo.obtener_por_id(servicio_id)
        if servicio is None:
            raise ServicioNoEncontradoError(f"No existe un servicio con id {servicio_id}")

        nuevo_slug = datos.get("slug", servicio.slug)
        if self.repo.existe_slug(nuevo_slug, excluir_id=servicio_id):
            raise SlugDuplicadoError(f"Ya existe un servicio con el slug '{nuevo_slug}'")

        for campo in self.CAMPOS:
            if campo in datos:
                setattr(servicio, campo, datos[campo])
        return self.repo.guardar(servicio)


class EliminarServicioUseCase:
    def __init__(self, repo: ServicioRepository):
        self.repo = repo

    def ejecutar(self, servicio_id: int) -> None:
        if self.repo.obtener_por_id(servicio_id) is None:
            raise ServicioNoEncontradoError(f"No existe un servicio con id {servicio_id}")
        if self.repo.tiene_solicitudes(servicio_id):
            raise ServicioConSolicitudesError(
                "No se puede eliminar el servicio: tiene solicitudes asociadas"
            )
        self.repo.eliminar(servicio_id)


# ======================================================================
# SOLICITUD (entidad secundaria / documento transaccional)
# ======================================================================

class ListarSolicitudesUseCase:
    def __init__(self, repo: SolicitudRepository):
        self.repo = repo

    def ejecutar(self, estado: Optional[str] = None) -> List[Solicitud]:
        if estado is not None and not Solicitud.estado_es_valido(estado):
            raise EstadoInvalidoError(
                f"Estado '{estado}' invalido. Opciones: {', '.join(ESTADOS_SOLICITUD)}"
            )
        return self.repo.listar(estado)


class ObtenerSolicitudUseCase:
    def __init__(self, repo: SolicitudRepository):
        self.repo = repo

    def ejecutar(self, solicitud_id: int) -> Solicitud:
        solicitud = self.repo.obtener_por_id(solicitud_id)
        if solicitud is None:
            raise SolicitudNoEncontradaError(f"No existe una solicitud con id {solicitud_id}")
        return solicitud


class CrearSolicitudUseCase:
    def __init__(self, repo: SolicitudRepository, servicio_repo: ServicioRepository):
        self.repo = repo
        self.servicio_repo = servicio_repo

    def ejecutar(self, datos: dict) -> Solicitud:
        servicio = self.servicio_repo.obtener_por_id(datos["servicio_id"])
        if servicio is None:
            raise ServicioNoEncontradoError(
                f"No existe un servicio con id {datos['servicio_id']}"
            )

        estado = datos.get("estado", ESTADO_INICIAL)
        if not Solicitud.estado_es_valido(estado):
            raise EstadoInvalidoError(
                f"Estado '{estado}' invalido. Opciones: {', '.join(ESTADOS_SOLICITUD)}"
            )

        solicitud = Solicitud(
            cliente_empresa=datos["cliente_empresa"],
            cliente_rut=datos["cliente_rut"],
            cliente_email=datos["cliente_email"],
            servicio_id=servicio.id,
            servicio_nombre=servicio.nombre,      # copiado desde el servicio
            mensaje=datos["mensaje"],
            estado=estado,
            fecha=datos.get("fecha") or date.today(),
        )
        return self.repo.guardar(solicitud)


class ActualizarSolicitudUseCase:
    CAMPOS = ("cliente_empresa", "cliente_rut", "cliente_email",
              "mensaje", "estado", "fecha")

    def __init__(self, repo: SolicitudRepository, servicio_repo: ServicioRepository):
        self.repo = repo
        self.servicio_repo = servicio_repo

    def ejecutar(self, solicitud_id: int, datos: dict) -> Solicitud:
        solicitud = self.repo.obtener_por_id(solicitud_id)
        if solicitud is None:
            raise SolicitudNoEncontradaError(f"No existe una solicitud con id {solicitud_id}")

        if "estado" in datos and not Solicitud.estado_es_valido(datos["estado"]):
            raise EstadoInvalidoError(
                f"Estado '{datos['estado']}' invalido. Opciones: {', '.join(ESTADOS_SOLICITUD)}"
            )

        # Si cambia el servicio, se vuelve a copiar su nombre
        if "servicio_id" in datos and datos["servicio_id"] != solicitud.servicio_id:
            servicio = self.servicio_repo.obtener_por_id(datos["servicio_id"])
            if servicio is None:
                raise ServicioNoEncontradoError(
                    f"No existe un servicio con id {datos['servicio_id']}"
                )
            solicitud.servicio_id = servicio.id
            solicitud.servicio_nombre = servicio.nombre

        for campo in self.CAMPOS:
            if campo in datos:
                setattr(solicitud, campo, datos[campo])
        return self.repo.guardar(solicitud)


class EliminarSolicitudUseCase:
    def __init__(self, repo: SolicitudRepository):
        self.repo = repo

    def ejecutar(self, solicitud_id: int) -> None:
        if not self.repo.eliminar(solicitud_id):
            raise SolicitudNoEncontradaError(f"No existe una solicitud con id {solicitud_id}")
