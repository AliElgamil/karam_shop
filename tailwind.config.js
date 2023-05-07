/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,js,jsx,ts,tsx}",
    "./pages/**/*.{html,js,jsx,ts,tsx}",
    "./sections/**/*.{html,js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx}]",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "main-color": "#ffba00",
        "head-color": "#222",
      },
      transitionTimingFunction: {
        "out-flex": "cubic-bezier(0.05, 0.6, 0.4, 0.9)",
      },
      backgroundColor: {
        "dark-color": "#222",
      },
      screens: {
        touch: { max: "1023px" },
      },
    },
    fontFamily: {
      sans: "Poppins, sans-serif",
    },
  },
  plugins: [require("autoprefixer"),require('daisyui')],
};
