import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { contact } from '../data/siteContent'
import './Floricultura.css'

const stats = [
  ['800+', 'Hectáreas asesoradas'],
  ['30+', 'Especies trabajadas'],
  ['22%', 'Más tallo exportable'],
  ['20+', 'Años en floricultura'],
]

const process = [
  ['Diseño del invernadero', 'Orientación para luz, polisombra calibrada, ventilación cenital y riego por goteo o nebulización.', 'Infraestructura · clima · luz', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Propagación y siembra', 'Esquejes certificados, desinfección, densidad por especie y variedades homologadas para exportación.', 'Esquejes · densidad · variedad', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Fertirrigación y nutrición', 'Solución nutritiva por etapa, CE y pH del sustrato, análisis foliar y fertirriego automatizado.', 'CE · pH · nutrición', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
  ['Manejo fitosanitario MIP', 'Control de Botrytis, ácaros, trips y Spodoptera con biocontrol y rotación de ingredientes activos.', 'MIP · biocontrol', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Regulación lumínica', 'Iluminación HPS o LED, oscurecimiento para crisantemo y control de brotación.', 'Fotoperíodo · LED', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Punto de corte', 'Apertura por especie y corte en horas frescas para destino internacional.', 'Punto exportación', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
  ['Clasificación y bunching', 'Clasificación por largo, grosor, apertura y bunches de 20 o 25 tallos.', 'Largo · grosor · bunches', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Hidratación postcosecha', 'Solución hidratante, bactericida, agua limpia a 2-4°C y prevención de Botrytis.', '2-4°C · 4h mínimo', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Cuarto frío', 'Temperatura 2-4°C, humedad 95%, separación por especie y trazabilidad por lote.', 'HR 95% · trazabilidad', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
  ['Empaque y despacho', 'Cajas HB/QB, etiqueta por variedad, finca, fecha, certificación y destino.', 'GlobalG.A.P. · Florverde', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
]

const species = [
  ['Rosa', 'Reina de la exportación. Variedades Freedom, Explorer, Vendela y Topaz.', 'Rosa hybrida', '14-17°C', '85%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Clavel', 'Estándar y mini, larga vida en florero y alta densidad de siembra.', 'Dianthus caryophyllus', '12-16°C', '78%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Crisantemo', 'Planta de día corto, control de fotoperíodo y excelente vida postcosecha.', 'Chrysanthemum x morifolium', '16-18°C', '90%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
  ['Alstroemeria', 'Larga vida en florero, alta producción por metro cuadrado y exportación creciente.', 'Alstroemeria aurantiaca', '12-15°C', '72%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Gypsophila', 'Relleno premium de arreglos florales, alta demanda global y ciclo corto.', 'Gypsophila paniculata', '13-16°C', '68%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Lisianthus', 'Flor premium de alto valor, ciclo largo y mercado europeo y japonés.', 'Eustoma grandiflorum', '15-18°C', '95%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
]

const services = [
  ['Diseño y optimización de invernaderos', 'Orientación, ventilación, polisombra, riego y mejoras para máxima eficiencia lumínica.', ['Ventilación', 'Polisombra', 'Clima']],
  ['Fertirrigación por especie', 'Programas por especie, variedad y etapa fenológica con monitoreo semanal de CE y pH.', ['CE / pH', 'Foliar', 'Macro-micro']],
  ['Manejo fitosanitario integrado', 'Monitoreo de plagas, enfermedades, biocontrol y rotación para prevenir resistencias.', ['Botrytis', 'Ácaros', 'Biocontrol']],
  ['Fotoperíodo y producción programada', 'Programación para fechas clave de exportación, iluminación y oscurecimiento.', ['LED', 'Programación', 'Oscurecimiento']],
  ['Cosecha y clasificación', 'Punto de corte, flujo de clasificación y reducción de rechazo en destino.', ['Punto de corte', 'Exportable', 'Clasificación']],
  ['Postcosecha y cadena de frío', 'Hidratación, preservantes, cuarto frío y mejora de vida útil.', ['Hidratación', '2-4°C', 'Vida florero']],
  ['GlobalG.A.P. y Florverde', 'Documentación, trazabilidad, uso responsable de agroquímicos y manejo de residuos.', ['GlobalG.A.P.', 'Florverde', 'Auditoría']],
]

const features = [
  ['Ficha digital por bloque', 'Especie, variedad, fecha de siembra, densidad, nutrición, MIP y semana estimada de cosecha.'],
  ['Registro de producción', 'Tallos cosechados, clasificación, rechazo por categoría y porcentaje exportable real.'],
  ['Alertas de fechas clave', 'Programación para San Valentín, Madres y picos de alto volumen.'],
  ['Trazabilidad para certificaciones', 'Aplicaciones con producto, dosis, ICA, periodo de carencia y documentación de auditoría.'],
  ['Informe técnico mensual', 'Tendencias de producción, comparativo entre bloques y recomendaciones agronómicas.'],
]

export default function Floricultura() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ifl-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll('.ifl-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="ifl">
      <section className="ifl-hero">
        <div className="ifl-hero-left">
          <div className="ifl-botanical" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => <span key={index} />)}
          </div>
          <nav className="ifl-bc" aria-label="Migas de pan">
            <Link to="/">Inicio</Link><span>/</span>
            <Link to="/unidades/asesorias-agroindustriales/">Asesorías</Link><span>/</span>
            <strong>Floricultura</strong>
          </nav>
          <div className="ifl-title">
            <span>Del esqueje a la exportación</span>
            <h1><em>Flori-</em><strong>cultura</strong><small>Colombiana · Invernadero · Exportación</small></h1>
          </div>
          <div className="ifl-hero-bottom">
            <p>Acompañamiento integral para flores de corte: invernadero, fertirrigación, MIP, postcosecha y cadena de frío.</p>
            <a className="ifl-pill" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar asesoría</a>
          </div>
        </div>
        <div className="ifl-hero-right">
          <img src="https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg" alt="Floricultura colombiana INTAGROS" />
          <div className="ifl-hero-label">
            <span>Rosa de exportación · Sabana de Bogotá</span>
            <strong>Rosa hybrida — Flor de corte colombiana</strong>
          </div>
        </div>
      </section>

      <section className="ifl-nums">
        {stats.map(([value, label]) => (
          <article className="ifl-num ifl-reveal" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="ifl-manifest">
        <div className="ifl-manifest-bg">Flores</div>
        <div className="ifl-manifest-inner ifl-reveal">
          <span className="ifl-section-label">Nuestra filosofía</span>
          <p className="ifl-quote">Una flor perfecta para exportación no se logra en el empaque: se decide <strong>en el invernadero, en el suelo y en el esqueje</strong>.</p>
          <div className="ifl-manifest-cols">
            <p>La sabana de Bogotá y Antioquia tienen condiciones únicas; INTAGROS las convierte en protocolo: fertirrigación, monitoreo fitosanitario y nutrición por variedad.</p>
            <p>El tallo exportable es resultado de un sistema completo: material vegetal, luz, sanidad, punto de corte, hidratación, frío y despacho.</p>
          </div>
        </div>
      </section>

      <section className="ifl-process">
        <header className="ifl-section-head ifl-reveal">
          <h2>Del esqueje al pétalo</h2>
          <p>10 etapas desde el invernadero hasta la caja de exportación.</p>
        </header>
        <div className="ifl-step-list">
          {process.map(([title, text, tag, image], index) => (
            <article className="ifl-step ifl-reveal" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <small>{tag}</small>
              <img src={image} alt="" />
            </article>
          ))}
        </div>
      </section>

      <section className="ifl-species">
        <div className="ifl-species-art" aria-hidden="true" />
        <header className="ifl-section-head ifl-section-head--dark ifl-reveal">
          <h2>Especies de exportación</h2>
          <p>Protocolos diferenciados por flor, temperatura, mercado y punto de corte.</p>
        </header>
        <div className="ifl-species-list">
          {species.map(([title, text, scientific, temp, width, image], index) => (
            <article className="ifl-spec ifl-reveal" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <em>{scientific}</em>
              <div className="ifl-temp"><small>Temp. óptima</small><strong>{temp}</strong><i style={{ '--temp': width }} /></div>
              <img src={image} alt="" />
            </article>
          ))}
        </div>
      </section>

      <section className="ifl-services">
        <header className="ifl-section-head ifl-reveal">
          <h2>Lo que hacemos</h2>
          <p>Siete servicios para producir más tallo exportable y reducir rechazo en destino.</p>
        </header>
        <div className="ifl-service-list">
          {services.map(([title, text, tags], index) => (
            <article className="ifl-service ifl-reveal" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <div><p>{text}</p><div>{tags.map((tag) => <small key={tag}>{tag}</small>)}</div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="ifl-system">
        <div className="ifl-system-inner">
          <div className="ifl-system-copy ifl-reveal">
            <span className="ifl-section-label">Herramienta INTAGROS · En desarrollo</span>
            <h2>Control digital bloque por bloque</h2>
            <p>Plataforma de gestión para fincas florícolas: ficha digital por bloque, especie, variedad, siembra, nutrición, registro fitosanitario y semana de cosecha.</p>
            <div className="ifl-feature-list">
              {features.map(([title, text]) => (
                <article className="ifl-feature ifl-reveal" key={title}><span /><div><h3>{title}</h3><p>{text}</p></div></article>
              ))}
            </div>
            <div className="ifl-coming"><span />Próximamente — registro anticipado abierto</div>
          </div>
          <div className="ifl-phone ifl-reveal">
            <div className="ifl-phone-screen">
              <div className="ifl-phone-notch" />
              <div className="ifl-phone-content">
                <div className="ifl-phone-bar"><span>Finca La Primavera</span><strong>Control Floral</strong></div>
                <div className="ifl-lote-card">
                  <div className="ifl-lote-top"><span>Bloque 04 · Nave B · 2.800 m2</span><small><i /> En producción</small></div>
                  <h3>Rosas Freedom Red</h3>
                  <p>Rosa hybrida cv. Freedom · Sembrado 04 Ene 2026</p>
                  <div className="ifl-progress">{Array.from({ length: 14 }).map((_, index) => <span className={index < 11 ? 'done' : index === 11 ? 'active' : ''} key={index} />)}</div>
                  <div className="ifl-lote-stats"><span><b>Punto</b>1.5</span><span><b>Área</b>2.800 m2</span><span><b>Tallos</b>42.000</span></div>
                </div>
                <div className="ifl-alert"><strong>Punto de corte óptimo</strong><span>Cosecha programada: 25-28 Mar 2026</span></div>
                <div className="ifl-rend"><span>Tallos totales est.<b>42.000</b></span><span>% exportable est.<b>88%</b></span><span>Cajas HB<b>210</b></span></div>
                <div className="ifl-phone-actions"><button>Informe</button><button>Trazab.</button><button>Editar</button></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ifl-cta">
        {Array.from({ length: 8 }).map((_, index) => <span className="ifl-petal" key={index} />)}
        <div className="ifl-cta-bg">Flores</div>
        <div className="ifl-cta-inner ifl-reveal">
          <span className="ifl-section-label">Del esqueje hasta la caja</span>
          <h2>Su invernadero florece más con técnica.</h2>
          <div>
            <a className="ifl-btn-main" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar visita técnica</a>
            <Link className="ifl-btn-sec" to="/unidades/asesorias-agroindustriales/">Volver a asesorías</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
