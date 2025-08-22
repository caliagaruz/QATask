/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-tide-900': '#0D171C',
        'blue-tide-300': '#4F7A96',
        'blue-tide-300-soft': '#4f7a96c3',
        'blue-mist-100': '#D5DADF',
        'blue-mist-50': '#F1F4F8',
      },
      spacing: {
        30: '7.5rem',
      },
      fontSize: {
        '3.5xl': '2rem',
      },
      ringWidth: {
        3: '3px',
      },
      boxShadow: {
        subtle: '0px 1px 0.5px -1px #02172C1F, 0px 2px 4px 0px #02172C0A',
      },
      borderWidth: {
        3: '3px',
      },
      scale: {
        103: '1.03',
      },
      boxShadow: {
        'modal': `
          0 0 60px rgba(0,0,0,0.16),
          0 32px 32px -16px rgba(0,0,0,0.08),
          0 68px 68px -32px rgba(0,0,0,0.08)
        `,
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      before: ['responsive', 'hover', 'focus'],
    },
  },
}
