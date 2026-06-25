import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contact, crops, heroSlides, partnerLogos, units } from '../data/siteContent'
import { useCarousel } from '../hooks'
import { INTEREST_OPTIONS } from '../constants'

const intelligenceSignals = [
  { value: '96h', label: 'Ventana de decisión', detail: 'Alertas tempranas para riego, cosecha y logística.' },
  { value: '4x', label: 'Lectura integral', detail: 'Suelo, agua, maquinaria y equipo en una sola vista.' },
  { value: '0.8%', label: 'Control fino', detail: 'Seguimiento de variaciones críticas por lote.' },
]

const commandLayers = [
  ['Productividad', 'Rendimiento, calidad y trazabilidad por bloque.'],
  ['Operación', 'Labores, maquinaria, combustible y rutas críticas.'],
  ['Sostenibilidad', 'Agua, suelo, restauración y cumplimiento ambiental.'],
  ['Tecnología', 'Datos, tableros e IA aplicada a decisiones de campo.'],
]

const heroSignals = ['Caña', 'Brix', 'Riego', 'Cosecha', 'IA']

const caneJourney = [
  ['01', 'Surco', 'Lectura de suelo, variedad, edad del cultivo y restricciones del lote.'],
  ['02', 'Decisión', 'Prioridades técnicas: riego, nutrición, sanidad, cosecha y maquinaria.'],
  ['03', 'Ejecución', 'Acompañamiento en campo con responsables, fechas e indicadores visibles.'],
  ['04', 'Resultado', 'Productividad, calidad de panela, costos y trazabilidad para mejorar el ciclo.'],
]

