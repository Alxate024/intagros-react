import { motion } from 'framer-motion';
import clsx from 'clsx';

const Card = ({
  children,
  className,
  hover = true,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-white rounded-xl border border-gray-200 shadow-jade-sm',
    elevated: 'bg-white rounded-xl shadow-jade-lg',
    outlined: 'bg-white rounded-xl border-2 border-jade-300',
    gradient: 'bg-gradient-to-br from-jade-50 to-mint rounded-xl border border-jade-200 shadow-jade-sm',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 25px -5px rgba(27, 77, 62, 0.2)' } : {}}
      transition={{ duration: 0.3 }}
      className={clsx(variants[variant], 'overflow-hidden transition-all', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
