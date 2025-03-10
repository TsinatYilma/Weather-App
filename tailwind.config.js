/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'ts': '480px'
    },
    colors: {
      'burgandy': '#800020',
      'purp': '#5B6466'
    }
    },
  },
  plugins: [],
}

