/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'aurora-1': {
          '0%, 100%': { transform: 'translate(-10%, -10%) scale(1)' },
          '33%': { transform: 'translate(30%, 10%) scale(1.15)' },
          '66%': { transform: 'translate(10%, 30%) scale(0.95)' },
        },
        'aurora-2': {
          '0%, 100%': { transform: 'translate(20%, -20%) scale(1.1)' },
          '50%': { transform: 'translate(-20%, 20%) scale(0.9)' },
        },
        'aurora-3': {
          '0%, 100%': { transform: 'translate(0%, 20%) scale(1)' },
          '50%': { transform: 'translate(20%, -10%) scale(1.2)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 6s ease-in-out infinite',
        'aurora-1': 'aurora-1 22s ease-in-out infinite',
        'aurora-2': 'aurora-2 28s ease-in-out infinite',
        'aurora-3': 'aurora-3 25s ease-in-out infinite',
        marquee: 'marquee 35s linear infinite',
        blink: 'blink 1.1s steps(1, end) infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.66, 0, 0, 1) infinite',
      },
    },
  },
  plugins: [],
}
