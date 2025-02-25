/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors:{
            primary:"#FBFBFB",
            secondary:"#E8F9FF",
            accent:"#3674B5"
        }
      },
    },
    plugins: [],
  }