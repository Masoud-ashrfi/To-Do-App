/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        background: "#000430",
        secondaryBackground: "#171c48",
        text: "#fff",
        purple: "#828dff",
        teal: "#24feee",
      },
    },
  },
  plugins: [],
};
