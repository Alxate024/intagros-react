import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
  ];

  const contactInfo = [
    { icon: FaPhone, text: '+57 (XXX) XXX-XXXX' },
    { icon: FaEnvelope, text: 'info@intagros.com' },
    { icon: FaMapMarkerAlt, text: 'Cali, Colombia' },
  ];

  const footerLinks = [
    { label: 'Cultivos', path: '/cultivos' },
    { label: 'Fundadores', path: '/fundadores' },
    { label: 'Contacto', path: '/contacto' },
    { label: 'Términos', path: '/terminos' },
  ];

  return (
    <footer className="bg-jade-900 text-white">
      {/* Main Footer Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-custom py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-400 rounded-lg flex items-center justify-center">
                <span className="text-jade-900 font-bold">I</span>
              </div>
              <h3 className="font-bold text-xl">INTAGROS</h3>
            </div>
            <p className="text-jade-100 text-sm leading-relaxed">
              Agroindustria de caña de azúcar, frutas y flores de alta calidad.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-jade-100 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <div className="space-y-3">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <Icon className="text-gold-400 text-lg" />
                    <span className="text-jade-100 text-sm">{info.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-bold text-lg mb-4">Síguenos</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.url}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-10 h-10 bg-jade-800 rounded-lg flex items-center justify-center
                               hover:bg-gold-400 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="text-lg" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-jade-800 my-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-jade-100 text-sm"
        >
          <p>
            © {currentYear} INTAGROS. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/privacidad" className="hover:text-gold-400 transition-colors">
              Política de Privacidad
            </Link>
            <Link to="/terminos" className="hover:text-gold-400 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
