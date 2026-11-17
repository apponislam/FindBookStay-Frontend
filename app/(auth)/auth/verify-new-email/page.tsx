import React, { Suspense } from "react";
import type { Metadata } from "next";
import VerifyNewEmailView from "@/components/auth/VerifyNewEmailView";
import AuthLoading from "@/components/auth/AuthLoading";

export const metadata: Metadata = {
    title: "Verify New Email",
    description: "Confirm and activate your updated email address on FindBookStay.",
};

export default function VerifyNewEmailPage() {
    return (
        <Suspense fallback={<AuthLoading message="Verifying link" description="Please wait while we validate your verification token..." />}>
            <VerifyNewEmailView />
        </Suspense>
    );
}

