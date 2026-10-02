/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#061712',
          900: '#0A231B',
          800: '#0D3B2E',
          700: '#144D3D',
          600: '#1B5E4B',
          500: '#2A7A63',
          100: '#E4EFEA',
          50: '#F0F6F3',
        },
        gold: {
          700: '#8C6C32',
          600: '#A9833E',
          500: '#C5A880',
          400: '#D4AF37',
          300: '#E2C79A',
          200: '#F0E0C5',
          100: '#F9F4EB',
          50: '#FCFAF5',
        },
        ivory: {
          DEFAULT: '#FBF9F5',
          dark: '#F3EFE6',
          muted: '#EAE4D6',
          border: '#E2DCD0',
        },
        charcoal: {
          900: '#151A17',
          800: '#222925',
          700: '#343D38',
          600: '#4D5852',
          500: '#68736D',
          400: '#8C9791',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-plus': '0.2em',
        'super-wide': '0.3em',
      },
      boxShadow: {
        'editorial': '0 20px 40px -15px rgba(10, 35, 27, 0.08)',
        'subtle-elevated': '0 10px 30px -10px rgba(10, 35, 27, 0.06)',
        'photo-frame': '0 25px 50px -12px rgba(10, 35, 27, 0.12)',
      },
      animation: {
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
      },
      keyframes: {
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
