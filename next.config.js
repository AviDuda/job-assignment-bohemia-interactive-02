/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["images.pexels.com"],
    },
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
};

module.exports = nextConfig;
