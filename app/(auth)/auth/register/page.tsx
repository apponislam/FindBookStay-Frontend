import React from "react";
import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Create a free FindBookStay account to discover or list properties, bachelor seats, hotels, and sports turfs.",
};

export default function RegisterPage() {
    return <RegisterForm />;
}
