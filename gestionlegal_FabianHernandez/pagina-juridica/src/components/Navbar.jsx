import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#casos', label: 'Casos de Éxito' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#certificaciones', label: 'Certificaciones' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const collapseRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobileMenu = () => {
    const node = collapseRef.current
    if (!node) return
    const isShown = node.classList.contains('show')
    if (isShown && window.bootstrap) {
      const instance = window.bootstrap.Collapse.getOrCreateInstance(node)
      instance.hide()
    }
  }

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top gl-navbar ${scrolled ? 'gl-navbar--scrolled' : ''}`}
    >
      <div className="container">
        <a className="navbar-brand gl-brand" href="#inicio">
          <span className="gl-brand-mark" aria-hidden="true">GL</span>
          <span className="gl-brand-text">
            GestionLegal
            <small>Gestoría &amp; Asesoría Contable</small>
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
          aria-controls="navMain"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMain" ref={collapseRef}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {LINKS.map((link) => (
              <li className="nav-item" key={link.href}>
                <a className="nav-link gl-nav-link" href={link.href} onClick={closeMobileMenu}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-2">
              <a href="#contacto" className="btn gl-btn-brass" onClick={closeMobileMenu}>
                Agendar Asesoría
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
