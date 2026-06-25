import { motion } from 'framer-motion';

export default function SugarcaneDigital() {
  return (
    <motion.div
      className="flex items-center justify-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <svg
        width="280"
        height="350"
        viewBox="0 0 280 350"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Degradado de fondo */}
        <defs>
          <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2D5016', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1B4D3E', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#7CB342', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#558B2F', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tallo principal con animación */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Sombra del tallo */}
          <line x1="148" y1="50" x2="148" y2="280" stroke="#00000020" strokeWidth="12" />
          
          {/* Tallo principal */}
          <line
            x1="140"
            y1="50"
            x2="140"
            y2="280"
            stroke="url(#stemGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Segmentos/nudos del tallo */}
          {[80, 130, 180, 230].map((y, idx) => (
            <motion.circle
              key={`nudo-${idx}`}
              cx="140"
              cy={y}
              r="8"
              fill="#1B4D3E"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
            />
          ))}
        </motion.g>

        {/* Hojas lado izquierdo */}
        {[70, 135, 190, 245].map((y, idx) => (
          <motion.g key={`hoja-izq-${idx}`}>
            {/* Hoja principal */}
            <motion.path
              d={`M 140 ${y} Q 80 ${y - 20} 60 ${y - 45} Q 65 ${y - 35} 140 ${y}`}
              fill="url(#leafGradient)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 0.8, delay: 0.5 + idx * 0.15 }}
              style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}
            />
            {/* Vena central */}
            <motion.line
              x1="140"
              y1={y}
              x2="65"
              y2={y - 40}
              stroke="#4A7C3F"
              strokeWidth="1"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1 + idx * 0.15 }}
            />
          </motion.g>
        ))}

        {/* Hojas lado derecho */}
        {[100, 155, 210, 260].map((y, idx) => (
          <motion.g key={`hoja-der-${idx}`}>
            {/* Hoja principal */}
            <motion.path
              d={`M 140 ${y} Q 200 ${y - 20} 220 ${y - 45} Q 215 ${y - 35} 140 ${y}`}
              fill="url(#leafGradient)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 0.8, delay: 0.6 + idx * 0.15 }}
              style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}
            />
            {/* Vena central */}
            <motion.line
              x1="140"
              y1={y}
              x2="215"
              y2={y - 40}
              stroke="#4A7C3F"
              strokeWidth="1"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1.1 + idx * 0.15 }}
            />
          </motion.g>
        ))}

        {/* Gota de rocío animada */}
        <motion.g
          animate={{
            y: [0, 15, 0],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <circle cx="100" cy="120" r="5" fill="#4ECDC4" />
          <circle cx="100" cy="120" r="5" fill="#4ECDC4" opacity="0.4" r="8" />
        </motion.g>

        {/* Partículas de luz */}
        {[160, 180, 200].map((x, idx) => (
          <motion.circle
            key={`particle-${idx}`}
            cx={x}
            cy="100"
            r="2"
            fill="#7CB342"
            opacity="0.6"
            animate={{
              y: [0, 20, 0],
              opacity: [0.6, 0.1, 0.6],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 + 2.5 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
