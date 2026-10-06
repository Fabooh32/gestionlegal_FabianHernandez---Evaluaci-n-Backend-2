"""
Contenedor de inyeccion de dependencias. Es el UNICO lugar
que decide que implementacion concreta de cada repositorio se usa.
Las vistas y los casos de uso nunca instancian Django*Repository.
"""

from .repositories import DjangoServicioRepository, DjangoSolicitudRepository


def get_servicio_repository():
    return DjangoServicioRepository()


def get_solicitud_repository():
    return DjangoSolicitudRepository()
