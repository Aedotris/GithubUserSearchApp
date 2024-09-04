/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Thêm dòng này
  theme: {
    extend: {
      colors: {
        'dark-blue': '#141D2F',
        'dark-card': '#1E2A47',
        'light-blue': '#0079FF',
        'gray-text': '#697C9A',
        'white-text': '#FFFFFF',
        'light-bg': '#F6F8FF',
        'light-card': '#FEFEFE',
        'dark-text': '#2B3442',
      },
      fontFamily: {
        sans: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
