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
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Master Cinematic Palette
        canvas: "#101113",
        surface: {
          DEFAULT: "#17181A",
          elevated: "#1E2023",
          subtle: "#141517",
          border: "#292A2C",
          hover: "#222428",
        },
        lime: {
          DEFAULT: "#D5FF62",
          accent: "#D5FF62",
          dim: "#B2DE46",
          glow: "rgba(213, 255, 98, 0.18)",
          subtle: "rgba(213, 255, 98, 0.08)",
        },
        content: {
          primary: "#F5F5F0",
          secondary: "#929292",
          muted: "#6B6C6E",
          inverted: "#101113",
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
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      fontSize: {
        // Fluid responsive typography
        "display-2xl": "clamp(2.75rem, 7vw, 5.75rem)",
        "display-xl": "clamp(2.25rem, 5vw, 4.25rem)",
        "display-lg": "clamp(1.75rem, 3.5vw, 3rem)",
        "display-md": "clamp(1.35rem, 2.2vw, 2rem)",
        "display-sm": "clamp(1.15rem, 1.8vw, 1.5rem)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        tight: "-0.015em",
        normal: "0",
        wide: "0.025em",
        wider: "0.06em",
        widest: "0.12em",
      },
      lineHeight: {
        display: "1.05",
        heading: "1.18",
        body: "1.65",
      },
      borderRadius: {
        "2xl": "1.25rem",
        xl: "1rem",
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        glow: "0 0 35px rgba(213, 255, 98, 0.18)",
        "glow-lg": "0 0 60px rgba(213, 255, 98, 0.22)",
        "surface-card": "0 10px 40px -10px rgba(0, 0, 0, 0.7)",
      },
      zIndex: {
        negative: "-1",
        base: "0",
        elevated: "10",
        sticky: "50",
        overlay: "60",
        modal: "70",
        toast: "100",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
