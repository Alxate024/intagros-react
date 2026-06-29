import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import HeroSection from '../components/ui/HeroSection';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';
import AnimatedSection from '../components/ui/AnimatedSection';

const Fundadores = () => {
  const founders = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      role: 'Fundador & Director General',
      bio: 'Con más de 25 años en la industria agrícola, lidera la visión de Intagros hacia la innovación sostenible.',
      image: '👨‍💼',
      social: { linkedin: '#', twitter: '#', email: 'carlos@intagros.com' },
    },
    {
      id: 2,
      name: 'Ana García',
      role: 'Co-Fundadora & Directora de Operaciones',
      bio: 'Experta en sostenibilidad agroindustrial y responsable de optimizar nuestros procesos de producción.',
      image: '👩‍💼',
      social: { linkedin: '#', twitter: '#', email: 'ana@intagros.com' },
    },
    {
      id: 3,
      name: 'Juan Pérez',
      role: 'Director Técnico & Innovación',
      bio: 'Ingeniero agrónomo especializado en tecnologías modernas para cultivos de alta productividad.',
      image: '👨‍🔬',
      social: { linkedin: '#', twitter: '#', email: 'juan@intagros.com' },
    },
    {
      id: 4,
      name: 'María López',
      role: 'Directora Comercial',
      bio: 'Con una red global de clientes, asegura que nuestros productos lleguen a los mejores mercados.',
      image: '👩‍💼',
      social: { linkedin: '#', twitter: '#', email: 'maria@intagros.com' },
    },
  ];

  const timeline = [
    { year: '2010', event: 'Fundación de Intagros con enfoque en caña de azúcar' },
    { year: '2015', event: 'Expansión a cultivos de frutas tropicales' },
    { year: '2018', event: 'Incorporación de sistemas de cultivo sostenible' },
    { year: '2022', event: 'Inicio de programas de floricultura' },
    { year: '2024', event: 'Plataforma educativa y digital de Intagros' },
  ];

  return (
    <>
      <HeroSection
        title="Nuestros Fundadores"
        subtitle="Líderes visionarios en la agroindustria moderna"
      />

      <Breadcrumb />

      {/* Historia */}
      <section className="py-20 bg-gradient-to-b from-white to-jade-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-jade-900 mb-4">
                Nuestra Historia
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Desde 2010, hemos construido una empresa basada en la excelencia, 
                la innovación y el compromiso con la sostenibilidad agroindustrial.
              </p>
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <div className="mt-12">
            {timeline.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <motion.div
                  className="flex gap-8 items-center mb-8"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-jade-700 to-jade-900 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-jade-lg">
                    {item.year}
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-jade-md">
                    <p className="text-lg text-gray-700">{item.event}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-jade-900 mb-4">
                Equipo Directivo
              </h2>
              <p className="text-lg text-gray-600">
                Profesionales apasionados por la excelencia agroindustrial
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {founders.map((founder, idx) => (
              <AnimatedSection key={founder.id} delay={idx * 0.1}>
                <Card hover className="flex flex-col h-full">
                  {/* Image */}
                  <div className="w-full h-40 bg-gradient-to-br from-jade-200 to-jade-300 flex items-center justify-center text-6xl">
                    {founder.image}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-jade-900 mb-2">
                      {founder.name}
                    </h3>
                    <p className="text-sm text-jade-700 font-semibold mb-4">
                      {founder.role}
                    </p>
                    <p className="text-sm text-gray-600 flex-1 mb-6">
                      {founder.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-3">
                      <motion.a
                        href={founder.social.linkedin}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-jade-100 text-jade-700 rounded-lg hover:bg-jade-700 hover:text-white transition-colors"
                      >
                        <FaLinkedin />
                      </motion.a>
                      <motion.a
                        href={founder.social.twitter}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-jade-100 text-jade-700 rounded-lg hover:bg-jade-700 hover:text-white transition-colors"
                      >
                        <FaTwitter />
                      </motion.a>
                      <motion.a
                        href={`mailto:${founder.social.email}`}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-jade-100 text-jade-700 rounded-lg hover:bg-jade-700 hover:text-white transition-colors"
                      >
                        <FaEnvelope />
                      </motion.a>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-jade-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-jade-900 mb-4">
                Nuestros Valores
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excelencia',
                description: 'Comprometidos con la calidad en cada aspecto de nuestro trabajo',
                icon: '🌟',
              },
              {
                title: 'Sostenibilidad',
                description: 'Cuidamos el medio ambiente para las futuras generaciones',
                icon: '🌱',
              },
              {
                title: 'Innovación',
                description: 'Adoptamos tecnologías modernas para mejorar nuestros procesos',
                icon: '💡',
              },
            ].map((value, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <Card className="text-center p-8">
                  <div className="text-6xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-jade-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Fundadores;
