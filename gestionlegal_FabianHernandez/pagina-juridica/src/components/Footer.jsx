export default function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="gl-footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <div className="gl-brand gl-brand--footer">
              <span className="gl-brand-mark" aria-hidden="true">GL</span>
              <span className="gl-brand-text">
                GestionLegal
                <small>Gestoría &amp; Asesoría Contable</small>
              </span>
            </div>
            <p className="gl-footer-desc">
              Acompañamos a pequeñas y medianas empresas en su formalización,
              contabilidad y trámites legales desde 2013.
            </p>
          </div>

          <div className="col-md-4">
            <h4 className="gl-footer-heading">Navegación</h4>
            <ul className="list-unstyled gl-footer-links">
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#casos">Casos de Éxito</a></li>
              <li><a href="#calculadora">Calculadora</a></li>
              <li><a href="#certificaciones">Certificaciones</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h4 className="gl-footer-heading">Contacto</h4>
            <ul className="list-unstyled gl-footer-links">
              <li>Av. Providencia 1234, Of. 502, Santiago</li>
              <li>+56 2 2345 6789</li>
              <li>contacto@gestionlegal.cl</li>
            </ul>
          </div>
        </div>

        <hr className="gl-footer-divider" />

        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
          <span className="gl-footer-copy">© {anio} GestionLegal SpA. Todos los derechos reservados.</span>
          <span className="gl-footer-copy">Proyecto académico — Frontend con React y Bootstrap</span>
        </div>
      </div>
    </footer>
  )
}
