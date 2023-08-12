/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        skeleton: "pulse 2s infinite alternate",
      },
    },
  },
  plugins: [],
};
