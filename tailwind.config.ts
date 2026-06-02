import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'opacity-0',
    'opacity-100',
    'translate-y-0',
    'translate-y-6',
    'transition-all',
    'duration-700',
    'ease-out',
    'delay-100',
    'delay-200',
    'delay-300',
    'delay-400',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f0f0e8',
        green: {
          DEFAULT: '#3a7a5c',
          light: '#4a9a72',
          bg: '#e8f0ea',
        },
        navy: {
          DEFAULT: '#0f1e2e',
          mid: '#1a3044',
        },
        bureau: {
          text: '#1a2535',
          muted: '#6b7a8d',
          border: '#dde0d8',
        },
      },
      fontFamily: {
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatA: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.04)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.97)' },
        },
        floatB: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '40%': { transform: 'translate(-25px, 20px) scale(1.03)' },
          '70%': { transform: 'translate(20px, -15px) scale(0.98)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up-1': 'fadeUp 0.65s 0.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up-2': 'fadeUp 0.65s 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up-3': 'fadeUp 0.65s 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up-4': 'fadeUp 0.65s 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up-5': 'fadeUp 0.65s 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'float-a': 'floatA 14s ease-in-out infinite',
        'float-b': 'floatB 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
