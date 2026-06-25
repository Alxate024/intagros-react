import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { contact } from '../data/siteContent'
import './FrutalesTropicales.css'

const stats = [
  ['800+', 'Hectáreas asesoradas'],
  ['12+', 'Especies tropicales'],
  ['30%', 'Reducción pérdidas postcosecha'],
  ['25+', 'Años de experiencia en campo'],
]

const species = [
  ['Zapote', 'Especie nativa, alta demanda local, gestión árbol a árbol y código individual.', 'Quararibea cordata', 'https://www.intagros.com.co/wp-content/uploads/2026/03/Imagen1-2.jpg'],
  ['Aguacate Hass', 'Exportación, GlobalG.A.P., cadena de frío y alto volumen comercial.', 'Persea americana var. Hass', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-1.jpg'],
  ['Mango', 'Tommy Atkins, Keitt, cosecha escalonada y postcosecha para fresco.', 'Mangifera indica', 'https://www.intagros.com.co/wp-content/uploads/2026/03/Airbrush-IMAGE-ENHANCER-1773406399916-1773406399916.jpg'],
  ['Cítricos', 'Valencia, mandarina, limón Tahití, análisis foliar y MIP certificado.', 'Citrus spp.', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.28.56-AM.jpg'],
  ['Guanábana', 'Mercados naturistas, control de antracnosis y alto valor agregado.', 'Annona muricata', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-2.jpg'],
  ['Maracuyá', 'Ciclo corto, alta rentabilidad, espaldera y mercado de exportación.', 'Passiflora edulis', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-3.jpg'],
]

const services = [
  ['Establecimiento y diseño agronómico', 'Selección de variedades por zona agroecológica, análisis de suelo, trazado de la finca y plan de siembra.', ['Variedades', 'Suelos', 'Siembra']],
  ['Manejo fitosanitario integrado', 'Monitoreo periódico, umbrales de acción y calendario fitosanitario con residualidad mínima.', ['MIP', 'Diagnóstico', 'Calendario']],
  ['Nutrición y fertilización por árbol', 'Planes foliares y edáficos por especie, estado fenológico y resultados de laboratorio.', ['Foliar', 'Edáfica', 'Dosis']],
  ['Poda y labores culturales', 'Poda de formación, producción y saneamiento para mejorar calibre, uniformidad y sanidad.', ['Poda', 'Aclareo', 'Saneamiento']],
  ['Postcosecha y comercialización', 'Protocolos de cosecha, temperatura, empaque, transporte y conexión con compradores.', ['Cadena de frío', 'Empaque', 'Mercado']],
  ['Certificaciones BPA y GlobalG.A.P.', 'Implementación documental, trazabilidad y preparación para mercados de exportación.', ['BPA', 'GlobalG.A.P.', 'Trazabilidad']],
]

const features = [
  ['Ficha individual por árbol', 'Nombre científico, código, coordenadas GPS, foto, estado actual e historial completo.'],
  ['QR y código de barras', 'Placa física por árbol para cargar ficha completa, historial y próximos controles.'],
  ['Mapa georreferenciado', 'Vista de finca con filtros por especie, estado sanitario y labores pendientes.'],
  ['Informe de visita agronómica', 'Reporte técnico imprimible con observaciones, dosis aplicadas y recomendaciones.'],
  ['Calendario de controles', 'Alertas de control fitosanitario, fertilización, poda y cosecha programada.'],
]

export default function FrutalesTropicales() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ift-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll('.ift-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="ift">
      <section className="ift-hero">
        <div className="ift-hero-left">
          <nav className="ift-bc" aria-label="Migas de pan">
            <Link to="/">Inicio</Link><span>/</span>
            <Link to="/servicios/">Servicios</Link><span>/</span>
            <strong>Frutales Tropicales</strong>
          </nav>

          <div className="ift-title">
            <span>Gestión integral de cítricos, frutales y ornamentales</span>
            <h1>
              <em>Frutales</em>
              <strong>Tropi-</strong>
              <i>cales</i>
            </h1>
          </div>

          <div className="ift-hero-bottom">
            <p>Asesoría técnica árbol por árbol, desde zapote hasta aguacate Hass de exportación. Georreferenciación, bitácora digital y certificación GlobalG.A.P.</p>
            <a className="ift-pill" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar asesoría</a>
          </div>
        </div>
        <div className="ift-hero-right">
          <img src="https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-12.26.03-PM.jpeg" alt="Frutales tropicales asesorados por INTAGROS" />
          <div className="ift-hero-label">
            <span>Finca El Zapote · Vereda La Escalera</span>
            <strong>Quararibea cordata — Zapote</strong>
          </div>
        </div>
      </section>

      <section className="ift-nums" aria-label="Indicadores de frutales tropicales">
        {stats.map(([value, label]) => (
          <article className="ift-num-item ift-reveal" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="ift-manifest">
        <div className="ift-manifest-year">25</div>
        <div className="ift-manifest-inner ift-reveal">
          <span className="ift-section-label">Nuestra filosofía</span>
          <p className="ift-quote">No asesoramos fincas: asesoramos <strong>cada árbol individual</strong>, con su nombre científico, código, historia y próximo control en calendario.</p>
          <div className="ift-manifest-cols">
            <p>INTAGROS gestiona cada planta como una unidad productiva única: georreferenciación, ficha técnica individual, bitácora de mantenimiento y alertas de controles.</p>
            <p>El resultado es trazabilidad completa desde la raíz hasta el mercado, clave para certificación GlobalG.A.P. y compradores internacionales.</p>
          </div>
        </div>
      </section>

      <section className="ift-archive">
        <header className="ift-section-head ift-reveal">
          <h2>Archivo de especies</h2>
          <p>Protocolos técnicos diferenciados para especies tropicales de alto valor.</p>
        </header>
        <div className="ift-species-list">
          {species.map(([name, description, scientific, image], index) => (
            <article className="ift-species ift-reveal" key={name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <em>{scientific}</em>
              <img src={image} alt="" />
            </article>
          ))}
        </div>
      </section>

      <section className="ift-services">
        <header className="ift-section-head ift-section-head--dark ift-reveal">
          <h2>Lo que hacemos</h2>
          <p>Seis servicios especializados para establecer, sostener y comercializar mejor.</p>
        </header>
        <div className="ift-service-list">
          {services.map(([title, description, tags], index) => (
            <article className="ift-service ift-reveal" key={title}>
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

      <section className="ift-system" id="ift-sistema">
        <div className="ift-system-inner">
          <div className="ift-system-copy ift-reveal">
            <span className="ift-section-label">Herramienta INTAGROS · En desarrollo</span>
            <h2>Sistema de gestión árbol por árbol</h2>
            <p>Plataforma para fincas de cítricos, frutales y ornamentales. Cada árbol tiene ficha digital, QR, historial de mantenimientos y actualización desde celular en campo.</p>
            <p>Funciona como archivo botánico productivo: mapa georreferenciado, visita agronómica por árbol, informes imprimibles y calendario de próximos controles.</p>
            <div className="ift-feature-list">
              {features.map(([title, text]) => (
                <article className="ift-feature ift-reveal" key={title}>
                  <span />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
            <div className="ift-coming"><span />Próximamente disponible — registro anticipado abierto</div>
          </div>

          <div className="ift-phone ift-reveal" aria-label="Mockup de ficha digital de árbol">
            <div className="ift-phone-screen">
              <div className="ift-phone-notch" />
              <div className="ift-phone-content">
                <div className="ift-phone-bar">
                  <span>Finca El Zapote</span>
                  <strong>Gestión Frutales</strong>
                </div>
                <div className="ift-ficha-top">
                  <img src="https://www.intagros.com.co/wp-content/uploads/2026/03/apple.jpg" alt="" />
                  <div>
                    <span>Cód. 001 · Vda. La Escalera</span>
                    <strong>Zapote</strong>
                    <em>Quararibea cordata</em>
                    <small><i /> Estado bueno</small>
                  </div>
                </div>
                <h4>Dosis foliar — 16 Mar 2026</h4>
                <div className="ift-dose-grid">
                  {['Pegal PH · 1,5 cm3/L', 'Wuxal T. Rojo · 2,5 cm3/L', 'Numetrin · 2 cm3/L', 'Carbendazim · 2 cm3/L'].map((dose) => <span key={dose}>{dose}</span>)}
                </div>
                <h4>Dosis suelo</h4>
                <div className="ift-soil-list">
                  <span><b>Triple 18</b>400 grs</span>
                  <span><b>Cloruro de potasio</b>400 grs</span>
                  <span><b>Agrimins</b>200 grs</span>
                </div>
                <div className="ift-next">
                  <strong>16 Abr 2026</strong>
                  <span>Control fitosanitario</span>
                  <strong>16 Jul 2026</strong>
                  <span>Fertilización</span>
                </div>
                <div className="ift-phone-actions">
                  <button type="button">Imprimir</button>
                  <button type="button">QR</button>
                  <button type="button">Editar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ift-cta" id="ift-contacto">
        <div className="ift-cta-bg">FRUTALES</div>
        <div className="ift-cta-inner ift-reveal">
          <span className="ift-section-label">Finca El Zapote — y la suya</span>
          <h2>Su finca tiene más potencial del que imagina.</h2>
          <div>
            <a className="ift-btn-main" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar visita diagnóstica</a>
            <Link className="ift-btn-sec" to="/servicios/">Ver servicios</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
