import React, { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your FindBookStay account to manage your stays, bookings, and listings.",
};

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-text-secondary">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
