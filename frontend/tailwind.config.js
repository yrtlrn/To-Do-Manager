/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      colors: {
        primary: "#24b7db",
        secondary: "#24dba4",
        accent: "#db4824",
      },
    },
  },
  plugins: [],
};
