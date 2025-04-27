// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#4b8bbe",
        surface: {
          light: "#ffffff",
          dark:  "#1f2937",   // <- grey-800
        },
        card: {
          light: "#f9fafb",
          dark:  "#111827",   // <- grey-900
        },
      },
    },
  },
  plugins: [],
};