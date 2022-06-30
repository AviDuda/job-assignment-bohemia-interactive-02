/** @type {import('prettier').Config} */
module.exports = {
    endOfLine: "lf",
    printWidth: 120,
    trailingComma: "all",
    semi: true,
    plugins: [require("prettier-plugin-tailwindcss")],
    overrides: [
        {
            files: ["**/.vscode/*.json"],
            options: {
                parser: "json5",
                quoteProps: "preserve",
            },
        },
        {
            files: "**/.eslintrc.json",
            options: {
                parser: "json5",
                trailingComma: "none",
                quoteProps: "preserve",
            },
        },
    ],
};
