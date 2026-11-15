"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from "lucide-react";
import AuthHeader from "./AuthHeader";
import { useLazyVerifyNewEmailQuery } from "@/redux/features/auth/authApi";

export const VerifyNewEmailView = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    const [triggerVerify] = useLazyVerifyNewEmailQuery();
    const [status, setStatus] = useState<"VERIFYING" | "SUCCESS" | "ERROR">(
        token && email ? "VERIFYING" : "ERROR"
    );
    const [errorMessage, setErrorMessage] = useState(
        token && email ? "" : "Invalid or missing verification link parameters."
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
                        "Failed to verify new email. The link may have expired or is invalid."
                    );
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [email, token, triggerVerify]);

    if (status === "SUCCESS") {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="size-8" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-foreground">Email Updated!</h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
                        Your account email has been successfully updated to <span className="font-semibold text-foreground">{email}</span>.
                    </p>
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

    if (status === "ERROR") {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-14 mx-auto rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                    <AlertCircle className="size-8" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-foreground">Verification Failed</h1>
                    <p className="text-sm text-destructive leading-relaxed max-w-sm mx-auto">{errorMessage}</p>
                </div>

                <div className="pt-2">
                    <Link href="/" className="cursor-pointer inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-secondary text-foreground text-xs font-semibold hover:bg-border transition-colors">
                        <span>Return to Home</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full text-center space-y-4 py-8 animate-in fade-in duration-200">
            <AuthHeader category="Account Security" title="Updating your email" subtitle="Verifying and updating your email address..." />
            <div className="size-12 mx-auto rounded-full bg-surface-secondary flex items-center justify-center text-primary animate-spin">
                <RefreshCw className="size-6" />
            </div>
        </div>
    );
};

export default VerifyNewEmailView;
