"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

export const ResetPasswordForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const hasMinLength = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const passwordsMatch = password.length > 0 && password === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!hasMinLength || !hasNumber || !hasUppercase) {
            setError("Please fulfill all password requirements.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            setIsSuccess(true);
        } catch {
            setError("Failed to update password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <CheckCircle2 className="size-7" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-foreground">
                        Password updated
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                        Your credentials have been securely updated. You can now access your account.
                    </p>
                </div>

                <div className="pt-2">
                    <Link
                        href="/auth/login"
                        className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
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
                subtitle="Your new password must be at least 8 characters with numbers and uppercase letters."
            />

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <AuthInput
                    label="New Password"
                    name="password"
                    type="password"
                    placeholder="Enter at least 8 characters"
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                />

                {/* Password Criteria Checklist */}
                <div className="space-y-1 pt-1 text-xs text-text-secondary">
                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasMinLength ? "bg-accent" : "bg-border"}`} />
                        <span className={hasMinLength ? "text-foreground font-medium" : ""}>
                            At least 8 characters long
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasUppercase ? "bg-accent" : "bg-border"}`} />
                        <span className={hasUppercase ? "text-foreground font-medium" : ""}>
                            Contains at least one uppercase letter
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasNumber ? "bg-accent" : "bg-border"}`} />
                        <span className={hasNumber ? "text-foreground font-medium" : ""}>
                            Contains at least one number
                        </span>
                    </div>

                    {confirmPassword.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className={`size-1.5 rounded-full ${passwordsMatch ? "bg-accent" : "bg-destructive"}`} />
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
        </div>
    );
};

export default ResetPasswordForm;
