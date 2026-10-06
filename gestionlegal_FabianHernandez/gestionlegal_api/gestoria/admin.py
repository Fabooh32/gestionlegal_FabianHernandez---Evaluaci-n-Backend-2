from django.contrib import admin

from gestoria.infrastructure.models import ServicioModel, SolicitudModel

admin.site.register(ServicioModel)
admin.site.register(SolicitudModel)
