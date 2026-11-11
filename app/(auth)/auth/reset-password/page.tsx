import React from "react";
import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Set a new secure password for your FindBookStay account.",
};

export default function ResetPasswordPage() {
    return <ResetPasswordForm />;
}
