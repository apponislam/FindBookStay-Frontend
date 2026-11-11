"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthCheckbox from "./AuthCheckbox";
import AuthButton from "./AuthButton";
import AuthFooterLink from "./AuthFooterLink";

interface RegisterFormProps {
    onSuccess?: () => void;
    redirectUrl?: string;
}

export const RegisterForm = ({ onSuccess, redirectUrl = "/" }: RegisterFormProps) => {
    const [accountType, setAccountType] = useState<"individual" | "partner">("individual");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const getPasswordScore = (pass: string) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const passwordScore = getPasswordScore(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const newErrors: Record<string, string> = {};
        if (!fullName.trim()) {
            newErrors.fullName = "Please enter your full name";
        }
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        if (!agreeToTerms) {
            newErrors.terms = "You must agree to the Terms of Service to continue";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 900));

            if (onSuccess) {
                onSuccess();
            } else {
                window.location.href = redirectUrl;
            }
        } catch {
            setErrors({ general: "Failed to create account. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <AuthHeader
                category="New Registration"
                title="Create your account"
                subtitle="Join FindBookStay to discover verified stays, rent apartments, or list properties."
            />

            {errors.general && (
                <div className="mb-5 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 font-medium">
                    {errors.general}
                </div>
            )}

            {/* Account Type Selector */}
            <div className="mb-5">
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F0F5F3] dark:bg-[#192824] rounded-xl">
                    <button
                        type="button"
                        onClick={() => setAccountType("individual")}
                        className={`cursor-pointer py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                            accountType === "individual"
                                ? "bg-white dark:bg-[#111C1A] text-[#073B35] dark:text-[#34D399] shadow-xs"
                                : "text-[#64748B] dark:text-[#A3B5AE] hover:text-[#172B2A] dark:hover:text-white"
                        }`}
                    >
                        Tenant / Guest
                    </button>

                    <button
                        type="button"
                        onClick={() => setAccountType("partner")}
                        className={`cursor-pointer py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                            accountType === "partner"
                                ? "bg-white dark:bg-[#111C1A] text-[#073B35] dark:text-[#34D399] shadow-xs"
                                : "text-[#64748B] dark:text-[#A3B5AE] hover:text-[#172B2A] dark:hover:text-white"
                        }`}
                    >
                        Host / Landlord
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                <AuthInput
                    label="Full Name"
                    name="fullName"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={errors.fullName}
                    required
                    autoComplete="name"
                />

                <AuthInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    required
                    autoComplete="email"
                />

                <AuthInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+880 1XXXXXXXXX (Optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                />

                <div className="space-y-1.5">
                    <AuthInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Minimum 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        required
                        autoComplete="new-password"
                    />

                    {password && (
                        <div className="pt-1 space-y-1">
                            <div className="grid grid-cols-4 gap-1.5 h-1">
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        className={`rounded-full h-full transition-colors ${
                                            passwordScore >= step
                                                ? passwordScore <= 1
                                                    ? "bg-rose-500"
                                                    : passwordScore === 2
                                                    ? "bg-amber-500"
                                                    : "bg-[#10B981]"
                                                : "bg-[#E2EAE6] dark:bg-[#263B34]"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-1">
                    <AuthCheckbox
                        id="agree-terms"
                        checked={agreeToTerms}
                        onChange={setAgreeToTerms}
                        error={errors.terms}
                        label={
                            <span>
                                I accept the{" "}
                                <Link
                                    href="/terms"
                                    target="_blank"
                                    className="font-medium text-[#10B981] hover:underline"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and acknowledge the{" "}
                                <Link
                                    href="/privacy"
                                    target="_blank"
                                    className="font-medium text-[#10B981] hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </span>
                        }
                    />
                </div>

                <div className="pt-3">
                    <AuthButton
                        type="submit"
                        isLoading={isLoading}
                        icon={<ArrowRight className="size-4" />}
                    >
                        {accountType === "partner"
                            ? "Register Host Account"
                            : "Create Account"}
                    </AuthButton>
                </div>
            </form>

            <div className="pt-6 border-t border-[#E2EAE6] dark:border-[#263B34] mt-8">
                <AuthFooterLink
                    promptText="Already have an account?"
                    linkText="Sign in"
                    href="/auth/login"
                />
            </div>
        </div>
    );
};

export default RegisterForm;
