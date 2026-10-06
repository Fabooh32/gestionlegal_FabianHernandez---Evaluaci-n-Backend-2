const CERTIFICADOS = [
  {
    id: 'sii',
    titulo: 'Contribuyente Autorizado SII',
    detalle: 'Habilitados para emisión de documentos tributarios electrónicos.',
  },
  {
    id: 'colegio',
    titulo: 'Colegio de Contadores de Chile A.G.',
    detalle: 'Sujetos al código de ética profesional.',
  },
  {
    id: 'iso',
    titulo: 'ISO 9001:2015',
    detalle: 'Gestión de calidad certificada en procesos contables y legales.',
  },
  {
    id: 'ccs',
    titulo: 'Cámara de Comercio de Santiago',
    detalle: 'Socios activos y validados desde 2014.',
  },
]

function InsigniaIcono() {
  return (
    <svg viewBox="0 0 48 48" className="gl-cert-icon" aria-hidden="true">
      <path
        d="M24 4 L40 12 V24 C40 33 33 40 24 44 C15 40 8 33 8 24 V12 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M17 24 L22 29 L32 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Certificados() {
  return (
    <section id="certificaciones" className="gl-section gl-section--paper2">
      <div className="container">
        <p className="gl-eyebrow font-mono">SECCIÓN 04</p>
        <h2 className="gl-section-title">Certificaciones y Acreditaciones</h2>
        <p className="gl-section-lead">
          Respaldo formal ante los organismos que regulan nuestra actividad.
        </p>

        <div className="row g-4 mt-2">
          {CERTIFICADOS.map((c) => (
            <div className="col-sm-6 col-lg-3" key={c.id}>
              <div className="gl-cert-card">
                <InsigniaIcono />
                <h3 className="gl-cert-title">{c.titulo}</h3>
                <p className="gl-cert-detalle">{c.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
