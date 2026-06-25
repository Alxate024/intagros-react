import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapeo de rutas a etiquetas legibles
  const breadcrumbLabels = {
    cultivos: 'Cultivos',
    productos: 'Productos',
    fundadores: 'Fundadores',
    contacto: 'Contacto',
    redes: 'Redes Sociales',
    nosotros: 'Acerca de',
    cana: 'Caña de Azúcar',
    frutales: 'Frutales Tropicales',
    flores: 'Flores',
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-jade-50 border-b border-jade-200 py-4"
      aria-label="Breadcrumb"
    >
      <div className="container-custom">
        <ol className="flex items-center gap-2 text-sm">
          {/* Home Link */}
          <li>
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-jade-700 hover:text-jade-900 transition-colors"
              >
                <FaHome className="text-lg" />
                <span>Inicio</span>
              </motion.div>
            </Link>
          </li>

          {/* Breadcrumb Items */}
          {pathnames.map((pathname, idx) => {
            const routePath = `/${pathnames.slice(0, idx + 1).join('/')}`;
            const isLast = idx === pathnames.length - 1;
            const label = breadcrumbLabels[pathname] || pathname;

            return (
              <li key={routePath} className="flex items-center gap-2">
                <FaChevronRight className="text-jade-400 text-xs" />
                {isLast ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-jade-700 font-semibold"
                  >
                    {label}
                  </motion.span>
                ) : (
                  <Link to={routePath}>
                    <motion.span
                      whileHover={{ color: '#1B4D3E' }}
                      className="text-gray-600 hover:text-jade-700 transition-colors"
                    >
                      {label}
                    </motion.span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </motion.nav>
  );
};

export default Breadcrumb;
