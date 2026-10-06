from django.urls import path

from . import views

urlpatterns = [
    path("servicios/", views.ServicioListCreateView.as_view(), name="servicio-list-create"),
    path("servicios/<int:servicio_id>/", views.ServicioDetailView.as_view(), name="servicio-detail"),
    path("solicitudes/", views.SolicitudListCreateView.as_view(), name="solicitud-list-create"),
    path("solicitudes/<int:solicitud_id>/", views.SolicitudDetailView.as_view(), name="solicitud-detail"),
]
