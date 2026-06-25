import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './PrediosHub.css'

const clientes = [
  {
    slug: 'garces-eder',
    name: 'Garces Eder',
    label: 'Cliente activo',
    desc: 'Cliente con finca registrada y predios productivos conectados a mapas e inventario individual de arboles.',
    accent: '#c9dc85',
    fincas: [
      {
        slug: 'finca-garces-eder',
        name: 'Finca Garces Eder',
        subtitle: 'Finca registrada',
        desc: 'Finca organizada por predios, mapas y arboles individuales. Esta estructura permite sumar mas fincas del mismo u otros clientes.',
        accent: '#c9dc85',
        stats: [
          { v: '3', l: 'Predios' },
          { v: '171+', l: 'Arboles' },
          { v: '12+', l: 'Variedades' },
        ],
        predios: [
          {
            slug: 'predio-el-zapote',
            name: 'El Zapote',
            subtitle: 'Oficina',
            desc: 'Inventario digital de 117 arboles frutales con modelo 3D, mapa GIS, ajuste de precision y consulta botanica.',
            stats: [
              { v: '117', l: 'Arboles' },
              { v: '12', l: 'Variedades' },
              { v: '6', l: 'Grupos' },
            ],
            accent: '#c9dc85',
            mapImg: '/media/predio-el-zapote-mapa.jpg',
            tags: ['Mapa GIS', 'Modelo 3D', 'Arboles', 'Wikipedia'],
            iconColor: '#23451f',
            iconBorder: '#c9dc85',
            iconFruit: '#d7a23b',
          },
          {
            slug: 'predio-guadalito',
            name: 'Guadalito',
            subtitle: 'Frutas tropicales',
            desc: 'Mapa interactivo con seleccion individual, consulta Wikipedia, modelo 3D y herramientas de calibracion.',
            stats: [
              { v: '64', l: 'Arboles' },
              { v: '—', l: 'Variedades' },
              { v: '—', l: 'Grupos' },
            ],
            accent: '#85c9b4',
            mapImg: '/media/predio-guadalito-mapa.jpg',
            tags: ['Mapa', 'Seleccion', '3D', 'Precision'],
            iconColor: '#1f3b22',
            iconBorder: '#85c9b4',
            iconFruit: '#253719',
          },
          {
            slug: 'predio-guaguya',
            name: 'Guaguya',
            subtitle: 'Citricos y tropicales',
            desc: 'Croquis digital con 54 arboles numerados, filtros por especie y grupo productivo, navegacion directa en plano.',
            stats: [
              { v: '54', l: 'Arboles' },
              { v: '—', l: 'Variedades' },
              { v: '—', l: 'Grupos' },
            ],
            accent: '#e4a830',
            mapImg: '/media/predio-guaguya-mapa.png',
            tags: ['Croquis', 'Filtros', 'Especies', 'Plano'],
            iconColor: '#2e5523',
            iconBorder: '#e4a830',
            iconFruit: '#e48b24',
          },
        ],
      },
    ],
  },
]

const activeClient = clientes[0]
const activeFinca = activeClient.fincas[0]
const allFincas = clientes.flatMap((cliente) => cliente.fincas.map((item) => ({ ...item, cliente })))
const fincaDetailPath = `/predioshub/${activeFinca.slug}/`

// ── Logo PNG en lugar del SVG original ──────────────────────────────────────
function FincaIcon() {
  return (
    <img
      src="/media/Garces_Eder_logo.png"
      alt="Logo Garces Eder"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  )
}

function TreeIcon({ p }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="19" r="13" fill={p.iconColor} stroke={p.iconBorder} strokeWidth="2" />
      <path d="M24 32 L24 44" stroke="#6c4225" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="24" cy="19" r="5" fill={p.iconFruit} opacity="0.9" />
      <circle cx="15" cy="15" r="3" fill={p.iconFruit} opacity="0.65" />
      <circle cx="32" cy="17" r="2.5" fill={p.iconFruit} opacity="0.65" />
    </svg>
  )
}

