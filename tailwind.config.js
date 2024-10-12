/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        bodyBg: "radial-gradient(circle, rgba(9,9,121,1) 0%, rgba(255,255,255,1) 0%, rgba(217,217,217,1) 100%)"
      }
    },
  },
  plugins: [],
}

