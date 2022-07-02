const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss/tailwind-config').TailwindConfig["theme"]} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
    theme: {
        extend: {
            container: {
                center: true,
            },
            fontFamily: {
                sans: ["Archivo", ...defaultTheme.fontFamily.sans],
            },
        },
    },
};
