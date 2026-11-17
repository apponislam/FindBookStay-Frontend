import React, { Suspense } from "react";
import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import AuthLoading from "@/components/auth/AuthLoading";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Set a new secure password for your FindBookStay account.",
};

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<AuthLoading message="Loading password reset" description="Preparing secure reset session..." />}>
            <ResetPasswordForm />
        </Suspense>
    );
}
