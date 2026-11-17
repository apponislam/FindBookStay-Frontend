import React, { Suspense } from "react";
import type { Metadata } from "next";
import VerifyEmailView from "@/components/auth/VerifyEmailView";
import AuthLoading from "@/components/auth/AuthLoading";

export const metadata: Metadata = {
    title: "Verify OTP | FindBookStay",
    description: "Enter your 6-digit verification code to activate your FindBookStay account.",
};

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<AuthLoading message="Loading verification" description="Preparing OTP verification session..." />}>
            <VerifyEmailView />
        </Suspense>
    );
}
