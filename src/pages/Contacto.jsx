import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import HeroSection from '../components/ui/HeroSection';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    asunto: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí iría la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      asunto: '',
      mensaje: '',
    });
  };

  const contactoInfo = [
    {
      icon: FaPhone,
      title: 'Teléfono',
      content: '+57 (2) 3456-7890',
      description: 'Lun-Vie 8am-6pm',
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: '+57 300 123 4567',
      description: 'Respuesta rápida',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'info@intagros.com',
      description: '24/7 disponible',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Ubicación',
      content: 'Cali, Valle del Cauca',
      description: 'Colombia',
    },
  ];

  const horarios = [
    { dia: 'Lunes - Viernes', hora: '8:00 AM - 6:00 PM' },
    { dia: 'Sábado', hora: '9:00 AM - 2:00 PM' },
    { dia: 'Domingo', hora: 'Cerrado' },
  ];

  return (
    <>
      <HeroSection
        title="Contáctanos"
        subtitle="Estamos listos para responder tus preguntas"
      />

      <Breadcrumb />

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactoInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <AnimatedSection key={idx} delay={idx * 0.08}>
                  <Card className="text-center p-8">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-5xl text-jade-700 mb-4 flex justify-center"
                    >
                      <Icon />
                    </motion.div>
                    <h3 className="text-xl font-bold text-jade-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-lg font-semibold text-jade-600 mb-2">
                      {info.content}
                    </p>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form & Hours */}
      <section className="py-20 bg-jade-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <AnimatedSection className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-3xl font-bold text-jade-900 mb-6">
                  Envíanos tu Mensaje
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-semibold text-jade-900 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-jade-200 rounded-lg focus:outline-none focus:border-jade-700 transition-colors"
                        placeholder="Tu nombre"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="block text-sm font-semibold text-jade-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-jade-200 rounded-lg focus:outline-none focus:border-jade-700 transition-colors"
                        placeholder="tu@email.com"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Teléfono */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-jade-900 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-jade-200 rounded-lg focus:outline-none focus:border-jade-700 transition-colors"
                        placeholder="+57 300 123 4567"
                      />
                    </motion.div>

                    {/* Empresa */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label className="block text-sm font-semibold text-jade-900 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-jade-200 rounded-lg focus:outline-none focus:border-jade-700 transition-colors"
                        placeholder="Tu empresa"
                      />
                    </motion.div>
                  </div>

                  {/* Asunto */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-semibold text-jade-900 mb-2">
                      Asunto *
                    </label>
                    <select
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-jade-200 rounded-lg focus:outline-none focus:border-jade-700 transition-colors"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="cotizacion">Solicitar Cotización</option>
                      <option value="distribucion">Distribución de Productos</option>
                      <option value="consulta">Consulta General</option>
                      <option value="alianza">Alianza Comercial</option>
                      <option value="otro">Otro</option>
                    </select>
                  </motion.div>

                  {/* Mensaje */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-sm font-semibold text-jade-900 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-jade-200 rounded-lg focus:outline-none focus:border-jade-700 transition-colors resize-none"
                      placeholder="Cuéntanos en detalle qué necesitas..."
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button variant="primary" size="lg" className="w-full">
                      Enviar Mensaje
                    </Button>
                  </motion.div>

                  <p className="text-xs text-gray-600 text-center">
                    * Campos obligatorios. Nos pondremos en contacto en 24 horas.
                  </p>
                </form>
              </Card>
            </AnimatedSection>

            {/* Sidebar - Horarios y Info */}
            <AnimatedSection>
              <div className="space-y-6">
                {/* Horarios */}
                <Card className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FaClock className="text-2xl text-jade-700" />
                    <h3 className="text-xl font-bold text-jade-900">
                      Horarios de Atención
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {horarios.map((h, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="border-b border-jade-200 pb-4 last:border-b-0"
                      >
                        <p className="font-semibold text-jade-900 mb-1">
                          {h.dia}
                        </p>
                        <p className="text-sm text-gray-600">{h.hora}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Quick Contact */}
                <Card className="p-8 bg-gradient-to-br from-jade-700 to-jade-900 text-white">
                  <h3 className="text-lg font-bold mb-4">
                    Contacto Rápido
                  </h3>
                  <div className="space-y-3">
                    <motion.a
                      href="https://wa.me/573001234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 hover:text-gold-400 transition-colors"
                    >
                      <FaWhatsapp className="text-2xl" />
                      <span>WhatsApp</span>
                    </motion.a>
                    <motion.a
                      href="mailto:info@intagros.com"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 hover:text-gold-400 transition-colors"
                    >
                      <FaEnvelope className="text-2xl" />
                      <span>Enviar Email</span>
                    </motion.a>
                    <motion.a
                      href="tel:+573001234567"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 hover:text-gold-400 transition-colors"
                    >
                      <FaPhone className="text-2xl" />
                      <span>Llamar Ahora</span>
                    </motion.a>
                  </div>
                </Card>

                {/* Seguimiento */}
                <Card className="p-6 bg-jade-50">
                  <p className="text-sm text-gray-700 text-center">
                    <span className="block font-semibold text-jade-900 mb-2">
                      ✓ Respuesta en 24 horas
                    </span>
                    Garantizamos una respuesta rápida a todas tus consultas
                  </p>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-jade-900 mb-12 text-center">
              Localización
            </h2>
          </AnimatedSection>

          <Card className="overflow-hidden h-96">
            <div className="w-full h-full bg-gradient-to-br from-jade-200 to-jade-300 flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="text-6xl text-jade-700 mx-auto mb-4" />
                <p className="text-xl font-bold text-jade-900">
                  Cali, Valle del Cauca
                </p>
                <p className="text-gray-700">Colombia</p>
                <Button variant="primary" className="mt-6">
                  Ver Mapa
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Contacto;
