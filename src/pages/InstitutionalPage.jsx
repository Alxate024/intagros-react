import { Link } from 'react-router-dom'
import { company, contact, crops, partnerLogos, units } from '../data/siteContent'
import './InstitutionalPage.css'

const unitHighlights = [
  'Diagnóstico técnico y financiero',
  'Plan de trabajo por cultivo o predio',
  'Acompañamiento de implementación',
  'Seguimiento con indicadores claros',
]

const advisoryPath = (slug) => `/unidades/asesorias-agroindustriales/${slug === 'florales' ? 'floricultura' : slug}/`

function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" />
      <div className="page-hero__overlay" />
      <div className="shell page-hero__content">
        <span className="eyebrow eyebrow--light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  )
}

function ContactPanel() {
  return (
    <div className="contact-panel">
      <span className="eyebrow eyebrow--light">Contacto directo</span>
      <h2>Conversemos sobre su operación agrícola.</h2>
      <p>Comparta ubicación, cultivo, extensión y necesidad principal para orientar el primer diagnóstico.</p>
      <div className="contact-panel__links">
        <a href={contact.phoneHref}>{contact.phoneLabel}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <span>{contact.city}</span>
      </div>
      <a className="btn btn--primary" href={contact.whatsappHref} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="institutional-page">
      <PageHero
        eyebrow="Nosotros"
        title="Criterio técnico para decisiones agroindustriales de alto impacto."
        text={company.promise}
        image="https://www.intagros.com.co/wp-content/uploads/2026/02/03.jpeg"
      />

      <section className="section-pad institutional-band">
        <div className="shell narrative-grid">
          <div>
            <span className="eyebrow">Quiénes somos</span>
            <h2>Un equipo que une agronomía, operación, sostenibilidad y datos.</h2>
          </div>
          <div className="narrative-copy">
            <p>{company.mission}</p>
            <p>{company.vision}</p>
            <div className="value-row">
              {company.values.map((value) => <span key={value}>{value}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad proof-section">
        <div className="shell proof-grid">
          {['300+ proyectos ejecutados', '18 departamentos', '25+ años de experiencia'].map((item) => (
            <article key={item}>
              <strong>{item.split(' ')[0]}</strong>
              <span>{item.replace(item.split(' ')[0], '').trim()}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export function UnitsPage() {
  return (
    <div className="institutional-page">
      <PageHero
        eyebrow="Unidades de negocio"
        title="Cuatro líneas de acción para ordenar, ejecutar y medir mejor."
        text="Cada unidad responde a un frente crítico de la agroindustria: campo, ambiente, tecnología e infraestructura."
        image="https://www.intagros.com.co/wp-content/uploads/2026/02/55.jpeg"
      />

      <section className="section-pad section-pad--soft">
        <div className="shell">
          <div className="unit-directory">
            {units.map((unit) => (
              <Link className="unit-directory__card" to={`/unidades/${unit.slug}/`} key={unit.slug}>
                <img src={unit.image} alt="" />
                <div>
                  <span>{unit.eyebrow}</span>
                  <h2>{unit.title}</h2>
                  <p>{unit.intro}</p>
                  <strong>Ver unidad</strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function ServicesPage() {
  const serviceGroups = [...units, ...crops]

  return (
    <div className="institutional-page">
      <PageHero
        eyebrow="Servicios asociados"
        title="Servicios complementarios para llevar la estrategia al terreno."
        text="INTAGROS estructura equipos, diagnósticos y acompañamientos a la medida de cada cultivo, finca o proyecto."
        image="https://www.intagros.com.co/wp-content/uploads/2026/02/00.jpeg"
      />

      <section className="section-pad institutional-band">
        <div className="shell service-index">
          {serviceGroups.map((group) => (
            <article key={group.slug}>
              <span>{group.category}</span>
              <h2>{group.title}</h2>
              <ul>
                {group.services.slice(0, 4).map((service) => <li key={service}>{service}</li>)}
              </ul>
              <Link to={units.includes(group) ? `/unidades/${group.slug}/` : advisoryPath(group.slug)}>Profundizar</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad allied-section" id="aliados">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Aliados estratégicos</span>
            <h2>Relaciones de confianza construidas en campo.</h2>
          </div>
          <div className="partner-strip partner-strip--static">
            {partnerLogos.map((logo) => (
              <div className="partner-logo" key={logo.alt}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function ContactPage() {
  return (
    <div className="institutional-page">
      <PageHero
        eyebrow="Contacto"
        title="Cuéntenos el reto. Lo convertimos en un primer mapa de acción."
        text="Use el canal que prefiera para iniciar una conversación técnica con el equipo INTAGROS."
        image="https://www.intagros.com.co/wp-content/uploads/2026/02/33.jpeg"
      />

      <section className="section-pad section-pad--dark">
        <div className="shell contact-page-grid">
          <ContactPanel />
          <form className="contact-form contact-form--page">
            <label>Nombre<input type="text" name="nombre" placeholder="Nombre completo" /></label>
            <label>Empresa / finca<input type="text" name="empresa" placeholder="Hacienda o empresa" /></label>
            <label>Correo<input type="email" name="email" placeholder="correo@empresa.com" /></label>
            <label>Teléfono<input type="tel" name="telefono" placeholder="+57 300 000 0000" /></label>
            <label>Mensaje<textarea name="mensaje" placeholder="Cultivo, extensión, ubicación y reto principal" /></label>
            <a className="btn btn--primary btn--full" href={contact.whatsappHref} target="_blank" rel="noreferrer">Enviar por WhatsApp</a>
          </form>
        </div>
      </section>
    </div>
  )
}

export function TermsPage() {
  return (
    <div className="institutional-page">
      <PageHero
        eyebrow="Términos y condiciones"
        title="Uso responsable de la información y los canales digitales."
        text="Esta página resume condiciones generales para el uso del sitio y el contacto comercial con INTAGROS."
        image="https://www.intagros.com.co/wp-content/uploads/2026/02/11.jpeg"
      />

      <section className="section-pad terms-section">
        <div className="shell terms-layout">
          {[
            ['Uso del sitio', 'La información publicada tiene carácter institucional y comercial. Puede cambiar según la evolución de los servicios, proyectos o canales de atención.'],
            ['Contacto y datos', 'Los datos enviados por formularios, correo o WhatsApp se usan para responder solicitudes, orientar servicios y dar seguimiento comercial.'],
            ['Contenido e imágenes', 'Las marcas, textos, imágenes y materiales asociados a INTAGROS se presentan para comunicar capacidades y no autorizan reproducción no solicitada.'],
            ['Servicios', 'Las propuestas, diagnósticos y acompañamientos se definen caso por caso según alcance, ubicación, cultivo, recursos disponibles y condiciones contractuales.'],
          ].map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export function CropsPage() {
  return (
    <div className="institutional-page">
      <PageHero
        eyebrow="Especialidades agrícolas"
        title="Cultivos con manejo técnico, trazabilidad y visión de negocio."
        text="Además de las unidades de negocio, INTAGROS acompaña sistemas productivos específicos con criterios agronómicos y operativos."
        image="https://www.intagros.com.co/wp-content/uploads/2026/02/53.jpeg"
      />

      <section className="section-pad crops">
        <div className="shell crop-row">
          {crops.map((crop) => (
            <Link className="crop-card" to={advisoryPath(crop.slug)} key={crop.slug}>
              <img src={crop.image} alt="" />
              <span>{crop.category}</span>
              <h3>{crop.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export function MethodCard() {
  return (
    <div className="method-card">
      {unitHighlights.map((item, index) => (
        <div key={item}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  )
}
