import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm neutral palette — inspired by Cursor/Linear warm tones
        vernon: {
          50: '#f9f8f6',
          100: '#f3f1ed',
          200: '#e4e0d9',
          300: '#cdc6bb',
          400: '#ada496',
          500: '#938878',
          600: '#7a6f60',
          700: '#635a4e',
          800: '#524b42',
          900: '#453f38',
          950: '#262320',
        },
        // Accent — clinical teal, used sparingly for trust
        clinical: {
          50: '#f0fdfb',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Deep dark backgrounds — warm charcoal
        night: {
          900: '#171412',
          950: '#0e0c0a',
        },
        // Warm cream backgrounds — the canvas
        ivory: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#ede8df',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-newsreader)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        // Larger display sizes for hero headlines
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '8xl': ['6rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        '9xl': ['7rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'reveal-up': 'revealUp 0.7s ease-out forwards',
        'reveal-left': 'revealLeft 0.7s ease-out forwards',
        'reveal-right': 'revealRight 0.7s ease-out forwards',
        'reveal-scale': 'revealScale 0.7s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        revealRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        revealScale: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
