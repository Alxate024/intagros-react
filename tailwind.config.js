/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Verde Jade Elegante de Intagros
        jade: {
          50: '#f0f9f7',
          100: '#d8f0eb',
          200: '#b0dfd6',
          300: '#88cec1',
          400: '#5ebdac',
          500: '#36ac97',
          600: '#2D6A52',  // Verde medio
          700: '#1B4D3E',  // Verde oscuro principal
          800: '#0D2B24',  // Verde casi negro
          900: '#051b15',
        },
        // Acentos
        gold: {
          50: '#fef9f0',
          100: '#fdf1d8',
          400: '#d4af37',   // Dorado principal
          600: '#a0860f',
        },
        // Verdes adicionales
        'forest': '#1B4D3E',
        'sage': '#2D6A52',
        'mint': '#E8F5F0',
      },
      backgroundColor: {
        'gradient-jade': 'linear-gradient(135deg, #1B4D3E 0%, #2D6A52 100%)',
        'gradient-light': 'linear-gradient(135deg, #E8F5F0 0%, #f0f9f7 100%)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1f2937',
            a: {
              color: '#1B4D3E',
              '&:hover': {
                color: '#2D6A52',
              },
            },
            h1: {
              color: '#0D2B24',
            },
            h2: {
              color: '#1B4D3E',
            },
            h3: {
              color: '#2D6A52',
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'bounce-light': 'bounceLightAmount 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceLightAmount: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'jade-sm': '0 1px 2px 0 rgba(27, 77, 62, 0.05)',
        'jade-md': '0 4px 6px -1px rgba(27, 77, 62, 0.1)',
        'jade-lg': '0 10px 15px -3px rgba(27, 77, 62, 0.15)',
        'jade-xl': '0 20px 25px -5px rgba(27, 77, 62, 0.2)',
      },
    },
  },
  plugins: [
    forms,
    typography,
  ],
}
