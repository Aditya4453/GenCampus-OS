import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(146, 164, 177, 0.15)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#1E2025",
          secondary: "#29343D",
        },
        foreground: {
          DEFAULT: "#D6E0E6",
          heading: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#3C5665",
          hover: "#5A7480",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#92A4B1",
          foreground: "#1E2025",
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '18px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "shimmer-gradient": "linear-gradient(90deg, transparent, rgba(214, 224, 230, 0.1), transparent)",
      },
    },
  },
  plugins: [],
};
export default config;
