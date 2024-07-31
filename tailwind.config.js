/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        secondary: "#000",
        tertiary: "#000",
      },
      screens: {
        xs: "480px"
      }
    },
    fontFamily: {
      MontserratRegular: ["Montserrat Regular", "sans-serif"],
      MontserratMedium: ["Montserrat Medium", "sans-serif"],
      MontserratSemiBold: ["Montserrat SemiBold", "sans-serif"],
    },
  },
  plugins: [],
}