import { motion } from 'framer-motion';
import { FaStar, FaLeaf, FaAward } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import HeroSection from '../components/ui/HeroSection';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';

const Productos = () => {
  const productos = [
    {
      id: 1,
      nombre: 'Caña de Azúcar Premium',
      categoria: 'Azúcares',
      emoji: '🌾',
      precio: 'Consultar',
      descripcion: 'Caña de azúcar de máxima calidad para industria alimentaria',
      caracteristicas: [
        'Brix: 14-18',
        'Pureza: 95%+',
        'Sin pesticidas',
        'Certificado Fair Trade',
      ],
      usos: ['Azúcar refinada', 'Panela', 'Melaza', 'Bebidas'],
      stock: 'Disponible',
      certificaciones: ['Orgánico', 'Comercio Justo', 'ISO 9001'],
    },
    {
      id: 2,
      nombre: 'Mango Ataulfo',
      categoria: 'Frutas',
      emoji: '🥭',
      precio: 'Consultar',
      descripcion: 'Mango tropical de sabor excepcional y tamaño premium',
      caracteristicas: [
        'Tamaño: 280-320g',
        'Grado Brix: 14-16',
        'Firmeza: excelente',
        'Cosecha selectiva',
      ],
      usos: ['Exportación', 'Consumo fresco', 'Procesamiento', 'Hoteles 5*'],
      stock: 'Disponible',
      certificaciones: ['Orgánico', 'GlobalGAP', 'Kosher'],
    },
    {
      id: 3,
      nombre: 'Piña Golden Delicious',
      categoria: 'Frutas',
      emoji: '🍍',
      precio: 'Consultar',
      descripcion: 'Piña tropical jugosa con alto contenido de azúcar natural',
      caracteristicas: [
        'Peso: 1.5-2kg',
        'Grado Brix: 13-15',
        'Pulpa amarilla',
        'Sin defectos',
      ],
      usos: ['Fruta fresca', 'Jugos', 'Conservas', 'Gastronomía'],
      stock: 'Disponible',
      certificaciones: ['Orgánico', 'Rainforest Alliance', 'FSC'],
    },
    {
      id: 4,
      nombre: 'Papaya Maradol',
      categoria: 'Frutas',
      emoji: '🧡',
      precio: 'Consultar',
      descripcion: 'Papaya roja de tamaño ideal para exportación',
      caracteristicas: [
        'Peso: 1-1.5kg',
        'Color rojo brillante',
        'Sabor dulce',
        'Larga vida útil',
      ],
      usos: ['Exportación', 'Frutas frescas', 'Smoothies', 'Postres'],
      stock: 'Disponible',
      certificaciones: ['Orgánico', 'GlobalGAP'],
    },
    {
      id: 5,
      nombre: 'Rosas Importadas',
      categoria: 'Flores',
      emoji: '🌹',
      precio: 'Consultar',
      descripcion: 'Rosas frescas en múltiples variedades y colores',
      caracteristicas: [
        'Largo tallo: 70cm',
        'Durabilidad: 15 días',
        'Certificado internacional',
        'Empaque premium',
      ],
      usos: ['Decoración', 'Ramos', 'Eventos', 'Comercio mayorista'],
      stock: 'Disponible',
      certificaciones: ['Fair Trade', 'VeriFlora', 'ISO 9001'],
    },
    {
      id: 6,
      nombre: 'Girasoles Naturales',
      categoria: 'Flores',
      emoji: '🌻',
      precio: 'Consultar',
      descripcion: 'Girasoles frescos de cultivo sostenible',
      caracteristicas: [
        'Tamaño flor: 20-25cm',
        'Largo tallo: 60cm',
        'Durabilidad: 12 días',
        'Colores vibrantes',
      ],
      usos: ['Decoración', 'Arreglos', 'Eventos', 'Regalo'],
      stock: 'Disponible',
      certificaciones: ['Sostenible', 'Sin químicos', 'Carbono neutral'],
    },
  ];

  const categorias = [
    { name: 'Caña de Azúcar', icon: '🌾', count: 1 },
    { name: 'Frutas Tropicales', icon: '🥭', count: 3 },
    { name: 'Flores', icon: '🌹', count: 2 },
  ];

  return (
    <>
      <HeroSection
        title="Nuestros Productos"
        subtitle="Calidad premium en cada categoría"
      />

      <Breadcrumb />

      {/* Categorías */}
      <section className="py-12 bg-jade-50 border-b border-jade-200">
        <div className="container-custom">
          <div className="flex justify-center gap-8 flex-wrap">
            {categorias.map((cat, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow-jade-sm hover:shadow-jade-md transition-all"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="text-left">
                  <p className="font-semibold text-jade-900">{cat.name}</p>
                  <p className="text-xs text-gray-600">{cat.count} producto(s)</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-jade-900 mb-4">
                Catálogo Completo
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explora nuestros productos premium con certificaciones internacionales
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto, idx) => (
              <AnimatedSection key={producto.id} delay={idx * 0.08}>
                <Card className="flex flex-col h-full overflow-hidden">
                  {/* Image Section */}
                  <div className="h-40 bg-gradient-to-br from-jade-100 to-mint flex items-center justify-center text-7xl relative overflow-hidden">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {producto.emoji}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-jade-900">
                            {producto.nombre}
                          </h3>
                          <p className="text-sm text-jade-700">{producto.categoria}</p>
                        </div>
                        <FaStar className="text-gold-400 text-lg" />
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 flex-1">
                      {producto.descripcion}
                    </p>

                    {/* Características */}
                    <div className="mb-4 p-4 bg-jade-50 rounded-lg">
                      <h4 className="font-semibold text-jade-900 text-sm mb-3">
                        Características:
                      </h4>
                      <ul className="space-y-2">
                        {producto.caracteristicas.slice(0, 2).map((char, i) => (
                          <li key={i} className="text-xs text-gray-700">
                            • {char}
                          </li>
                        ))}
                      </ul>
                      {producto.caracteristicas.length > 2 && (
                        <p className="text-xs text-jade-700 font-semibold mt-2">
                          + {producto.caracteristicas.length - 2} más
                        </p>
                      )}
                    </div>

                    {/* Certificaciones */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-jade-900 text-sm mb-2">
                        Certificaciones:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {producto.certificaciones.map((cert, i) => (
                          <Badge key={i} variant="success" className="text-xs">
                            <FaAward className="inline mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-green-700">
                        {producto.stock}
                      </span>
                    </div>

                    {/* Price & Button */}
                    <div className="border-t pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Precio</p>
                        <p className="text-lg font-bold text-jade-900">
                          {producto.precio}
                        </p>
                      </div>
                      <Button variant="primary" size="sm" icon={HiArrowRight} iconPosition="right">
                        Cotizar
                      </Button>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-20 bg-jade-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-jade-900 mb-4">
                Por qué elegir Intagros
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏆',
                title: 'Calidad Garantizada',
                desc: 'Certificaciones internacionales y controles de calidad rigurosos',
              },
              {
                icon: '🌱',
                title: 'Sostenible',
                desc: 'Prácticas agrícolas responsables y carbono neutral',
              },
              {
                icon: '🚚',
                title: 'Entrega Rápida',
                desc: 'Logística eficiente y packaging especializado',
              },
              {
                icon: '💰',
                title: 'Precios Competitivos',
                desc: 'Mejor relación precio-calidad del mercado',
              },
              {
                icon: '👥',
                title: 'Atención Personalizada',
                desc: 'Equipo dedicado a tus necesidades específicas',
              },
              {
                icon: '✅',
                title: 'Trazabilidad',
                desc: 'Sistema completo de seguimiento desde origen',
              },
            ].map((ventaja, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.08}>
                <Card className="text-center p-8">
                  <div className="text-5xl mb-4">{ventaja.icon}</div>
                  <h3 className="text-lg font-bold text-jade-900 mb-3">
                    {ventaja.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{ventaja.desc}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-jade-700 to-jade-900 text-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-6">
              ¿Necesitas cotización?
            </h2>
            <p className="text-lg text-jade-100 mb-8 max-w-2xl mx-auto">
              Contáctanos para consultar disponibilidad, precios y condiciones de entrega
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="gold" size="lg">
                Solicitar Cotización
              </Button>
              <motion.a
                href="tel:+573001234567"
                whileHover={{ scale: 1.05 }}
                className="btn-secondary"
              >
                Llamar Ahora
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Productos;
