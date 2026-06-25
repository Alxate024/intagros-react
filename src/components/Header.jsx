import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { contact, units } from '../data/siteContent'
import { useScroll } from '../hooks'
import './Header.css'

const advisoryItems = [
  {
    to: '/unidades/asesorias-agroindustriales/',
    eyebrow: 'Unidad',
    title: 'Asesorías Agroindustriales',
  },
  {
    to: '/unidades/asesorias-agroindustriales/cana-de-azucar/',
    eyebrow: 'Caña y panela',
    title: 'Caña de Azúcar',
  },
  {
    to: '/unidades/asesorias-agroindustriales/frutales-tropicales/',
    eyebrow: 'Archivo botánico',
    title: 'Frutales Tropicales',
  },
  {
    to: '/fincas/',
    eyebrow: 'Clientes',
    title: 'Fincas por cliente',
  },
  {
    to: '/predio-el-zapote/',
    eyebrow: 'Garces Eder',
    title: 'Predio El Zapote',
  },
  {
    to: '/predio-guadalito/',
    eyebrow: 'Garces Eder',
    title: 'Predio Guadalito',
  },
  {
    to: '/predio-guaguya/',
    eyebrow: 'Garces Eder',
    title: 'Predio Guaguya',
  },
  {
    to: '/unidades/asesorias-agroindustriales/floricultura/',
    eyebrow: 'Invernadero',
    title: 'Floricultura',
  },
  {
    to: '/unidades/asesorias-agroindustriales/cultivos-transitorios/',
    eyebrow: 'Ciclo corto',
    title: 'Cultivos Transitorios',
  },
]

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const isScrolled = useScroll(18)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const menuItems = [
    { to: '/', label: 'Inicio' },
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/unidades/asesorias-agroindustriales/', label: 'Asesorías' },
    { to: '/fincas/', label: 'Fincas' },
    { to: '/predio-el-zapote/', label: 'Predio El Zapote' },
    { to: '/predio-guadalito/', label: 'Predio Guadalito' },
    { to: '/predio-guaguya/', label: 'Predio Guaguya' },
    { to: '/unidades', label: 'Unidades' },
    { to: '/servicios', label: 'Servicios' },
    { to: '/contacto', label: 'Contacto' },
  ]

  return (
    <>
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <nav className="site-header__inner" aria-label="Navegación principal">
          <Link className="site-header__brand" to="/" aria-label="Ir al inicio">
            <img src="https://www.intagros.com.co/wp-content/uploads/2020/06/cropped-intagros-f.png" alt="INTAGROS" />
            <span>Inteligencia Agropecuaria Sostenible</span>
          </Link>

          <div className="site-header__nav">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
            <NavLink to="/fincas/">Fincas</NavLink>
            <div className="nav-dropdown nav-dropdown--wide">
              <button type="button">
                Asesorías
                <span aria-hidden="true">⌄</span>
              </button>
              <div className="nav-dropdown__panel advisory-panel">
                <div className="advisory-panel__intro">
                  <span>Unidad 01</span>
                  <strong>Asesorías Agroindustriales</strong>
                  <p>Caña, frutales, flores y cultivos por ciclo dentro de una sola ruta técnica.</p>
                </div>
                <div className="advisory-panel__links">
                  {advisoryItems.map((item) => (
                    <NavLink to={item.to} key={item.to}>
                      <small>{item.eyebrow}</small>
                      <strong>{item.title}</strong>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="nav-dropdown">
              <button type="button">
                Unidades
                <span aria-hidden="true">⌄</span>
              </button>
              <div className="nav-dropdown__panel">
                {units.filter((item) => item.slug !== 'asesorias-agroindustriales').map((item) => (
                  <NavLink to={`/unidades/${item.slug}/`} key={item.slug}>
                    <small>{item.eyebrow}</small>
                    <strong>{item.title}</strong>
                  </NavLink>
                ))}
              </div>
            </div>
            <NavLink to="/servicios">Servicios</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
          </div>

          <div className="site-header__actions">
            <a className="header-link" href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
            <NavLink className="header-cta" to="/contacto">Contáctenos</NavLink>
          </div>

          <button
            className={`menu-button ${isOpen ? 'is-open' : ''}`}
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Abrir menu"
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu__inner">
          {menuItems.map((item) => (
            <a href={item.to} onClick={() => setIsOpen(false)} key={item.label}>{item.label}</a>
          ))}
          <div className="mobile-menu__group">
            <span>Asesorías Agroindustriales</span>
            {advisoryItems.map((item) => (
              <Link to={item.to} onClick={() => setIsOpen(false)} key={item.to}>{item.title}</Link>
            ))}
          </div>
          <div className="mobile-menu__group">
            <span>Otras unidades</span>
            {units.filter((item) => item.slug !== 'asesorias-agroindustriales').map((item) => (
              <Link to={`/unidades/${item.slug}/`} onClick={() => setIsOpen(false)} key={item.slug}>{item.title}</Link>
            ))}
          </div>
          <a className="mobile-menu__cta" href={contact.whatsappHref} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>WhatsApp directo</a>
        </div>
      </div>
    </>
  )
}

export default Header
