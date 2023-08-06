/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite/**/*.js',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue_primary_800: '#0048B3',
        blue_primary_600: '#097AFF',
        neutral_900: '#343A4E',
        neutral_700: '#5B607C',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
