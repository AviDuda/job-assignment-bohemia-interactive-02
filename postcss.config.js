/** @type {import('postcss-load-config').Config} */
module.exports = {
    plugins: {
        "postcss-import": {},
        tailwindcss: {},
        "postcss-flexbugs-fixes": {},
        "postcss-preset-env": {
            autoprefixer: {
                flexbox: "no-2009",
            },
            stage: 3,
        },
        "@fullhuman/postcss-purgecss": {
            content: ["./pages/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
            defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
            fontFace: true,
            keyframes: true,
            variables: true,
            safelist: ["html", "body"],
        },
    },
};
