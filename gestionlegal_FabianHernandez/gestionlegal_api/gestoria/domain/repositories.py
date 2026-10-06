"""
PUERTOS (Ports)
----------------
Contratos abstractos (ABC) para los Casos de Uso. No hay
implementacion: quien las implementa (infrastructure/) es
un adaptador secundario. Los casos de uso dependen de 
ESTAS interfaces, nunca de Django ORM directamente.
"""

from abc import ABC, abstractmethod
from typing import List, Optional

from .entities import Servicio, Solicitud


class ServicioRepository(ABC):

    @abstractmethod
    def listar(self) -> List[Servicio]: ...

    @abstractmethod
    def obtener_por_id(self, servicio_id: int) -> Optional[Servicio]: ...

    @abstractmethod
    def existe_slug(self, slug: str, excluir_id: Optional[int] = None) -> bool: ...

    @abstractmethod
    def tiene_solicitudes(self, servicio_id: int) -> bool: ...

    @abstractmethod
    def guardar(self, servicio: Servicio) -> Servicio: ...

    @abstractmethod
    def eliminar(self, servicio_id: int) -> bool: ...


class SolicitudRepository(ABC):

    @abstractmethod
    def listar(self, estado: Optional[str] = None) -> List[Solicitud]: ...

    @abstractmethod
    def obtener_por_id(self, solicitud_id: int) -> Optional[Solicitud]: ...

    @abstractmethod
    def guardar(self, solicitud: Solicitud) -> Solicitud: ...

    @abstractmethod
    def eliminar(self, solicitud_id: int) -> bool: ...
