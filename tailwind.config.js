/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customBlue: '#1c56ba',
        customPurple: '#5c10a2',
      },
    },
  },
  plugins: [],
}