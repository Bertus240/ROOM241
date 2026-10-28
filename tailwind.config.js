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
        room: {
          bg: "var(--bg-main)",
          surface: "var(--bg-surface)",
          card: "var(--bg-card)",
          border: "var(--border-color)",
          borderHover: "var(--border-hover)",
          amber: "var(--room-amber)",
          amberHover: "var(--room-amber-hover)",
          amberMuted: "var(--room-amber-muted)",
          text: "var(--text-main)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)"
        },
        signature: {
          amber: "#FFAD00",
          amberHover: "#E59B00",
          amberMuted: "rgba(255, 173, 0, 0.12)"
        }
      },
      boxShadow: {
        'luxury': '0 2px 12px rgba(0, 0, 0, 0.03)',
        'luxury-hover': '0 12px 28px -6px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'amber-glow': '0 0 30px rgba(255, 173, 0, 0.25)',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'ui-monospace', 'monospace']
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px'
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms'
      }
    },
  },
  plugins: [],
}

