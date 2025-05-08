/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "0px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },

    extend: {
      // seu ruído de fundo
      backgroundImage: {
        noise: "url('/public/gggrain.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-linear":
          "linear-gradient(var(--tw-gradient-angle), var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },

      lineClamp: {
        2: "2",
      },

      // suas cores personalizadas
      colors: {
        background: "#232946",
        "sec-background": "#343750",
        headline: "#fffffe",
        paragraph: "#b8c1ec",
        button: "#eebbc3",
        "button-text": "#232946",
      },

      // variantes adicionais
      variants: {
        backgroundImage: ["hover", "focus"],
        backdropBlur: ["hover", "focus"],
        opacity: ["group-hover"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
