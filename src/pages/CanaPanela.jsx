import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { contact } from '../data/siteContent'
import './CanaPanela.css'

const stats = [
  ['1.200+', 'Hectáreas asesoradas'],
  ['8+', 'Variedades Cenicaña'],
  ['18%', 'Mayor rendimiento panela'],
  ['25+', 'Años en caña panelera'],
]

const fieldSteps = [
  ['Preparación del suelo', 'Análisis físico-químico, labranza, subsolado y surcado según variedad, pendiente y textura del lote.', 'Análisis · pH · CIC', 'https://www.intagros.com.co/wp-content/uploads/2026/02/22.jpeg'],
  ['Siembra', 'Semilla vegetativa certificada, tratamiento térmico, densidad óptima y trazabilidad del material sembrado.', 'CC 8592 · V 71-51', 'https://www.intagros.com.co/wp-content/uploads/2026/02/50.jpeg'],
  ['Fertilización y nutrición', 'Plan N-P-K fraccionado por fenología, análisis foliar, cal dolomítica y materia orgánica por lote.', 'Edáfica · Foliar', 'https://www.intagros.com.co/wp-content/uploads/2026/03/manejo-integrado-fertilizacion.jpg'],
  ['Manejo fitosanitario MIP', 'Control de Diatraea, monitoreo de carbón y raquitismo, trampas, biocontrol y umbrales de acción.', 'MIP · Biocontrol', 'https://www.intagros.com.co/wp-content/uploads/2026/03/IPM-infographic-ES_all-1-1.jpg'],
  ['Maduración y punto de corte', 'Lectura de Brix con refractómetro y programación de cosecha por lote en rango óptimo.', 'Brix 18-22°', 'https://www.intagros.com.co/wp-content/uploads/2026/03/development-of-sugar-cane-plant-es.jpg.webp'],
]

