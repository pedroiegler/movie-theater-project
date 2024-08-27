/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./movie_theater/**/*.{html,js}"], 
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'), 
    require('preline/plugin'),
  ],
  daisyui: {
    themes: ["light"], 
  },
  darkMode: 'class',
}

