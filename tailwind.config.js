/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        blush: {
          50: '#fdf8f8',
          100: '#fbf0f2',
          200: '#f7dce2',
          300: '#f1bdc9',
          400: '#e794a8',
          500: '#d76f89',
          600: '#c14f6d',
          700: '#a33b54',
          800: '#873347',
          900: '#732e3f',
          950: '#421520',
        },
        dusty: {
          light: '#EAD5D7',
          DEFAULT: '#C99D9E',
          dark: '#A67375',
          deep: '#78484A',
        },
        cherry: {
          light: '#9E2A44',
          DEFAULT: '#6B1626',
          dark: '#480B17',
          deep: '#30050D',
        },
        champagne: {
          light: '#F8F1DD',
          DEFAULT: '#D4AF37',
          foil: '#E5C07B',
          dark: '#B08827',
          border: 'rgba(212, 175, 55, 0.45)',
        },
        ivory: {
          pure: '#FFFCF9',
          DEFAULT: '#FAF6F0',
          parchment: '#F5ECE3',
          warm: '#EFE3D5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-glow': '0 20px 50px -15px rgba(225, 29, 72, 0.15), 0 0 30px 2px rgba(212, 175, 55, 0.15)',
        'luxury': '0 25px 60px -12px rgba(107, 22, 38, 0.25), 0 0 1px 1px rgba(212, 175, 55, 0.4)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'soft-inner': 'inset 0 2px 8px 0 rgba(107, 22, 38, 0.06)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

