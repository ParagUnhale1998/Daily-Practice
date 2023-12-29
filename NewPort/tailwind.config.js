/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    screens:{
     sm:'480px',
     md:'768px',
     lg:'976px',
     xl:'1440px'
    },
    extend: {
      colors:{
        bgDarkOrange: 'rgb(254,112,90)',
        btnOrange: 'rgb(254,110,88)',
        bgOrange: 'rgb(254,249,245)',
        iconOrange: 'rgb(254,180,169)',
        headingBlack: 'rgb(53,53,53)',
        brightRed: 'hsl(12, 88%, 59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
      }
    },
  },
  plugins: [],
  purge: [
    './src/**/*.html',
    './src/**/*.ts',
  ],
}

