"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle, RefreshCw, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { cn } from "@/lib/utils";
import { useLazyVerifyEmailQuery, useResendVerificationEmailMutation } from "@/redux/features/auth/authApi";

// Zod Schema for Manual Email Verification
const verifyEmailSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email address is required")
        .email("Enter a valid email address"),
    otp: z
        .string()
        .trim()
        .min(6, "Verification code must be 6 digits")
        .max(6, "Verification code must be 6 digits")
        .regex(/^\d{6}$/, "Must be a 6-digit number"),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export const VerifyEmailView = () => {
    const searchParams = useSearchParams();
    const urlToken = searchParams.get("token") || "";
    const urlEmail = searchParams.get("email") || "";
    const urlOtp = searchParams.get("otp") || "";

    const [triggerVerifyEmail, { isFetching }] = useLazyVerifyEmailQuery();
    const [resendVerificationEmail, { isLoading: isResending }] = useResendVerificationEmailMutation();

    const [status, setStatus] = useState<"IDLE" | "VERIFYING" | "SUCCESS" | "ERROR">(
        urlEmail && (urlToken || urlOtp) ? "VERIFYING" : "IDLE"
    );
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const [countdown, setCountdown] = useState(0);
    const autoVerifiedRef = useRef(false);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<VerifyEmailFormData>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            email: urlEmail,
            otp: urlOtp,
        },
        mode: "onTouched",
    });

    // Cooldown countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    // Keep form values in sync if URL query parameters change
    useEffect(() => {
        if (urlEmail) setValue("email", urlEmail);
        if (urlOtp) setValue("otp", urlOtp);
    }, [urlEmail, urlOtp, setValue]);

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
                setErrorMessage(
                    apiError?.data?.message ||
                    apiError?.error ||
                    "Invalid or expired verification link. Please request a new one."
                );
            }
        },
        [triggerVerifyEmail]
    );

    // Auto-verify if token & email are provided in URL query parameters
    useEffect(() => {
        if (!urlEmail || (!urlToken && !urlOtp) || autoVerifiedRef.current) return;
        autoVerifiedRef.current = true;

        let isMounted = true;
        (async () => {
            try {
                await triggerVerifyEmail({
                    email: urlEmail.trim().toLowerCase(),
                    token: urlToken || undefined,
                    otp: urlOtp || undefined,
                }).unwrap();
                if (isMounted) setStatus("SUCCESS");
            } catch (err: unknown) {
                if (isMounted) {
                    setStatus("ERROR");
                    const apiError = err as { data?: { message?: string }; error?: string };
                    setErrorMessage(
                        apiError?.data?.message ||
                        apiError?.error ||
                        "Invalid or expired verification link. Please request a new one."
                    );
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [urlEmail, urlToken, urlOtp, triggerVerifyEmail]);

    // Handle manual form submission validated through Zod
    const onSubmit = async (data: VerifyEmailFormData) => {
        setErrorMessage("");
        setInfoMessage("");
        await executeVerification(data.email, urlToken || undefined, data.otp);
    };

    // Handle resending verification code
    const handleResend = async () => {
        if (countdown > 0 || isResending) return;

        const currentEmail = getValues("email")?.trim().toLowerCase();
        if (!currentEmail || !/^\S+@\S+\.\S+$/.test(currentEmail)) {
            setErrorMessage("Please enter a valid email to resend verification.");
            return;
        }

        setErrorMessage("");
        setInfoMessage("");

        try {
            await resendVerificationEmail({ email: currentEmail }).unwrap();
            setCountdown(60);
            setInfoMessage("A fresh verification code and link have been dispatched to your inbox.");
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
                    <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
                        Your account has been fully verified and activated. You can now access all features on FindBookStay.
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
    // FORM WITH REACT-HOOK-FORM + ZOD VALIDATION
    // -------------------------------------------------------------------------
    return (
        <div className="w-full animate-in fade-in duration-150">
            <AuthHeader
                category="Account Verification"
                title="Verify your email"
                subtitle="Enter your email and the 6-digit verification code sent to your inbox."
            />

            {infoMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                    {infoMessage}
                </div>
            )}

            {errorMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium flex items-start gap-2">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                <AuthInput
                    label="Account Email"
                    type="email"
                    placeholder="Enter your registered email"
                    icon={Mail}
                    error={errors.email?.message}
                    required
                    autoComplete="email"
                    {...register("email")}
                />

                <AuthInput
                    label="6-Digit Verification Code"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    icon={ShieldCheck}
                    error={errors.otp?.message}
                    required
                    {...register("otp")}
                />

                <div className="flex items-center justify-between text-xs pt-0.5">
                    <span className="text-text-secondary">Didn&apos;t receive the code?</span>
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={countdown > 0 || isResending}
                        className={cn(
                            "inline-flex items-center gap-1 font-semibold transition-colors",
                            countdown > 0 || isResending
                                ? "text-text-secondary cursor-not-allowed"
                                : "text-primary hover:underline cursor-pointer"
                        )}
                    >
                        <RefreshCw className={`size-3 ${isResending ? "animate-spin" : ""}`} />
                        <span>{countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}</span>
                    </button>
                </div>

                <div className="pt-1.5">
                    <AuthButton
                        type="submit"
                        isLoading={isFetching}
                        icon={<ArrowRight className="size-3.5" />}
                    >
                        Verify Email
                    </AuthButton>
                </div>
            </form>

            <div className="pt-3 border-t border-border mt-4 text-center">
                <Link
                    href="/auth/login"
                    className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                    Already verified? Sign in here
                </Link>
            </div>
        </div>
    );
};

export default VerifyEmailView;
