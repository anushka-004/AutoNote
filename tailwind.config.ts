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
        background: '#2A2A2E',
        text: '#E0D4F7',
        primary: '#8B6FD1',
        accent: '#A78BFA',
        dark: '#1E1E21',
      },
    },
  },
  plugins: [],
};
export default config;
