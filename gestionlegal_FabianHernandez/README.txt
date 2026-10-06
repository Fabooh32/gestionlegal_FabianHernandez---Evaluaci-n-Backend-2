# GestionLegal — Evaluación 2 Backend - Fabián Hernández

Backend de GestionLegal con 2 entidades
|---------------|-------------------------------------|------------------------|
|    Entidad    |                Rol                  |         Tabla          |
|---------------|-------------------------------------|------------------------|
| **Servicio**  | Principal (catálogo)                | `gestoria_servicio`    |
| **Solicitud** | Secundaria (formulario de contacto) | `gestoria_solicitudes` |
|---------------|-------------------------------------|------------------------|

## Estructura de la Api GestionLegal

```
gestoria/
├── domain/                 NUCLEO DE (sin Django)
│   ├── entities.py           Servicio y Solicitud (dataclasses puros)
│   └── repositories.py       Puertos: ServicioRepository, SolicitudRepository
├── application/            CASOS DE USO (lógica de negocio)
│   ├── use_cases.py          Listar/Obtener/Crear/Actualizar/Eliminar de cada entidad
│   └── exceptions.py         Errores de negocio (sin HTTP)
├── infrastructure/         ADAPTADOR SECUNDARIO (salida)
│   ├── models.py             Modelos ORM (ServicioModel, SolicitudModel)
│   ├── repositories.py       Implementación de los puertos con Django ORM
│   └── di.py                 Decide qué implementación se usa
└── api/                    ADAPTADOR PRIMARIO (entrada)
`   ├── serializers.py        JSON <-> entidades de dominio
`   ├── views.py              Recibe HTTP, llama al caso de uso, responde
`   └── urls.py               Rutas /api/...
```

# 1- Levantar el Backend

cd gestionlegal_api (en caso de no estar en la carpeta)
python -m venv entorno
entorno\Scripts\activate
	->(EN CASO DE QUE NO FUNCIONE, EJECUTAR: Set-ExecutionPolicy -Scope CurrentUser RemoteSigned)
pip install -r requirements.txt
python manage.py migrate

(COMPLETAR PASO 2 ANTES DE CONTINUAR)

python manage.py runserver



# 2- Crear el superusuario/token

python manage.py createsuperuser
	usuario: user
	password: 1234

python manage.py runserver

Para obtener el token:
POST http://127.0.0.1:8000/api/token/

Pestaña Body → Form → agregar dos campos:
username	:	user
password	:	1234

Pestaña Headers → agregar un campo:
Content-Type	:	application/x-www-form-urlencoded



# 3- Lista de endpoints disponibles en la API 
|--------|--------------------------|---------------------------------------------------------|
| Método |            URL           |                       Qué hace                          |
|--------|--------------------------|---------------------------------------------------------|
| POST   | `/api/token/`            | Login: devuelve el token                                | 
| GET    | `/api/servicios/`        | Lista todos los servicios                               |
| POST   | `/api/servicios/`        | Crea un servicio                                        |
| GET    | `/api/servicios/<id>/`   | Detalle de un servicio                                  |
| PUT    | `/api/servicios/<id>/`   | Actualiza un servicio (campos enviados)                 |
| DELETE | `/api/servicios/<id>/`   | Elimina un servicio (409 si tiene solicitudes)          |
| GET    | `/api/solicitudes/`      | Lista las solicitudes (filtro opcional `?estado=nuevo`) |
| POST   | `/api/solicitudes/`      | Crea una solicitud                                      |
| GET    | `/api/solicitudes/<id>/` | Detalle de una solicitud                                |
| PUT    | `/api/solicitudes/<id>/` | Actualiza una solicitud (campos enviados)               |
| DELETE | `/api/solicitudes/<id>/` | Elimina una solicitud                                   |
|--------|--------------------------|---------------------------------------------------------|




### Ejemplos para la presentacion de Servicio (POST /api/servicios/)

```body → json
{
  "nombre": "Declaración de Renta",
  "slug": "renta",
  "resumen": "Renta anual sin sorpresas.",
  "detalle": "Preparación y presentación de la Operación Renta ante el SII."
}

{
  "nombre": "Revision de causas",
  "slug": "causas",
  "resumen": "Analisis de casos en general",
  "detalle": "Defensa completa garantizada"
}
```

### Ejemplos para la presentacion de Solicitud (POST /api/solicitudes/)

```body → json
{
  "cliente": {
    "empresa": "Panadería El Trigal",
    "rut": "76.123.456-7",
    "email": "contacto@eltrigal.cl"
  },
  "servicioId": 2,
  "mensaje": "Necesitamos ayuda con la declaración de este año",
  "estado": "nuevo",
  "fecha": "2026-07-08"
}
```

*`estado` y `fecha` son opcionales al crear *

`servicioId` es el `id` de un servicio existente (ver `GET /api/servicios/`).
	








