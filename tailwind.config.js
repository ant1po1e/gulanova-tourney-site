/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('flowbite/plugin')
  ],
  content: ['index.html', './about/index.html', './tournaments/**/*.{html,js}', './dist/components/*.html', './dist/js/script.js', './dist/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        gulanova: '#53ACB4',
        gulanovaDark: '#3e868c',
        white: '#F2F2F2',
      },
    },
  },
}