function MapPreview({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="ph-card__map">
      {!error ? (
        <img
          className="ph-card__map-img"
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{ opacity: loaded ? 1 : 0 }}
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
    </div>
  )
}

export default function PrediosHub() {
  const navigate = useNavigate()
  const location = useLocation()
  const [detected, setDetected] = useState(null)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)
  const totalPredios = allFincas.reduce((sum, item) => sum + item.predios.length, 0)
  const isFincaDetail = location.pathname.includes(activeFinca.slug)

  useEffect(() => {
    const path = window.location.pathname
    const ref = document.referrer || ''
    const match = activeFinca.predios.find((p) => path.includes(p.slug) || ref.includes(p.slug))
    setDetected(match ?? null)
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 3500)
  }

  const handleDetect = () => {
    const path = window.location.pathname
    const ref = document.referrer || ''
    const match = activeFinca.predios.find((p) => path.includes(p.slug) || ref.includes(p.slug))
    if (match) {
      navigate(`/${match.slug}`)
    } else {
      showToast('No se detecto un predio en la URL actual. Selecciona una finca o predio registrado.')
    }
  }

  return (
    <div className="ph">

      {/* ── HERO CON VIDEO DE FONDO ─────────────────────────────────────────── */}
      <header className="ph-hero" style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Video de fondo ajustado al tamaño exacto del hero */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/media/.ph-hero-video.mp4" type="video/mp4" />
        </video>

        {/* Capa de oscurecimiento opcional para que el texto sea legible */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)',
            zIndex: 1,
          }}
        />

        {/* Contenido del hero por encima del video */}
        <div className="ph-hero__copy" style={{ position: 'relative', zIndex: 2 }}>
          <div className="ph-header__eyebrow">
            <div className="ph-header__eyebrow-line" />
            <span className="ph-header__eyebrow-text">INTAGROS · Inventario Digital</span>
          </div>
          <p className="ph-hero__route">
            {isFincaDetail ? 'Clientes / Fincas / Predios / Mapa / Arboles' : 'Clientes / Fincas'}
          </p>
          <h1 className="ph-header__title">
            {isFincaDetail ? (
              <>
                {activeFinca.name}<br /><em>Predios</em>
              </>
            ) : (
              <>
                Inventario<br /><em>por Fincas</em>
              </>
            )}
          </h1>
          <p className="ph-hero__desc">
            {isFincaDetail
              ? 'Predios de esta finca conectados a sus mapas e inventario individual de arboles.'
              : 'Estructura multicliente para organizar fincas sin mezclar la informacion interna de cada proyecto.'}
          </p>
        </div>

        <aside
          className="ph-finca-card"
          style={{
            '--ph-accent': isFincaDetail ? activeFinca.accent : activeClient.accent,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div className="ph-finca-card__icon">
            <FincaIcon />
          </div>
          <div>
            <span className="ph-finca-card__label">{isFincaDetail ? activeFinca.subtitle : 'Vista general'}</span>
            <strong>{isFincaDetail ? activeFinca.name : 'Fincas por cliente'}</strong>
            <p>
              {isFincaDetail
                ? 'Selecciona un predio para abrir su mapa e inventario.'
                : 'Cada finca se abre como modulo independiente para ver sus predios.'}
            </p>
          </div>
          <div className="ph-finca-card__stats">
            {(isFincaDetail ? activeFinca.stats : [
              { v: clientes.length, l: 'Clientes' },
              { v: allFincas.length, l: 'Fincas' },
              { v: totalPredios, l: 'Predios' },
            ]).map((s) => (
              <div key={s.l}>
                <strong>{s.v}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </aside>

      </header>
      {/* ── FIN HERO ────────────────────────────────────────────────────────── */}

      <section className={`ph-flow ${isFincaDetail ? '' : 'ph-flow--compact'}`} aria-label="Mapa de navegacion">
        {(isFincaDetail ? ['Clientes', 'Fincas', 'Predios', 'Mapa', 'Arboles'] : ['Clientes', 'Fincas']).map((item, index) => (
          <div className="ph-flow__step" key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </section>

      {detected && !bannerDismissed && (
        <div className="ph-banner">
          <div className="ph-banner__dot" />
          <p className="ph-banner__text">
            Se detecto que venias hacia <strong>Predio {detected.name}</strong> dentro de {activeFinca.name}.
          </p>
          <button type="button" onClick={() => navigate(`/${detected.slug}`)} className="ph-banner__go">
            Ir al mapa
          </button>
          <button type="button" onClick={() => setBannerDismissed(true)} aria-label="Cerrar" className="ph-banner__close">x</button>
        </div>
      )}

      <div className="ph-detect">
        <div className="ph-detect__info">
          <strong>Continuidad de rutas anteriores</strong>
          Los accesos directos a predios siguen funcionando. Ruta actual: <code className="ph-detect__code">{window.location.pathname}</code>
        </div>
        <button type="button" onClick={handleDetect} className="ph-detect__btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="7" cy="7" r="2" fill="currentColor" />
            <path d="M7 1.5v2M7 10.5v2M1.5 7h2M10.5 7h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Detectar predio
        </button>
      </div>

      {!isFincaDetail && (
        <>
          <section className="ph-section-head">
            <span>Fincas registradas</span>
            <h2>Clientes activos</h2>
            <p>Selecciona una finca para entrar a sus predios, mapas e inventario de arboles.</p>
          </section>

          <div className="ph-fincas-grid">
            {allFincas.map((item) => (
              <Link to={fincaDetailPath} className="ph-finca-row" style={{ '--ph-accent': item.accent }} key={item.slug}>
                <div className="ph-finca-row__icon">
                  <FincaIcon />
                </div>
                <div className="ph-finca-row__body">
                  <span>{item.cliente.name}</span>
                  <strong>{item.name}</strong>
                  <p>Ver predios, mapas e inventario de esta finca.</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {isFincaDetail && (
        <>
          <section className="ph-section-head ph-section-head--predios">
            <span>Predios de la finca</span>
            <h2>{activeFinca.name}</h2>
            <p>Cada predio abre su mapa y desde alli se consulta el inventario de arboles.</p>
          </section>

          <div className="ph-grid">
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
                    <div className="ph-card__icon"><TreeIcon p={p} /></div>
                    <div className="ph-card__head-text">
                      <div className="ph-card__subtitle">{p.subtitle}</div>
                      <div className="ph-card__name">{p.name}</div>
                    </div>
                  </div>
                  <p className="ph-card__desc">{p.desc}</p>
                  <div className="ph-card__stats">
                    {p.stats.map((s) => (
                      <div key={s.l}>
                        <strong className="ph-card__stat-v">{s.v}</strong>
                        <span className="ph-card__stat-l">{s.l}</span>
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
                    <span>Mapa y arboles</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {toast && (
        <div className="ph-toast">
          {toast}
        </div>
      )}
    </div>
  )
}