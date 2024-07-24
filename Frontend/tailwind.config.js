/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ClashDisplay-Regular', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        tomato: '#E50914',
        marigold: '#ffbe0b',
        // Add more colors
        cyan: '#9cdbff',
      },
      boxShadow: {
        // Add more box shadows
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, .25)',
      },
    },
  },
  plugins: [],
};
