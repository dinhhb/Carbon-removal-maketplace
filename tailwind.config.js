const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "xs": "475px",
      ...defaultTheme.screens
    },
    extend: {
      flex: {
        "2": "2 2 0%",
        "1.5": "1.5 1.5 0%",
        "3": "3 3 0%",
        "4": "4 4 0%"
      },
      maxWidth: {
        "8xl": "1920px"
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(red|green|yellow)-(100|200|600|900)/,
    },
    {
      pattern: /text-(red|green|yellow)-(100|200|600|900)/,
    },
  ],
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"]
    },
  },
  plugins: [],
}