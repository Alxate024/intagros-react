import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import HeroSection from '../components/ui/HeroSection';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';

const Cultivos = () => {
  const cultivos = [
    {
      id: 1,
      name: 'Caña de Azúcar',
      emoji: '🌾',
      color: 'from-amber-400 to-yellow-600',
      description: 'Cultivo insignia de Intagros desde su fundación',
      details: [
        'Variedades de alto rendimiento',
        'Sistemas de riego optimizado',
        'Cosecha mecanizada sostenible',
        'Producción de panela artesanal',
      ],
      stats: { hectareas: '2,500+', rendimiento: '85 t/ha', sostenibilidad: '95%' },
      beneficios: [
        'Alto contenido nutricional',
        'Producción sostenible',
        'Materia prima para derivados',
      ],
    },
    {
      id: 2,
      name: 'Frutales Tropicales',
      emoji: '🥭',
      color: 'from-orange-400 to-red-600',
      description: 'Frutas frescas de excelente calidad',
      details: [
        'Mango, piña, papaya',
        'Cultivo orgánico certificado',
        'Control biológico de plagas',
        'Empaque refrigerado',
      ],
      stats: { hectareas: '1,200+', rendimiento: '40 t/ha', sostenibilidad: '98%' },
      beneficios: [
        'Frutas premium de exportación',
        'Sin pesticidas químicos',
        'Prácticas agrícolas limpias',
      ],
    },
    {
      id: 3,
      name: 'Flores',
      emoji: '🌹',
      color: 'from-pink-400 to-rose-600',
      description: 'Floricultura de alto nivel decorativo',
      details: [
        'Rosas, claveles, girasoles',
        'Invernaderos climatizados',
        'Certificación internacional',
        'Exportación a 15+ países',
      ],
      stats: { hectareas: '400+', rendimiento: '120 docenas/año', sostenibilidad: '100%' },
      beneficios: [
        'Flores frescas y duraderas',
        'Variedades exóticas',
        'Disponibilidad todo el año',
      ],
    },
  ];

  return (
    <>
      <HeroSection
        title="Nuestros Cultivos"
        subtitle="Variedad, calidad y sostenibilidad en cada cosecha"
      />

      <Breadcrumb />

      {/* Cultivos Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-jade-900 mb-4">
                Productos Principales
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Contamos con una diversa cartera de cultivos adaptados a las 
                condiciones climáticas de Colombia y con estándares internacionales
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cultivos.map((cultivo, idx) => (
              <AnimatedSection key={cultivo.id} delay={idx * 0.1}>
                <Card className="overflow-hidden flex flex-col h-full">
                  {/* Header Color */}
                  <div className={`h-32 bg-gradient-to-r ${cultivo.color} flex items-center justify-center text-7xl`}>
                    {cultivo.emoji}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-jade-900 mb-2">
                      {cultivo.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{cultivo.description}</p>

                    {/* Stats */}
                    <div className="mb-6 p-4 bg-jade-50 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {Object.entries(cultivo.stats).map(([key, val]) => (
                          <div key={key}>
                            <p className="text-jade-700 font-bold text-lg">{val}</p>
                            <p className="text-xs text-gray-600 capitalize">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-jade-900 mb-3">Características:</h4>
                      <ul className="space-y-2">
                        {cultivo.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <span className="text-jade-600">✓</span>
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Beneficios */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-jade-900 mb-3">Beneficios:</h4>
                      <div className="flex flex-wrap gap-2">
                        {cultivo.beneficios.map((ben, i) => (
                          <Badge key={i} variant="info" className="text-xs">
                            {ben}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Button */}
                    <Button variant="primary" className="w-full mt-auto" icon={HiArrowRight} iconPosition="right">
                      Más Información
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Prácticas Sostenibles */}
      <section className="py-20 bg-gradient-to-r from-jade-700 to-jade-900 text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Prácticas Sostenibles
              </h2>
              <p className="text-lg text-jade-100 max-w-2xl mx-auto">
                Nuestro compromiso con el ambiente es fundamental en cada proceso
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💧', title: 'Riego Eficiente', desc: 'Sistemas de goteo y monitoreo' },
              { icon: '🐝', title: 'Control Biológico', desc: 'Plagas sin químicos' },
              { icon: '♻️', title: 'Reciclaje', desc: 'Aprovechamiento de residuos' },
              { icon: '🌍', title: 'Carbono Neutral', desc: 'Plantación de árboles' },
            ].map((practice, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur p-6 rounded-xl text-center border border-white/20"
                >
                  <div className="text-5xl mb-4">{practice.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{practice.title}</h3>
                  <p className="text-jade-100 text-sm">{practice.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-jade-50">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-jade-900 mb-6">
              ¿Interesado en nuestros productos?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contáctanos para conocer más sobre nuestras opciones de suministro y precios
            </p>
            <Button variant="primary" size="lg">
              Solicitar Cotización
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Cultivos;
