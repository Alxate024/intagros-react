import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { contact, getPageBySlug, units } from '../data/siteContent'
import { MethodCard } from './InstitutionalPage'
import './ServicePage.css'

export default function ServicePage({ slug }) {
  const page = useMemo(() => getPageBySlug(slug), [slug])

  if (!page) {
    return (
      <section className="not-found">
        <h1>Página no encontrada</h1>
      </section>
    )
  }

  const isUnit = units.some((unit) => unit.slug === page.slug)
  const backTo = isUnit ? '/unidades/' : '/unidades/asesorias-agroindustriales/'
  const backLabel = isUnit ? 'Ver unidades' : 'Ver asesorías'

  return (
    <div className="service-page">

      {/* HERO */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${page.heroImage})`,
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-badge">
            {page.eyebrow}
          </div>

          <h1>{page.title}</h1>

          <p>
            {page.intro}
          </p>

          <div className="hero-actions">

            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Solicitar asesoría
            </a>

            <Link to={backTo} className="btn-secondary">
              {backLabel}
            </Link>

          </div>

        </div>

        <div className="hero-glow"></div>

      </section>

      {/* ABOUT */}
      <section className="about-section">

        <div className="about-grid">

          <div className="about-left">

            <span className="section-mini-title">
              {page.category}
            </span>

            <h2>
              De la lectura del terreno a decisiones ejecutables
            </h2>

            <p>
              {page.detail}
            </p>

            <div className="stats-grid">

              {page.metrics.map((metric, index) => (
                <div className="stat-card" key={index}>

                  <div className="stat-number">
                    0{index + 1}
                  </div>

                  <h3>{metric}</h3>

                </div>
              ))}

            </div>

          </div>

          <div className="about-right">

            <div className="image-wrapper">
              <img
                src={page.image}
                alt={page.title}
              />

              <div className="image-floating-card">
                <span>INTAGROS</span>
                <strong>Innovación Agroindustrial</strong>
              </div>

            </div>

            <MethodCard />

          </div>

        </div>

      </section>

      {/* SERVICES */}
      <section className="services-section">

        <div className="section-header">

          <span className="section-label">
            SOLUCIONES
          </span>

          <h2>
            Servicios especializados
          </h2>

        </div>

        <div className="services-grid">

          {page.services.map((service, index) => (
            <div className="service-card" key={index}>

              <div className="service-card-top">

                <div className="service-number">
                  0{index + 1}
                </div>

              </div>

              <h3>{service}</h3>

              <p>
                Implementamos soluciones estratégicas
                enfocadas en productividad, análisis,
                automatización y crecimiento sostenible.
              </p>

              <div className="service-line"></div>

            </div>
          ))}

        </div>

      </section>

      {/* PROCESS */}
      <section className="process-section">

        <div className="section-header">

          <span className="section-label">
            METODOLOGÍA
          </span>

          <h2>
            Nuestro proceso de trabajo
          </h2>

        </div>

        <div className="timeline">

          {page.process.map((step, index) => (
            <div className="timeline-item" key={index}>

              <div className="timeline-left">

                <div className="timeline-circle">
                  0{index + 1}
                </div>

              </div>

              <div className="timeline-right">

                <span>
                  ETAPA ESTRATÉGICA
                </span>

                <h3>{step}</h3>

                <p>
                  Cada fase está diseñada para generar
                  resultados medibles y optimizar la operación agrícola.
                </p>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="cta-section">

        <div className="cta-box">

          <span>
            INTAGROS
          </span>

          <h2>
            Impulsamos el futuro del agro colombiano
          </h2>

          <p>
            Tecnología, innovación y experiencia técnica
            aplicadas al crecimiento sostenible.
          </p>

            <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Hablar con un asesor
          </a>

        </div>

      </section>

    </div>
  )
}
