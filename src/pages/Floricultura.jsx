import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { contact } from '../data/siteContent'
import './Floricultura.css'

const stats = [
  ['800+', 'Hect├íreas asesoradas'],
  ['30+', 'Especies trabajadas'],
  ['22%', 'M├ís tallo exportable'],
  ['20+', 'A├▒os en floricultura'],
]

const process = [
  ['Dise├▒o del invernadero', 'Orientaci├│n para luz, polisombra calibrada, ventilaci├│n cenital y riego por goteo o nebulizaci├│n.', 'Infraestructura ┬À clima ┬À luz', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Propagaci├│n y siembra', 'Esquejes certificados, desinfecci├│n, densidad por especie y variedades homologadas para exportaci├│n.', 'Esquejes ┬À densidad ┬À variedad', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Fertirrigaci├│n y nutrici├│n', 'Soluci├│n nutritiva por etapa, CE y pH del sustrato, an├ílisis foliar y fertirriego automatizado.', 'CE ┬À pH ┬À nutrici├│n', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
  ['Manejo fitosanitario MIP', 'Control de Botrytis, ├ícaros, trips y Spodoptera con biocontrol y rotaci├│n de ingredientes activos.', 'MIP ┬À biocontrol', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Regulaci├│n lum├¡nica', 'Iluminaci├│n HPS o LED, oscurecimiento para crisantemo y control de brotaci├│n.', 'Fotoper├¡odo ┬À LED', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Punto de corte', 'Apertura por especie y corte en horas frescas para destino internacional.', 'Punto exportaci├│n', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
  ['Clasificaci├│n y bunching', 'Clasificaci├│n por largo, grosor, apertura y bunches de 20 o 25 tallos.', 'Largo ┬À grosor ┬À bunches', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Hidrataci├│n postcosecha', 'Soluci├│n hidratante, bactericida, agua limpia a 2-4┬░C y prevenci├│n de Botrytis.', '2-4┬░C ┬À 4h m├¡nimo', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Cuarto fr├¡o', 'Temperatura 2-4┬░C, humedad 95%, separaci├│n por especie y trazabilidad por lote.', 'HR 95% ┬À trazabilidad', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
  ['Empaque y despacho', 'Cajas HB/QB, etiqueta por variedad, finca, fecha, certificaci├│n y destino.', 'GlobalG.A.P. ┬À Florverde', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
]

const species = [
  ['Rosa', 'Reina de la exportaci├│n. Variedades Freedom, Explorer, Vendela y Topaz.', 'Rosa hybrida', '14-17┬░C', '85%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Clavel', 'Est├índar y mini, larga vida en florero y alta densidad de siembra.', 'Dianthus caryophyllus', '12-16┬░C', '78%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Crisantemo', 'Planta de d├¡a corto, control de fotoper├¡odo y excelente vida postcosecha.', 'Chrysanthemum x morifolium', '16-18┬░C', '90%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
  ['Alstroemeria', 'Larga vida en florero, alta producci├│n por metro cuadrado y exportaci├│n creciente.', 'Alstroemeria aurantiaca', '12-15┬░C', '72%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg'],
  ['Gypsophila', 'Relleno premium de arreglos florales, alta demanda global y ciclo corto.', 'Gypsophila paniculata', '13-16┬░C', '68%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.38.26-AM.jpeg'],
  ['Lisianthus', 'Flor premium de alto valor, ciclo largo y mercado europeo y japon├®s.', 'Eustoma grandiflorum', '15-18┬░C', '95%', 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.33-AM.jpeg'],
]

const services = [
  ['Dise├▒o y optimizaci├│n de invernaderos', 'Orientaci├│n, ventilaci├│n, polisombra, riego y mejoras para m├íxima eficiencia lum├¡nica.', ['Ventilaci├│n', 'Polisombra', 'Clima']],
  ['Fertirrigaci├│n por especie', 'Programas por especie, variedad y etapa fenol├│gica con monitoreo semanal de CE y pH.', ['CE / pH', 'Foliar', 'Macro-micro']],
  ['Manejo fitosanitario integrado', 'Monitoreo de plagas, enfermedades, biocontrol y rotaci├│n para prevenir resistencias.', ['Botrytis', '├ücaros', 'Biocontrol']],
  ['Fotoper├¡odo y producci├│n programada', 'Programaci├│n para fechas clave de exportaci├│n, iluminaci├│n y oscurecimiento.', ['LED', 'Programaci├│n', 'Oscurecimiento']],
  ['Cosecha y clasificaci├│n', 'Punto de corte, flujo de clasificaci├│n y reducci├│n de rechazo en destino.', ['Punto de corte', 'Exportable', 'Clasificaci├│n']],
  ['Postcosecha y cadena de fr├¡o', 'Hidrataci├│n, preservantes, cuarto fr├¡o y mejora de vida ├║til.', ['Hidrataci├│n', '2-4┬░C', 'Vida florero']],
  ['GlobalG.A.P. y Florverde', 'Documentaci├│n, trazabilidad, uso responsable de agroqu├¡micos y manejo de residuos.', ['GlobalG.A.P.', 'Florverde', 'Auditor├¡a']],
]

const features = [
  ['Ficha digital por bloque', 'Especie, variedad, fecha de siembra, densidad, nutrici├│n, MIP y semana estimada de cosecha.'],
  ['Registro de producci├│n', 'Tallos cosechados, clasificaci├│n, rechazo por categor├¡a y porcentaje exportable real.'],
  ['Alertas de fechas clave', 'Programaci├│n para San Valent├¡n, Madres y picos de alto volumen.'],
  ['Trazabilidad para certificaciones', 'Aplicaciones con producto, dosis, ICA, periodo de carencia y documentaci├│n de auditor├¡a.'],
  ['Informe t├®cnico mensual', 'Tendencias de producci├│n, comparativo entre bloques y recomendaciones agron├│micas.'],
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
            <Link to="/unidades/asesorias-agroindustriales/">Asesor├¡as</Link><span>/</span>
            <strong>Floricultura</strong>
          </nav>
          <div className="ifl-title">
            <span>Del esqueje a la exportaci├│n</span>
            <h1><em>Flori-</em><strong>cultura</strong><small>Colombiana ┬À Invernadero ┬À Exportaci├│n</small></h1>
          </div>
          <div className="ifl-hero-bottom">
            <p>Acompa├▒amiento integral para flores de corte: invernadero, fertirrigaci├│n, MIP, postcosecha y cadena de fr├¡o.</p>
            <a className="ifl-pill" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar asesor├¡a</a>
          </div>
        </div>
        <div className="ifl-hero-right">
          <img src="https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg" alt="Floricultura colombiana INTAGROS" />
          <div className="ifl-hero-label">
            <span>Rosa de exportaci├│n ┬À Sabana de Bogot├í</span>
            <strong>Rosa hybrida ÔÇö Flor de corte colombiana</strong>
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
          <span className="ifl-section-label">Nuestra filosof├¡a</span>
          <p className="ifl-quote">Una flor perfecta para exportaci├│n no se logra en el empaque: se decide <strong>en el invernadero, en el suelo y en el esqueje</strong>.</p>
          <div className="ifl-manifest-cols">
            <p>La sabana de Bogot├í y Antioquia tienen condiciones ├║nicas; INTAGROS las convierte en protocolo: fertirrigaci├│n, monitoreo fitosanitario y nutrici├│n por variedad.</p>
            <p>El tallo exportable es resultado de un sistema completo: material vegetal, luz, sanidad, punto de corte, hidrataci├│n, fr├¡o y despacho.</p>
          </div>
        </div>
      </section>

      <section className="ifl-process">
        <header className="ifl-section-head ifl-reveal">
          <h2>Del esqueje al p├®talo</h2>
          <p>10 etapas desde el invernadero hasta la caja de exportaci├│n.</p>
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
          <h2>Especies de exportaci├│n</h2>
          <p>Protocolos diferenciados por flor, temperatura, mercado y punto de corte.</p>
        </header>
        <div className="ifl-species-list">
          {species.map(([title, text, scientific, temp, width, image], index) => (
            <article className="ifl-spec ifl-reveal" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <em>{scientific}</em>
              <div className="ifl-temp"><small>Temp. ├│ptima</small><strong>{temp}</strong><i style={{ '--temp': width }} /></div>
              <img src={image} alt="" />
            </article>
          ))}
        </div>
      </section>

      <section className="ifl-services">
        <header className="ifl-section-head ifl-reveal">
          <h2>Lo que hacemos</h2>
          <p>Siete servicios para producir m├ís tallo exportable y reducir rechazo en destino.</p>
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
            <span className="ifl-section-label">Herramienta INTAGROS ┬À En desarrollo</span>
            <h2>Control digital bloque por bloque</h2>
            <p>Plataforma de gesti├│n para fincas flor├¡colas: ficha digital por bloque, especie, variedad, siembra, nutrici├│n, registro fitosanitario y semana de cosecha.</p>
            <div className="ifl-feature-list">
              {features.map(([title, text]) => (
                <article className="ifl-feature ifl-reveal" key={title}><span /><div><h3>{title}</h3><p>{text}</p></div></article>
              ))}
            </div>
            <div className="ifl-coming"><span />Pr├│ximamente ÔÇö registro anticipado abierto</div>
          </div>
          <div className="ifl-phone ifl-reveal">
            <div className="ifl-phone-screen">
              <div className="ifl-phone-notch" />
              <div className="ifl-phone-content">
                <div className="ifl-phone-bar"><span>Finca La Primavera</span><strong>Control Floral</strong></div>
                <div className="ifl-lote-card">
                  <div className="ifl-lote-top"><span>Bloque 04 ┬À Nave B ┬À 2.800 m2</span><small><i /> En producci├│n</small></div>
                  <h3>Rosas Freedom Red</h3>
                  <p>Rosa hybrida cv. Freedom ┬À Sembrado 04 Ene 2026</p>
                  <div className="ifl-progress">{Array.from({ length: 14 }).map((_, index) => <span className={index < 11 ? 'done' : index === 11 ? 'active' : ''} key={index} />)}</div>
                  <div className="ifl-lote-stats"><span><b>Punto</b>1.5</span><span><b>├ürea</b>2.800 m2</span><span><b>Tallos</b>42.000</span></div>
                </div>
                <div className="ifl-alert"><strong>Punto de corte ├│ptimo</strong><span>Cosecha programada: 25-28 Mar 2026</span></div>
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
          <h2>Su invernadero florece m├ís con t├®cnica.</h2>
          <div>
            <a className="ifl-btn-main" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar visita t├®cnica</a>
            <Link className="ifl-btn-sec" to="/unidades/asesorias-agroindustriales/">Volver a asesor├¡as</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
