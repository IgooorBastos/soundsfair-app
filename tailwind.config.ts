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
        "brand-yellow": "#FFD000",
        "primary-dark": "#E6BC00",
        "dark-grey": "#1A1A1A",
      },
    },
  },
  plugins: [],
};

export default config;
