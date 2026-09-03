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
        pearl: '#F7F7F2',
        ink: '#1E2420',
        laurel: '#244C3A',
        sage: '#8FA89A',
        brass: '#B99B5F',
        mist: '#E2E8E4',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        boutique: '0 22px 60px rgba(30, 36, 32, 0.10)',
        'boutique-sm': '0 12px 30px rgba(30, 36, 32, 0.08)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
