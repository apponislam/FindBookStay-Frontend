"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, ShieldCheck, Mail, RefreshCw } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { cn } from "@/lib/utils";
import { useForgotPasswordMutation, useVerifyOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";

// Zod Schemas for the 2 Steps
const requestOtpSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email address is required")
        .email("Enter a valid email address"),
});

const verifyOtpSchema = z.object({
    otp: z
        .string()
        .trim()
        .min(6, "Verification code must be 6 digits")
        .max(6, "Verification code must be 6 digits")
        .regex(/^\d{6}$/, "Must be a 6-digit number"),
});

type RequestOtpFormData = z.infer<typeof requestOtpSchema>;
type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

export const ForgotPasswordForm = () => {
    const router = useRouter();

    const [forgotPasswordMutation, { isLoading: isSendingOtp }] = useForgotPasswordMutation();
    const [verifyOtpMutation, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
    const [resendOtpMutation, { isLoading: isResendingOtp }] = useResendOtpMutation();

    const [submittedEmail, setSubmittedEmail] = useState("");
    const [step, setStep] = useState<"REQUEST_EMAIL" | "ENTER_OTP">("REQUEST_EMAIL");
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [countdown, setCountdown] = useState(0);

    // Form 1: Request Email
    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: emailErrors },
    } = useForm<RequestOtpFormData>({
        resolver: zodResolver(requestOtpSchema),
        defaultValues: { email: "" },
        mode: "onTouched",
    });

    // Form 2: Verify OTP
    const {
        register: registerOtp,
        handleSubmit: handleSubmitOtp,
        reset: resetOtp,
        formState: { errors: otpErrors },
    } = useForm<VerifyOtpFormData>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: { otp: "" },
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

    // Step 1: Dispatch OTP request
    const onRequestEmailSubmit = async (data: RequestOtpFormData) => {
        setServerError("");
        setSuccessMessage("");
        const cleanEmail = data.email.trim().toLowerCase();

        try {
            await forgotPasswordMutation({ email: cleanEmail }).unwrap();
            setSubmittedEmail(cleanEmail);
            setStep("ENTER_OTP");
            setCountdown(60);
            setSuccessMessage(`A 6-digit verification code has been dispatched to ${cleanEmail}.`);
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setServerError(apiError?.data?.message || apiError?.error || "Unable to send reset code. Please try again.");
        }
    };

    // Step 2: Verify the 6-Digit OTP
    const onVerifyOtpSubmit = async (data: VerifyOtpFormData) => {
        setServerError("");

        try {
            const res = await verifyOtpMutation({
                email: submittedEmail,
                otp: data.otp.trim(),
            }).unwrap();

            if (res.data?.token) {
                router.push(
                    `/auth/reset-password?token=${encodeURIComponent(res.data.token)}&email=${encodeURIComponent(submittedEmail)}`
                );
            }
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setServerError(apiError?.data?.message || apiError?.error || "Invalid or expired verification code.");
        }
    };

    // Resend OTP with cooldown
    const handleResendOtp = async () => {
        if (countdown > 0 || isResendingOtp || !submittedEmail) return;
        setServerError("");
        setSuccessMessage("");

        try {
            await resendOtpMutation({ email: submittedEmail }).unwrap();
            setCountdown(60);
            resetOtp({ otp: "" });
            setSuccessMessage("A fresh verification code has been sent.");
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setServerError(apiError?.data?.message || apiError?.error || "Please wait before requesting another code.");
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
                    subtitle={`Please enter the 6-digit code sent to ${submittedEmail}. Code expires in 5 minutes.`}
                />

                {successMessage && (
                    <div className="mb-3 p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                        {successMessage}
                    </div>
                )}

                {serverError && (
                    <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmitOtp(onVerifyOtpSubmit)} className="space-y-3" noValidate>
                    <AuthInput
                        label="6-Digit Verification Code"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="123456"
                        icon={ShieldCheck}
                        error={otpErrors.otp?.message}
                        required
                        autoFocus
                        {...registerOtp("otp")}
                    />

                    <div className="flex items-center justify-between text-xs pt-0.5">
                        <button
                            type="button"
                            onClick={() => {
                                setStep("REQUEST_EMAIL");
                                setServerError("");
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
                            className={cn(
                                "inline-flex items-center gap-1 font-semibold transition-colors",
                                countdown > 0 || isResendingOtp
                                    ? "text-text-secondary cursor-not-allowed"
                                    : "text-primary hover:underline cursor-pointer"
                            )}
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

            {serverError && (
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmitEmail(onRequestEmailSubmit)} className="space-y-2.5" noValidate>
                <AuthInput
                    label="Account Email"
                    type="email"
                    placeholder="Enter account email"
                    icon={Mail}
                    error={emailErrors.email?.message}
                    required
                    autoComplete="email"
                    {...registerEmail("email")}
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
