import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { contact } from '../data/siteContent'
import '../styles/tecnologia.css'

const techServices = [
  {
    title: 'Agricultura de precisi├│n',
    kicker: 'Drones, sensores y mapas NDVI',
    image: 'https://www.intagros.com.co/wp-content/uploads/2026/05/grok-video-6529f42e-e8b1-4d1a-92aa-d23642c913f8-1.gif',
    text: 'Lectura multiespectral, zonificaci├│n de lotes y recomendaciones por ambiente productivo.',
  },
  {
    title: 'Telemetr├¡a operativa',
    kicker: 'Maquinaria y log├¡stica en vivo',
    image: 'https://www.intagros.com.co/wp-content/uploads/2026/05/grok-video-99445b25-387c-4812-be5b-c5935f416476.gif',
    text: 'GPS, horas efectivas, rutas, consumo y desempe├▒o de equipos agr├¡colas en una vista accionable.',
  },
  {
    title: 'IA para ca├▒a y cultivos',
    kicker: 'Modelos predictivos',
    image: 'https://www.intagros.com.co/wp-content/uploads/2026/05/grok-video-e8178b41-da33-45fb-afdb-09cebe63e1cc.gif',
    text: 'Predicci├│n de rendimiento, alertas tempranas y an├ílisis de cosecha con datos de campo.',
  },
  {
    title: 'Tableros ejecutivos',
    kicker: 'Datos claros para decidir',
    image: 'https://www.intagros.com.co/wp-content/uploads/2026/05/grok-video-433dd528-6acc-413f-a106-a70145f37f04-1.gif',
    text: 'Indicadores de campo, costos, productividad y avance operativo conectados en paneles simples.',
  },
]

const signals = ['Humedad suelo', 'NDVI', 'Rendimiento', 'Combustible', 'Cosecha', 'Rutas', 'Clima', 'Alertas']

