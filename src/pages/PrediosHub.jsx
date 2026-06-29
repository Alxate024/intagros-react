import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './PrediosHub.css'

/* ═══════════════════════════════════════════════════════════════════════
   DATOS
   ═══════════════════════════════════════════════════════════════════════ */

const clientes = [
  {
    slug: 'garces-eder',
    name: 'Garces Eder',
    label: 'Cliente activo',
    desc: 'Cliente con finca registrada y predios productivos conectados a mapas e inventario individual de arboles.',
    accent: '#7fb069',
    fincas: [
      {
        slug: 'finca-garces-eder',
        name: 'Finca Garces Eder',
        subtitle: 'Finca registrada',
        desc: 'Finca organizada por predios, mapas y arboles individuales. Esta estructura permite sumar mas fincas del mismo u otros clientes.',
        accent: '#7fb069',
        stats: [
          { v: '3',    l: 'Predios'    },
          { v: '171+', l: 'Arboles'    },
          { v: '12+',  l: 'Variedades' },
        ],
        predios: [
          {
            slug: 'predio-el-zapote',
            name: 'El Zapote',
            subtitle: 'Oficina',
            desc: 'Inventario digital de 117 arboles frutales con modelo 3D, mapa GIS, ajuste de precision y consulta botanica.',
            stats: [
              { v: '117', l: 'Arboles'    },
              { v: '12',  l: 'Variedades' },
              { v: '6',   l: 'Grupos'     },
            ],
            accent: '#e4a830',
            mapImg: '/media/predio-el-zapote-mapa.png',
            tags: ['Mapa GIS', 'Modelo 3D', 'Arboles', 'Wikipedia'],
            iconColor: '#23451f',
            iconBorder: '#e4a830',
            iconFruit: '#d7a23b',
          },
          {
            slug: 'predio-guadalito',
            name: 'Guadalito',
            subtitle: 'Frutas tropicales',
            desc: 'Mapa interactivo con seleccion individual, consulta Wikipedia, modelo 3D y herramientas de calibracion.',
            stats: [
              { v: '64', l: 'Arboles'    },
              { v: '—',  l: 'Variedades' },
              { v: '—',  l: 'Grupos'     },
            ],
            accent: '#7fb069',
            mapImg: '/media/predio-guadalito-mapa.png',
            tags: ['Mapa', 'Seleccion', '3D', 'Precision'],
            iconColor: '#1f3b22',
            iconBorder: '#7fb069',
            iconFruit: '#85c9b4',
          },
          {
            slug: 'predio-guaguya',
            name: 'Guaguya',
            subtitle: 'Citricos y tropicales',
            desc: 'Croquis digital con 54 arboles numerados, filtros por especie y grupo productivo, navegacion directa en plano.',
            stats: [
              { v: '54', l: 'Arboles'    },
              { v: '—',  l: 'Variedades' },
              { v: '—',  l: 'Grupos'     },
            ],
            accent: '#e8833a',
            mapImg: '/media/predio-guaguya-mapa.png',
            tags: ['Croquis', 'Filtros', 'Especies', 'Plano'],
            iconColor: '#2e5523',
            iconBorder: '#e8833a',
            iconFruit: '#e48b24',
          },
        ],
      },
    ],
  },
]

const activeClient    = clientes[0]
const activeFinca     = activeClient.fincas[0]
const allFincas       = clientes.flatMap((c) => c.fincas.map((f) => ({ ...f, cliente: c })))
const fincaDetailPath = `/predioshub/${activeFinca.slug}/`

/* ═══════════════════════════════════════════════════════════════════════
   HOJA BOTÁNICA SVG — vintage con nervaduras
   ═══════════════════════════════════════════════════════════════════════ */

