/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Nunito"', 'sans-serif'],
        mono:    ['"Fira Code"', 'monospace'],
      },
      colors: {
        // Warm amber-orange as primary — NOT blue/purple
        ink: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f3d9a8',
          300: '#eabc6b',
          400: '#e09d3c',
          500: '#d4821f',
          600: '#b96516',
          700: '#964c14',
          800: '#7a3d17',
          900: '#643418',
        },
        // Rich warm dark backgrounds
        canvas: {
          50:  '#fdfcfb',
          100: '#f7f4ef',
          200: '#ede8df',
          800: '#1c1917',
          900: '#141210',
          950: '#0c0a09',
        },
        // Type colors for resources
        notes:  { light: '#dcfce7', text: '#15803d', dark: '#14532d', ring: '#22c55e' },
        qpaper: { light: '#fef3c7', text: '#b45309', dark: '#451a03', ring: '#f59e0b' },
        solved: { light: '#dbeafe', text: '#1d4ed8', dark: '#1e3a8a', ring: '#3b82f6' },
      },
      animation: {
        'fade-up':   'fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':   'fadeIn 0.3s ease forwards',
        'scale-in':  'scaleIn 0.2s ease forwards',
        'slide-down':'slideDown 0.25s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        scaleIn:   { '0%': { opacity: 0, transform: 'scale(0.95)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        slideDown: { '0%': { opacity: 0, transform: 'translateY(-8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      boxShadow: {
        'card':     '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover':'0 4px 8px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.10)',
        'nav':      '0 1px 0 rgba(0,0,0,0.06)',
      }
    }
  },
  plugins: []
}
