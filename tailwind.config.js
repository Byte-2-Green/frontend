/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#BFDBFE',
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
        },
        secondary: {
          light: '#FFCE96',
          DEFAULT: '#E78D46',
          dark: '#8B3619',
        },
        background: {
          
        },
      },
      fontFamily: {
        digital: ["Aladin"],
      },
    },
  },
  plugins: [],
}

