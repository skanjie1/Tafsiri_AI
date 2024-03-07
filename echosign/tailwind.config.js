const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT( {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'brownBackground': "url('../public/brownBg.png')"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
});

