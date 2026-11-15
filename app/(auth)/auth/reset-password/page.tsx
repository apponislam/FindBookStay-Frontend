import React, { Suspense } from "react";
import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Set a new secure password for your FindBookStay account.",
};

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-text-secondary">Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
