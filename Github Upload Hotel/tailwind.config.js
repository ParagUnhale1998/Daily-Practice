/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        myBlue: "#38516A",
        mySkyBlue: "#297CBB",
        myGray: "#545454",
        myDarkGray: "#262626",
      },
    },
  },
  plugins: [],
}
