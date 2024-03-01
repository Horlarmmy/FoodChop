/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': "#410603",
        'bg': "#f5f0ee",
        'secondary': '#ed4c4e',
        'white': '#FFFFFF',
        'white-200': "rgba(255, 255, 255, 0.8)",
        },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'background2': "url('assets/images/bg2.jpg')",
        'background1': "url('assets/images/bg1.png')",
      },
      screens: {
        "wide": "1440px"
      }
    },
  },
  plugins: [],
}

