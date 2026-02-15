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
        // ─── New Design System: "Warm Precision" ───

        // Primary — warm charcoal (replaces cool blue-gray)
        brand: {
          50: '#f7f7f6',
          100: '#e5e3e0',
          200: '#cac6c0',
          300: '#a9a39a',
          400: '#8f877d',
          500: '#7a716a',
          600: '#635b54',
          700: '#4d4741',
          800: '#3a3530',
          900: '#2a2623',
          950: '#1a1816',
        },

        // Accent — earth green (organic, warm medical trust)
        earth: {
          50: '#f3f8f3',
          100: '#e3efe4',
          200: '#c8dfcb',
          300: '#9ec5a4',
          400: '#6ea878',
          500: '#4b8b57',
          600: '#387043',
          700: '#2e5a37',
          800: '#27482e',
          900: '#213c27',
          950: '#0e2014',
        },

        // Background — warm sand
        sand: {
          50: '#fdfcfa',
          100: '#faf7f2',
          200: '#f3ede3',
        },

        // ─── Legacy colors (admin backward compatibility) ───
        vernon: {
          50: '#f8fafb', 100: '#f0f4f7', 200: '#dce5ec', 300: '#b8c9d6',
          400: '#8ea8bc', 500: '#6b8aa3', 600: '#547088', 700: '#455b6f',
          800: '#3b4d5d', 900: '#34424f', 950: '#232d36',
        },
        clinical: {
          50: '#f0fdfb', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
          400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
          800: '#115e59', 900: '#134e4a',
        },
        night: { 900: '#0f1419', 950: '#0a0e12' },
        ivory: { 50: '#fefdfb', 100: '#fdfaf5', 200: '#faf5eb' },
        slate: { 925: '#0f1720' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        'display-xl': ['5.5rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
        'display-lg': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-up': 'revealUp 0.7s ease-out forwards',
        'reveal-left': 'revealLeft 0.7s ease-out forwards',
        'reveal-right': 'revealRight 0.7s ease-out forwards',
        'reveal-scale': 'revealScale 0.7s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
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
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
