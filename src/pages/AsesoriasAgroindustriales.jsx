import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { contact } from '../data/siteContent'
import './AsesoriasAgroindustriales.css'

const specialties = [
  {
    to: '/unidades/asesorias-agroindustriales/cana-de-azucar/',
    number: '01',
    title: 'Ca├▒a de Az├║car & Panela',
    theme: 'Surco ┬À Brix ┬À Trapiche',
    text: 'Manejo t├®cnico del lote, cosecha, quema controlada, molienda, calidad de panela y trazabilidad.',
    image: 'https://www.intagros.com.co/wp-content/uploads/2020/06/capacitacion-2-scaled.jpg',
    tone: 'cane',
  },
  {
    to: '/unidades/asesorias-agroindustriales/frutales-tropicales/',
    number: '02',
    title: 'Frutales Tropicales',
    theme: '├ürbol ┬À QR ┬À GlobalG.A.P.',
    text: 'Gesti├│n ├írbol por ├írbol, nutrici├│n, fitosanidad, postcosecha y archivo bot├ínico productivo.',
    image: 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-12.26.03-PM.jpeg',
    tone: 'fruit',
  },
  {
    to: '/unidades/asesorias-agroindustriales/floricultura/',
    number: '03',
    title: 'Floricultura',
    theme: 'Esqueje ┬À Tallo ┬À Exportaci├│n',
    text: 'Invernadero, fertirrigaci├│n, MIP, punto de corte, postcosecha y cadena de fr├¡o.',
    image: 'https://www.intagros.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-7.37.03-AM.jpeg',
    tone: 'flower',
  },
  {
    to: '/unidades/asesorias-agroindustriales/cultivos-transitorios/',
    number: '04',
    title: 'Cultivos Transitorios',
    theme: 'Ciclo ┬À Ventana ┬À Rentabilidad',
    text: 'Planeaci├│n de siembra, nutrici├│n, sanidad, seguimiento de labores y cierre t├®cnico del ciclo.',
    image: 'https://www.intagros.com.co/wp-content/uploads/2026/02/54.jpeg',
    tone: 'cycle',
  },
]

const method = ['Diagn├│stico de campo', 'Mapa t├®cnico', 'Ejecuci├│n acompa├▒ada', 'Indicadores y mejora']

export default function AsesoriasAgroindustriales() {
  return (
    <div className="aga">
      <section className="aga-hero">
        <div className="aga-fractal" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, index) => <span key={index} />)}
        </div>
        <div className="aga-hero__media">
          <img src="https://www.intagros.com.co/wp-content/uploads/2026/02/01.jpeg" alt="Asesor├¡as agroindustriales INTAGROS" />
        </div>
        <div className="aga-hero__content">
          <span>Unidad 01 ┬À Asesor├¡as Agroindustriales</span>
          <h1>Un mapa t├®cnico para cada cultivo, finca y decisi├│n.</h1>
          <p>
            Ca├▒a, frutales, flores y cultivos por ciclo viven dentro de esta unidad. Cada especialidad tiene su propia
            metodolog├¡a, pero comparten una misma promesa: diagn├│stico claro, ejecuci├│n cercana y resultados medibles.
          </p>
          <div>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar diagn├│stico</a>
            <a href="#especialidades">Ver especialidades</a>
          </div>
        </div>
      </section>

      <section className="aga-map" id="especialidades">
        <div className="aga-map__head">
          <span>Correspondencia t├®cnica</span>
          <h2>Cuatro ramas, una misma inteligencia de campo.</h2>
        </div>
        <div className="aga-specialties">
          {specialties.map((item, idx) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link className={`aga-card aga-card--${item.tone}`} to={item.to}>
                <img src={item.image} alt="" />
                <div className="aga-card__shade" />
                <div className="aga-card__content">
                  <span className="aga-card__number">{item.number}</span>
                  <small className="aga-card__theme">{item.theme}</small>
                  <h3 className="aga-card__title">{item.title}</h3>
                  <p className="aga-card__text">{item.text}</p>
                  
                  {/* Arrow Icon Container */}
                  <motion.div
                    className="aga-card__cta"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Entrar a la secci├│n</span>
                    <div className="aga-card__arrow">
                      <HiArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="aga-method">
        <div className="aga-method__copy">
          <span>C├│mo trabajamos</span>
          <h2>La belleza visual sirve a una cosa: que el productor sepa d├│nde est├í y qu├® sigue.</h2>
        </div>
        <div className="aga-method__steps">
          {method.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
