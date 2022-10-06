/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fade 500ms ease',
      },

      // that is actual animation
      keyframes: theme => ({
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }),

    },
  },
  plugins: [],
}
