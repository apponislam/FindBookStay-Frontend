import React from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your FindBookStay account to manage your stays, bookings, and listings.",
};

export default function LoginPage() {
    return <LoginForm />;
}
