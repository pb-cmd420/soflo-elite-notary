/**
 * SoFlo Elite Notary — Tailwind configuration
 * Brand system: "Private Banking Vault"
 * Base charcoal · metallic gold · deep crimson · crisp off-white.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './services/index.html',
    './fees/index.html',
    './service-areas/index.html',
    './faq/index.html',
    './about/index.html',
    './legal/index.html',
    './src/**/*.{js,ts,hbs}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Allow any bare opacity modifier (e.g. border-white/12, border-gold/35).
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [i, (i / 100).toFixed(2)]),
      ),
      colors: {
        charcoal: {
          DEFAULT: '#1E1E1E',
          950: '#141414',
          900: '#1A1A1A',
          850: '#1E1E1E',
          800: '#242424',
          700: '#2C2C2C',
          600: '#383838',
          500: '#474747',
        },
        gold: {
          DEFAULT: '#B8963E',
          50: '#FBF6E9',
          100: '#F1E5C2',
          200: '#E3CD8E',
          300: '#D4B45F',
          400: '#C6A44C',
          500: '#B8963E',
          600: '#9C7E31',
          700: '#7E6427',
          800: '#5E4B1D',
        },
        crimson: {
          DEFAULT: '#8B1A2B',
          400: '#B23147',
          500: '#8B1A2B',
          600: '#731522',
          700: '#5A1019',
        },
        offwhite: {
          DEFAULT: '#FCFAF7',
          muted: '#C7C1B6',
          dim: '#A39C8F',
        },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Manrope Variable"', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        label: '0.28em',
      },
      maxWidth: {
        content: '76rem',
        prose: '46rem',
      },
      boxShadow: {
        vault: '0 30px 80px -32px rgba(0, 0, 0, 0.85)',
        'gold-glow': '0 0 0 1px rgba(184, 150, 62, 0.35), 0 24px 60px -28px rgba(184, 150, 62, 0.45)',
        seal: '0 18px 50px -18px rgba(184, 150, 62, 0.55)',
      },
      backgroundImage: {
        'gold-sheen':
          'linear-gradient(135deg, #7E6427 0%, #B8963E 28%, #F1E5C2 50%, #B8963E 72%, #7E6427 100%)',
        'gold-line':
          'linear-gradient(90deg, transparent 0%, rgba(184,150,62,0.55) 18%, rgba(184,150,62,0.9) 50%, rgba(184,150,62,0.55) 82%, transparent 100%)',
        'vault-radial':
          'radial-gradient(120% 120% at 80% -10%, rgba(184,150,62,0.12) 0%, rgba(30,30,30,0) 45%), radial-gradient(90% 90% at 0% 100%, rgba(139,26,43,0.10) 0%, rgba(30,30,30,0) 50%)',
      },
      keyframes: {
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'seal-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-130%) skewX(-18deg)' },
          '100%': { transform: 'translateX(230%) skewX(-18deg)' },
        },
      },
      animation: {
        'rise-in': 'rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s ease both',
        'seal-rotate': 'seal-rotate 80s linear infinite',
      },
    },
  },
  plugins: [],
};
