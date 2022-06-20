/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'comic': ['Comic', 'sans-serif'],
      'oswald': ["Oswald", 'sans-serif']
    }
  },
  plugins: [],
}
