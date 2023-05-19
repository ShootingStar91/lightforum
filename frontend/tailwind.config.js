/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,html,ts,tsx}",
    "./src/*.{js,jsx,html,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'basic': '1fr, 800px, 1fr'
      },
      gridTemplateRows: {
      }
    },
  },
  plugins: [],
}

