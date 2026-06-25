import { motion } from 'framer-motion';
import clsx from 'clsx';
import { HiArrowRight } from 'react-icons/hi';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'right',
  showArrow = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-jade-700 text-white hover:bg-jade-800 shadow-jade-md hover:shadow-jade-lg focus:ring-jade-700',
    secondary: 'bg-white text-jade-700 border-2 border-jade-700 hover:bg-jade-50 shadow-jade-sm focus:ring-jade-700',
    outline: 'border-2 border-jade-700 text-jade-700 hover:bg-jade-50 focus:ring-jade-700',
    gold: 'bg-gold-400 text-white hover:bg-gold-600 shadow-jade-md focus:ring-gold-400',
    ghost: 'text-jade-700 hover:bg-jade-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={iconSize[size]} />}
      {children}
      {(Icon && iconPosition === 'right') && <Icon className={iconSize[size]} />}
      {showArrow && <HiArrowRight className={clsx(iconSize[size], 'group-hover:translate-x-1 transition-transform')} />}
    </motion.button>
  );
};

export default Button;