function BotanicalLeaf({ size = 220, opacity = 1, tint = '#4a7c3a' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <g transform="translate(100,100)">
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = (i * 360) / 7
          return (
            <g key={i} transform={`rotate(${angle})`}>
              <path
                d="M 0 -10 Q 25 -45 50 -75 Q 30 -82 0 -82 Q -30 -82 -50 -75 Q -25 -45 0 -10 Z"
                fill={tint}
                opacity="0.9"
              />
              <path
                d="M 0 -10 Q 0 -45 0 -82"
                stroke="#f4d35e"
                strokeWidth="0.8"
                opacity="0.7"
                fill="none"
              />
              {[-70, -55, -40, -25].map((y, j) => (
                <g key={j}>
                  <path
                    d={`M 0 ${y} Q 12 ${y - 4} 24 ${y - 12}`}
                    stroke="#2c4a1d"
                    strokeWidth="0.4"
                    opacity="0.55"
                    fill="none"
                  />
                  <path
                    d={`M 0 ${y} Q -12 ${y - 4} -24 ${y - 12}`}
                    stroke="#2c4a1d"
                    strokeWidth="0.4"
                    opacity="0.55"
                    fill="none"
                  />
                </g>
              ))}
              <path
                d="M -8 -25 Q 0 -50 8 -25"
                stroke="#a9d086"
                strokeWidth="0.6"
                opacity="0.5"
                fill="none"
              />
            </g>
          )
        })}
        <circle r="4" fill="#3d2817" opacity="0.85" />
        <circle r="2" fill="#f4d35e" opacity="0.6" />
      </g>
    </svg>
  )
}

/* Rosa de los vientos SVG decorativa */
function CompassRose({ size = 120, opacity = 0.5 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke="#c9a85a" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="38" stroke="#c9a85a" strokeWidth="0.4" />
      <g transform="translate(50,50)">
        {/* Norte (más grande) */}
        <path d="M 0 -42 L 4 -8 L 0 0 L -4 -8 Z" fill="#c9a85a" />
        <path d="M 0 -42 L 3 -16 L 0 -22 L -3 -16 Z" fill="#f4d35e" />
        {/* Sur */}
        <path d="M 0 42 L 4 8 L 0 0 L -4 8 Z" fill="#c9a85a" opacity="0.7" />
        {/* Este */}
        <path d="M 42 0 L 8 4 L 0 0 L 8 -4 Z" fill="#c9a85a" opacity="0.7" />
        {/* Oeste */}
        <path d="M -42 0 L -8 4 L 0 0 L -8 -4 Z" fill="#c9a85a" opacity="0.7" />
        {/* Diagonales */}
        <g transform="rotate(45)">
          <path d="M 0 -30 L 2 -4 L 0 0 L -2 -4 Z" fill="#c9a85a" opacity="0.5" />
          <path d="M 0 30 L 2 4 L 0 0 L -2 4 Z" fill="#c9a85a" opacity="0.5" />
        </g>
      </g>
      <circle cx="50" cy="50" r="3" fill="#f4d35e" />
      <circle cx="50" cy="50" r="1.5" fill="#3d2817" />
    </svg>
  )
}

/* Etiqueta de herbario vintage */
function HerbariumTag({ label, rotate = 0 }) {
  return (
    <div className="ph-tag" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="ph-tag__pin" aria-hidden="true" />
      <span className="ph-tag__text">{label}</span>
    </div>
  )
}

/* Mariposa botánica SVG */
function BotanicalButterfly({ size = 60, opacity = 0.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <g transform="translate(30,30)">
        {/* Alas superiores */}
        <path
          d="M 0 -2 Q -18 -22 -22 -10 Q -20 -2 -8 -4 Q -2 -2 0 -2 Z"
          fill="#5a7d3a"
          opacity="0.85"
        />
        <path
          d="M 0 -2 Q 18 -22 22 -10 Q 20 -2 8 -4 Q 2 -2 0 -2 Z"
          fill="#5a7d3a"
          opacity="0.85"
        />
        {/* Alas inferiores */}
        <path
          d="M -6 2 Q -20 4 -16 14 Q -10 16 -4 6 Z"
          fill="#7fb069"
          opacity="0.8"
        />
        <path
          d="M 6 2 Q 20 4 16 14 Q 10 16 4 6 Z"
          fill="#7fb069"
          opacity="0.8"
        />
        {/* Puntos en las alas */}
        <circle cx="-12" cy="-8" r="2" fill="#f4d35e" opacity="0.7" />
        <circle cx="12" cy="-8" r="2" fill="#f4d35e" opacity="0.7" />
        <circle cx="-10" cy="8" r="1.5" fill="#e4a830" opacity="0.6" />
        <circle cx="10" cy="8" r="1.5" fill="#e4a830" opacity="0.6" />
        {/* Cuerpo */}
        <ellipse cx="0" cy="0" rx="1.2" ry="8" fill="#3d2817" />
        {/* Antenas */}
        <path d="M -1 -7 Q -4 -12 -5 -14" stroke="#3d2817" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M 1 -7 Q 4 -12 5 -14" stroke="#3d2817" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/* Partículas flotantes */
function FloatingMotes({ count = 14 }) {
  return (
    <div className="ph-motes" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="ph-mote"
          style={{
            '--ph-dx':   `${(Math.random() - 0.5) * 80}vw`,
            '--ph-dy':   `${-50 - Math.random() * 80}vh`,
            '--ph-dur':  `${8 + Math.random() * 8}s`,
            '--ph-delay':`-${Math.random() * 12}s`,
            '--ph-size': `${2 + Math.random() * 4}px`,
            left:        `${Math.random() * 100}%`,
            bottom:      `${Math.random() * 20}%`,
          }}
        />
      ))}
    </div>
  )
}

