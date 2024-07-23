/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 8px 20px rgba(117, 115, 111, 0.1)",
      },
      colors: {
        'custom-yellow': 'rgba(250, 224, 152, 0.8)',
      },
    },
  },
  plugins: [require("daisyui")],
};
