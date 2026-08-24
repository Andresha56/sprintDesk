/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  darkMode: ['class', '[data-theme="dark"]'],

  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        panel: 'var(--panel)',
        line: 'var(--line)',
        muted: 'var(--muted)',
        wash: 'var(--wash)',
        coral: 'var(--coral)',
        green: 'var(--green)',
        gold: 'var(--gold)',
      },

      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },

  plugins: [],
};