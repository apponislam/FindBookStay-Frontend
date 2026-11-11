"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthFooterLink from "./AuthFooterLink";
import TurnstileWidget from "./TurnstileWidget";

interface LoginFormProps {
    onSuccess?: () => void;
    redirectUrl?: string;
}

export const LoginForm = ({ onSuccess, redirectUrl = "/" }: LoginFormProps) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [turnstileToken, setTurnstileToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ identifier?: string; password?: string; turnstile?: string; general?: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const newErrors: typeof errors = {};
        if (!identifier.trim()) {
            newErrors.identifier = "Please enter your email or phone number";
        }
        if (!password) {
            newErrors.password = "Please enter your password";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
            newErrors.turnstile = "Please complete the verification check";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 800));

            if (onSuccess) {
                onSuccess();
            } else {
                window.location.href = redirectUrl;
            }
        } catch {
            setErrors({ general: "Invalid credentials. Please verify your details and try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <AuthHeader
                category="Account Access"
                title="Sign in to your account"
                subtitle="Enter your verified credentials to access your listings, reservations, and saved spaces."
            />

            {errors.general && (
                <div className="mb-5 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium">
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <AuthInput
                    label="Email or Phone Number"
                    name="identifier"
                    type="text"
                    placeholder="name@example.com or +880 1..."
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    error={errors.identifier}
                    required
                    autoComplete="username"
                />

                <AuthInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    required
                    autoComplete="current-password"
                    rightElement={
                        <Link
                            href="/auth/forgot-password"
                            className="text-xs font-medium text-primary hover:underline transition-colors cursor-pointer"
                        >
                            Forgot password?
                        </Link>
                    }
                />

                {/* Cloudflare Turnstile Human Verification */}
                <div className="pt-1">
                    <TurnstileWidget
                        onVerify={(token) => setTurnstileToken(token)}
                        onExpire={() => setTurnstileToken("")}
                    />
                    {errors.turnstile && (
                        <p className="text-xs text-destructive font-medium pt-1">
                            {errors.turnstile}
                        </p>
                    )}
                </div>

                <div className="pt-2">
                    <AuthButton
                        type="submit"
                        isLoading={isLoading}
                        icon={<ArrowRight className="size-4" />}
                    >
                        Sign In
                    </AuthButton>
                </div>
            </form>

            <div className="pt-6 border-t border-border mt-8">
                <AuthFooterLink
                    promptText="Don't have an account yet?"
                    linkText="Create an account"
                    href="/auth/register"
                />
            </div>
        </div>
    );
};

export default LoginForm;
