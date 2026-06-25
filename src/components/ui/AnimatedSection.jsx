import { motion } from 'framer-motion';

const AnimatedSection = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const initialVariants = {
    up: { opacity: 0, y: 30 },
    down: { opacity: 0, y: -30 },
    left: { opacity: 0, x: -30 },
    right: { opacity: 0, x: 30 },
  };

  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
