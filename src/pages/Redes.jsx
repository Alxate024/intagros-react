import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaTiktok, FaTwitter } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import HeroSection from '../components/ui/HeroSection';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';

const RedesSociales = () => {
  const redes = [
    {
      id: 1,
      name: 'Instagram',
      icon: FaInstagram,
      handle: '@intagros_oficial',
      followers: '25.3K',
      color: 'from-pink-500 to-purple-600',
      description: 'Contenido visual de nuestros cultivos y cosechas',
      url: 'https://instagram.com/intagros_oficial',
      posts_monthly: '15-20',
    },
    {
      id: 2,
      name: 'Facebook',
      icon: FaFacebook,
      handle: 'Intagros Agroindustria',
      followers: '18.5K',
      color: 'from-blue-500 to-blue-700',
      description: 'Noticias, eventos y actualizaciones empresariales',
      url: 'https://facebook.com/intagros',
      posts_monthly: '20-25',
    },
    {
      id: 3,
      name: 'YouTube',
      icon: FaYoutube,
      handle: '@intagros_tv',
      followers: '12.8K',
      color: 'from-red-500 to-red-700',
      description: 'Videos educativos sobre nuestros cultivos y procesos',
      url: 'https://youtube.com/@intagros_tv',
      posts_monthly: '4-6',
    },
    {
      id: 4,
      name: 'LinkedIn',
      icon: FaLinkedin,
      handle: 'Intagros',
      followers: '8.2K',
      color: 'from-blue-600 to-blue-800',
      description: 'Contenido profesional y oportunidades laborales',
      url: 'https://linkedin.com/company/intagros',
      posts_monthly: '10-12',
    },
    {
      id: 5,
      name: 'TikTok',
      icon: FaTiktok,
      handle: '@intagros_oficial',
      followers: '35.7K',
      color: 'from-black to-gray-800',
      description: 'Contenido viral sobre agricultura moderna',
      url: 'https://tiktok.com/@intagros_oficial',
      posts_monthly: '25-30',
    },
    {
      id: 6,
      name: 'Twitter',
      icon: FaTwitter,
      handle: '@Intagros_co',
      followers: '6.1K',
      color: 'from-blue-400 to-blue-600',
      description: 'Noticias rápidas y actualizaciones en tiempo real',
      url: 'https://twitter.com/Intagros_co',
      posts_monthly: '15-18',
    },
  ];

  const contenido = [
    {
      title: 'Tips de Cultivo',
      description: 'Consejos prácticos para agricultores',
      icon: '🌱',
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'Behind the Scenes',
      description: 'Vida en nuestras fincas',
      icon: '📸',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Educación',
      description: 'Tutoriales y webinars',
      icon: '🎓',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Sostenibilidad',
      description: 'Nuestro compromiso ambiental',
      icon: '🌍',
      color: 'from-jade-400 to-jade-600',
    },
    {
      title: 'Productos',
      description: 'Catálogos y promociones',
      icon: '📦',
      color: 'from-orange-400 to-orange-600',
    },
    {
      title: 'Comunidad',
      description: 'Historias de clientes',
      icon: '👥',
      color: 'from-pink-400 to-pink-600',
    },
  ];

  return (
    <>
      <HeroSection
        title="Síguenos en Redes Sociales"
        subtitle="Conecta con Intagros en múltiples plataformas"
      />

      <Breadcrumb />

      {/* Redes Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-jade-900 mb-4">
                Nuestras Plataformas
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Descubre contenido exclusivo, tips de cultivo y noticias en tiempo real
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {redes.map((red, idx) => {
              const Icon = red.icon;
              return (
                <AnimatedSection key={red.id} delay={idx * 0.08}>
                  <Card className="flex flex-col h-full">
                    {/* Header with gradient */}
                    <div className={`h-24 bg-gradient-to-r ${red.color} flex items-center justify-center`}>
                      <Icon className="text-5xl text-white" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-jade-900 mb-2">
                        {red.name}
                      </h3>
                      <p className="text-sm text-jade-700 font-semibold mb-2">
                        {red.handle}
                      </p>
                      <p className="text-gray-600 mb-6 flex-1">{red.description}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-jade-50 rounded-lg">
                        <div>
                          <p className="text-jade-700 font-bold">{red.followers}</p>
                          <p className="text-xs text-gray-600">Seguidores</p>
                        </div>
                        <div>
                          <p className="text-jade-700 font-bold">{red.posts_monthly}</p>
                          <p className="text-xs text-gray-600">Posts/mes</p>
                        </div>
                      </div>

                      {/* Button */}
                      <motion.a
                        href={red.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary text-center block flex items-center justify-center gap-2"
                      >
                        Seguir Ahora
                        <HiArrowRight className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tipo de Contenido */}
      <section className="py-20 bg-jade-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-jade-900 mb-4">
                Tipos de Contenido
              </h2>
              <p className="text-lg text-gray-600">
                Variedad de contenido educativo e inspirador
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contenido.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br ${item.color} p-8 rounded-xl text-white text-center cursor-pointer`}
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-jade-900 mb-6 text-center">
                Participa en Nuestra Comunidad
              </h2>
              <p className="text-lg text-gray-600 mb-8 text-center">
                Comparte tus historias, haz preguntas y aprende con otros agricultores e interesados en la agroindustria
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Concursos',
                    description: 'Gana premios compartiendo fotos de nuestros productos',
                  },
                  {
                    title: 'Webinars',
                    description: 'Sesiones educativas en vivo con expertos',
                  },
                  {
                    title: 'Newsletter',
                    description: 'Novedades y tips exclusivos en tu bandeja',
                  },
                ].map((feature, idx) => (
                  <AnimatedSection key={idx} delay={idx * 0.1}>
                    <Card className="text-center p-6">
                      <h3 className="text-xl font-bold text-jade-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="text-jade-700 font-semibold hover:text-jade-900"
                      >
                        Descubre más →
                      </motion.button>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-jade-700 to-jade-900">
        <div className="container-custom max-w-2xl">
          <AnimatedSection>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Suscríbete a Nuestro Newsletter
              </h2>
              <p className="text-lg text-jade-100 mb-8">
                Recibe tips semanales sobre cultivos, noticias y ofertas especiales
              </p>

              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <Button variant="gold" size="md" icon={HiArrowRight} iconPosition="right">
                  Suscribirse
                </Button>
              </form>

              <p className="text-xs text-jade-200 mt-4">
                No spam, solo contenido de valor. Puedes desuscriberte en cualquier momento.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default RedesSociales;
