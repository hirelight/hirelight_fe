/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./node_modules/flowbite/**/*.js",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [require("flowbite/plugin")],
    darkMode: ["class", '[data-mode="dark"]'],
    theme: {
        extend: {
            screens: {
                xs: "320px",
                sm: "480px",
                "semi-sm": "624px",
                md: "768px",
                lg: "976px",
                xl: "1440px",
            },
            colors: {
                blue_primary_800: "#0048B3",
                blue_primary_700: "#006AE5",
                blue_primary_600: "#097AFF",
                blue_primary_600: "#097AFF",
                blue_primary_500: "#0B2FE5",
                blue_primary_400: "#296DFF",
                blue_primary_300: "#478EFF",
                blue_primary_200: "#85BCFF",
                blue_primary_100: "#DAEDFF",
                blue_primary_050: "#F6F9FE",

                yerange_050: "#FDF8EC",
                yerange_100: "#FFE6B2",
                yerange_300: "#FFCD69",
                yerange_500: "#FFB31F",
                yerange_700: "#C78500",
                yerange_900: "#6A4701",
            },
        },
    },
};