/* Luciérnagas adicionales (efecto mágico) */
function Fireflies({ count = 8 }) {
  return (
    <div className="ph-fireflies" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="ph-firefly"
          style={{
            '--ph-dx':   `${(Math.random() - 0.5) * 40}vw`,
            '--ph-dy':   `${-30 - Math.random() * 60}vh`,
            '--ph-dur':  `${10 + Math.random() * 12}s`,
            '--ph-delay':`-${Math.random() * 15}s`,
            left:        `${Math.random() * 100}%`,
            top:         `${30 + Math.random() * 60}%`,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTES
   ═══════════════════════════════════════════════════════════════════════ */

function FincaIcon() {
  return (
    <img
      className="ph-icon-logo"
      src="/media/Garces_Eder_logo.png"
      alt="Logo Garces Eder"
    />
  )
}

function TotemIcon() {
  return (
    <img
      className="ph-icon-totem"
      src="/media/totem-garces-eder.png"
      alt="Totem de piedra del cliente Garces Eder"
    />
  )
}

function ClientLogoSmall() {
  return (
    <img
      className="ph-icon-client-small"
      src="/media/Garces_Eder_logo.png"
      alt="Logo Garces Eder"
    />
  )
}

function TreeIcon({ p }) {
  return (
    <svg className="ph-icon-tree" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="19" r="13" fill={p.iconColor} stroke={p.iconBorder} strokeWidth="2" />
      <path d="M24 32 L24 44" stroke="#6c4225" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="24" cy="19" r="5"   fill={p.iconFruit} opacity="0.9"  />
      <circle cx="15" cy="15" r="3"   fill={p.iconFruit} opacity="0.65" />
      <circle cx="32" cy="17" r="2.5" fill={p.iconFruit} opacity="0.65" />
    </svg>
  )
}

function MapPreview({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [error,  setError]  = useState(false)

  return (
    <div className="ph-card__map">
      {!error ? (
        <img
          className={`ph-card__map-img ${loaded ? 'is-loaded' : ''}`}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : (
        <div className="ph-card__map-fallback">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <rect x="6" y="6" width="40" height="40" rx="4" stroke="rgba(180,210,110,0.5)" strokeWidth="1.5" />
            <path d="M12 40 L20 26 L28 34 L36 22 L42 40Z" fill="rgba(180,210,110,0.15)" />
            <circle cx="17" cy="18" r="4" fill="rgba(180,210,110,0.15)" />
          </svg>
        </div>
      )}
      <div className="ph-card__map-shade" />
      <div className="ph-card__map-overlay" />
      {/* Sellos decorativos sobre el mapa */}
      <div className="ph-card__map-stamp" aria-hidden="true">
        <CompassRose size={56} opacity={0.45} />
      </div>
      <div className="ph-card__map-corner" aria-hidden="true">
        <img src="/media/leaf-mango.png" alt="" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════ */

export default function PrediosHub() {
  const navigate = useNavigate()
  const location = useLocation()

  const [detected] = useState(() => {
    if (typeof window === 'undefined') return null
    const path = window.location.pathname
    const ref  = document.referrer || ''
    return activeFinca.predios.find((p) => path.includes(p.slug) || ref.includes(p.slug)) ?? null
  })

  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [toast,           setToast]           = useState('')
  const toastTimer = useRef(null)

  const totalPredios  = allFincas.reduce((sum, f) => sum + f.predios.length, 0)
  const isFincaDetail = location.pathname.includes(activeFinca.slug)

  const gridRef = useRef(null)
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.ph-card')
    if (!('IntersectionObserver' in window)) {
      cards.forEach((c) => c.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('is-visible'), i * 120)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [isFincaDetail])

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 3500)
  }

  const handleDetect = () => {
    const path  = window.location.pathname
    const ref   = document.referrer || ''
    const match = activeFinca.predios.find((p) => path.includes(p.slug) || ref.includes(p.slug))
    if (match) {
      navigate(`/${match.slug}`)
    } else {
      showToast('No se detecto un predio en la URL actual. Selecciona una finca o predio registrado.')
    }
  }

  const asideStats = isFincaDetail
    ? activeFinca.stats
    : [
        { v: clientes.length,  l: 'Clientes' },
        { v: allFincas.length, l: 'Fincas'   },
        { v: totalPredios,     l: 'Predios'  },
      ]

  return (
    <div className="ph">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <header className="ph-hero">
        <video className="ph-hero__video" autoPlay muted loop playsInline>
          <source src="/media/.ph-hero-video.mp4" type="video/mp4" />
        </video>

        <div className="ph-hero__canopy" aria-hidden="true">
          <div className="ph-hero__canopy-leaf ph-hero__canopy-leaf--left">
            <img src="/media/leaf-corner.png" alt="" />
          </div>
          <div className="ph-hero__canopy-leaf ph-hero__canopy-leaf--right">
            <img src="/media/leaf-corner.png" alt="" />
          </div>
        </div>

        <div className="ph-hero__botanical" aria-hidden="true">
          <BotanicalLeaf size={180} opacity={0.18} />
        </div>

        <div className="ph-hero__fruits" aria-hidden="true">
          <span className="ph-hero__fruit ph-hero__fruit--1" />
          <span className="ph-hero__fruit ph-hero__fruit--2" />
          <span className="ph-hero__fruit ph-hero__fruit--3" />
        </div>

        <FloatingMotes count={14} />
        <Fireflies count={10} />

        <div className="ph-hero__grain" aria-hidden="true" />
        <div className="ph-hero__vignette" aria-hidden="true" />
        <div className="ph-hero__overlay" />

        <div className="ph-hero__inner">

          <div className="ph-hero__content">
            <div className="ph-hero__eyebrow">
              <div className="ph-hero__eyebrow-line" />
              <span className="ph-hero__eyebrow-text">INTAGROS · Inventario Digital</span>
            </div>

            <p className="ph-hero__route">
              {isFincaDetail ? 'Clientes / Fincas / Predios / Mapa / Arboles' : 'Clientes / Fincas'}
            </p>

            <h1 className="ph-hero__title">
              {isFincaDetail ? (
                <>{activeFinca.name}<br /><em>Predios</em></>
              ) : (
                <>Inventario<br /><em>por Fincas</em></>
              )}
            </h1>

            <p className="ph-hero__desc">
              {isFincaDetail
                ? 'Predios de esta finca conectados a sus mapas e inventario individual de arboles.'
                : 'Estructura multicliente para organizar fincas sin mezclar la informacion interna de cada proyecto.'}
            </p>

            <div className="ph-hero__cta-row">
              <Link to={fincaDetailPath} className="ph-hero__cta">
                <span>Explorar predios</span>
                <span className="ph-hero__cta-arrow">→</span>
              </Link>
              <span className="ph-hero__cta-meta">3 predios · 171+ árboles</span>
            </div>
          </div>

          <div
            className="ph-hero__aside-wrap"
            style={{ '--ph-accent': isFincaDetail ? activeFinca.accent : activeClient.accent }}
          >
            <div className="ph-hero__pillar ph-hero__pillar--left" aria-hidden="true">
              <span className="ph-hero__pillar-fire" />
            </div>

            <aside className="ph-hero__aside ph-hero__aside--totem">
              <div className="ph-hero__aside-aura" aria-hidden="true" />
              <div className="ph-hero__aside-glow" aria-hidden="true" />

              {/* Geometría sagrada flotante */}
              <svg className="ph-hero__aside-geo ph-hero__aside-geo--star" viewBox="0 0 60 60" aria-hidden="true">
                <polygon points="30,4 46,52 14,52" fill="none" stroke="#f4d35e" strokeWidth="0.8" opacity="0.2" />
                <polygon points="30,52 46,4 14,4" fill="none" stroke="#f4d35e" strokeWidth="0.8" opacity="0.2" />
                <circle cx="30" cy="28" r="10" fill="none" stroke="#f4d35e" strokeWidth="0.4" opacity="0.12" />
              </svg>
              <svg className="ph-hero__aside-geo ph-hero__aside-geo--seed" viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="20" cy="20" r="5" fill="none" stroke="#f4d35e" strokeWidth="0.5" opacity="0.15" />
                <circle cx="23.5" cy="22" r="5" fill="none" stroke="#f4d35e" strokeWidth="0.5" opacity="0.12" />
                <circle cx="23.5" cy="26" r="5" fill="none" stroke="#f4d35e" strokeWidth="0.5" opacity="0.12" />
                <circle cx="20" cy="28" r="5" fill="none" stroke="#f4d35e" strokeWidth="0.5" opacity="0.12" />
                <circle cx="16.5" cy="26" r="5" fill="none" stroke="#f4d35e" strokeWidth="0.5" opacity="0.12" />
                <circle cx="16.5" cy="22" r="5" fill="none" stroke="#f4d35e" strokeWidth="0.5" opacity="0.12" />
              </svg>
              <svg className="ph-hero__aside-geo ph-hero__aside-geo--ring" viewBox="0 0 60 60" aria-hidden="true">
                <circle cx="30" cy="30" r="22" fill="none" stroke="#f4d35e" strokeWidth="0.6" opacity="0.12" />
                <circle cx="30" cy="30" r="16" fill="none" stroke="#f4d35e" strokeWidth="0.4" opacity="0.08" />
                <circle cx="30" cy="30" r="10" fill="none" stroke="#f4d35e" strokeWidth="0.3" opacity="0.06" />
              </svg>

              {/* Partículas doradas */}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="ph-hero__aside-particle" style={{
                  '--x': `${10 + Math.random() * 80}%`,
                  '--y': `${5 + Math.random() * 90}%`,
                  '--s': `${0.3 + Math.random() * 0.7}`,
                  '--d': `${2 + Math.random() * 6}s`,
                  '--delay': `${Math.random() * 4}s`
                }} aria-hidden="true" />
              ))}

              {/* Decoraciones de fondo del aside */}
              <img
                className="ph-hero__aside-bg ph-hero__aside-bg--tree"
                src="/media/arbol-normal.png"
                alt=""
                aria-hidden="true"
              />
              <img
                className="ph-hero__aside-bg ph-hero__aside-bg--mandala"
                src="/media/simbol2.png"
                alt=""
                aria-hidden="true"
              />
              <img
                className="ph-hero__aside-bg ph-hero__aside-bg--tribal"
                src="/media/totem3.png"
                alt=""
                aria-hidden="true"
              />
              {/* Mariposa botánica */}
              <div className="ph-hero__aside-butterfly">
                <BotanicalButterfly size={48} opacity={0.55} />
              </div>

              <div className="ph-hero__aside-icon">
                <div className="ph-hero__aside-icon-carving" aria-hidden="true" />
                <TotemIcon />
                <div className="ph-hero__aside-icon-seal">
                  <div className="ph-hero__aside-icon-seal-ring" aria-hidden="true" />
                  <ClientLogoSmall />
                </div>
              </div>

              <div className="ph-hero__aside-body">
                <span className="ph-hero__aside-label">{activeClient.label}</span>
                <span className="ph-hero__aside-name">{activeClient.name}</span>
                <p className="ph-hero__aside-desc">
                  {isFincaDetail
                    ? 'Selecciona un predio para abrir su mapa e inventario.'
                    : 'Cada finca se abre como modulo independiente para ver sus predios.'}
                </p>

                <div className="ph-hero__aside-stats">
                  {asideStats.map((s) => (
                    <div className="ph-hero__aside-stat" key={s.l}>
                      <strong>{s.v}</strong>
                      <span>{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="ph-hero__pillar ph-hero__pillar--right" aria-hidden="true">
              <span className="ph-hero__pillar-fire" />
            </div>
          </div>

        </div>

        <div className="ph-hero__scroll-hint" aria-hidden="true">
          <span>Descubrir</span>
          <span className="ph-hero__scroll-line" />
        </div>
      </header>

      {detected && !bannerDismissed && (
        <div className="ph-banner">
          <div className="ph-banner__dot" />
          <p className="ph-banner__text">
            Se detecto que venias hacia <strong>Predio {detected.name}</strong> dentro de {activeFinca.name}.
          </p>
          <button type="button" onClick={() => navigate(`/${detected.slug}`)} className="ph-banner__action">
            Ir al mapa
          </button>
          <button type="button" onClick={() => setBannerDismissed(true)} aria-label="Cerrar" className="ph-banner__close">
            ×
          </button>
        </div>
      )}

      <div className="ph-detect">
        <div className="ph-detect__info">
          <strong>Continuidad de rutas anteriores</strong>
          Los accesos directos a predios siguen funcionando. Ruta actual:{' '}
          <code className="ph-detect__code">{typeof window !== 'undefined' ? window.location.pathname : ''}</code>
        </div>
        <button type="button" onClick={handleDetect} className="ph-detect__btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="7" cy="7" r="2"   fill="currentColor" />
            <path d="M7 1.5v2M7 10.5v2M1.5 7h2M10.5 7h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Detectar predio
        </button>
      </div>

      {/* ── LISTA DE FINCAS · Herbario ──────────────────────────────────── */}
      {!isFincaDetail && (
        <>
          <section className="ph-section ph-section--garden">
            {/* Árbol grande decorativo */}
            <img
              className="ph-section__tree-bg"
              src="/media/arbol-normal.png"
              alt=""
              aria-hidden="true"
            />
            {/* Hojas botánicas SVG */}
            <div className="ph-section__leaf ph-section__leaf--tl">
              <BotanicalLeaf size={140} opacity={0.32} tint="#5a7d3a" />
            </div>
            <div className="ph-section__leaf ph-section__leaf--br">
              <BotanicalLeaf size={120} opacity={0.26} tint="#4a6e32" />
            </div>
            {/* Mariposas decorativas */}
            <div className="ph-section__butterfly ph-section__butterfly--1">
              <BotanicalButterfly size={50} opacity={0.7} />
            </div>
            <div className="ph-section__butterfly ph-section__butterfly--2">
              <BotanicalButterfly size={40} opacity={0.6} />
            </div>
            {/* Compass rose decorativa */}
            <div className="ph-section__compass">
              <CompassRose size={110} opacity={0.5} />
            </div>

            <div className="ph-section__inner">
              <span className="ph-section__eyebrow">Folio · 001</span>
              <h2 className="ph-section__title">Clientes activos</h2>
              <div className="ph-section__rule" aria-hidden="true">
                <span /><em>❦</em><span />
              </div>
              <p className="ph-section__desc">
                Una colección de fincas bajo cuidado digital. Cada entrada es un módulo independiente con sus propios predios, mapas e inventarios.
              </p>
            </div>
          </section>

          <div className="ph-fincas">
            {allFincas.map((item, idx) => (
              <article
                key={item.slug}
                className="ph-fincas__item"
                style={{ '--ph-accent': item.accent }}
              >
                {/* Decoraciones */}
                <div className="ph-fincas__item-corner" aria-hidden="true">
                  <BotanicalLeaf size={110} opacity={0.22} tint="#3d5a25" />
                </div>
                <div className="ph-fincas__item-tag">
                  <HerbariumTag label={`N° ${String(idx + 1).padStart(3, '0')}`} rotate={-4} />
                </div>

                {/* Folio vertical izquierdo */}
                <div className="ph-fincas__item-folio">
                  <span className="ph-fincas__item-folio-num">{String(idx + 1).padStart(3, '0')}</span>
                  <span className="ph-fincas__item-folio-label">Folio</span>
                </div>

                {/* Contenido principal */}
                <div className="ph-fincas__item-main">
                  <div className="ph-fincas__item-head">
                    <div className="ph-fincas__item-icon">
                      <FincaIcon />
                    </div>
                    <div className="ph-fincas__item-titles">
                      <span className="ph-fincas__item-client">{item.cliente.name}</span>
                      <h3 className="ph-fincas__item-name">{item.name}</h3>
                    </div>
                  </div>

                  <blockquote className="ph-fincas__item-desc">
                    {item.desc}
                  </blockquote>

                  <div className="ph-fincas__item-meta">
                    <span className="ph-fincas__item-meta-item">
                      <strong>{item.predios.length}</strong> predios
                    </span>
                    <span className="ph-fincas__item-meta-dot" aria-hidden="true" />
                    <span className="ph-fincas__item-meta-item">
                      <strong>{item.stats[1]?.v ?? '—'}</strong> árboles
                    </span>
                    <span className="ph-fincas__item-meta-dot" aria-hidden="true" />
                    <span className="ph-fincas__item-meta-item">
                      <strong>{item.stats[2]?.v ?? '—'}</strong> variedades
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => (window.location.href = fincaDetailPath)}
                    className="ph-fincas__item-cta"
                  >
                    <span>Ver predios</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {/* ── GRID DE PREDIOS ────────────────────────────────────────────── */}
      {isFincaDetail && (
        <>
          <section className="ph-section ph-section--predios">
            <img
              className="ph-section__tree-bg"
              src="/media/arbol-normal.png"
              alt=""
              aria-hidden="true"
            />
            <div className="ph-section__leaf ph-section__leaf--tl">
              <BotanicalLeaf size={120} opacity={0.28} tint="#5a7d3a" />
            </div>
            <div className="ph-section__butterfly ph-section__butterfly--1">
              <BotanicalButterfly size={42} opacity={0.6} />
            </div>

            <div className="ph-section__inner">
              <span className="ph-section__eyebrow">Folio · {activeFinca.slug.slice(-3).toUpperCase()}</span>
              <h2 className="ph-section__title">{activeFinca.name}</h2>
              <div className="ph-section__rule" aria-hidden="true">
                <span /><em>❦</em><span />
              </div>
              <p className="ph-section__desc">
                Cada predio abre su mapa y desde alli se consulta el inventario de arboles.
              </p>
            </div>
          </section>

          <div className="ph-grid" ref={gridRef}>
            {activeFinca.predios.map((p) => (
              <Link
                key={p.slug}
                to={`/${p.slug}`}
                className="ph-card"
                style={{ '--ph-accent': p.accent }}
                aria-label={`Ir al mapa del predio ${p.name}`}
              >
                <MapPreview src={p.mapImg} alt={`Mapa del predio ${p.name}`} />

                <div className="ph-card__body">
                  <div className="ph-card__head">
                    <div className="ph-card__icon">
                      <TreeIcon p={p} />
                    </div>
                    <div className="ph-card__head-text">
                      <div className="ph-card__subtitle">{p.subtitle}</div>
                      <div className="ph-card__name">{p.name}</div>
                    </div>
                  </div>

                  <p className="ph-card__desc">{p.desc}</p>

                  <div className="ph-card__stats">
                    {p.stats.map((s) => (
                      <div key={s.l}>
                        <strong className="ph-card__stat-value">{s.v}</strong>
                        <span className="ph-card__stat-label">{s.l}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ph-card__tags">
                    {p.tags.map((t) => (
                      <span key={t} className="ph-card__tag">{t}</span>
                    ))}
                  </div>

                  <div className="ph-card__cta">
                    <div className="ph-card__cta-line" />
                    <span className="ph-card__cta-text">Mapa y arboles</span>
                    <span className="ph-card__cta-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* ── FOOTER · Sección final decorativa ─────────────────────────── */}
      <footer className="ph-footer">
        <img
          className="ph-footer__tree"
          src="/media/arbol-normal.png"
          alt=""
          aria-hidden="true"
        />
        <div className="ph-footer__butterflies" aria-hidden="true">
          <div className="ph-footer__butterfly ph-footer__butterfly--1">
            <BotanicalButterfly size={44} opacity={0.65} />
          </div>
          <div className="ph-footer__butterfly ph-footer__butterfly--2">
            <BotanicalButterfly size={36} opacity={0.55} />
          </div>
          <div className="ph-footer__butterfly ph-footer__butterfly--3">
            <BotanicalButterfly size={50} opacity={0.5} />
          </div>
        </div>
        <div className="ph-footer__compass" aria-hidden="true">
          <CompassRose size={140} opacity={0.35} />
        </div>
        <div className="ph-footer__content">
          <span className="ph-footer__rule" />
          <p className="ph-footer__text">
            <em>Ex herbario · MMXXIV</em>
          </p>
          <p className="ph-footer__subtext">
            Inventario digital de fincas tropicales · INTAGROS
          </p>
          <span className="ph-footer__rule" />
        </div>
      </footer>

      {toast && <div className="ph-toast">{toast}</div>}

    </div>
  )
}
