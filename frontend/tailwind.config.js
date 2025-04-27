// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* ---------- colour tokens ---------- */
      colors: {
        brand: "#4b8bbe",

        /* page-level background */
        surface: {
          light: "#ffffff",
          dark:  "#1f2937",                 // grey-800 (opaque)
        },

        /* card / panel backgrounds    (glass in dark mode) */
        card: {
          light: "#f9fafb",
          dark:  "rgba(17, 24, 39, 0.80)",  // grey-900 @ 80 % opacity
        },

        /* navbar in dark mode (slightly lighter so it ‘floats’) */
        navDark: "rgba(15, 23, 42, 0.60)",  // grey-800 @ 60 %
      },

      /* optional: 8-pt spacing scale */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },

  /* ---------- tiny plugin: .glass-edge (hair-line stroke) ---------- */
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".glass-edge": {
          border: "1px solid rgba(255,255,255,.07)",
          boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,.05)",
        },
      });
    },
  ],
};