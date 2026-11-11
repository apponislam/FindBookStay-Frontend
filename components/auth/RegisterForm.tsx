"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowLeft, Building2, User } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthCheckbox from "./AuthCheckbox";
import AuthButton from "./AuthButton";
import AuthFooterLink from "./AuthFooterLink";
import { cn } from "@/lib/utils";

interface RegisterFormProps {
    onSuccess?: () => void;
    redirectUrl?: string;
}

type Role = "individual" | "partner";

// Zod Schema for Registration Form
const registerSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(60, "Name cannot exceed 60 characters"),
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    phone: z
        .string()
        .trim()
        .optional()
        .refine(
            (val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(val),
            "Enter a valid phone number"
        ),
    password: z
        .string()
        .min(8, "Must be at least 8 characters")
        .regex(/[0-9]/, "Must contain at least 1 number"),
    agreeToTerms: z
        .boolean()
        .refine((val) => val === true, "Must accept the terms"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = ({ onSuccess, redirectUrl = "/" }: RegisterFormProps) => {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
            agreeToTerms: false,
        },
        mode: "onTouched",
    });

    const passwordValue = useWatch({ control, name: "password" }) || "";
    const agreeToTermsValue = useWatch({ control, name: "agreeToTerms" });

    const getPasswordScore = (pass: string) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const passwordScore = getPasswordScore(passwordValue);

    const onSubmit = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 900));

            if (onSuccess) {
                onSuccess();
            } else {
                router.push(redirectUrl);
            }
        } catch {
            setError("root", { message: "Failed to create account. Please try again." });
        }
    };

    // -------------------------------------------------------------------------
    // STEP 1: ROLE SELECTION
    // -------------------------------------------------------------------------
    if (!selectedRole) {
        return (
            <div className="w-full animate-in fade-in slide-in-from-bottom-1 duration-200">
                <AuthHeader
                    category="Step 1 of 2"
                    title="Select your role"
                    subtitle="Choose how you want to use FindBookStay to continue."
                />

                {/* 2-Column Modern Role Selection Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                    {/* Role Card 1: Tenant / Guest / Player */}
                    <button
                        type="button"
                        onClick={() => setSelectedRole("individual")}
                        className="group cursor-pointer relative text-left p-4.5 rounded-2xl border border-border hover:border-primary bg-input/70 hover:bg-surface-secondary/50 transition-all duration-200 flex flex-col justify-between active:scale-[0.98] hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <div>
                            {/* Top bar with icon and micro indicator */}
                            <div className="flex items-center justify-between mb-3.5">
                                <div className="size-10 rounded-xl bg-surface-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-200 shadow-2xs">
                                    <User className="size-5" />
                                </div>
                                <div className="size-7 rounded-full border border-border/80 flex items-center justify-center text-text-secondary group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </div>
                            </div>

                            <h2 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                                Tenant, Guest or Player
                            </h2>
                            <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                                Rent family apartments, bachelor seats, book hotel stays, or reserve sports turfs.
                            </p>
                        </div>

                        {/* Interactive footer row */}
                        <div className="pt-3.5 mt-3.5 border-t border-border/80 flex items-center justify-between">
                            <span className="text-[11px] font-medium text-text-secondary group-hover:text-foreground transition-colors">
                                Select role
                            </span>
                            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1">
                                <span>Get started</span>
                                <ArrowRight className="size-3" />
                            </div>
                        </div>
                    </button>

                    {/* Role Card 2: Host / Landlord / Turf Owner */}
                    <button
                        type="button"
                        onClick={() => setSelectedRole("partner")}
                        className="group cursor-pointer relative text-left p-4.5 rounded-2xl border border-border hover:border-primary bg-input/70 hover:bg-surface-secondary/50 transition-all duration-200 flex flex-col justify-between active:scale-[0.98] hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <div>
                            {/* Top bar with icon and micro indicator */}
                            <div className="flex items-center justify-between mb-3.5">
                                <div className="size-10 rounded-xl bg-surface-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-200 shadow-2xs">
                                    <Building2 className="size-5" />
                                </div>
                                <div className="size-7 rounded-full border border-border/80 flex items-center justify-center text-text-secondary group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </div>
                            </div>

                            <h2 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                                Host, Landlord or Turf Owner
                            </h2>
                            <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                                List residential properties, rent shared seats, or manage sports turf reservations.
                            </p>
                        </div>

                        {/* Interactive footer row */}
                        <div className="pt-3.5 mt-3.5 border-t border-border/80 flex items-center justify-between">
                            <span className="text-[11px] font-medium text-text-secondary group-hover:text-foreground transition-colors">
                                Select role
                            </span>
                            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1">
                                <span>Get started</span>
                                <ArrowRight className="size-3" />
                            </div>
                        </div>
                    </button>
                </div>

                <div className="pt-3 border-t border-border mt-4">
                    <AuthFooterLink
                        promptText="Already have an account?"
                        linkText="Sign in"
                        href="/auth/login"
                    />
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // STEP 2: REGISTRATION FORM FOR THE SELECTED ROLE
    // -------------------------------------------------------------------------
    const isPartner = selectedRole === "partner";

    return (
        <div className="w-full animate-in fade-in duration-150">
            {/* Header Switcher: 1-Click Role Switch & Back Arrow */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                <button
                    type="button"
                    onClick={() => {
                        setSelectedRole(null);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-text-secondary hover:text-foreground transition-colors cursor-pointer group"
                >
                    <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
                    <span>Back to roles</span>
                </button>

                <div className="inline-flex items-center gap-0.5 p-0.5 bg-surface-secondary rounded-lg">
                    <button
                        type="button"
                        onClick={() => setSelectedRole("individual")}
                        className={cn(
                            "px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer",
                            !isPartner
                                ? "bg-surface text-primary shadow-xs"
                                : "text-text-secondary hover:text-foreground"
                        )}
                    >
                        Tenant
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedRole("partner")}
                        className={cn(
                            "px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer",
                            isPartner
                                ? "bg-surface text-primary shadow-xs"
                                : "text-text-secondary hover:text-foreground"
                        )}
                    >
                        Host
                    </button>
                </div>
            </div>

            <AuthHeader
                category={isPartner ? "Host Account" : "Tenant Account"}
                title="Create your account"
                subtitle={
                    isPartner
                        ? "Register to start listing residential spaces, rooms, or sports turf facilities."
                        : "Register to discover verified stays, rent apartments, and book sports turfs."
                }
            />

            {errors.root?.message && (
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium">
                    {errors.root.message}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5" noValidate>
                <AuthInput
                    label="Full Name"
                    type="text"
                    placeholder={
                        isPartner
                            ? "e.g. David Miller (or Agency / Property Name)"
                            : "e.g. Alex Tan or Sarah Jenkins"
                    }
                    error={errors.fullName?.message}
                    required
                    autoComplete="name"
                    {...register("fullName")}
                />

                <AuthInput
                    label="Email Address"
                    type="email"
                    placeholder={
                        isPartner
                            ? "host@example.com (for booking inquiries)"
                            : "alex.tan@example.com (for booking confirmations)"
                    }
                    error={errors.email?.message}
                    required
                    autoComplete="email"
                    {...register("email")}
                />

                <AuthInput
                    label="Phone Number"
                    type="tel"
                    placeholder={
                        isPartner
                            ? "e.g. +880 1712-345678 (for tenant inquiries)"
                            : "e.g. +880 1712-345678 (optional, for SMS alerts)"
                    }
                    error={errors.phone?.message}
                    autoComplete="tel"
                    {...register("phone")}
                />

                <div className="space-y-1">
                    <AuthInput
                        label="Password"
                        type="password"
                        placeholder="Min. 8 characters with at least 1 number"
                        error={errors.password?.message}
                        required
                        autoComplete="new-password"
                        {...register("password")}
                    />

                    {passwordValue && (
                        <div className="pt-0.5">
                            <div className="grid grid-cols-4 gap-1 h-1">
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        className={cn(
                                            "rounded-full h-full transition-colors",
                                            passwordScore >= step
                                                ? passwordScore <= 1
                                                    ? "bg-destructive"
                                                    : passwordScore === 2
                                                    ? "bg-warning"
                                                    : "bg-success"
                                                : "bg-border"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-0.5">
                    <AuthCheckbox
                        id="agree-terms"
                        checked={Boolean(agreeToTermsValue)}
                        onChange={(checked) => setValue("agreeToTerms", checked, { shouldValidate: true })}
                        error={errors.agreeToTerms?.message}
                        label={
                            <span>
                                I accept the{" "}
                                <Link
                                    href="/terms"
                                    target="_blank"
                                    className="font-medium text-primary hover:underline"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and acknowledge the{" "}
                                <Link
                                    href="/privacy"
                                    target="_blank"
                                    className="font-medium text-primary hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </span>
                        }
                    />
                </div>

                <div className="pt-1.5">
                    <AuthButton
                        type="submit"
                        isLoading={isSubmitting}
                        icon={<ArrowRight className="size-3.5" />}
                    >
                        {isPartner
                            ? "Complete Host Registration"
                            : "Create Account"}
                    </AuthButton>
                </div>
            </form>

            <div className="pt-3 border-t border-border mt-4">
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
