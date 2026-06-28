/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        brown: {
          950: '#0f0500',
          900: '#1c0a00',
          800: '#3b1a06',
          700: '#5c2d0e',
          600: '#7a3f1a',
        },
        gold: {
          300: '#f5d47a',
          400: '#e8b84b',
          500: '#d4a017',
          600: '#b8860b',
          700: '#8b6508',
        },
        forest: {
          900: '#0d2110',
          800: '#1a3a1a',
          700: '#2d5a2d',
          600: '#3d7a3d',
          500: '#4d9a4d',
        },
        cream: {
          50: '#fdf8f0',
          100: '#f5ece0',
          200: '#e8d5b8',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        kids: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
