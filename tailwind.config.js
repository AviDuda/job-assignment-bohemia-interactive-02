const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const svgToDataUri = require("mini-svg-data-uri");

/** @type {import('tailwindcss/tailwind-config').TailwindConfig["theme"]} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        plugin(function ({ addComponents, theme }) {
            // Override select's caret color as it can't be customized in @tailwindcss/forms
            // see https://github.com/tailwindlabs/tailwindcss-forms/issues/17
            addComponents({
                select: {
                    "background-image": `url("${svgToDataUri(
                        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${theme(
                            "colors.black",
                        )}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`,
                    )}")`,
                },
            });
        }),
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },
            fontFamily: {
                sans: ["Archivo", ...defaultTheme.fontFamily.sans],
            },
            zIndex: {
                header: 10,
                modal: 20,
                "modal-overlay": 15,
            },
        },
    },
};