const harvestSteps = [
  ['Corte y cepa', 'Corte a ras del suelo, protección de cepa y manejo de socas para rebrote vigoroso.', 'Soca · Rebrote', 'https://www.intagros.com.co/wp-content/uploads/2026/02/28.jpeg'],
  ['Alce y transporte', 'Transporte al trapiche, registro de peso por lote y control del tiempo poscorte.', 'Trazabilidad', 'https://www.intagros.com.co/wp-content/uploads/2026/02/29.jpeg'],
  ['Molienda en trapiche', 'Extracción de guarapo, eficiencia de molienda y uso del bagazo seco como combustible.', 'Guarapo · Bagazo', 'https://www.intagros.com.co/wp-content/uploads/2026/03/molienda.jpg'],
  ['Clarificación, cocción y empaque', 'Cachaza con mucílagos naturales, batería de pailas, punteo, moldeo, lote y empaque.', 'BPM · INVIMA', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-5.jpg'],
]

const varieties = [
  ['CC 8592', 'La más cultivada en Colombia. Alta adaptabilidad, buen rendimiento panelero y socas consistentes.', '20-22°', '90%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/1686068029131.jpg'],
  ['CC 93-7510', 'Resistente a enfermedades foliares, muy buenas socas y alta sacarosa para zona media y alta.', '19-21°', '82%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/evaluacio-n-variedades-can-a_1.jpg'],
  ['CC 01-1940', 'Alta pureza de jugo, bajo contenido de fibra e ideal para trapiche artesanal.', '19-22°', '88%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/cc-01-1940.webp'],
  ['V 71-51', 'Variedad tradicional panelera con alta concentración de sacarosa y tolerancia a sequía.', '21-23°', '95%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-8.jpg'],
  ['CC 11-600', 'Nueva generación Cenicaña, resistente a raquitismo y con adaptación amplia.', '19-21°', '78%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-9.jpg'],
]

const services = [
  ['Establecimiento y renovación del cañaveral', 'Selección de variedad, diseño del lote, diagnóstico de socas envejecidas y renovación por baja productividad.', ['Cenicaña', 'Suelos', 'Renovación']],
  ['Nutrición y fertilización por lote', 'Planes edáficos y foliares con dosis por etapa fenológica, enmiendas y materia orgánica.', ['N-P-K', 'Enmiendas', 'Foliar']],
  ['Manejo fitosanitario integrado', 'Control de barrenador, diagnóstico de raquitismo, carbón de la caña, trampas y umbrales de acción.', ['MIP', 'Diatraea', 'Biocontrol']],
  ['Asistencia técnica en cosecha y quema', 'Índice de madurez por lote, programación de quema, cortafuegos, corte y manejo de soca.', ['Brix', 'Quema', 'Soca']],
  ['Optimización del trapiche y calidad de panela', 'Eficiencia de molienda, mejora de pailas, clarificación natural, color y textura final.', ['Trapiche', 'Panela', 'Calidad']],
  ['BPM, INVIMA y trazabilidad', 'Buenas prácticas, registro, etiquetado, código de lote y trazabilidad para mercados exigentes.', ['BPM', 'INVIMA', 'QR']],
]

const gallery = [
  ['Campo · establecimiento', 'https://www.intagros.com.co/wp-content/uploads/2026/03/Captura-de-pantalla-2026-03-22-205638.png'],
  ['Tallo · variedad', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.19.40-AM.jpeg'],
  ['Trapiche · molienda', 'https://www.intagros.com.co/wp-content/uploads/2026/03/molienda.jpg'],
  ['Cocción · pailas', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-6.jpg'],
  ['Panela · empaque final', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-7.jpg'],
  ['Cosecha · operación', 'https://www.intagros.com.co/wp-content/uploads/2026/02/38.jpeg'],
]

const twinSignals = [
  ['Brix estimado', '21.4°', 'Punto óptimo en 9 días'],
  ['Humedad suelo', '68%', 'Riego sugerido en bloque 03'],
  ['Soca activa', '92%', 'Rebrote uniforme'],
  ['Molienda', '86%', 'Eficiencia de extracción'],
]

const twinFlow = ['Suelo', 'Variedad', 'Nutrición', 'Brix', 'Corte', 'Trapiche', 'Panela QR']

function CaneDigitalTwin() {
  return (
    <section className="ica-twin">
      <div className="ica-twin__bg">DIGITAL TWIN</div>
      <div className="ica-twin__grid">
        <div className="ica-twin__copy ica-reveal">
          <span className="ica-section-label">Gemelo digital del cañaveral</span>
          <h2>Una vista viva del lote, la cosecha y el trapiche antes de mover una máquina.</h2>
          <p>
            La asesoría de caña puede convertirse en un sistema de decisión: cada lote con variedad, edad,
            Brix, humedad, fertilización, riesgo fitosanitario y destino de molienda.
          </p>
          <div className="ica-twin__flow">
            {twinFlow.map((item, index) => (
              <span key={item}>{String(index + 1).padStart(2, '0')} · {item}</span>
            ))}
          </div>
        </div>

        <div className="ica-twin__stage ica-reveal" aria-hidden="true">
          <div className="ica-twin__viewport">
            <div className="ica-twin__scan" />
            <div className="ica-twin__terrain">
              {Array.from({ length: 42 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="ica-twin__orbit">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="ica-twin__console">
            <span>INTAGROS CANE OS</span>
            <strong>Lote 07 · CC 8592 · 12.4 meses</strong>
          </div>
        </div>
      </div>

      <div className="ica-twin__signals">
        {twinSignals.map(([label, value, detail]) => (
          <article className="ica-reveal" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function VideoCard({ main, title, subtitle, src, tone = 'gold' }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = () => {
    videoRef.current?.play()
  }

  return (
    <article className={`ica-video-card ${main ? 'ica-video-card--main' : ''} ${isPlaying ? 'is-playing' : ''}`}>
      <video
        controls
        playsInline
        preload="metadata"
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button className={`ica-video-overlay ica-video-overlay--${tone}`} type="button" onClick={play} aria-label={`Reproducir ${title}`}>
        <span className="ica-video-badge">Video · INTAGROS en campo</span>
        <span className="ica-play">
          <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="7,4 20,12 7,20" /></svg>
        </span>
        <span className="ica-video-caption">
          <strong>{title}</strong>
          <small>{subtitle}</small>
        </span>
      </button>
    </article>
  )
}

export default function CanaPanela() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ica-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll('.ica-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="ica">
      <section className="ica-hero">
        <div className="ica-hero-left">
          <div className="ica-cane-art" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, index) => <span key={index} />)}
          </div>

          <nav className="ica-bc" aria-label="Migas de pan">
            <Link to="/">Inicio</Link><span>/</span>
            <Link to="/servicios/">Servicios</Link><span>/</span>
            <strong>Caña y panela</strong>
          </nav>

          <div className="ica-title-block">
            <span className="ica-eyebrow">Del surco al trapiche</span>
            <h1>
              <span>CAÑA</span>
              <em>de</em>
              <strong>AZÚCAR</strong>
              <small>& producción de panela</small>
            </h1>
          </div>

          <div className="ica-hero-bottom">
            <p>Acompañamiento técnico desde la preparación del suelo hasta el empaque de panela: variedades Cenicaña, MIP, Brix, trazabilidad de lotes y protocolos de trapiche.</p>
            <a className="ica-pill" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar asesoría</a>
          </div>
        </div>

        <div className="ica-hero-right">
          <img src="https://www.intagros.com.co/wp-content/uploads/2020/06/capacitacion-2-scaled.jpg" alt="Caña de azúcar en campo asesorada por INTAGROS" />
          <div className="ica-hero-label">
            <span>Variedad CC 8592 · zona panelera</span>
            <strong>Saccharum officinarum</strong>
          </div>
        </div>
      </section>

      <section className="ica-nums" aria-label="Indicadores de caña y panela">
        {stats.map(([value, label]) => (
          <article className="ica-num-item ica-reveal" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <CaneDigitalTwin />

      <section className="ica-manifest">
        <div className="ica-manifest-bg">25</div>
        <div className="ica-manifest-inner ica-reveal">
          <span className="ica-section-label">Nuestra filosofía</span>
          <p className="ica-quote">No asesoramos “el cultivo”: asesoramos <strong>cada lote, cada variedad y cada molienda</strong>, con datos, ciclo y próxima cosecha calculada.</p>
          <div className="ica-manifest-cols">
            <p>Cada lote tiene ficha técnica: variedad Cenicaña, fecha de siembra, historial de fertilizaciones, índice Brix y corte estimado.</p>
            <p>Con variedad certificada, nutrición balanceada y proceso limpio en trapiche, la panela puede ganar rendimiento sin aumentar área sembrada.</p>
          </div>
        </div>
      </section>

      <section className="ica-process">
        <header className="ica-section-head ica-reveal">
          <h2>El proceso completo</h2>
          <p>10 etapas, del suelo al empaque de panela.</p>
        </header>

        <div className="ica-phase">Fase 01 · Campo</div>
        <div className="ica-step-list">
          {fieldSteps.map(([name, description, phase, image], index) => (
            <article className="ica-step ica-reveal" key={name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <small>{phase}</small>
              <img src={image} alt="" />
            </article>
          ))}
        </div>

        <div className="ica-gallery">
          {gallery.slice(0, 3).map(([label, image]) => (
            <article className="ica-gallery-item" key={label}>
              <img src={image} alt="" />
              <span>{label}</span>
            </article>
          ))}
        </div>

        <div className="ica-phase ica-phase--fire">Fase 02 · Cosecha</div>
        <section className="ica-fire">
          <img src="https://www.intagros.com.co/wp-content/uploads/2026/02/37.jpeg" alt="Quema controlada pre-cosecha en caña de azúcar" />
          <div className="ica-flames" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="ica-fire-content">
            <strong>06</strong>
            <div>
              <span>Práctica tradicional con protocolo</span>
              <h2>Quema pre-cosecha</h2>
              <p>Facilita el corte manual, exige cortafuegos limpios, aviso previo y corte dentro de las 24 a 48 horas siguientes para proteger la calidad del jugo.</p>
            </div>
          </div>
        </section>

        <div className="ica-step-list">
          {harvestSteps.map(([name, description, phase, image], index) => (
            <article className="ica-step ica-reveal" key={name}>
              <span>{String(index + 7).padStart(2, '0')}</span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <small>{phase}</small>
              <img src={image} alt="" />
            </article>
          ))}
        </div>
      </section>

      <section className="ica-vars">
        <header className="ica-section-head ica-reveal">
          <h2>Variedades Cenicaña</h2>
          <p>Protocolos diferenciados por zona agroecológica, ciclo, calidad de jugo y destino panelero.</p>
        </header>
        <div className="ica-var-list">
          {varieties.map(([name, description, brix, width, image], index) => (
            <article className="ica-var ica-reveal" key={name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <div className="ica-brix">
                <small>Brix óptimo</small>
                <strong>{brix}</strong>
                <i style={{ '--brix': width }} />
              </div>
              <img src={image} alt="" />
            </article>
          ))}
        </div>
      </section>

      <section className="ica-services">
        <header className="ica-section-head ica-reveal">
          <h2>Lo que hacemos</h2>
          <p>Servicios especializados para cañaveral, cosecha, trapiche, calidad y trazabilidad.</p>
        </header>
        <div className="ica-service-list">
          {services.map(([title, description, tags], index) => (
            <article className="ica-service ica-reveal" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <div>
                <p>{description}</p>
                <div>{tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ica-videos">
        <header className="ica-section-head ica-reveal">
          <span className="ica-section-label">INTAGROS en campo</span>
          <h2>El campo en acción</h2>
          <p>Registros audiovisuales del trabajo técnico y la gestión agronómica aplicada.</p>
        </header>
        <div className="ica-videos-grid">
          <VideoCard
            main
            title="Caña de azúcar · proceso de campo"
            subtitle="Zona panelera Colombia"
            src="https://www.intagros.com.co/wp-content/uploads/2026/02/VIDEO-00.mp4"
          />
          <VideoCard
            title="INTAGROS · gestión agronómica"
            subtitle="Manejo técnico integral"
            src="https://www.intagros.com.co/wp-content/uploads/2025/04/Video-1-Intagros-1920-x-1080-px-1.mp4"
            tone="green"
          />
          <aside className="ica-video-panel ica-reveal">
            <span>Herramienta INTAGROS · En desarrollo</span>
            <h3>Control digital lote por lote</h3>
            <p>Ficha digital por lote, índice Brix, alertas de cosecha y trazabilidad desde siembra hasta empaque QR.</p>
            <div>
              <strong>Variedades</strong><small>CC 8592 · CC 93-7510 · V 71-51</small>
              <strong>Certificaciones</strong><small>BPM · INVIMA · Exportación</small>
              <strong>Trazabilidad</strong><small>Siembra → empaque QR</small>
            </div>
          </aside>
        </div>
      </section>

      <section className="ica-final" id="ica-contacto">
        <div className="ica-final-bg">PANELA</div>
        <div className="ica-final-inner ica-reveal">
          <span className="ica-section-label">Del surco hasta el block</span>
          <h2>Su cañaveral produce más dulce con técnica.</h2>
          <div>
            <a className="ica-btn-main" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar visita técnica</a>
            <Link className="ica-btn-sec" to="/servicios/">Ver servicios</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
