"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthFooterLink from "./AuthFooterLink";
import TurnstileWidget from "./TurnstileWidget";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirectPath, setUser } from "@/redux/features/auth/authSlice";

interface LoginFormProps {
    onSuccess?: () => void;
    redirectUrl?: string;
}

export const LoginForm = ({ onSuccess, redirectUrl }: LoginFormProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const savedRedirectPath = useAppSelector(redirectPath);

    const targetUrl = redirectUrl || searchParams.get("redirect") || savedRedirectPath || "/";

    const [loginMutation, { isLoading }] = useLoginMutation();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [turnstileToken, setTurnstileToken] = useState("");
    const [errors, setErrors] = useState<{
        identifier?: string;
        password?: string;
        turnstile?: string;
        general?: string;
    }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const newErrors: typeof errors = {};
        if (!identifier.trim()) {
            newErrors.identifier = "Please enter your email";
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

        try {
            const res = await loginMutation({
                email: identifier.trim().toLowerCase(),
                password,
            }).unwrap();

            if (res.data?.user && res.data?.accessToken) {
                dispatch(
                    setUser({
                        user: res.data.user,
                        token: res.data.accessToken,
                    })
                );

                if (onSuccess) {
                    onSuccess();
                } else {
                    router.push(targetUrl);
                }
            }
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            const errorMessage =
                apiError?.data?.message ||
                apiError?.error ||
                "Invalid credentials. Please verify your email and password.";
            setErrors({ general: errorMessage });
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
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2.5" noValidate>
                <AuthInput
                    label="Email Address"
                    name="identifier"
                    type="email"
                    placeholder="name@example.com"
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
                <div className="pt-0.5">
                    <TurnstileWidget
                        onVerify={(token) => setTurnstileToken(token)}
                        onExpire={() => setTurnstileToken("")}
                    />
                    {errors.turnstile && (
                        <p className="text-[11px] text-destructive font-medium pt-0.5">
                            {errors.turnstile}
                        </p>
                    )}
                </div>

                <div className="pt-1.5">
                    <AuthButton
                        type="submit"
                        isLoading={isLoading}
                        icon={<ArrowRight className="size-3.5" />}
                    >
                        Sign In
                    </AuthButton>
                </div>
            </form>

            <div className="pt-3 border-t border-border mt-4">
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