export default function TecnologiaInnovacion() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bpk-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
    )

    document.querySelectorAll('.bpk-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bpk">

      {/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
          HERO
      ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
      <section className="bpk-hero">
        <div className="bpk-hero-video" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://www.intagros.com.co/wp-content/uploads/2026/02/tech-agriculture.jpg"
          >
            <source
              src="https://www.intagros.com.co/wp-content/uploads/2026/05/grok-video-59bd4d6b-9d6e-4b3d-b5fb-92ad93ef0e82.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="bpk-hero-vignette" />
        <div className="bpk-hero-grid" />
        <div className="bpk-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="bpk-hero-content">
          <div className="bpk-status">
            <span className="bpk-status-led" />
            Sistema agro-inteligente activo
          </div>
          <h1 className="bpk-hero-h1">
            Tecnolog├¡a que vuelve visible lo que pasa en el campo.
          </h1>
          <p className="bpk-hero-desc">
            Integramos drones, sensores, telemetr├¡a, tableros e inteligencia artificial para convertir datos agr├¡colas
            en decisiones oportunas, medibles y rentables.
          </p>
          <div className="bpk-hero-buttons">
            <a href={contact.whatsappHref} className="bpk-btn-primary" target="_blank" rel="noreferrer">
              Solicitar diagn├│stico
            </a>
            <a href="#bpk-plataforma" className="bpk-btn-secondary">Ver plataforma</a>
          </div>
        </div>

        <div className="bpk-command bpk-reveal" id="bpk-plataforma">
          <div className="bpk-command__top">
            <span>INTAGROS Command Center</span>
            <strong>Predio La Esperanza</strong>
          </div>
          <div className="bpk-command__map">
            <span className="plot plot-a">Lote 01</span>
            <span className="plot plot-b">Lote 02</span>
            <span className="plot plot-c">Lote 03</span>
            <div className="scan-line" />
          </div>
          <div className="bpk-command__metrics">
            <div><span>NDVI</span><strong>0.82</strong></div>
            <div><span>Riego</span><strong>91%</strong></div>
            <div><span>Alerta</span><strong>2</strong></div>
          </div>
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
          MARQUEE
      ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
      <section className="bpk-marquee" aria-label="Se├▒ales monitoreadas">
        <div>
          {[...signals, ...signals].map((signal, index) => (
            <span key={`${signal}-${index}`}>{signal}</span>
          ))}
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
          SERVICIOS ÔÇö con video de fondo
      ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
      <section className="bpk-services">
        {/* Capa 0: video */}
        <div className="bpk-services-video" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://www.intagros.com.co/wp-content/uploads/2026/02/tech-agriculture.jpg"
          >
            <source
              src="https://www.intagros.com.co/wp-content/uploads/2026/05/grok-video-b4a95302-63cd-49c2-b9c8-36a01569c28d-1.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        {/* Capa 1: vignette */}
        <div className="bpk-services-vignette" />
        {/* Capa 2: grid */}
        <div className="bpk-services-grid" />

        {/* Capa 3: contenido */}
        <div className="bpk-services-inner">
          <div className="bpk-sec-head bpk-reveal">
            <span className="bpk-section-label">Unidad de tecnolog├¡a</span>
            <h2 className="bpk-sec-h2">Soluciones con imagen, dato y ejecuci├│n.</h2>
            <p>
              La tecnolog├¡a no se instala para verse moderna. Se instala para saber qu├® hacer, cu├índo hacerlo y cu├ínto
              mejora la operaci├│n.
            </p>
          </div>

          <div className="bpk-srv-grid">
            {techServices.map((service, index) => (
              <article className="bpk-srv-card bpk-reveal" key={service.title}>
                <div className="bpk-srv-bg" style={{ backgroundImage: `url(${service.image})` }} />
                <span className="bpk-srv-num">{String(index + 1).padStart(2, '0')}</span>
                <div className="bpk-srv-content">
                  <span>{service.kicker}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
          INTELIGENCIA APLICADA
      ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
      <section className="bpk-intel">
        <div className="bpk-intel__media bpk-reveal">
          <img
            src="https://www.intagros.com.co/wp-content/uploads/2026/02/tech-agriculture.jpg"
            alt="Tecnolog├¡a agr├¡cola aplicada por INTAGROS"
          />
          <div className="bpk-intel__hud">
            <span>Modelo predictivo</span>
            <strong>+18%</strong>
            <small>potencial de rendimiento identificado</small>
          </div>
        </div>
        <div className="bpk-intel__copy bpk-reveal">
          <span className="bpk-section-label">Inteligencia aplicada</span>
          <h2>Un campo conectado no es un lujo. Es ventaja operativa.</h2>
          <p>
            Cruzamos monitoreo satelital, informaci├│n de maquinaria, registros de campo y experiencia agron├│mica para
            encontrar restricciones antes de que se conviertan en p├®rdidas.
          </p>
          <div className="bpk-intel__list">
            <div><strong>01</strong><span>Diagn├│stico tecnol├│gico y mapa de datos disponibles.</span></div>
            <div><strong>02</strong><span>Dise├▒o de indicadores por cultivo, lote y operaci├│n.</span></div>
            <div><strong>03</strong><span>Implementaci├│n, capacitaci├│n y seguimiento de resultados.</span></div>
          </div>
        </div>
      </section>

      {/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
          M├ëTRICAS
      ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
      <section className="bpk-metrics">
        {[
          ['24/7', 'monitoreo operativo'],
          ['30%', 'menos reprocesos'],
          ['95%', 'trazabilidad de datos'],
          ['18%', 'mejora potencial'],
        ].map(([value, label]) => (
          <article className="bpk-metric bpk-reveal" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      {/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
          CTA FINAL
      ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
      <section className="bpk-cta">
        <div className="bpk-cta-bg">AGRO DATA</div>
        <div className="bpk-cta-inner bpk-reveal">
          <span className="bpk-section-label">Siguiente paso</span>
          <h2>Dise├▒emos el tablero de mando de su finca, cultivo u operaci├│n.</h2>
          <p>Empezamos con un diagn├│stico claro: datos disponibles, brechas, prioridades y retorno esperado.</p>
          <div className="bpk-hero-buttons">
            <a href={contact.whatsappHref} className="bpk-btn-primary" target="_blank" rel="noreferrer">
              Hablar con un asesor
            </a>
            <Link to="/unidades/" className="bpk-btn-secondary">Ver otras unidades</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
