import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: {
          DEFAULT: '#FFD700',
          soft: '#FFCC00',
        },
        accent: '#333333',
        background: {
          DEFAULT: '#FFFFFF',
          muted: '#F5F5F5',
          subtle: '#E5E5E5',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        display: ['"Archivo Black"', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 10px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [forms],
};

export default config;
