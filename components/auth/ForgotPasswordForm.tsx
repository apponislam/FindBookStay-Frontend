"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck, Mail, RefreshCw } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useForgotPasswordMutation, useVerifyOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";

export const ForgotPasswordForm = () => {
    const router = useRouter();

    const [forgotPasswordMutation, { isLoading: isSendingOtp }] = useForgotPasswordMutation();
    const [verifyOtpMutation, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
    const [resendOtpMutation, { isLoading: isResendingOtp }] = useResendOtpMutation();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"REQUEST_EMAIL" | "ENTER_OTP">("REQUEST_EMAIL");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Cooldown countdown timer (60s matching backend Redis rate limit)
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    // Step 1: Request Password Reset OTP
    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const trimmedEmail = email.trim().toLowerCase();
        if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            await forgotPasswordMutation({ email: trimmedEmail }).unwrap();
            setStep("ENTER_OTP");
            setCountdown(60);
            setSuccessMessage(`A 6-digit verification code has been dispatched to ${trimmedEmail}.`);
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setError(apiError?.data?.message || apiError?.error || "Unable to send reset code. Please try again.");
        }
    };

    // Step 2: Verify the 6-Digit OTP
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const cleanOtp = otp.trim();
        if (cleanOtp.length !== 6) {
            setError("Please enter the complete 6-digit verification code");
            return;
        }

        try {
            const res = await verifyOtpMutation({
                email: email.trim().toLowerCase(),
                otp: cleanOtp,
            }).unwrap();

            if (res.data?.token) {
                // Navigate to Reset Password page with the validated reset token
                router.push(
                    `/auth/reset-password?token=${encodeURIComponent(res.data.token)}&email=${encodeURIComponent(email)}`
                );
            }
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setError(apiError?.data?.message || apiError?.error || "Invalid or expired verification code.");
        }
    };

    // Resend OTP with cooldown
    const handleResendOtp = async () => {
        if (countdown > 0 || isResendingOtp) return;
        setError("");
        setSuccessMessage("");

        try {
            await resendOtpMutation({ email: email.trim().toLowerCase() }).unwrap();
            setCountdown(60);
            setSuccessMessage("A fresh verification code has been sent.");
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setError(apiError?.data?.message || apiError?.error || "Please wait before requesting another code.");
        }
    };

    // -------------------------------------------------------------------------
    // STEP 2: ENTER OTP CODE
    // -------------------------------------------------------------------------
    if (step === "ENTER_OTP") {
        return (
            <div className="w-full animate-in fade-in duration-200">
                <AuthHeader
                    category="Step 2 of 2"
                    title="Enter verification code"
                    subtitle={`Please enter the 6-digit code sent to ${email}. Code expires in 5 minutes.`}
                />

                {successMessage && (
                    <div className="mb-3 p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                        {error}
                    </div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-3" noValidate>
                    <AuthInput
                        label="6-Digit Verification Code"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="123456"
                        icon={ShieldCheck}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        required
                        autoComplete="one-time-code"
                        autoFocus
                    />

                    <div className="flex items-center justify-between text-xs pt-0.5">
                        <button
                            type="button"
                            onClick={() => {
                                setStep("REQUEST_EMAIL");
                                setError("");
                                setSuccessMessage("");
                            }}
                            className="text-text-secondary hover:text-foreground transition-colors cursor-pointer"
                        >
                            Change email address
                        </button>

                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={countdown > 0 || isResendingOtp}
                            className="inline-flex items-center gap-1 font-semibold text-primary disabled:text-text-secondary hover:underline cursor-pointer disabled:cursor-not-allowed transition-colors"
                        >
                            <RefreshCw className={`size-3 ${isResendingOtp ? "animate-spin" : ""}`} />
                            <span>{countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}</span>
                        </button>
                    </div>

                    <div className="pt-1.5">
                        <AuthButton
                            type="submit"
                            isLoading={isVerifyingOtp}
                            icon={<ArrowRight className="size-3.5" />}
                        >
                            Verify & Proceed
                        </AuthButton>
                    </div>
                </form>

                <div className="pt-3 border-t border-border mt-4 text-center">
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Return to sign in</span>
                    </Link>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // STEP 1: REQUEST EMAIL
    // -------------------------------------------------------------------------
    return (
        <div className="w-full">
            <AuthHeader
                category="Password Recovery"
                title="Forgot password?"
                subtitle="Enter your verified account email and we'll dispatch a secure 6-digit OTP code."
            />

            {error && (
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                    {error}
                </div>
            )}

            <form onSubmit={handleRequestOtp} className="space-y-2.5" noValidate>
                <AuthInput
                    label="Account Email"
                    name="email"
                    type="email"
                    placeholder="Enter account email"
                    icon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />

                <div className="pt-1.5">
                    <AuthButton
                        type="submit"
                        isLoading={isSendingOtp}
                        icon={<ArrowRight className="size-3.5" />}
                    >
                        Send Verification Code
                    </AuthButton>
                </div>
            </form>

            <div className="pt-3 border-t border-border mt-4 text-center">
                <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>Back to sign in</span>
                </Link>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
