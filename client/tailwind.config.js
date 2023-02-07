/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "dark-theme": "#231F20",
        "dark-accent": "#614DE2",
        "gray-theme": "#F3F5F7",
      }
    },
  },
  plugins: [],
}