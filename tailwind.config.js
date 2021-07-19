module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "color-1": "#457b9dff",
      "color-2": "#a8dadcff",
      "color-3": "#f1faeeff",
      "color-4": "#e63946ff",
      "color-5": "#1d3557ff",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      "color-1": "#457b9dff",
      "color-2": "#a8dadcff",
      "color-3": "#f1faeeff",
      "color-4": "#e63946ff",
      "color-5": "#1d3557ff",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
};
