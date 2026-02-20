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
        primary: '#D4AF37', // Metallic Gold from Map
        'primary-glow': '#F9E79F',
        'background-light': '#1a2a40',
        'background-dark': '#0B1120',
        'navy-mid': '#152238',
        'navy-light': '#23395d',
        // Landing specific
        'landing-primary': '#f9d406',
        'landing-bg': '#23200f',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        display: ['var(--font-cinzel)', 'serif'],
        body: ['var(--font-noto-serif)', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        sparkle: 'sparkle 1.5s linear infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

export default config;
