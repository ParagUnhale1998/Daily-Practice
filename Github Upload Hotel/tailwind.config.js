/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        myBlue: "#38516A",
        mySkyBlue: "#297CBB",
        myGray: "#545454",
        myDarkGray: "#262626",
        myGrayBlack: "#444444",
      },
    },
  },
  plugins: [],
}
