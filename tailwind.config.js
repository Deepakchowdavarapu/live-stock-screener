/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-light-blue': 'rgb(246, 250, 253)',
        'custom-blue-transparent': '#0073e666',
        'custom-indigo' : 'rgb(100 93 249)',
      },
    },
  },
  plugins: [],
}