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
        argued: {
          navy: '#1A3A52',        // Primary - trust, navigation, CTAs
          brown: '#8B6F47',       // Secondary - achievements, accents
          cream: '#F5F3F0',       // Background - warmth, readability
          black: '#1C1C1C',       // Text - authority, contrast
          gold: '#D4A574',        // Highlights - premium, hover states
          success: '#4A7C59',     // Victory, positive states
          error: '#C84C3C',       // Warnings, losses
          gray: '#6B7280',        // Disabled, secondary text
        },
        // Legacy colors for backward compatibility during migration
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#1A3A52', // Map to argued-navy
          700: '#3730a3',
          800: '#312e81',
          900: '#1e1b4b',
        },
        accent: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#8B6F47', // Map to argued-brown
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['Monaco', 'Courier New', 'monospace'],
      },
      backgroundColor: {
        'argued-cream': '#F5F3F0',
        'argued-navy': '#1A3A52',
      },
      textColor: {
        'argued-navy': '#1A3A52',
        'argued-black': '#1C1C1C',
        'argued-brown': '#8B6F47',
      },
    },
  },
  plugins: [],
} satisfies Config;
