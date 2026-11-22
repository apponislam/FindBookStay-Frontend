import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    /* config options here */
    allowedDevOrigins: ['findbookstay.apponislam.top'],
    images: {
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "5075",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "5075",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
            },
            {
                protocol: "https",
                hostname: "**",
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

export default withNextIntl(nextConfig);
