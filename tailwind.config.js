/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050E1A',
          900: '#0A1628',
          800: '#0F1F38',
          700: '#152B4A',
          600: '#1C3A60',
          500: '#234C7A',
          400: '#3A6A9C',
          300: '#5C8FBF',
        },
        gold: {
          50: '#FBF6EC',
          100: '#F5EAD3',
          200: '#EBD5A8',
          300: '#DDB87A',
          400: '#C99E4C',
          500: '#B88635',
          600: '#9A6E2A',
          700: '#7C5822',
          800: '#5E4219',
          900: '#3F2C10',
        },
        sand: {
          50: '#FAF8F4',
          100: '#F3EEE4',
          200: '#E6DCCB',
          300: '#D4C5AC',
          400: '#B8A57F',
        },
      },
      fontFamily: {
        arabic: ['"Tajawal"', '"Cairo"', 'system-ui', 'sans-serif'],
        display: ['"Tajawal"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow': 'glow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
