import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

export default function ServiceCard({
  number,
  category,
  icon: Icon,
  title,
  description,
  tags = [],
  image,
  _href,
  delay = 0,
  onClick,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-jade-md hover:shadow-jade-xl transition-all duration-300 cursor-pointer h-full"
      onClick={onClick}
      {...props}
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-jade-900/80 via-jade-800/40 to-transparent group-hover:from-jade-900/85 transition-all duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8">
        {/* Number Badge */}
        <div className="absolute top-6 right-6 opacity-20 text-white text-6xl font-bold pointer-events-none">
          {String(number).padStart(2, '0')}
        </div>

        {/* Category Pill */}
        <div className="mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-jade-300" />
          <span className="text-sm font-semibold text-jade-100 uppercase tracking-wide">
            {category}
          </span>
        </div>

        {/* Icon */}
        {Icon && (
          <motion.div
            className="w-12 h-12 rounded-lg bg-jade-400/20 flex items-center justify-center mb-6 group-hover:bg-jade-300/30 transition-colors duration-300"
            whileHover={{ rotate: 10, scale: 1.1 }}
          >
            <Icon className="w-6 h-6 text-jade-200" />
          </motion.div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-jade-50 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-jade-100 mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-jade-400/30 text-jade-100 border border-jade-300/50 hover:bg-jade-400/50 transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Arrow CTA */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-jade-300/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-jade-100 group-hover:text-jade-50 transition-colors">
            Más información
          </span>
          <motion.div
            className="w-10 h-10 rounded-full bg-jade-300/30 group-hover:bg-jade-300/60 flex items-center justify-center transition-all duration-300"
            whileHover={{ x: 4, backgroundColor: 'rgba(212, 175, 55, 0.5)' }}
          >
            <HiArrowRight className="w-5 h-5 text-jade-100 group-hover:text-white transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
