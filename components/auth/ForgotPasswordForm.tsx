"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            setIsSubmitted(true);
        } catch {
            setError("Unable to process request right now. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <CheckCircle2 className="size-7" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-foreground">
                        Check your inbox
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                        Instructions have been sent to{" "}
                        <span className="font-semibold text-foreground">{email}</span>.
                    </p>
                </div>

                <div className="pt-2 space-y-3">
                    <Link
                        href="/auth/login"
                        className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
                    >
                        <span>Return to Sign In</span>
                        <ArrowRight className="size-4" />
                    </Link>

                    <div>
                        <button
                            type="button"
                            onClick={() => setIsSubmitted(false)}
                            className="cursor-pointer text-xs text-text-secondary hover:text-foreground transition-colors"
                        >
                            Didn&apos;t receive email? <span className="text-primary underline">Click to retry</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <AuthHeader
                category="Password Recovery"
                title="Forgot password?"
                subtitle="Enter your verified account email address and we'll dispatch password reset instructions."
            />

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <AuthInput
                    label="Account Email"
                    name="email"
                    type="email"
                    placeholder="Enter account email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                    required
                    autoComplete="email"
                />

                <div className="pt-2">
                    <AuthButton
                        type="submit"
                        isLoading={isLoading}
                        icon={<ArrowRight className="size-4" />}
                    >
                        Send Instructions
                    </AuthButton>
                </div>
            </form>

            <div className="pt-6 border-t border-border mt-8 text-center">
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