function Home() {
  const { current: currentSlide } = useCarousel(heroSlides.length, 5200)
  const [interest, setInterest] = useState('Asesorías agroindustriales')

  return (
    <div className="home">
      <section className="home-hero" id="inicio">
        <div className="home-hero__slides" aria-hidden="true">
          <img
            className="is-active"
            src={heroSlides[currentSlide]}
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="home-hero__shade" />
        <div className="home-hero__grid shell">
          <div className="home-hero__content">
            <span className="eyebrow eyebrow--light">Caña, datos y operación agroindustrial</span>
            <h1>INTAGROS convierte el campo en un sistema de decisiones.</h1>
            <p>
              Del surco al trapiche: diagnóstico técnico, agricultura de precisión, seguimiento
              operativo e IA para producir con más claridad, trazabilidad y rentabilidad.
            </p>
            <div className="home-hero__actions">
              <a className="btn btn--primary" href="#contacto">
                Solicitar diagnóstico
              </a>
              <Link
                className="btn btn--glass"
                to="/unidades/asesorias-agroindustriales/cana-de-azucar/"
              >
                Ver caña y panela
              </Link>
            </div>
            <div className="home-hero__chips" aria-label="Señales clave">
              {heroSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </div>
          <div className="home-hero__experience" aria-hidden="true">
            <div className="home-saturn">
              <span className="home-saturn__ring home-saturn__ring--one" />
              <span className="home-saturn__ring home-saturn__ring--two" />
              <span className="home-saturn__ring home-saturn__ring--three" />
              <div className="home-saturn__core">
                <span>INTAGROS CANE OS</span>
                <strong>21.4° Brix</strong>
                <p>Lote 07 listo para ventana de cosecha inteligente</p>
                <div>
                  <i style={{ '--value': '82%' }} />
                  <i style={{ '--value': '64%' }} />
                  <i style={{ '--value': '91%' }} />
                </div>
              </div>
              <div className="home-saturn__nodes">
                {heroSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="home-hero__stats shell" aria-label="Indicadores INTAGROS">
          <div>
            <strong>300+</strong>
            <span>Proyectos</span>
          </div>
          <div>
            <strong>18</strong>
            <span>Departamentos</span>
          </div>
          <div>
            <strong>25+</strong>
            <span>Años de experiencia</span>
          </div>
        </div>
      </section>

      <section className="cane-lanes" aria-label="Ruta creativa INTAGROS">
        <div className="shell cane-lanes__grid">
          <div className="cane-lanes__copy">
            <span className="eyebrow">Ruta del valor</span>
            <h2>Del surco al dato, del dato a una acción rentable.</h2>
          </div>
          <div className="cane-lanes__track">
            {caneJourney.map(([number, title, text]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="terrain-strip" aria-label="Capacidades principales">
        <div className="shell terrain-strip__grid">
          <div>
            <span>01</span>
            <strong>Riego y nutrición</strong>
          </div>
          <div>
            <span>02</span>
            <strong>Cosecha y transporte</strong>
          </div>
          <div>
            <span>03</span>
            <strong>Ambiente y datos</strong>
          </div>
          <div>
            <span>04</span>
            <strong>Infraestructura agrícola</strong>
          </div>
        </div>
      </section>

      <section className="intelligence-hub" aria-label="Centro de inteligencia agroindustrial">
        <div className="shell intelligence-hub__grid">
          <div className="intelligence-hub__copy">
            <span className="eyebrow">Inteligencia aplicada</span>
            <h2>Una operación agrícola se mejora cuando cada señal termina en una decisión.</h2>
            <p>
              Creamos una capa de lectura para convertir diagnóstico, seguimiento y ejecución en una
              agenda clara: qué priorizar, cuánto impacta y quién lo mueve en campo.
            </p>
            <div className="signal-row">
              {intelligenceSignals.map((signal) => (
                <article key={signal.label}>
                  <strong>{signal.value}</strong>
                  <span>{signal.label}</span>
                  <p>{signal.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="command-board" aria-hidden="true">
            <div className="command-board__top">
              <span>INTAGROS OS</span>
              <strong>Campo en tiempo real</strong>
            </div>
            <div className="command-board__map">
              <span className="plot plot--one" />
              <span className="plot plot--two" />
              <span className="plot plot--three" />
              <span className="scan-line" />
            </div>
            <div className="command-board__layers">
              {commandLayers.map(([title, detail]) => (
                <div key={title}>
                  <span />
                  <strong>{title}</strong>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad about" id="sobre-nosotros">
        <div className="shell about__grid">
          <div className="about__media">
            <img
              src="https://www.intagros.com.co/wp-content/uploads/2026/02/03.jpeg"
              alt="Equipo INTAGROS en campo"
            />
            <div className="about__badge">
              <strong>Campo + datos</strong>
              <span>Decisiones técnicas con seguimiento real</span>
            </div>
          </div>
          <div className="about__copy">
            <span className="eyebrow">Quiénes somos</span>
            <h2>Un equipo multidisciplinario para elevar el desempeño del agro.</h2>
            <p>
              INTAGROS es una empresa de consultoría, ingeniería y gestión de proyectos
              agropecuarios. Trabajamos con productores y grupos agroindustriales que necesitan
              mejorar productividad, eficiencia y sostenibilidad.
            </p>
            <p>
              Nuestra promesa es simple: entender la realidad de cada operación y convertirla en
              planes técnicos ejecutables, medibles y acompañados por especialistas.
            </p>
            <div className="about__pillars">
              <span>Eficiencia</span>
              <span>Flexibilidad</span>
              <span>Profesionalismo</span>
              <span>Sostenibilidad</span>
            </div>
          </div>
        </div>
      </section>

      <section className="field-lab">
        <div className="shell field-lab__grid">
          <div className="field-lab__copy">
            <span className="eyebrow eyebrow--light">Laboratorio de campo</span>
            <h2>Menos plantilla. Más criterio para cada lote, cultivo y operación.</h2>
            <p>
              Cada proyecto se lee como un sistema: suelo, agua, maquinaria, personas, costos, clima
              y mercado. De ahí salen decisiones útiles, no adornos.
            </p>
          </div>
          <div className="field-lab__stack">
            <article>
              <span>Diagnóstico</span>
              <strong>Qué está limitando el rendimiento</strong>
            </article>
            <article>
              <span>Plan técnico</span>
              <strong>Qué hacer, cuándo hacerlo y quién lo ejecuta</strong>
            </article>
            <article>
              <span>Seguimiento</span>
              <strong>Indicadores visibles para corregir a tiempo</strong>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad section-pad--soft" id="unidades">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Unidades de negocio</span>
            <h2>Gestión agroindustrial de punta a punta</h2>
            <p>
              Cuatro líneas de acción para operar mejor, medir mejor y crecer con responsabilidad.
            </p>
          </div>
          <div className="feature-grid">
            {units.map((unit) => (
              <Link className="feature-card" to={`/unidades/${unit.slug}/`} key={unit.slug}>
                <img src={unit.image} alt="" />
                <div>
                  <span>{unit.eyebrow}</span>
                  <h3>{unit.title}</h3>
                  <p>{unit.intro}</p>
                  <strong>Explorar unidad</strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad crops" id="servicios">
        <div className="shell">
          <div className="section-head section-head--left">
            <span className="eyebrow">Cultivos y especialidades</span>
            <h2>Experiencia aplicada a los principales sistemas productivos.</h2>
          </div>
          <div className="crop-row">
            {crops.map((crop) => (
              <Link
                className="crop-card"
                to={`/unidades/asesorias-agroindustriales/${crop.slug === 'florales' ? 'floricultura' : crop.slug}/`}
                key={crop.slug}
              >
                <img src={crop.image} alt="" />
                <span>{crop.category}</span>
                <h3>{crop.title}</h3>
                <strong>Ver especialidad</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="visual-ribbon">
        <div className="visual-ribbon__image">
          <img
            src="https://www.intagros.com.co/wp-content/uploads/2026/02/55.jpeg"
            alt="Cultivo agroindustrial INTAGROS"
          />
        </div>
        <div className="shell visual-ribbon__content">
          <span className="eyebrow eyebrow--light">Agro premium</span>
          <h2>Campo, datos y gestión para sostener mejores decisiones.</h2>
        </div>
      </section>

      <section className="section-pad partners" id="asociados">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Aliados de negocio</span>
            <h2>Confianza construida en campo</h2>
          </div>
          <div className="partner-strip">
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div className="partner-logo" key={`${logo.alt}-${index}`}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-pad--dark contact-section" id="contacto">
        <div className="shell contact-grid">
          <div>
            <span className="eyebrow eyebrow--light">Contáctenos</span>
            <h2>Cuente su reto agrícola. Nosotros ayudamos a ordenarlo.</h2>
            <p>
              Comparta el cultivo, extensión, ubicación y principal necesidad. El equipo comercial
              responde con una primera orientación.
            </p>
            <div className="contact-list">
              <a href={contact.phoneHref}>{contact.phoneLabel}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>{contact.city}</span>
            </div>
          </div>
          <form className="contact-form">
            <label>
              Área de interés
              <div className="interest-grid">
                {INTEREST_OPTIONS.map((item) => (
                  <button
                    className={interest === item ? 'is-selected' : ''}
                    type="button"
                    onClick={() => setInterest(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <input type="hidden" name="interes" value={interest} />
            </label>
            <div className="form-row">
              <label>
                Nombre
                <input type="text" name="nombre" placeholder="Nombre completo" />
              </label>
              <label>
                Empresa / finca
                <input type="text" name="empresa" placeholder="Hacienda o empresa" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Correo
                <input type="email" name="email" placeholder="correo@empresa.com" />
              </label>
              <label>
                Teléfono
                <input type="tel" name="telefono" placeholder="+57 300 000 0000" />
              </label>
            </div>
            <label>
              Proyecto
              <textarea
                name="mensaje"
                placeholder="Cultivo, extensión, ubicación y reto principal"
              />
            </label>
            <a
              className="btn btn--primary btn--full"
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Enviar por WhatsApp
            </a>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
