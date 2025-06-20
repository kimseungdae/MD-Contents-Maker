/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
        danger: '#EF4444',
        warning: '#F97316',
        success: '#10B981',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        'surface-2': '#F1F5F9',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'text-muted': '#94A3B8',
      },
    },
  },
  plugins: [],
}

