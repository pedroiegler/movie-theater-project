/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./movie_theater/**/*.{html, js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), 
  ],
  daisyui: {
    themes: ["light"], 
  },
  darkMode: 'class',
}

