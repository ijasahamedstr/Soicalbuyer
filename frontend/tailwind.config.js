/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        display:['Tajawal,sans-serif']
      },
      colors:{
        backgroundcolor:['rgb(97, 100, 255)']
      },
      keyframes: {
        blinkingBg: {
            '0%, 100%': { backgroundColor: '#ef4444' },
            '50%': { backgroundColor: '#fee2e2' },
        }
    },
    animation: {
        blinkingBg: 'blinkingBg 2s ease-in-out infinite',
    }
      
    },
  },
  plugins: [],
}

