/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.625rem',
        '3xs': '.5rem',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {

        // required
        light_primary: "#018BCC",
        darker_primary: "#143761",
        darkest_primary: "#0F2A4B",
        link: "#15233D",

        // custom
        bg: "#F6F6F6",
        white: "#FFFFFF",
        red: "#EB1C36",
        red_bg: "#EC354B",
        red_light: "#F99394",
        blue: "#143761",
        blue_light: "#018BCC",
        black: "#000000",
        gray: "#262626",
        bluegreen: "#2AB6B5",
        yellow: "#e6c510",
        gcash_bg: "#ECEBF0",
        gcash_loading_bg: "#FEFEFE",
        gcash_blue: "#0056E4",
        orange: "#F96715",
      },
    },
    
  },
  plugins: [],
}
