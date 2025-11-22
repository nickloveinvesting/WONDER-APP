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
        // Primary Brand Colors - Teal gradient for actions and accents
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',  // Primary teal
          600: '#0d9488',  // Primary teal hover
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Status Colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['Monaco', 'Courier New', 'monospace'],
      },
      spacing: {
        // Layout-specific spacing
        'sidebar': '16rem',           // 256px
        'sidebar-collapsed': '4rem',  // 64px
        'header': '3.5rem',           // 56px
        'mobile-nav': '3.5rem',       // 56px
      },
      maxWidth: {
        'reading': '68ch',            // Optimal reading width
        'content': '80rem',           // 1280px max content
      },
      borderRadius: {
        'xl': '0.75rem',   // 12px
        '2xl': '1rem',     // 16px
        '3xl': '1.5rem',   // 24px
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },
      zIndex: {
        'dropdown': '10',
        'sticky': '20',
        'fixed': '30',
        'drawer': '40',
        'modal': '50',
        'toast': '60',
      },
    },
  },
  plugins: [],
} satisfies Config;
