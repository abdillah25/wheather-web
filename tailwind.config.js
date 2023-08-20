/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      ubuntu: ["Ubuntu", "sans-serif"],
      kanit: ["Kanit", " sans-serif"],
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-3d")],
};
