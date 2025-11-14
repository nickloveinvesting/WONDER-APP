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
        primary: {
          50: '#e8f0f8',
          100: '#d1e1f1',
          200: '#a3c3e3',
          300: '#75a5d5',
          400: '#4787c7',
          500: '#2d5a8f', // Navy blue
          600: '#1e3a5f', // PhiloDuel brand navy
          700: '#172b47',
          800: '#0f1c2f',
          900: '#080e17',
        },
        accent: {
          50: '#f5f1ed',
          100: '#ebe3db',
          200: '#d7c7b7',
          300: '#c3ab93',
          400: '#af8f6f',
          500: '#8b6f47', // PhiloDuel brown
          600: '#6f5939',
          700: '#53432b',
          800: '#372c1c',
          900: '#1c160e',
        },
        offWhite: '#f5f5f0',
      },
    },
  },
  plugins: [],
} satisfies Config;
