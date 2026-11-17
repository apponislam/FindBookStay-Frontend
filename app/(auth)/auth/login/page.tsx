import React, { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import AuthLoading from "@/components/auth/AuthLoading";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your FindBookStay account to manage your stays, bookings, and listings.",
};

export default function LoginPage() {
    return (
        <Suspense fallback={<AuthLoading message="Loading sign in" description="Preparing secure login session..." />}>
            <LoginForm />
        </Suspense>
    );
}
