/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        neon: "0 0 20px rgba(145, 94, 255, 0.5), 0 0 60px rgba(145, 94, 255, 0.2)",
        "neon-cyan": "0 0 20px rgba(0, 206, 168, 0.5)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(ellipse at center, rgba(145, 94, 255, 0.08) 0%, rgba(5, 8, 22, 0.95) 70%)",
        "grid-pattern":
          "linear-gradient(rgba(145,94,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(145,94,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      blur: {
        "3xl": "64px",
        "4xl": "96px",
      },
    },
  },
  plugins: [],
};
