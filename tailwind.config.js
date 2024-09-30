/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('flowbite/plugin')
  ],
  content: ['index.html', './about/index.html', './tournaments/*.html', './dist/components/*.html', './dist/js/script.js', './dist/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        gulanova: '#53ACB4',
        gulanovaDark: '#0E7490',
      },
    },
  },
}

