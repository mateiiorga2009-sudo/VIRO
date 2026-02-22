/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "viro-bg": "#0b0614",
        "viro-card": "#120a22",
        "viro-glow": "#7c4dff",
        "viro-accent": "#3b82f6",
      },
      boxShadow: {
        "glow-md": "0 0 40px rgba(124, 77, 255, 0.35)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top, rgba(124, 77, 255, 0.28), transparent 45%), radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.2), transparent 45%), linear-gradient(160deg, #0b0614 0%, #140b26 55%, #0b0614 100%)",
      },
    },
  },
  plugins: [],
};
