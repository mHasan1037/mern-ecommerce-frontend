import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg1:'#E8F9E9',
        mainBg2: '#299E60',
        mainBg3: '#EEF0FC',
        border1: '#f3f4f6',
        border2: '#86efac',
      },
    },
  },
  plugins: [],
} satisfies Config;
