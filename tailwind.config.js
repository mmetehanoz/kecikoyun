/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:  { DEFAULT: '#2D6A4F', light: '#40916C', dark: '#1B4332', muted: '#52B788' },
          gold:   { DEFAULT: '#B5873A', light: '#D4A853', dark: '#8B6429' },
          cream:  { DEFAULT: '#FDF6EC', dark: '#F5E6CC' },
          brown:  { DEFAULT: '#6B4C2A', light: '#8B6B47', dark: '#4A3218' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 2px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.14)',
      },
    },
  },
  plugins: [],
}
