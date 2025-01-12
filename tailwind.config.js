/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        flyOff: 'flyOff 3s forwards',
      },
      keyframes: {
        flyOff: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '100%': {
            transform: 'translateY(-200vh) translateX(200vw)',
            opacity: '0',
          },
        },
      },
      colors: {
        primary: {
          light: '#3AB795',
          DEFAULT: '#4C9FC4',
          dark: '#006D77',
        },
        secondary: {
          light: '#FFCE96',
          DEFAULT: '#FFC857',
          dark: '#8B3619',
        },
        moody: {
          light: '#3e515f',
          dark: '#070a0f',
          // DEFAULT: '#141413',
          // brown: '#766d63'
        },
      },
      fontFamily: {
        digital: ["Aladin"],
      },
    },
  },
  plugins: [],
}

  


