import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { contact } from '../data/siteContent'
import './FrutalesTropicales.css'

const stats = [
  ['800+', 'Hect├íreas asesoradas'],
  ['12+', 'Especies tropicales'],
  ['30%', 'Reducci├│n p├®rdidas postcosecha'],
  ['25+', 'A├▒os de experiencia en campo'],
]

const species = [
  ['Zapote', 'Especie nativa, alta demanda local, gesti├│n ├írbol a ├írbol y c├│digo individual.', 'Quararibea cordata', 'https://www.intagros.com.co/wp-content/uploads/2026/03/Imagen1-2.jpg'],
  ['Aguacate Hass', 'Exportaci├│n, GlobalG.A.P., cadena de fr├¡o y alto volumen comercial.', 'Persea americana var. Hass', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-1.jpg'],
  ['Mango', 'Tommy Atkins, Keitt, cosecha escalonada y postcosecha para fresco.', 'Mangifera indica', 'https://www.intagros.com.co/wp-content/uploads/2026/03/Airbrush-IMAGE-ENHANCER-1773406399916-1773406399916.jpg'],
  ['C├¡tricos', 'Valencia, mandarina, lim├│n Tahit├¡, an├ílisis foliar y MIP certificado.', 'Citrus spp.', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.28.56-AM.jpg'],
  ['Guan├íbana', 'Mercados naturistas, control de antracnosis y alto valor agregado.', 'Annona muricata', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-2.jpg'],
  ['Maracuy├í', 'Ciclo corto, alta rentabilidad, espaldera y mercado de exportaci├│n.', 'Passiflora edulis', 'https://www.intagros.com.co/wp-content/uploads/2026/03/images-3.jpg'],
]

const services = [
  ['Establecimiento y dise├▒o agron├│mico', 'Selecci├│n de variedades por zona agroecol├│gica, an├ílisis de suelo, trazado de la finca y plan de siembra.', ['Variedades', 'Suelos', 'Siembra']],
  ['Manejo fitosanitario integrado', 'Monitoreo peri├│dico, umbrales de acci├│n y calendario fitosanitario con residualidad m├¡nima.', ['MIP', 'Diagn├│stico', 'Calendario']],
  ['Nutrici├│n y fertilizaci├│n por ├írbol', 'Planes foliares y ed├íficos por especie, estado fenol├│gico y resultados de laboratorio.', ['Foliar', 'Ed├ífica', 'Dosis']],
  ['Poda y labores culturales', 'Poda de formaci├│n, producci├│n y saneamiento para mejorar calibre, uniformidad y sanidad.', ['Poda', 'Aclareo', 'Saneamiento']],
  ['Postcosecha y comercializaci├│n', 'Protocolos de cosecha, temperatura, empaque, transporte y conexi├│n con compradores.', ['Cadena de fr├¡o', 'Empaque', 'Mercado']],
  ['Certificaciones BPA y GlobalG.A.P.', 'Implementaci├│n documental, trazabilidad y preparaci├│n para mercados de exportaci├│n.', ['BPA', 'GlobalG.A.P.', 'Trazabilidad']],
]

const features = [
  ['Ficha individual por ├írbol', 'Nombre cient├¡fico, c├│digo, coordenadas GPS, foto, estado actual e historial completo.'],
  ['QR y c├│digo de barras', 'Placa f├¡sica por ├írbol para cargar ficha completa, historial y pr├│ximos controles.'],
  ['Mapa georreferenciado', 'Vista de finca con filtros por especie, estado sanitario y labores pendientes.'],
  ['Informe de visita agron├│mica', 'Reporte t├®cnico imprimible con observaciones, dosis aplicadas y recomendaciones.'],
  ['Calendario de controles', 'Alertas de control fitosanitario, fertilizaci├│n, poda y cosecha programada.'],
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
            <span>Gesti├│n integral de c├¡tricos, frutales y ornamentales</span>
            <h1>
              <em>Frutales</em>
              <strong>Tropi-</strong>
              <i>cales</i>
            </h1>
          </div>

          <div className="ift-hero-bottom">
            <p>Asesor├¡a t├®cnica ├írbol por ├írbol, desde zapote hasta aguacate Hass de exportaci├│n. Georreferenciaci├│n, bit├ícora digital y certificaci├│n GlobalG.A.P.</p>
            <a className="ift-pill" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar asesor├¡a</a>
          </div>
        </div>
        <div className="ift-hero-right">
          <img src="https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-12.26.03-PM.jpeg" alt="Frutales tropicales asesorados por INTAGROS" />
          <div className="ift-hero-label">
            <span>Finca El Zapote ┬À Vereda La Escalera</span>
            <strong>Quararibea cordata ÔÇö Zapote</strong>
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
          <span className="ift-section-label">Nuestra filosof├¡a</span>
          <p className="ift-quote">No asesoramos fincas: asesoramos <strong>cada ├írbol individual</strong>, con su nombre cient├¡fico, c├│digo, historia y pr├│ximo control en calendario.</p>
          <div className="ift-manifest-cols">
            <p>INTAGROS gestiona cada planta como una unidad productiva ├║nica: georreferenciaci├│n, ficha t├®cnica individual, bit├ícora de mantenimiento y alertas de controles.</p>
            <p>El resultado es trazabilidad completa desde la ra├¡z hasta el mercado, clave para certificaci├│n GlobalG.A.P. y compradores internacionales.</p>
          </div>
        </div>
      </section>

      <section className="ift-archive">
        <header className="ift-section-head ift-reveal">
          <h2>Archivo de especies</h2>
          <p>Protocolos t├®cnicos diferenciados para especies tropicales de alto valor.</p>
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
            <span className="ift-section-label">Herramienta INTAGROS ┬À En desarrollo</span>
            <h2>Sistema de gesti├│n ├írbol por ├írbol</h2>
            <p>Plataforma para fincas de c├¡tricos, frutales y ornamentales. Cada ├írbol tiene ficha digital, QR, historial de mantenimientos y actualizaci├│n desde celular en campo.</p>
            <p>Funciona como archivo bot├ínico productivo: mapa georreferenciado, visita agron├│mica por ├írbol, informes imprimibles y calendario de pr├│ximos controles.</p>
            <div className="ift-feature-list">
              {features.map(([title, text]) => (
                <article className="ift-feature ift-reveal" key={title}>
                  <span />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
            <div className="ift-coming"><span />Pr├│ximamente disponible ÔÇö registro anticipado abierto</div>
          </div>

          <div className="ift-phone ift-reveal" aria-label="Mockup de ficha digital de ├írbol">
            <div className="ift-phone-screen">
              <div className="ift-phone-notch" />
              <div className="ift-phone-content">
                <div className="ift-phone-bar">
                  <span>Finca El Zapote</span>
                  <strong>Gesti├│n Frutales</strong>
                </div>
                <div className="ift-ficha-top">
                  <img src="https://www.intagros.com.co/wp-content/uploads/2026/03/apple.jpg" alt="" />
                  <div>
                    <span>C├│d. 001 ┬À Vda. La Escalera</span>
                    <strong>Zapote</strong>
                    <em>Quararibea cordata</em>
                    <small><i /> Estado bueno</small>
                  </div>
                </div>
                <h4>Dosis foliar ÔÇö 16 Mar 2026</h4>
                <div className="ift-dose-grid">
                  {['Pegal PH ┬À 1,5 cm3/L', 'Wuxal T. Rojo ┬À 2,5 cm3/L', 'Numetrin ┬À 2 cm3/L', 'Carbendazim ┬À 2 cm3/L'].map((dose) => <span key={dose}>{dose}</span>)}
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
                  <span>Fertilizaci├│n</span>
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
          <span className="ift-section-label">Finca El Zapote ÔÇö y la suya</span>
          <h2>Su finca tiene m├ís potencial del que imagina.</h2>
          <div>
            <a className="ift-btn-main" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar visita diagn├│stica</a>
            <Link className="ift-btn-sec" to="/servicios/">Ver servicios</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
