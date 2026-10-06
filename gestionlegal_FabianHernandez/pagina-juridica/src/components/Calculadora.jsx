import { useMemo, useState } from 'react'

const SERVICIOS_BASE = [
  { id: 'contabilidad', label: 'Contabilidad mensual', precio: 45000 },
  { id: 'iva', label: 'Declaración de IVA', precio: 15000 },
  { id: 'renta', label: 'Declaración de renta anual', precio: 60000 },
  { id: 'laboral', label: 'Remuneraciones y contratos', precio: 30000 },
  { id: 'legal', label: 'Asesoría legal corporativa', precio: 100000 },
]

const TAMANOS = [
  { id: 'micro', label: 'Microempresa (1-9 trabajadores)', factor: 1 },
  { id: 'pequena', label: 'Pequeña empresa (10-49 trabajadores)', factor: 1.5 },
  { id: 'mediana', label: 'Mediana empresa (50-199 trabajadores)', factor: 2.2 },
  { id: 'grande', label: 'Gran empresa (200+ trabajadores)', factor: 3.0 },
]


const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export default function Calculadora() {
  const [seleccionados, setSeleccionados] = useState(['contabilidad', 'iva'])
  const [tamanoId, setTamanoId] = useState('micro')

  const tamano = TAMANOS.find((t) => t.id === tamanoId) ?? TAMANOS[0]

  const toggleServicio = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const subtotal = useMemo(
    () =>
      SERVICIOS_BASE.filter((s) => seleccionados.includes(s.id)).reduce(
        (acc, s) => acc + s.precio,
        0
      ),
    [seleccionados]
  )

  const totalMensual = Math.round(subtotal * tamano.factor)
  const iva = Math.round(totalMensual * 0.19)
  const totalConIva = totalMensual + iva

  return (
    <section id="calculadora" className="gl-section">
      <div className="container">
        <p className="gl-eyebrow font-mono">SECCIÓN 03</p>
        <h2 className="gl-section-title">Calculadora de Presupuesto</h2>
        <p className="gl-section-lead">
          Seleccione los servicios que necesita y el tamaño de su empresa para estimar
          el valor mensual de la asesoría.
        </p>

        <div className="row g-4 mt-2">
          <div className="col-lg-7">
            <div className="gl-calc-card">
              <h3 className="gl-calc-subtitle">1. Servicios requeridos</h3>
              <div className="gl-calc-checklist">
                {SERVICIOS_BASE.map((s) => (
                  <label className="gl-checkbox" key={s.id}>
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(s.id)}
                      onChange={() => toggleServicio(s.id)}
                    />
                    <span className="gl-checkbox-box" aria-hidden="true"></span>
                    <span className="gl-checkbox-label">{s.label}</span>
                    <span className="font-mono gl-checkbox-price">
                      {formatoCLP.format(s.precio)}
                    </span>
                  </label>
                ))}
              </div>

              <h3 className="gl-calc-subtitle mt-4">2. Tamaño de la empresa</h3>
              <select
                className="form-select gl-select"
                value={tamanoId}
                onChange={(e) => setTamanoId(e.target.value)}
                aria-label="Tamaño de la empresa"
              >
                {TAMANOS.map((t) => (
                  <option value={t.id} key={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="gl-calc-result">
              <span className="gl-eyebrow font-mono">ESTIMACIÓN MENSUAL</span>

              {seleccionados.length === 0 ? (
                <p className="gl-calc-empty">Seleccione al menos un servicio para ver el presupuesto.</p>
              ) : (
                <>
                  <div className="gl-calc-line">
                    <span>Subtotal servicios</span>
                    <span className="font-mono">{formatoCLP.format(subtotal)}</span>
                  </div>
                  <div className="gl-calc-line">
                    <span>Ajuste por tamaño ({tamano.label.split(' (')[0]})</span>
                    <span className="font-mono">×{tamano.factor}</span>
                  </div>
                  <div className="gl-calc-line">
                    <span>IVA (19%)</span>
                    <span className="font-mono">{formatoCLP.format(iva)}</span>
                  </div>
                  <hr className="gl-calc-divider" />
                  <div className="gl-calc-total">
                    <span>Total mensual estimado</span>
                    <span className="font-mono">{formatoCLP.format(totalConIva)}</span>
                  </div>
                </>
              )}

              <a href="#contacto" className="btn gl-btn-brass w-100 mt-4">
                Solicitar propuesta formal
              </a>
              <p className="gl-calc-disclaimer">
                * VALOR REFERENCIAL. La propuesta final se ajusta tras el diagnóstico inicial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
