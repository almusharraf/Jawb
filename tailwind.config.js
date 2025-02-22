/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F6F4FF',
          100: '#EDEAFF',
          200: '#D6D0FF',
          300: '#B8AEFF',
          400: '#9785FF',
          500: '#7C5CFF',
          600: '#6344E3',
          700: '#4D35B6',
          800: '#382689',
          900: '#251A5C'
        },
        accent: {
          500: '#FF3B8B', // Pink accent
          600: '#E81C77'
        },
        secondary: {
          50: '#fff8e5',
          100: '#ffefcc',
          200: '#ffdf99',
          300: '#ffcf66',
          400: '#ffbf33',
          500: '#ffaf00',
          600: '#cc8c00',
          700: '#996900',
          800: '#664600',
          900: '#332300',
        },
        saudiGreen: '#006c35',
        saudiWhite: '#ffffff',
        saudiGold: '#ffd700'
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      backgroundImage: {
        'saudi-pattern': "url('https://www.example.com/saudi-pattern.png')"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}