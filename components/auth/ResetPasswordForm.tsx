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
                <div className="size-12 mx-auto rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                    <CheckCircle2 className="size-7" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-[#172B2A] dark:text-white">
                        Password updated
                    </h1>
                    <p className="text-sm text-[#64748B] dark:text-[#A3B5AE] leading-relaxed max-w-xs mx-auto">
                        Your credentials have been securely updated. You can now access your account.
                    </p>
                </div>

                <div className="pt-2">
                    <Link
                        href="/auth/login"
                        className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#073B35] text-white text-sm font-semibold hover:bg-[#052F2A] transition-colors"
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
                <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 font-medium">
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
                <div className="space-y-1 pt-1 text-xs text-[#64748B] dark:text-[#A3B5AE]">
                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasMinLength ? "bg-[#10B981]" : "bg-[#CBD5E1]"}`} />
                        <span className={hasMinLength ? "text-[#172B2A] dark:text-white font-medium" : ""}>
                            At least 8 characters long
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasUppercase ? "bg-[#10B981]" : "bg-[#CBD5E1]"}`} />
                        <span className={hasUppercase ? "text-[#172B2A] dark:text-white font-medium" : ""}>
                            Contains at least one uppercase letter
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasNumber ? "bg-[#10B981]" : "bg-[#CBD5E1]"}`} />
                        <span className={hasNumber ? "text-[#172B2A] dark:text-white font-medium" : ""}>
                            Contains at least one number
                        </span>
                    </div>

                    {confirmPassword.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className={`size-1.5 rounded-full ${passwordsMatch ? "bg-[#10B981]" : "bg-rose-500"}`} />
                            <span className={passwordsMatch ? "text-[#172B2A] dark:text-white font-medium" : "text-rose-600"}>
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
