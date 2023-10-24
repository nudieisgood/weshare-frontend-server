/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Noto Sans TC", "PT Sans"],
    },
    extend: {
      colors: {
        primary: "#f5385d",
      },
    },
    minWidth: {
      sm: "158px",
    },
    minHeight: {
      sm: "158px",
    },
  },

  plugins: [],
};
