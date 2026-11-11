import React from "react";
import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
    title: {
        default: "Authentication | FindBookStay",
        template: "%s | FindBookStay",
    },
    description: "Sign in or create an account on FindBookStay to discover verified apartments, houses, bachelor seats, hotels, and sports turfs.",
};

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
    return <AuthLayout>{children}</AuthLayout>;
}
