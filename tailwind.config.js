/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // Master Palette
        canvas: "#101113",
        surface: {
          DEFAULT: "#17181A",
          elevated: "#1E2023",
          subtle: "#141517",
          border: "#292A2C",
        },
        lime: {
          DEFAULT: "#D5FF62",
          accent: "#D5FF62",
          glow: "rgba(213, 255, 98, 0.18)",
          dim: "#A3D432",
        },
        content: {
          primary: "#F5F5F0",
          secondary: "#929292",
          muted: "#6B6C6E",
        },

        // Shadcn UI Semantic Mapping
        border: "#292A2C",
        input: "#292A2C",
        ring: "#D5FF62",
        background: "#101113",
        foreground: "#F5F5F0",
        primary: {
          DEFAULT: "#D5FF62",
          foreground: "#101113",
        },
        secondary: {
          DEFAULT: "#1E2023",
          foreground: "#F5F5F0",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#17181A",
          foreground: "#929292",
        },
        accent: {
          DEFAULT: "#D5FF62",
          foreground: "#101113",
        },
        popover: {
          DEFAULT: "#17181A",
          foreground: "#F5F5F0",
        },
        card: {
          DEFAULT: "#17181A",
          foreground: "#F5F5F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.1em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
