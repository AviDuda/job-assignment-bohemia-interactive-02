const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const fullConfig = resolveConfig(tailwindConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["images.pexels.com"],
        deviceSizes: Object.values(fullConfig.theme.screens).map((screen) => parseInt(screen, 10)),
    },
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
};

module.exports = nextConfig;
