import { motion } from 'framer-motion';
import Button from './Button';

const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  backgroundGradient = true,
  cta = null,
  children,
}) => {
  return (
    <section
      className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {/* Background Overlay */}
      {backgroundGradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-jade-900/90 via-jade-800/70 to-transparent" />
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 container-custom text-center text-white"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-2xl text-jade-50 mb-8 max-w-2xl mx-auto drop-shadow-md"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Custom Children */}
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            {children}
          </motion.div>
        )}

        {/* CTA Button */}
        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {Array.isArray(cta) ? (
              cta.map((btn, idx) => (
                <Button key={idx} variant={btn.variant || 'primary'} size="lg">
                  {btn.label}
                </Button>
              ))
            ) : (
              <Button variant="primary" size="lg">
                {cta.label || cta}
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Floating Animation Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-20 h-20 bg-gold-400/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-10 w-32 h-32 bg-jade-400/10 rounded-full blur-3xl"
      />
    </section>
  );
};

export default HeroSection;
