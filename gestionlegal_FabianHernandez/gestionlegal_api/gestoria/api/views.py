"""
ADAPTADOR PRIMARIO (Driving Adapter) - API REST
---------------------------------------------------
Las vistas reciben el request, lo validan con el Serializer, llaman al
caso de uso y devuelven la Response con el codigo HTTP correcto. NO
contienen logica de negocio. Toda la API exige el header:
    Authorization: Token <token>
"""

from dataclasses import asdict

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from gestoria.application.exceptions import (
    ServicioNoEncontradoError, SlugDuplicadoError, ServicioConSolicitudesError,
    SolicitudNoEncontradaError, EstadoInvalidoError,
)
from gestoria.application.use_cases import (
    ListarServiciosUseCase, ObtenerServicioUseCase, CrearServicioUseCase,
    ActualizarServicioUseCase, EliminarServicioUseCase,
    ListarSolicitudesUseCase, ObtenerSolicitudUseCase, CrearSolicitudUseCase,
    ActualizarSolicitudUseCase, EliminarSolicitudUseCase,
)
from gestoria.infrastructure.di import get_servicio_repository, get_solicitud_repository
from .serializers import ServicioSerializer, SolicitudSerializer


def _error(e, codigo):
    return Response({"detail": str(e)}, status=codigo)


class BaseAuthView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


# ======================================================================
# SERVICIOS
# ======================================================================

class ServicioListCreateView(BaseAuthView):

    def get(self, request):
        """GET /api/servicios/ -> lista todos los servicios"""
        servicios = ListarServiciosUseCase(get_servicio_repository()).ejecutar()
        data = ServicioSerializer([asdict(s) for s in servicios], many=True).data
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        """POST /api/servicios/ -> crea un servicio"""
        serializer = ServicioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            servicio = CrearServicioUseCase(get_servicio_repository()).ejecutar(
                serializer.validated_data
            )
        except SlugDuplicadoError as e:
            return _error(e, status.HTTP_400_BAD_REQUEST)
        return Response(ServicioSerializer(asdict(servicio)).data, status=status.HTTP_201_CREATED)


class ServicioDetailView(BaseAuthView):

    def get(self, request, servicio_id):
        """GET /api/servicios/<id>/ -> detalle de un servicio"""
        try:
            servicio = ObtenerServicioUseCase(get_servicio_repository()).ejecutar(servicio_id)
        except ServicioNoEncontradoError as e:
            return _error(e, status.HTTP_404_NOT_FOUND)
        return Response(ServicioSerializer(asdict(servicio)).data, status=status.HTTP_200_OK)

    def put(self, request, servicio_id):
        """PUT /api/servicios/<id>/ -> actualiza un servicio"""
        serializer = ServicioSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        try:
            servicio = ActualizarServicioUseCase(get_servicio_repository()).ejecutar(
                servicio_id, serializer.validated_data
            )
        except ServicioNoEncontradoError as e:
            return _error(e, status.HTTP_404_NOT_FOUND)
        except SlugDuplicadoError as e:
            return _error(e, status.HTTP_400_BAD_REQUEST)
        return Response(ServicioSerializer(asdict(servicio)).data, status=status.HTTP_200_OK)

    def delete(self, request, servicio_id):
        """DELETE /api/servicios/<id>/ -> elimina un servicio"""
        try:
            EliminarServicioUseCase(get_servicio_repository()).ejecutar(servicio_id)
        except ServicioNoEncontradoError as e:
            return _error(e, status.HTTP_404_NOT_FOUND)
        except ServicioConSolicitudesError as e:
            return _error(e, status.HTTP_409_CONFLICT)
        return Response(status=status.HTTP_204_NO_CONTENT)


# ======================================================================
# SOLICITUDES
# ======================================================================

class SolicitudListCreateView(BaseAuthView):

    def get(self, request):
        """GET /api/solicitudes/ (?estado=nuevo) -> lista las solicitudes"""
        try:
            solicitudes = ListarSolicitudesUseCase(get_solicitud_repository()).ejecutar(
                request.query_params.get("estado")
            )
        except EstadoInvalidoError as e:
            return _error(e, status.HTTP_400_BAD_REQUEST)
        data = SolicitudSerializer([asdict(s) for s in solicitudes], many=True).data
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        """POST /api/solicitudes/ -> crea una solicitud"""
        serializer = SolicitudSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            solicitud = CrearSolicitudUseCase(
                get_solicitud_repository(), get_servicio_repository()
            ).ejecutar(serializer.validated_data)
        except ServicioNoEncontradoError as e:
            return _error(e, status.HTTP_400_BAD_REQUEST)
        except EstadoInvalidoError as e:
            return _error(e, status.HTTP_400_BAD_REQUEST)
        return Response(SolicitudSerializer(asdict(solicitud)).data, status=status.HTTP_201_CREATED)


class SolicitudDetailView(BaseAuthView):

    def get(self, request, solicitud_id):
        """GET /api/solicitudes/<id>/ -> detalle de una solicitud"""
        try:
            solicitud = ObtenerSolicitudUseCase(get_solicitud_repository()).ejecutar(solicitud_id)
        except SolicitudNoEncontradaError as e:
            return _error(e, status.HTTP_404_NOT_FOUND)
        return Response(SolicitudSerializer(asdict(solicitud)).data, status=status.HTTP_200_OK)

    def put(self, request, solicitud_id):
        """PUT /api/solicitudes/<id>/ -> actualiza una solicitud"""
        serializer = SolicitudSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        try:
            solicitud = ActualizarSolicitudUseCase(
                get_solicitud_repository(), get_servicio_repository()
            ).ejecutar(solicitud_id, serializer.validated_data)
        except SolicitudNoEncontradaError as e:
            return _error(e, status.HTTP_404_NOT_FOUND)
        except (ServicioNoEncontradoError, EstadoInvalidoError) as e:
            return _error(e, status.HTTP_400_BAD_REQUEST)
        return Response(SolicitudSerializer(asdict(solicitud)).data, status=status.HTTP_200_OK)

    def delete(self, request, solicitud_id):
        """DELETE /api/solicitudes/<id>/ -> elimina una solicitud"""
        try:
            EliminarSolicitudUseCase(get_solicitud_repository()).ejecutar(solicitud_id)
        except SolicitudNoEncontradaError as e:
            return _error(e, status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
