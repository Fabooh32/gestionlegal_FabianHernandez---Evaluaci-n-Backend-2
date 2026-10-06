import { useState } from 'react'

const CASOS = [
  {
    id: 1,
    cliente: 'Panadería Los Almendros',
    rubro: 'Alimentos · Microempresa',
    desafio: 'Operaba de manera informal y arriesgaba multas por no tener inicio de actividades.',
    solucion:
      'Constituimos la empresa como EIRL, tramitamos el inicio de actividades y ordenamos su contabilidad simplificada.',
    resultado: 'Regularizada en 10 días hábiles, sin observaciones del SII en su primera declaración.',
  },
  {
    id: 2,
    cliente: 'Estudio Creativo Norte',
    rubro: 'Servicios Creativos · Pequeña Empresa',
    desafio: 'Pagaba más IVA del necesario por falta de respaldo de gastos y créditos fiscales.',
    solucion:
      'Reorganizamos su contabilidad, capacitamos al equipo en registro de boletas y facturas, y optimizamos su carga tributaria.',
    resultado: 'Reducción de un 18% en el pago mensual de IVA de forma totalmente legal.',
  },
  {
    id: 3,
    cliente: 'Transportes Bio-Sur',
    rubro: 'Logística · Mediana Empresa',
    desafio: 'Enfrentaba una demanda laboral por finiquitos mal calculados.',
    solucion:
      'Revisamos y corrigimos los contratos vigentes, recalculamos liquidaciones y representamos a la empresa en la mediación.',
    resultado: 'Conflicto resuelto sin juicio, con acuerdo favorable en menos de 45 días.',
  },
  {
    id: 4,
    cliente: 'Clínica Dental Andes',
    rubro: 'Salud · Pequeña Empresa',
    desafio: 'Necesitaba permisos sanitarios y municipales para abrir una segunda sucursal.',
    solucion:
      'Gestionamos de punta a punta los permisos sanitarios, la patente comercial y la actualización de estatutos.',
    resultado: 'Nueva sucursal habilitada y operativa en menos de dos meses.',
  },
]

export default function CasosModal() {
  const [casoActivo, setCasoActivo] = useState(null)

  const abrirCaso = (caso) => setCasoActivo(caso)
  const cerrarCaso = () => setCasoActivo(null)

  return (
    <section id="casos" className="gl-section gl-section--ink">
      <div className="container">
        <p className="gl-eyebrow font-mono">SECCIÓN 02</p>
        <h2 className="gl-section-title gl-section-title--light">Casos de Éxito</h2>
        <p className="gl-section-lead gl-section-lead--light">
          Historias reales de empresas que ordenamos legal y tributariamente.
        </p>

        <div className="row g-4 mt-2">
          {CASOS.map((caso) => (
            <div className="col-sm-6 col-lg-3" key={caso.id}>
              <button
                type="button"
                className="gl-case-card"
                onClick={() => abrirCaso(caso)}
              >
                <span className="gl-case-rubro font-mono">{caso.rubro}</span>
                <span className="gl-case-cliente">{caso.cliente}</span>
                <span className="gl-case-cta">Ver expediente →</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`modal fade gl-modal ${casoActivo ? 'show d-block' : ''}`}
        tabIndex="-1"
        role="dialog"
        aria-modal={casoActivo ? 'true' : undefined}
        aria-hidden={casoActivo ? undefined : 'true'}
        style={{ backgroundColor: casoActivo ? 'rgba(13,21,38,0.65)' : 'transparent' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content gl-modal-content">
            {casoActivo && (
              <>
                <div className="modal-header">
                  <div>
                    <span className="gl-eyebrow font-mono">{casoActivo.rubro}</span>
                    <h3 className="modal-title">{casoActivo.cliente}</h3>
                  </div>
                  <button type="button" className="btn-close" aria-label="Cerrar" onClick={cerrarCaso}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Desafío:</strong> {casoActivo.desafio}</p>
                  <p><strong>Solución:</strong> {casoActivo.solucion}</p>
                  <p className="mb-0"><strong>Resultado:</strong> {casoActivo.resultado}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn gl-btn-outline" onClick={cerrarCaso}>
                    Cerrar
                  </button>
                  <a href="#contacto" className="btn gl-btn-brass" onClick={cerrarCaso}>
                    Quiero un caso así
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
