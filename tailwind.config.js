/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('flowbite/plugin')
  ],
  content: ['./_NEW/about.html', './about/index.html', './tournaments/**/*.{html,js}', './dist/components/*.html', './dist/js/script.js', './dist/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        gulanova: '#c2e1f2',
        gulanovaYellow: '#e28743',
        gulanovaDark: '#798da6',
        white: '#F2F2F2',
      },
    },
  },
}

