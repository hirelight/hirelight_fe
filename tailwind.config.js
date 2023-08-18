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
      screens: {
        sm: '480px',
        'semi-sm': '624px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        blue_primary_800: '#0048B3',
        blue_primary_600: '#097AFF',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
