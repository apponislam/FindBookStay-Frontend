import React, { Suspense } from "react";
import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import VerifyNewEmailView from "@/components/auth/VerifyNewEmailView";

export const metadata: Metadata = {
    title: "Verify New Email | FindBookStay",
    description: "Confirm and activate your updated email address on FindBookStay.",
};

export default function VerifyNewEmailPage() {
    return (
        <AuthLayout>
            <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-text-secondary">Loading...</div>}>
                <VerifyNewEmailView />
            </Suspense>
        </AuthLayout>
    );
}
