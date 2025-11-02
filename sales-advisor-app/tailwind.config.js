/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f3',
          100: '#fce8e5',
          200: '#f9d4cf',
          300: '#f4b5ac',
          400: '#ec8979',
          500: '#e06350',
          600: '#cd4536',
          700: '#ab3628',
          800: '#8d2f25',
          900: '#752c24',
          950: '#40130e',
        },
        luxury: {
          gold: '#D4AF37',
          darkGold: '#B8960C',
          lightGold: '#F4E5C2',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
          platinum: '#E5E4E2',
        },
        dark: {
          900: '#0a0a0f',
          800: '#141420',
          700: '#1e1e2e',
          600: '#2a2a3e',
          500: '#3a3a52',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F4E5C2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0f 0%, #1e1e2e 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 20px 60px 0 rgba(31, 38, 135, 0.5)',
        'luxury': '0 10px 40px rgba(212, 175, 55, 0.3)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.5)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
