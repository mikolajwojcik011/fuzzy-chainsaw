/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html, js, ts, vue}",
    "./src/**/*",
  ],
  theme: {
    extend: {
      width: {
        '1280': '80rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

