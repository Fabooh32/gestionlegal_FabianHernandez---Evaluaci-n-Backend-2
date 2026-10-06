"""
Excepciones del negocio. No dependen de Django ni de DRF: 
api/ (views.py) se encarga de traducir a codigos HTTP (400, 404, 409).
"""


class ServicioNoEncontradoError(Exception):
    pass


class SlugDuplicadoError(Exception):
    pass


class ServicioConSolicitudesError(Exception):
    pass


class SolicitudNoEncontradaError(Exception):
    pass


class EstadoInvalidoError(Exception):
    pass
