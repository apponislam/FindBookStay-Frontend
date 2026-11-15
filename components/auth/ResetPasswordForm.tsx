"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Lock, KeyRound } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

export const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const urlToken = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();

    const [token, setToken] = useState(urlToken);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const hasMinLength = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const passwordsMatch = password.length > 0 && password === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const cleanToken = token.trim() || urlToken;
        if (!cleanToken) {
            setError("Reset token is missing. Please restart password recovery from the forgot password page.");
            return;
        }

        if (!hasMinLength || !hasNumber || !hasUppercase) {
            setError("Password must be at least 8 characters with at least one number and one uppercase letter.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await resetPasswordMutation({
                token: cleanToken,
                newPassword: password,
            }).unwrap();

            setIsSuccess(true);
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setError(
                apiError?.data?.message ||
                apiError?.error ||
                "Failed to update password. Your reset link or token may have expired."
            );
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="size-7" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-foreground">Password Updated!</h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                        Your credentials have been securely updated. You can now access your account with your new password.
                    </p>
                </div>

                <div className="pt-2">
                    <Link
                        href="/auth/login"
                        className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors shadow-xs"
                    >
                        <span>Continue to Sign In</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <AuthHeader
                category="Security"
                title="Create new password"
                subtitle={
                    email
                        ? `Setting a new password for ${email}.`
                        : "Your new password must be at least 8 characters with numbers and uppercase letters."
                }
            />

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                {/* Fallback Token Input if not present in URL */}
                {!urlToken && (
                    <AuthInput
                        label="Reset Token / Code"
                        name="token"
                        type="text"
                        placeholder="Paste reset token from email"
                        icon={KeyRound}
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                    />
                )}

                <AuthInput
                    label="New Password"
                    name="password"
                    type="password"
                    placeholder="Enter at least 8 characters"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                />

                <AuthInput
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter your new password"
                    icon={Lock}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                />

                {/* Password Criteria Checklist */}
                <div className="space-y-1 pt-1 text-xs text-text-secondary">
                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasMinLength ? "bg-primary" : "bg-border"}`} />
                        <span className={hasMinLength ? "text-foreground font-medium" : ""}>
                            At least 8 characters long
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasUppercase ? "bg-primary" : "bg-border"}`} />
                        <span className={hasUppercase ? "text-foreground font-medium" : ""}>
                            Contains at least one uppercase letter
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasNumber ? "bg-primary" : "bg-border"}`} />
                        <span className={hasNumber ? "text-foreground font-medium" : ""}>
                            Contains at least one number
                        </span>
                    </div>

                    {confirmPassword.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span
                                className={`size-1.5 rounded-full ${passwordsMatch ? "bg-primary" : "bg-destructive"}`}
                            />
                            <span className={passwordsMatch ? "text-foreground font-medium" : "text-destructive"}>
                                Passwords match
                            </span>
                        </div>
                    )}
                </div>

                <div className="pt-2">
                    <AuthButton
                        type="submit"
                        isLoading={isLoading}
                        icon={<ArrowRight className="size-4" />}
                    >
                        Update Password
                    </AuthButton>
                </div>
            </form>

            <div className="pt-3 border-t border-border mt-4 text-center">
                <Link
                    href="/auth/forgot-password"
                    className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                    Need a new reset code? Click here
                </Link>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
