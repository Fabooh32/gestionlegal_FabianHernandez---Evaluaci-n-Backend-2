export default function Hero() {
  return (
    <header id="inicio" className="gl-hero">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-7">
            <p className="gl-eyebrow font-mono">ASESORES EXPERTOS EN GESTIÓN EMPRESARIAL</p>
            <h1 className="gl-hero-title">
              Tú empresa; tus reglas.<br />
              <span>Sin perder tiempo en trámites.</span>
            </h1>
            <p className="gl-hero-lead">
              Llevamos la contabilidad de su negocio con el
              respaldo de un equipo de contadores y abogados colegiados. Menos papeleo
              para ti, más certeza legal y tributaria para tu empresa.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <a href="#contacto" className="btn btn-lg gl-btn-brass">Solicitar Asesoría</a>
              <a href="#servicios" className="btn btn-lg gl-btn-outline">Ver Servicios</a>
            </div>

            <div className="row mt-5 gl-hero-stats">
              <div className="col-4">
                <span className="font-mono gl-stat-num">12+</span>
                <span className="gl-stat-label">Años de trayectoria</span>
              </div>
              <div className="col-4">
                <span className="font-mono gl-stat-num">360</span>
                <span className="gl-stat-label">Empresas asesoradas</span>
              </div>
              <div className="col-4">
                <span className="font-mono gl-stat-num">96%</span>
                <span className="gl-stat-label">Casos resueltos a tiempo</span>
              </div>
            </div>
          </div>

          <div className="col-lg-5 d-flex justify-content-center">
            <svg viewBox="0 0 320 320" className="gl-seal" role="img" aria-label="Sello GestionLegal">
              <circle cx="160" cy="160" r="150" className="gl-seal-ring" />
              <circle cx="160" cy="160" r="120" className="gl-seal-ring-inner" />
              <path id="glSealArcTop" d="M 55 160 A 105 105 0 0 1 265 160" fill="none" />
              <path id="glSealArcBottom" d="M 265 165 A 105 105 0 0 1 55 165" fill="none" />
              <text className="gl-seal-text">
                <textPath href="#glSealArcTop" startOffset="50%" textAnchor="middle">
                  GESTIONLEGAL · SANTIAGO
                </textPath>
              </text>
              <g className="gl-seal-center">
                <line x1="120" y1="130" x2="200" y2="130" />
                <line x1="112" y1="150" x2="208" y2="150" />
                <line x1="112" y1="170" x2="208" y2="170" />
                <line x1="120" y1="190" x2="200" y2="190" />
                <text x="160" y="215" textAnchor="middle" className="gl-seal-year font-mono">EST. 2013</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}