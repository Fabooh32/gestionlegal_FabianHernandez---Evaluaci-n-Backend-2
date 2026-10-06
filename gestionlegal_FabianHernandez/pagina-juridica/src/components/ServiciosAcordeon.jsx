const SERVICIOS = [
  {
    id: 'constitucion',
    numero: '01',
    titulo: 'Constitución de Empresas',
    resumen: 'De la idea a la escritura, en días.',
    detalle:
      'Constitución de sociedades (SpA, EIRL, Ltda.) por internet o notaría, obtención de RUT, inicio de actividades en el SII y redacción de estatutos a medida.',
  },
  {
    id: 'contabilidad',
    numero: '02',
    titulo: 'Contabilidad y Tributación',
    resumen: 'Libros al día y declaraciones sin sorpresas.',
    detalle:
      'Contabilidad completa o simplificada, declaración de IVA  y renta anual, conciliaciones bancarias y remuneraciones.',
  },
  {
    id: 'laboral',
    numero: '03',
    titulo: 'Asesoría Laboral',
    resumen: 'Contratos y liquidaciones sin errores.',
    detalle:
      'Redacción de contratos de trabajo, cálculo de liquidaciones de sueldo, finiquitos, y representación ante la Dirección del Trabajo.',
  },
  {
    id: 'tramites',
    numero: '04',
    titulo: 'Trámites y Permisos',
    resumen: 'Patentes, permisos municipales y sanitarios.',
    detalle:
      'Gestión de patente comercial, permisos sanitarios y municipales, y trámites ante notarías, conservadores y registros públicos.',
  },
  {
    id: 'auditoria',
    numero: '05',
    titulo: 'Auditoría y Control Interno',
    resumen: 'Revisión independiente de sus procesos.',
    detalle:
      'Auditorías internas, revisión de estados financieros y diseño de controles internos para prevenir errores y fraude.',
  },
  {
    id: 'legal',
    numero: '06',
    titulo: 'Asesoría Legal Corporativa',
    resumen: 'Contratos comerciales y resolución de conflictos.',
    detalle:
      'Redacción y revisión de contratos comerciales, arriendo y proveedores; acompañamiento en negociaciones y mediación de conflictos societarios.',
  },
]

export default function ServiciosAcordeon() {
  return (
    <section id="servicios" className="gl-section">
      <div className="container">
        <p className="gl-eyebrow font-mono">SECCIÓN 01</p>
        <h2 className="gl-section-title">Nuestros Servicios</h2>
        <p className="gl-section-lead">
          Un solo equipo para toda la carpeta legal, tributaria y contable de tu empresa.
        </p>

        <div className="accordion gl-accordion mt-4" id="acordeonServicios">
          {SERVICIOS.map((s, idx) => (
            <div className="accordion-item" key={s.id}>
              <h3 className="accordion-header" id={`heading-${s.id}`}>
                <button
                  className={`accordion-button ${idx !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${s.id}`}
                  aria-expanded={idx === 0 ? 'true' : 'false'}
                  aria-controls={`collapse-${s.id}`}
                >
                  <span className="gl-accordion-num font-mono">{s.numero}</span>
                  <span className="gl-accordion-heading">
                    <span className="gl-accordion-title">{s.titulo}</span>
                    <span className="gl-accordion-summary">{s.resumen}</span>
                  </span>
                </button>
              </h3>
              <div
                id={`collapse-${s.id}`}
                className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                aria-labelledby={`heading-${s.id}`}
                data-bs-parent="#acordeonServicios"
              >
                <div className="accordion-body">{s.detalle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
