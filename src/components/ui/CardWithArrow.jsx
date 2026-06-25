import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import cn from '../../utils/cn';

export default function CardWithArrow({
  href,
  children,
  className,
  external = true,
  showArrow = true,
  arrowPosition = 'bottom-right',
  ...props
}) {
  const isLink = href && typeof href === 'string';

  const baseStyles =
    'group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer';

  const defaultClasses = `
    bg-white border border-jade-200 hover:border-jade-400 
    shadow-jade-sm hover:shadow-jade-md
  `;

  const Wrapper = isLink ? motion.a : motion.div;
  const wrapperProps = isLink
    ? {
        href,
        target: external ? '_blank' : undefined,
        rel: external ? 'noreferrer' : undefined,
      }
    : {};

  return (
    <Wrapper
      className={cn(baseStyles, defaultClasses, className)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      {...wrapperProps}
      {...props}
    >
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Arrow Icon - appears on hover */}
      {showArrow && isLink && (
        <motion.div
          className={cn(
            'absolute z-20 flex items-center justify-center',
            'w-10 h-10 rounded-full',
            'bg-jade-100 group-hover:bg-jade-200',
            'transition-all duration-300',
            arrowPosition === 'bottom-right' && 'bottom-4 right-4'
          )}
          initial={{ opacity: 0, scale: 0.8, x: 10, y: 10 }}
          whileInView={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, scale: 1.1, x: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
        >
          <HiArrowRight className="w-5 h-5 text-jade-700 group-hover:text-jade-900" />
        </motion.div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-jade-400/0 to-jade-400/0 group-hover:from-jade-400/10 group-hover:to-jade-400/5 transition-all duration-300 pointer-events-none" />
    </Wrapper>
  );
}
