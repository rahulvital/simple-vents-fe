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
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },  
      },
      animation: {
        twinkle: 'twinkle 2s infinite',
        slideIn: 'slideIn 0.3s ease forwards',
      },
    },
  },
  plugins: [],
}