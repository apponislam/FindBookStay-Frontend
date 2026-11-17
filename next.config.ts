import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
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
            {
                source: "/verify-email",
                destination: "/auth/verify-email",
                permanent: true,
            },
            {
                source: "/verify-new-email",
                destination: "/auth/verify-new-email",
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
