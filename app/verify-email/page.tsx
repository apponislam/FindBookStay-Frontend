import React, { Suspense } from "react";
import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import VerifyEmailView from "@/components/auth/VerifyEmailView";

export const metadata: Metadata = {
    title: "Verify Email | FindBookStay",
    description: "Verify your email address to activate your FindBookStay account.",
};

export default function DirectVerifyEmailPage() {
    return (
        <AuthLayout>
            <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-text-secondary">Loading...</div>}>
                <VerifyEmailView />
            </Suspense>
        </AuthLayout>
    );
}
