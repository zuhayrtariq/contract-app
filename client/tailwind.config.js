/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],


  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#379F2E",
          secondary: "#89C54A",
          "primary-content": 'white',
          "secondary-content": 'white'
        },

        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#01FFA9",
          secondary: "#1A1A1A",
          'secondary-content' : "#01FFA9",
          "primary-content": 'black'
        },
      },
    ],
  },

  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}