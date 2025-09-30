/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: "#fbf9ff" },
        lavender: { DEFAULT: "#e0d7ff" },
        lilac: { DEFAULT: "#d3c8ff" },
        bubblegum: { DEFAULT: "#f9d7ff" },
        mint: { DEFAULT: "#c8f2e9" },
        peach: { DEFAULT: "#ffd9c8" },
        slate: { DEFAULT: "#4f4b60" },
        midnight: { DEFAULT: "#1e1a2b" },
      },
      boxShadow: {
        soft: "0 10px 40px rgba(80, 74, 120, 0.15)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      textShadow: {
        DEFAULT: '0 2px 10px rgba(0, 0, 0, 0.5)',
        md: '0 2px 4px rgba(0, 0, 0, 0.8)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.9)',
      },
      height: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "200px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(-6px) scale(1)" },
          "50%": { transform: "translateY(6px) scale(1.05)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s infinite",
        float: "float 8s ease-in-out infinite",
        "float-reverse": "float 10s ease-in-out infinite reverse",
      },
      fontFamily: {
        sans: ["'Poppins'", "'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
        },
        '.text-shadow-md': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)'
        },
        '.text-shadow-none': {
          textShadow: 'none'
        }
      }
      addUtilities(newUtilities)
    }
  ],
};
