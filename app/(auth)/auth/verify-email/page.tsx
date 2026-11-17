import React, { Suspense } from "react";
import type { Metadata } from "next";
import VerifyEmailView from "@/components/auth/VerifyEmailView";
import AuthLoading from "@/components/auth/AuthLoading";

export const metadata: Metadata = {
    title: "Verify Email",
    description: "Verify your email address to activate your FindBookStay account.",
};

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<AuthLoading message="Loading verification" description="Preparing email verification session..." />}>
            <VerifyEmailView />
        </Suspense>
    );
}

