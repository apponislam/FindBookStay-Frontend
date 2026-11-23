"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthLoading from "./AuthLoading";
import { useLazyVerifyNewEmailQuery } from "@/redux/features/auth/authApi";
import { useLocale } from "@/hooks/useLocale";

export const VerifyNewEmailView = () => {
    const { isBn } = useLocale();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    const [triggerVerify] = useLazyVerifyNewEmailQuery();
    const [status, setStatus] = useState<"VERIFYING" | "SUCCESS" | "ERROR">(
        token && email ? "VERIFYING" : "ERROR"
    );
    const [errorMessage, setErrorMessage] = useState(
        token && email ? "" : (isBn ? "ভুল বা অনুপস্থিত যাচাইকরণ লিংক প্যারামিটার।" : "Invalid or missing verification link parameters.")
    );
    const verifiedRef = useRef(false);

    useEffect(() => {
        if (!token || !email || verifiedRef.current) return;
        verifiedRef.current = true;

        let isMounted = true;
        (async () => {
            try {
                await triggerVerify({ email, token }).unwrap();
                if (isMounted) setStatus("SUCCESS");
            } catch (err: unknown) {
                if (isMounted) {
                    setStatus("ERROR");
                    const apiError = err as { data?: { message?: string }; error?: string };
                    setErrorMessage(
                        apiError?.data?.message ||
                        apiError?.error ||
                        (isBn ? "নতুন ইমেইল যাচাই ব্যর্থ হয়েছে। লিংকের মেয়াদ শেষ হয়ে থাকতে পারে।" : "Failed to verify new email. The link may have expired or is invalid.")
                    );
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [email, token, triggerVerify, isBn]);

    if (status === "SUCCESS") {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="size-8" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-foreground">
                        {isBn ? "ইমেইল আপডেট সম্পন্ন হয়েছে!" : "Email Updated!"}
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
                        {isBn ? (
                            <>
                                আপনার অ্যাকাউন্ট ইমেইল সফলভাবে <span className="font-semibold text-foreground">{email}</span> এ পরিবর্তিত হয়েছে।
                            </>
                        ) : (
                            <>
                                Your account email has been successfully updated to <span className="font-semibold text-foreground">{email}</span>.
                            </>
                        )}
                    </p>
                </div>

                <div className="pt-2">
                    <Link href="/auth/login" className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors shadow-xs">
                        <span>{isBn ? "লগইন করতে এগিয়ে যান" : "Continue to Sign In"}</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        );
    }

    if (status === "ERROR") {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-14 mx-auto rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                    <AlertCircle className="size-8" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-foreground">
                        {isBn ? "যাচাইকরণ ব্যর্থ হয়েছে" : "Verification Failed"}
                    </h1>
                    <p className="text-sm text-destructive leading-relaxed max-w-sm mx-auto">{errorMessage}</p>
                </div>

                <div className="pt-2">
                    <Link href="/" className="cursor-pointer inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-secondary text-foreground text-xs font-semibold hover:bg-border transition-colors">
                        <span>{isBn ? "হোমপেজে ফিরে যান" : "Return to Home"}</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full text-center space-y-4 py-4 animate-in fade-in duration-200">
            <AuthHeader
                category={isBn ? "অ্যাকাউন্ট নিরাপত্তা" : "Account Security"}
                title={isBn ? "ইমেইল আপডেট করা হচ্ছে" : "Updating your email"}
                subtitle={isBn ? "আপনার নতুন ইমেইল ঠিকানা যাচাই ও আপডেট করা হচ্ছে..." : "Verifying and updating your email address..."}
            />
            <AuthLoading message={null} />
        </div>
    );
};

export default VerifyNewEmailView;