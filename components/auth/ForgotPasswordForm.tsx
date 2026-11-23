"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Mail, RefreshCw } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import OtpInput from "./OtpInput";
import { cn } from "@/lib/utils";
import { useForgotPasswordMutation, useVerifyOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";
import { useLocale } from "@/hooks/useLocale";

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
    const { isBn } = useLocale();
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
        control: controlOtp,
        handleSubmit: handleSubmitOtp,
        reset: resetOtp,
        setValue: setValueOtp,
        formState: { errors: otpErrors },
    } = useForm<VerifyOtpFormData>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: { otp: "" },
        mode: "onTouched",
    });

    const otpValue = useWatch({ control: controlOtp, name: "otp" }) || "";

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
            setSuccessMessage(
                isBn
                    ? `${cleanEmail} ঠিকানায় ৬-সংখ্যার একটি যাচাইকরণ কোড পাঠানো হয়েছে।`
                    : `A 6-digit verification code has been dispatched to ${cleanEmail}.`
            );
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setServerError(
                apiError?.data?.message ||
                apiError?.error ||
                (isBn ? "রিসেট কোড পাঠানো সম্ভব হয়নি। আবার চেষ্টা করুন।" : "Unable to send reset code. Please try again.")
            );
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
            setServerError(
                apiError?.data?.message ||
                apiError?.error ||
                (isBn ? "ভুল বা মেয়াদোত্তীর্ণ ওটিপি কোড।" : "Invalid or expired verification code.")
            );
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
            setSuccessMessage(isBn ? "একটি নতুন যাচাইকরণ কোড পাঠানো হয়েছে।" : "A fresh verification code has been sent.");
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setServerError(
                apiError?.data?.message ||
                apiError?.error ||
                (isBn ? "পুনরায় কোড পাঠানোর জন্য অনুগ্রহ করে অপেক্ষা করুন।" : "Please wait before requesting another code.")
            );
        }
    };

    // -------------------------------------------------------------------------
    // STEP 2: ENTER OTP CODE
    // -------------------------------------------------------------------------
    if (step === "ENTER_OTP") {
        return (
            <div className="w-full animate-in fade-in duration-200">
                <AuthHeader
                    category={isBn ? "ধাপ ২ এর ২" : "Step 2 of 2"}
                    title={isBn ? "যাচাইকরণ কোড লিখুন" : "Enter verification code"}
                    subtitle={
                        isBn
                            ? `${submittedEmail} এ প্রেরিত ৬-সংখ্যার কোডটি লিখুন। কোডের মেয়াদ ৫ মিনিট।`
                            : `Please enter the 6-digit code sent to ${submittedEmail}. Code expires in 5 minutes.`
                    }
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

                <form onSubmit={handleSubmitOtp(onVerifyOtpSubmit)} className="space-y-4" noValidate>
                    <div className="space-y-2">
                        <label className="block text-center text-xs font-semibold text-text-secondary">
                            {isBn ? "৬-সংখ্যার নিরাপত্তা কোড" : "6-Digit Security Code"}
                        </label>
                        <OtpInput
                            value={otpValue}
                            onChange={(val) => {
                                setValueOtp("otp", val, { shouldValidate: true });
                                if (serverError) setServerError("");
                            }}
                            length={6}
                            error={Boolean(otpErrors.otp?.message || serverError)}
                            disabled={isVerifyingOtp}
                        />
                        {otpErrors.otp?.message && (
                            <p className="text-center text-xs text-destructive mt-1">
                                {isBn ? "৬-সংখ্যার সঠিক কোড লিখুন" : otpErrors.otp.message}
                            </p>
                        )}
                    </div>

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
                            {isBn ? "ইমেইল পরিবর্তন করুন" : "Change email address"}
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
                            <span>
                                {countdown > 0
                                    ? (isBn ? `${countdown} সেকেন্ড পর পুনরায় পাঠান` : `Resend in ${countdown}s`)
                                    : (isBn ? "পুনরায় কোড পাঠান" : "Resend code")}
                            </span>
                        </button>
                    </div>

                    <div className="pt-1.5">
                        <AuthButton
                            type="submit"
                            isLoading={isVerifyingOtp}
                            icon={<ArrowRight className="size-3.5" />}
                        >
                            {isBn ? "যাচাই করে এগিয়ে যান" : "Verify & Proceed"}
                        </AuthButton>
                    </div>
                </form>

                <div className="pt-3 border-t border-border mt-4 text-center">
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>{isBn ? "লগইনে ফিরে যান" : "Return to sign in"}</span>
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
                category={isBn ? "অ্যাকাউন্ট পুনরুদ্ধার" : "Password Recovery"}
                title={isBn ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forgot password?"}
                subtitle={
                    isBn
                        ? "আপনার যাচাইকৃত অ্যাকাউন্ট ইমেইল লিখুন, আমরা একটি নিরাপদ ৬-সংখ্যার কোড পাঠাব।"
                        : "Enter your verified account email and we'll dispatch a secure 6-digit OTP code."
                }
            />

            {serverError && (
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmitEmail(onRequestEmailSubmit)} className="space-y-2.5" noValidate>
                <AuthInput
                    label={isBn ? "অ্যাকাউন্ট ইমেইল" : "Account Email"}
                    type="email"
                    placeholder="name@example.com"
                    icon={Mail}
                    error={emailErrors.email ? (isBn ? "সঠিক ইমেইল ঠিকানা দিন" : emailErrors.email.message) : undefined}
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
                        {isBn ? "যাচাইকরণ কোড পাঠান" : "Send Verification Code"}
                    </AuthButton>
                </div>
            </form>

            <div className="pt-3 border-t border-border mt-4 text-center">
                <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>{isBn ? "লগইনে ফিরে যান" : "Back to sign in"}</span>
                </Link>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;