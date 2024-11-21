/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FED7AA',
          DEFAULT: '#FB923C',
          dark: '#EA580C',
        },
        secondary: {
          light: '#BFDBFE',
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
        },
        background: {
          light: '#FFF7ED',
          dark: '#1F2937',
        },
      },
    },
  },
  plugins: [],
}

