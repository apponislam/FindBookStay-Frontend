"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Mail, Lock } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthFooterLink from "./AuthFooterLink";
import TurnstileWidget from "./TurnstileWidget";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirectPath, setUser } from "@/redux/features/auth/authSlice";

// Zod Schema for Login Form
const loginSchema = z.object({
    identifier: z
        .string()
        .trim()
        .min(1, "Please enter your email address")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

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

    const [turnstileToken, setTurnstileToken] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [turnstileError, setTurnstileError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
        mode: "onTouched",
    });

    const onSubmit = async (data: LoginFormData) => {
        setGeneralError("");
        setTurnstileError("");

        if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
            setTurnstileError("Please complete the verification check");
            return;
        }

        try {
            const res = await loginMutation({
                email: data.identifier.trim().toLowerCase(),
                password: data.password,
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
            setGeneralError(errorMessage);
        }
    };

    return (
        <div className="w-full">
            <AuthHeader
                category="Account Access"
                title="Sign in to your account"
                subtitle="Enter your verified credentials to access your listings, reservations, and saved spaces."
            />

            {generalError && (
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                    {generalError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5" noValidate>
                <AuthInput
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    icon={Mail}
                    error={errors.identifier?.message}
                    required
                    autoComplete="username"
                    {...register("identifier")}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    placeholder="Enter account password"
                    icon={Lock}
                    error={errors.password?.message}
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
                    {...register("password")}
                />

                {/* Cloudflare Turnstile Human Verification */}
                <div className="pt-0.5">
                    <TurnstileWidget
                        onVerify={(token) => {
                            setTurnstileToken(token);
                            setTurnstileError("");
                        }}
                        onExpire={() => setTurnstileToken("")}
                    />
                    {turnstileError && (
                        <p className="text-[11px] text-destructive font-medium pt-0.5">
                            {turnstileError}
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
