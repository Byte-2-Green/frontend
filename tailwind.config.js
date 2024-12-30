/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
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

