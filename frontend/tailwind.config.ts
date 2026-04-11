import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { mono: ["Space Mono","monospace"], display: ["Syne","sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
