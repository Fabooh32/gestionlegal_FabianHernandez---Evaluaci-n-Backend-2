"""
CORE DOMAIN - Entidades puras
------------------------------
Dos dataclasses : no heredan de models.Model, no importan Django.
Solo definen la estructura de datos y las reglas de negocio puras
para que infrastructure/ pueda persistirlas en la BD y api/ pueda exponerlas como JSON.
Las DOS ENTIDADES del proyecto GestionLegal son:

1. Servicio   -> el catalogo (lo que ofrece la gestoria)
2. Solicitud  -> el documento transaccional (formulario de contacto)

La relacion entre ambas (Solicitud -> Servicio) se expresa solo con
el id (servicio_id). Que sea una ForeignKey es un detalle de
persistencia y vive en infrastructure/models.py.
"""

from dataclasses import dataclass
from datetime import date
from typing import Optional

# Estados posibles de una solicitud (regla de negocio)
ESTADOS_SOLICITUD = ("nuevo", "en_proceso", "resuelto", "cerrado")
ESTADO_INICIAL = "nuevo"


@dataclass
class Servicio:
    nombre: str
    slug: str
    resumen: str
    detalle: str
    id: Optional[int] = None


@dataclass
class Solicitud:
    # El subdocumento "cliente" del JSON original queda aplanado en 3 campos
    cliente_empresa: str
    cliente_rut: str
    cliente_email: str
    servicio_id: int
    servicio_nombre: str
    mensaje: str
    estado: str = ESTADO_INICIAL
    fecha: Optional[date] = None
    id: Optional[int] = None

    @staticmethod
    def estado_es_valido(estado: str) -> bool:
        """Regla de negocio pura: no depende de Django ni de la BD."""
        return estado in ESTADOS_SOLICITUD

    def resumen_cliente(self) -> str:
        return f"{self.cliente_empresa} ({self.cliente_rut})"
