/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          blue: '#0075EB', // Main brand blue
          yellow: '#FFD600', // Star filled color
        },
        // Neutral colors
        neutral: {
          darkest: '#111827', // Main text color
          dark: '#9CA3AF', // Star outline color
          light: '#E5E7EB', // Fallback color for avg_color
        },
        // Semantic colors
        error: {
          red: '#E61E32', // Error messages
        },
        success: {
          green: '#13AA6B', // Success states
        },
        // UI colors
        ui: {
          border: '#E5E7EB', // Border colors
          background: '#F3F4F6', // Background colors
        },
      },
    },
  },
  plugins: [],
}

