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
        customBlue: '#0b2045',
        customPurple: '#5c10a2',
        customDark: '#64325a',
        customDark2: '#753d5c',
        customDBlue: '#123471',
        customSky: '#e6f2ff',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
      },
      animation: {
        twinkle: 'twinkle 2s infinite',
      },
    },
  },
  plugins: [],
}