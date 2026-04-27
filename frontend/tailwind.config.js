/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        teal: '#14B8A6',
        green: '#22C55E',
        orange: '#F59E0B',
        purple: '#7C3AED',
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
        bg: {
          light: '#F5F7FA',
          soft: '#EAF2FF',
        },
      },
    },
  },
  plugins: [],
}
