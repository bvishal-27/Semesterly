/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        accent: '#10b981',
        warn:   '#f59e0b',
        info:   '#3b82f6',
        bg: {
          light: '#f9fafb',
          dark:  '#0f1117',
          card:  '#ffffff',
          'card-dark': '#1a1d27',
          'sidebar': '#f3f4f6',
          'sidebar-dark': '#13151f',
        }
      },
      animation: {
        'fade-up':   'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':   'fadeIn 0.25s ease both',
        'slide-down':'slideDown 0.2s cubic-bezier(0.16,1,0.3,1) both',
        'pop':       'pop 0.15s ease both',
      },
      keyframes: {
        fadeUp:    { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideDown: { from: { opacity: 0, transform: 'translateY(-8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pop:       { '0%': { transform: 'scale(0.95)' }, '60%': { transform: 'scale(1.03)' }, '100%': { transform: 'scale(1)' } },
      },
      boxShadow: {
        'sm2': '0 1px 2px rgba(0,0,0,0.05)',
        'card': '0 0 0 1px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 0 0 1px rgba(99,102,241,0.3), 0 8px 24px rgba(99,102,241,0.12)',
        'glow': '0 0 20px rgba(99,102,241,0.25)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      }
    }
  },
  plugins: []
}
