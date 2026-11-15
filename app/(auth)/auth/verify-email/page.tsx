import React, { Suspense } from "react";
import type { Metadata } from "next";
import VerifyEmailView from "@/components/auth/VerifyEmailView";

export const metadata: Metadata = {
    title: "Verify Email",
    description: "Verify your email address to activate your FindBookStay account.",
};

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-text-secondary">Loading...</div>}>
            <VerifyEmailView />
        </Suspense>
    );
}

