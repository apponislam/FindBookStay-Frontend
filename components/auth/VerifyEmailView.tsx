"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, RefreshCw, ArrowRight, Mail, Edit2 } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthButton from "./AuthButton";
import AuthLoading from "./AuthLoading";
import OtpInput from "./OtpInput";
import { cn } from "@/lib/utils";
import { useLazyVerifyEmailQuery, useResendVerificationEmailMutation } from "@/redux/features/auth/authApi";
import { useLocale } from "@/hooks/useLocale";

export const VerifyEmailView = () => {
    const { isBn } = useLocale();
    const searchParams = useSearchParams();
    const urlToken = searchParams.get("token") || "";
    const urlEmail = searchParams.get("email") || "";
    const urlOtp = searchParams.get("otp") || "";

    const [triggerVerifyEmail, { isFetching }] = useLazyVerifyEmailQuery();
    const [resendVerificationEmail, { isLoading: isResending }] = useResendVerificationEmailMutation();

    const [email, setEmail] = useState(urlEmail);
    const [isEditingEmail, setIsEditingEmail] = useState(!urlEmail);
    const [otp, setOtp] = useState(urlOtp || "");

    const [status, setStatus] = useState<"IDLE" | "VERIFYING" | "SUCCESS" | "ERROR">(
        urlEmail && urlToken ? "VERIFYING" : "IDLE"
    );
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const [countdown, setCountdown] = useState(0);
    const autoVerifiedRef = useRef(false);

    // Cooldown countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const executeVerification = useCallback(
        async (targetEmail: string, tokenVal?: string, otpVal?: string) => {
            const cleanEmail = targetEmail.trim().toLowerCase();
            if (!cleanEmail) {
                setStatus("ERROR");
                setErrorMessage(isBn ? "ইমেইল ঠিকানা প্রদান আবশ্যক।" : "Email address is required.");
                return;
            }

            if (!tokenVal && (!otpVal || otpVal.length !== 6)) {
                setStatus("ERROR");
                setErrorMessage(isBn ? "অনুগ্রহ করে ৬-সংখ্যার সম্পূর্ণ কোডটি লিখুন।" : "Please enter all 6 digits of the verification code.");
                return;
            }

            setStatus("VERIFYING");
            setErrorMessage("");
            setInfoMessage("");

            try {
                await triggerVerifyEmail({
                    email: cleanEmail,
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
                    (isBn ? "ভুল বা মেয়াদোত্তীর্ণ ওটিপি কোড। অনুগ্রহ করে পুনরায় চেষ্টা করুন।" : "Invalid or expired verification code. Please check and try again.")
                );
            }
        },
        [triggerVerifyEmail, isBn]
    );

    // Auto-verify if full link token & email are provided in URL query parameters
    useEffect(() => {
        if (!urlEmail || !urlToken || autoVerifiedRef.current) return;
        autoVerifiedRef.current = true;

        let isMounted = true;
        (async () => {
            try {
                await triggerVerifyEmail({
                    email: urlEmail.trim().toLowerCase(),
                    token: urlToken,
                }).unwrap();
                if (isMounted) setStatus("SUCCESS");
            } catch (err: unknown) {
                if (isMounted) {
                    setStatus("ERROR");
                    const apiError = err as { data?: { message?: string }; error?: string };
                    setErrorMessage(
                        apiError?.data?.message ||
                        apiError?.error ||
                        (isBn ? "স্বয়ংক্রিয় যাচাইকরণ ব্যর্থ হয়েছে।" : "Automated email link verification failed.")
                    );
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [urlEmail, urlToken, triggerVerifyEmail, isBn]);

    // Manual Form Submission with OTP Code
    const handleManualVerify = (e: React.FormEvent) => {
        e.preventDefault();
        executeVerification(email, undefined, otp);
    };

    // Resend verification email
    const handleResend = async () => {
        if (countdown > 0 || isResending || !email.trim()) return;
        setErrorMessage("");
        setInfoMessage("");

        try {
            await resendVerificationEmail({ email: email.trim().toLowerCase() }).unwrap();
            setCountdown(60);
            setOtp("");
            setInfoMessage(isBn ? "একটি নতুন ৬-সংখ্যার কোড পাঠানো হয়েছে।" : "A fresh 6-digit verification code has been dispatched.");
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setErrorMessage(
                apiError?.data?.message ||
                apiError?.error ||
                (isBn ? "কোড পুনরায় পাঠাতে কিছুক্ষণ অপেক্ষা করুন।" : "Please wait before requesting another code.")
            );
        }
    };

    // -------------------------------------------------------------------------
    // SUCCESS STATE
    // -------------------------------------------------------------------------
    if (status === "SUCCESS") {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-xs">
                    <CheckCircle2 className="size-8" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                        {isBn ? "ইমেইল সফলভাবে যাচাই হয়েছে!" : "Email Verified!"}
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
                        {isBn
                            ? "আপনার অ্যাকাউন্ট সক্রিয় করা হয়েছে। এখন FindBookStay-এর সকল সুবিধা উপভোগ করুন।"
                            : "Your account has been fully verified and activated. You can now access all features on FindBookStay."}
                    </p>
                </div>

                <div className="pt-2">
                    <Link
                        href="/auth/login"
                        className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors shadow-xs"
                    >
                        <span>{isBn ? "লগইন করতে এগিয়ে যান" : "Continue to Sign In"}</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // VERIFYING IN PROGRESS (Automated Token Link)
    // -------------------------------------------------------------------------
    if (status === "VERIFYING" && isFetching && urlToken) {
        return (
            <AuthLoading
                message={isBn ? "ইমেইল যাচাই করা হচ্ছে..." : "Verifying your email..."}
                description={isBn ? "FindBookStay-তে আপনার অ্যাকাউন্ট সুরক্ষিত করা হচ্ছে।" : "Securing your account credentials with FindBookStay."}
            />
        );
    }

    // -------------------------------------------------------------------------
    // 6-BOX OTP VERIFICATION FORM
    // -------------------------------------------------------------------------
    return (
        <div className="w-full animate-in fade-in duration-150">
            <AuthHeader
                category={isBn ? "অ্যাকাউন্ট যাচাইকরণ" : "Account Verification"}
                title={isBn ? "আপনার ইমেইল যাচাই করুন" : "Verify Your Email"}
                subtitle={
                    isBn
                        ? "আপনার ইনবক্সে প্রেরিত ৬-সংখ্যার কোডটি লিখুন।"
                        : "Enter the 6-digit verification code sent to your inbox."
                }
            />

            {/* Email display / edit box */}
            <div className="mb-4 p-3 rounded-xl bg-surface-secondary border border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                    <Mail className="size-4 text-text-secondary shrink-0" />
                    {isEditingEmail ? (
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={isBn ? "আপনার নিবন্ধিত ইমেইল লিখুন" : "Enter your registered email"}
                            className="bg-transparent border-b border-primary/50 text-foreground font-medium outline-none text-xs w-full py-0.5"
                            autoFocus
                        />
                    ) : (
                        <div className="truncate">
                            <span className="text-text-secondary">{isBn ? "কোড পাঠানো হয়েছে: " : "Code sent to: "}</span>
                            <span className="font-semibold text-foreground">{email || (isBn ? "আপনার ইমেইলে" : "your email")}</span>
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => setIsEditingEmail((prev) => !prev)}
                    className="text-[11px] font-semibold text-primary hover:underline cursor-pointer shrink-0 ml-2 inline-flex items-center gap-1"
                >
                    <Edit2 className="size-3" />
                    <span>
                        {isEditingEmail
                            ? (isBn ? "সম্পন্ন" : "Done")
                            : (isBn ? "পরিবর্তন" : "Change")}
                    </span>
                </button>
            </div>

            {infoMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium animate-in fade-in duration-150">
                    {infoMessage}
                </div>
            )}

            {errorMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium flex items-start gap-2 animate-in fade-in duration-150">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleManualVerify} className="space-y-4" noValidate>
                {/* 6 Same-Size OTP Boxes */}
                <div className="space-y-2">
                    <label className="block text-center text-xs font-semibold text-text-secondary">
                        {isBn ? "৬-সংখ্যার নিরাপত্তা কোড" : "6-Digit Security Code"}
                    </label>
                    <OtpInput
                        value={otp}
                        onChange={(val) => {
                            setOtp(val);
                            if (errorMessage) setErrorMessage("");
                            if (val.length === 6) {
                                executeVerification(email, undefined, val);
                            }
                        }}
                        length={6}
                        disabled={status === "VERIFYING"}
                        error={status === "ERROR"}
                    />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-text-secondary">
                        {isBn ? "কোড পাননি?" : "Didn't receive the code?"}
                    </span>
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
                        <span>
                            {countdown > 0
                                ? (isBn ? `${countdown} সেকেন্ড পর চেষ্টা করুন` : `Resend in ${countdown}s`)
                                : (isBn ? "কোড পুনরায় পাঠান" : "Resend code")}
                        </span>
                    </button>
                </div>

                <div className="pt-2">
                    <AuthButton
                        type="submit"
                        isLoading={status === "VERIFYING"}
                        disabled={otp.length !== 6 || status === "VERIFYING"}
                        icon={<ArrowRight className="size-3.5" />}
                    >
                        {isBn ? "যাচাই করে সম্পন্ন করুন" : "Verify & Complete"}
                    </AuthButton>
                </div>
            </form>

            <div className="pt-3 border-t border-border mt-4 text-center">
                <Link
                    href="/auth/login"
                    className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                    {isBn ? "লগইনে ফিরে যান" : "Return to sign in"}
                </Link>
            </div>
        </div>
    );
};

export default VerifyEmailView;