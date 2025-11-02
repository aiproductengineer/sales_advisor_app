/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
          silver: '#C0C0C0',
          bronze: '#CD7F32',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
