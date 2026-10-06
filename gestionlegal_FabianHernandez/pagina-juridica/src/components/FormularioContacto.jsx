import { useState } from 'react'

const ESTADO_INICIAL = {
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  mensaje: '',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function FormularioContacto() {
  const [datos, setDatos] = useState(ESTADO_INICIAL)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  const actualizarCampo = (campo) => (e) => {
    setDatos((prev) => ({ ...prev, [campo]: e.target.value }))
  };

  const validar = () => {
    const nuevosErrores = {}
    if (datos.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Ingrese su nombre completo (mínimo 3 caracteres).'
    }
    if (!EMAIL_REGEX.test(datos.email)) {
      nuevosErrores.email = 'Ingrese un correo electrónico válido.'
    }
    if (!/^[0-9+\s-]{8,15}$/.test(datos.telefono)) {
      nuevosErrores.telefono = 'Ingrese un teléfono válido (8 a 15 dígitos).'
    }
    if (!datos.servicio) {
      nuevosErrores.servicio = 'Seleccione el servicio de su interés.'
    }
    if (datos.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'Cuéntenos brevemente su caso (mínimo 10 caracteres).'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  
  const manejarEnvio = (e) => {
    e.preventDefault()
    setEnviado(false)

    if (validar()) {
      const nuevoMensaje = {
        ...datos,
        fecha: new Date().toLocaleString()
      }

      const mensajesGuardados = JSON.parse(localStorage.getItem('mensajesContacto')) || []

      mensajesGuardados.push(nuevoMensaje)

      localStorage.setItem('mensajesContacto', JSON.stringify(mensajesGuardados))

      setEnviado(true)
      setDatos(ESTADO_INICIAL)
      setErrores({})
    }
  }


  return (
    <section id="contacto" className="gl-section gl-section--ink">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-5">
            <p className="gl-eyebrow font-mono">SECCIÓN 05</p>
            <h2 className="gl-section-title gl-section-title--light">Conversemos de su empresa</h2>
            <p className="gl-section-lead gl-section-lead--light">
              Respondemos dentro de las siguientes 24 horas hábiles con un diagnóstico
              inicial sin costo.
            </p>

            <ul className="gl-contact-info list-unstyled mt-4">
              <li><strong>Oficina:</strong> Av. Providencia 1234, Of. 502, Santiago</li>
              <li><strong>Teléfono:</strong> +56 2 2345 6789</li>
              <li><strong>Correo:</strong> contacto@gestionlegal.cl</li>
              <li><strong>Horario:</strong> Lunes a viernes, 9:00–18:30</li>
            </ul>
          </div>

          <div className="col-lg-7">
            <form className="gl-form" onSubmit={manejarEnvio} noValidate>
              {enviado && (
                <div className="alert gl-alert-success" role="status">
                  Su mensaje fue enviado. Nos pondremos en contacto pronto.
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="nombre">Nombre completo</label>
                  <input
                    id="nombre"
                    type="text"
                    className={`form-control gl-input ${errores.nombre ? 'is-invalid' : ''}`}
                    value={datos.nombre}
                    onChange={actualizarCampo('nombre')}
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="telefono">Teléfono</label>
                  <input
                    id="telefono"
                    type="tel"
                    className={`form-control gl-input ${errores.telefono ? 'is-invalid' : ''}`}
                    value={datos.telefono}
                    onChange={actualizarCampo('telefono')}
                    placeholder="+56 9 1234 5678"
                  />
                  {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="email">Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control gl-input ${errores.email ? 'is-invalid' : ''}`}
                    value={datos.email}
                    onChange={actualizarCampo('email')}
                  />
                  {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="servicio">Servicio de interés</label>
                  <select
                    id="servicio"
                    className={`form-select gl-input ${errores.servicio ? 'is-invalid' : ''}`}
                    value={datos.servicio}
                    onChange={actualizarCampo('servicio')}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="constitucion">Constitución de empresas</option>
                    <option value="contabilidad">Contabilidad y tributación</option>
                    <option value="laboral">Asesoría laboral</option>
                    <option value="legal">Asesoría legal corporativa</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errores.servicio && <div className="invalid-feedback">{errores.servicio}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label" htmlFor="mensaje">Cuéntenos su caso</label>
                  <textarea
                    id="mensaje"
                    rows="4"
                    className={`form-control gl-input ${errores.mensaje ? 'is-invalid' : ''}`}
                    value={datos.mensaje}
                    onChange={actualizarCampo('mensaje')}
                  ></textarea>
                  {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
                </div>
              </div>

              <button type="submit" className="btn gl-btn-brass mt-4">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
