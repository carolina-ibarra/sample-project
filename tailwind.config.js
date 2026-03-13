/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3A86FF',
          dark: '#1D5FCC',
          light: '#A8C9FF',
        },
      },
     },
    },
  plugins: [],
}
