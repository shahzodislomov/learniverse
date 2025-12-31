import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // Note: In Tailwind v4, custom colors are defined in CSS using @theme directive
  // This config file is kept for content paths and other settings
  theme: {
    extend: {
      // Colors are defined in globals.css using @theme
      // Keeping this for reference and IDE autocomplete
      colors: {
        neon: "#00ff9c",
        cyber: "#00eaff",
        "hacker-green": "#00ff41",
        "hacker-cyan": "#00ffff",
        "hacker-dark": "#0a0a0a",
        "hacker-gray": "#1a1a1a",
        "hacker-gray-light": "#2a2a2a",
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        "glow-green": "0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41",
        "glow-cyan": "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
        "glow-green-sm": "0 0 5px #00ff41, 0 0 10px #00ff41",
        "glow-cyan-sm": "0 0 5px #00ffff, 0 0 10px #00ffff",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shake: "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 10px #00ff41, 0 0 20px #00ff41" },
          "50%": { opacity: "0.8", boxShadow: "0 0 5px #00ff41, 0 0 10px #00ff41" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
