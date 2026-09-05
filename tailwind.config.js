/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '15px',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'root-bg': '#020525',
        shade: {
          light: '#1C2554',
        },
        accent: '#3947B8',
        cta: {
          light: '#BB70DE',
          dark: '#B739F2',
          DEFAULT: '#B73BF1',
        },
      },
    },
  },
  plugins: [],
}
