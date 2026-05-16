/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        aion: {
          black: '#050505',
          charcoal: '#0b0f19',
          navy: '#0a1224',
          slate: '#11151f',
          gold: '#d6b56d',
          violet: '#8b5cf6',
          cyan: '#22d3ee',
          blue: '#3b82f6',
          muted: '#a3a3a3',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 50px -12px rgba(139, 92, 246, 0.55)',
        'glow-gold': '0 0 50px -12px rgba(214, 181, 109, 0.5)',
        'glow-cyan': '0 0 45px -12px rgba(34, 211, 238, 0.45)',
        card: '0 24px 60px -28px rgba(0, 0, 0, 0.85)',
        'card-hover': '0 36px 80px -30px rgba(0, 0, 0, 0.95)',
        'inner-soft': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.07)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
      },
      letterSpacing: {
        'tight-xl': '-0.03em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.12', transform: 'scale(0.8)' },
          '50%': { opacity: '0.9', transform: 'scale(1.15)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(14px, -18px, 0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4.5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 7s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        slowSpin: 'slowSpin 44s linear infinite',
        gradientShift: 'gradientShift 9s ease infinite',
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        twinkle: 'twinkle 4s ease-in-out infinite',
        drift: 'drift 16s ease-in-out infinite',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
};
