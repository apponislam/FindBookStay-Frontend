import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    cacheComponents: true,
    partialPrefetching: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/login",
                destination: "/auth/login",
                permanent: true,
            },
            {
                source: "/signup",
                destination: "/auth/register",
                permanent: true,
            },
            {
                source: "/register",
                destination: "/auth/register",
                permanent: true,
            },
        ];
    },
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
};

export default nextConfig;
