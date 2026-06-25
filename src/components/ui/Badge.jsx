import { motion } from 'framer-motion';
import clsx from 'clsx';

const Badge = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-jade-100 text-jade-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    gold: 'bg-gold-100 text-gold-800',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={clsx(
        'inline-block px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
