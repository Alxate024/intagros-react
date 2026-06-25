import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Cultivos', path: '/cultivos' },
    { label: 'Productos', path: '/productos' },
    { label: 'Fundadores', path: '/fundadores' },
    { label: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-jade-md">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="container-custom flex justify-between items-center py-4"
      >
        {/* Logo */}
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-jade-700 to-jade-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="font-bold text-xl text-jade-900">INTAGROS</span>
          </motion.div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={clsx(
                  'font-semibold transition-colors duration-200',
                  isActive(item.path)
                    ? 'text-jade-700'
                    : 'text-gray-600 hover:text-jade-700'
                )}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="underline"
                    className="h-1 bg-jade-700 rounded-full"
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Botón Contacto */}
        <Link to="/contacto" className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Contacto
          </motion.button>
        </Link>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-jade-700 text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="container-custom py-4 flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={clsx(
                    'font-semibold transition-colors duration-200 py-2',
                    isActive(item.path)
                      ? 'text-jade-700'
                      : 'text-gray-600 hover:text-jade-700'
                  )}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            <Link to="/contacto" onClick={() => setIsOpen(false)}>
              <button className="btn-primary w-full">Contacto</button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
