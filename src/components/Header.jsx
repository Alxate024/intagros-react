import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useScroll } from '../hooks'
import './Header.css'

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
    { to: '/fincas/', label: 'Fincas' },
    { to: '/clientes', label: 'Clientes' },
  ]

  return (
    <>
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="site-header__glow" aria-hidden="true" />
        <nav className="site-header__inner" aria-label="Navegación principal">
          <Link className="site-header__brand" to="/" aria-label="Ir al inicio">
            <img src="/media/logo_intagros.png" alt="INTAGROS" />
          </Link>

          <div className="site-header__nav">
            {menuItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="site-header__actions">
            <NavLink className="header-link" to="/login">Iniciar sesión</NavLink>
            <NavLink className="header-link--alt" to="/register">Registrarse</NavLink>
            <NavLink className="header-sub" to="/suscripcion">Suscripción</NavLink>
          </div>

          <button
            className={`menu-button ${isOpen ? 'is-open' : ''}`}
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Abrir menú"
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
          <Link className="mobile-menu__brand" to="/" onClick={() => setIsOpen(false)}>
            <img src="/media/logo_intagros.png" alt="INTAGROS" />
          </Link>
          {menuItems.map((item) => (
            <NavLink to={item.to} onClick={() => setIsOpen(false)} key={item.label}>{item.label}</NavLink>
          ))}
          <div className="mobile-menu__divider" />
          <NavLink to="/login" onClick={() => setIsOpen(false)}>Iniciar sesión</NavLink>
          <NavLink to="/register" onClick={() => setIsOpen(false)}>Registrarse</NavLink>
          <NavLink className="mobile-menu__cta" to="/suscripcion" onClick={() => setIsOpen(false)}>Suscripción</NavLink>
        </div>
      </div>
    </>
  )
}

export default Header
