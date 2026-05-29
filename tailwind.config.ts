import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
