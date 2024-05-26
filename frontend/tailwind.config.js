/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkRed: "#DB4444",
        yellow: "#00FF66",
        grey: "#cdcdcd",
      },
    },
  },
  plugins: [],
}

