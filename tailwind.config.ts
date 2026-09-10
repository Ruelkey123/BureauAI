import type { Config } from 'tailwindcss'

/**
 * Tokens resolve to the CSS custom properties in globals.css so there is one
 * source of truth. Nothing in this project should ship a raw hex value.
 */
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: 'var(--void)',
        panel: {
          DEFAULT: 'var(--panel)',
          hi: 'var(--panel-hi)',
        },
        hair: {
          DEFAULT: 'var(--hair)',
          bright: 'var(--hair-bright)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
        },
        signal: {
          DEFAULT: 'var(--signal)',
          deep: 'var(--signal-deep)',
          wash: 'var(--signal-wash)',
          hair: 'var(--signal-hair)',
        },
        flag: {
          DEFAULT: 'var(--flag)',
          wash: 'var(--flag-wash)',
          hair: 'var(--flag-hair)',
        },
        warn: {
          DEFAULT: 'var(--warn)',
          wash: 'var(--warn-wash)',
          hair: 'var(--warn-hair)',
        },
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-public-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      /**
       * One ramp, eight steps. Overrides Tailwind's defaults deliberately so
       * `text-sm` means this project's small, not Tailwind's. Arbitrary
       * `text-[…rem]` values are off-system — DESIGN.md is the authority and
       * the detector checks against it.
       */
      fontSize: {
        // Display
        plate: ['clamp(8rem, 23vw, 19rem)', { lineHeight: '0.72', letterSpacing: '-0.055em' }],
        lede: ['clamp(2.3rem, 5.4vw, 4.6rem)', { lineHeight: '0.96', letterSpacing: '-0.042em' }],
        head: ['clamp(1.9rem, 4vw, 3.1rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        figure: ['var(--text-figure)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        // Text — values live in globals.css so inline styles can share them.
        xl: ['var(--text-xl)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        lg: ['var(--text-lg)', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        md: ['var(--text-md)', { lineHeight: '1.55' }],
        base: ['var(--text-base)', { lineHeight: '1.6' }],
        sm: ['var(--text-sm)', { lineHeight: '1.6' }],
        xs: ['var(--text-xs)', { lineHeight: '1.5' }],
        '2xs': ['var(--text-2xs)', { lineHeight: '1.4' }],
        // The label voice: mono, uppercase, tracked.
        micro: ['var(--text-micro)', { lineHeight: '1.2', letterSpacing: '0.1em' }],
      },
      boxShadow: {
        'lift-1': 'var(--lift-1)',
        'lift-2': 'var(--lift-2)',
        'lift-3': 'var(--lift-3)',
      },
      maxWidth: {
        sheet: '80rem',
      },
      animation: {
        strike: 'strike 0.75s cubic-bezier(0.16, 1, 0.3, 1) both',
        settle: 'settle 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ink-in': 'inkIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
