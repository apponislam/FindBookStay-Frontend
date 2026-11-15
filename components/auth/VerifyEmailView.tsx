"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, RefreshCw, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useLazyVerifyEmailQuery, useResendVerificationEmailMutation } from "@/redux/features/auth/authApi";

export const VerifyEmailView = () => {
    const searchParams = useSearchParams();
    const urlToken = searchParams.get("token") || "";
    const urlEmail = searchParams.get("email") || "";
    const urlOtp = searchParams.get("otp") || "";

    const [triggerVerifyEmail, { isFetching }] = useLazyVerifyEmailQuery();
    const [resendVerificationEmail, { isLoading: isResending }] = useResendVerificationEmailMutation();

    const [email, setEmail] = useState(urlEmail);
    const [otp, setOtp] = useState(urlOtp);
    const [status, setStatus] = useState<"IDLE" | "VERIFYING" | "SUCCESS" | "ERROR">("IDLE");
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const [countdown, setCountdown] = useState(0);

    // Cooldown countdown
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const executeVerification = useCallback(
        async (targetEmail: string, tokenVal?: string, otpVal?: string) => {
            if (!targetEmail.trim()) {
                setStatus("ERROR");
                setErrorMessage("Email address is required.");
                return;
            }

            setStatus("VERIFYING");
            setErrorMessage("");

            try {
                await triggerVerifyEmail({
                    email: targetEmail.trim().toLowerCase(),
                    token: tokenVal || undefined,
                    otp: otpVal || undefined,
                }).unwrap();

                setStatus("SUCCESS");
            } catch (err: unknown) {
                setStatus("ERROR");
                const apiError = err as { data?: { message?: string }; error?: string };
                setErrorMessage(apiError?.data?.message || apiError?.error || "Invalid or expired verification link. Please request a new one.");
            }
        },
        [triggerVerifyEmail],
    );

    // Auto-verify if token & email are provided in URL query parameters
    useEffect(() => {
        if (urlEmail && (urlToken || urlOtp)) {
            executeVerification(urlEmail, urlToken, urlOtp);
        }
    }, [urlEmail, urlToken, urlOtp, executeVerification]);

    const handleManualVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setErrorMessage("Please enter your account email address.");
            return;
        }
        if (!otp.trim()) {
            setErrorMessage("Please enter the 6-digit verification code.");
            return;
        }

        executeVerification(email, urlToken || undefined, otp.trim());
    };

    const handleResend = async () => {
        if (countdown > 0 || isResending) return;
        if (!email.trim()) {
            setErrorMessage("Please enter your email to resend verification.");
            return;
        }

        setErrorMessage("");
        setInfoMessage("");

        try {
            await resendVerificationEmail({ email: email.trim().toLowerCase() }).unwrap();
            setCountdown(60);
            setInfoMessage("Verification link and OTP resent to your inbox.");
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setErrorMessage(apiError?.data?.message || apiError?.error || "Please wait before resending.");
        }
    };

    // -------------------------------------------------------------------------
    // SUCCESS STATE
    // -------------------------------------------------------------------------
    if (status === "SUCCESS") {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="size-8" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-foreground">Email Verified!</h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">Your account has been fully verified and activated. You can now access all features on FindBookStay.</p>
                </div>

                <div className="pt-2">
                    <Link href="/auth/login" className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors shadow-xs">
                        <span>Continue to Sign In</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // VERIFYING IN PROGRESS
    // -------------------------------------------------------------------------
    if (status === "VERIFYING" || isFetching) {
        return (
            <div className="w-full text-center space-y-4 py-8 animate-in fade-in duration-200">
                <div className="size-12 mx-auto rounded-full bg-surface-secondary flex items-center justify-center text-primary animate-spin">
                    <RefreshCw className="size-6" />
                </div>
                <div className="space-y-1">
                    <h2 className="text-base font-bold text-foreground">Verifying your email...</h2>
                    <p className="text-xs text-text-secondary">Securing your account credentials with FindBookStay.</p>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // FORM / ERROR / MANUAL OTP ENTRY
    // -------------------------------------------------------------------------
    return (
        <div className="w-full animate-in fade-in duration-150">
            <AuthHeader category="Account Verification" title="Verify your email" subtitle="Enter your email and the 6-digit verification code sent to your inbox." />

            {infoMessage && <div className="mb-3 p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium">{infoMessage}</div>}

            {errorMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium flex items-start gap-2">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleManualVerify} className="space-y-3" noValidate>
                <AuthInput label="Account Email" name="email" type="email" placeholder="Enter your registered email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />

                <AuthInput label="6-Digit Verification Code" name="otp" type="text" inputMode="numeric" maxLength={6} placeholder="123456" icon={ShieldCheck} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} required />

                <div className="flex items-center justify-between text-xs pt-0.5">
                    <span className="text-text-secondary">Didn&apos;t receive the code?</span>
                    <button type="button" onClick={handleResend} disabled={countdown > 0 || isResending} className="inline-flex items-center gap-1 font-semibold text-primary disabled:text-text-secondary hover:underline cursor-pointer disabled:cursor-not-allowed">
                        <RefreshCw className={`size-3 ${isResending ? "animate-spin" : ""}`} />
                        <span>{countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}</span>
                    </button>
                </div>

                <div className="pt-1.5">
                    <AuthButton type="submit" isLoading={isFetching} icon={<ArrowRight className="size-3.5" />}>
                        Verify Email
                    </AuthButton>
                </div>
            </form>

            <div className="pt-3 border-t border-border mt-4 text-center">
                <Link href="/auth/login" className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer">
                    Already verified? Sign in here
                </Link>
            </div>
        </div>
    );
};

export default VerifyEmailView;
