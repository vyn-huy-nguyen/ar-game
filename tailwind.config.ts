import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f9d406', // Gold from ui2
        'primary-glow': '#F9E79F',
        'background-light': '#f8f8f5',
        'background-dark': '#23200f',
        'navy-deep': '#0f1420',
        'navy-mid': '#152238',
        'navy-light': '#23395d',
        'navy-overlay': 'rgba(35, 32, 15, 0.85)',
      },
      fontFamily: {
        sans: ['var(--font-be-vietnam)', 'sans-serif'],
        display: ['var(--font-noto-serif)', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
        serif: ['var(--font-noto-serif)', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        sparkle: 'sparkle 1.5s linear infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'particle-rise': 'particle-rise 4s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px 0px rgba(249, 212, 6, 0.3)' },
          '50%': { boxShadow: '0 0 25px 5px rgba(249, 212, 6, 0.6)' },
        },
        'particle-rise': {
          '0%': { transform: 'translateY(0) scale(0)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(1.5)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};

export default config;
