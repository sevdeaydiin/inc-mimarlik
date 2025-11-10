import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        accent: '#B8976A',
        'bg-gradient-top': '#fff6eb',
        'bg-gradient-bottom': '#ffffff',
        'bg-light': '#FAF8F3',
        'bg-medium': '#F5F1E8',
        'bg-dark': '#E8E1D3',
        'text-primary': '#0A0A0A',
        'text-secondary': '#2A2A2A',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
};

export default config;
