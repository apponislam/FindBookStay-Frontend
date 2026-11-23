"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Lock, KeyRound } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useLocale } from "@/hooks/useLocale";

// Zod Schema for Reset Password
const resetPasswordSchema = z
    .object({
        token: z
            .string()
            .trim()
            .min(1, "Reset token is required"),
        password: z
            .string()
            .min(8, "Must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[0-9]/, "Must contain at least one number"),
        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = () => {
    const { isBn } = useLocale();
    const searchParams = useSearchParams();
    const urlToken = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            token: urlToken,
            password: "",
            confirmPassword: "",
        },
        mode: "onTouched",
    });

    const passwordValue = useWatch({ control, name: "password" }) || "";
    const confirmPasswordValue = useWatch({ control, name: "confirmPassword" }) || "";

    // Sync token from URL query params
    useEffect(() => {
        if (urlToken) setValue("token", urlToken);
    }, [urlToken, setValue]);

    const hasMinLength = passwordValue.length >= 8;
    const hasNumber = /[0-9]/.test(passwordValue);
    const hasUppercase = /[A-Z]/.test(passwordValue);
    const passwordsMatch = passwordValue.length > 0 && passwordValue === confirmPasswordValue;

    const onSubmit = async (data: ResetPasswordFormData) => {
        setServerError("");

        try {
            await resetPasswordMutation({
                token: data.token.trim(),
                newPassword: data.password,
            }).unwrap();

            setIsSuccess(true);
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            setServerError(
                apiError?.data?.message ||
                apiError?.error ||
                (isBn ? "পাসওয়ার্ড আপডেট করা যায়নি। রিসেট টোকেনের মেয়াদ শেষ হয়ে থাকতে পারে।" : "Failed to update password. Your reset link or token may have expired.")
            );
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full text-center space-y-5 animate-in fade-in duration-200">
                <div className="size-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="size-7" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-foreground">
                        {isBn ? "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!" : "Password Updated!"}
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                        {isBn
                            ? "আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করা হয়েছে। এখন নতুন পাসওয়ার্ড দিয়ে লগইন করুন।"
                            : "Your credentials have been securely updated. You can now access your account with your new password."}
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

    return (
        <div className="w-full">
            <AuthHeader
                category={isBn ? "অ্যাকাউন্ট নিরাপত্তা" : "Security"}
                title={isBn ? "নতুন পাসওয়ার্ড নির্ধারণ করুন" : "Create new password"}
                subtitle={
                    isBn
                        ? email
                            ? `${email} এর জন্য নতুন পাসওয়ার্ড সেট করুন।`
                            : "নতুন পাসওয়ার্ডে কমপক্ষে ৮ অক্ষর, সংখ্যা এবং বড় হাতের অক্ষর থাকতে হবে।"
                        : email
                        ? `Setting a new password for ${email}.`
                        : "Your new password must be at least 8 characters with numbers and uppercase letters."
                }
            />

            {serverError && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
                {/* Fallback Token Input if not in URL */}
                {!urlToken && (
                    <AuthInput
                        label={isBn ? "রিসেট টোকেন / কোড" : "Reset Token / Code"}
                        type="text"
                        placeholder={isBn ? "ইমেইলে প্রাপ্ত টোকেন কোড লিখুন" : "Paste reset token from email"}
                        icon={KeyRound}
                        error={errors.token ? (isBn ? "রিসেট টোকেন প্রদান আবশ্যক" : errors.token.message) : undefined}
                        required
                        {...register("token")}
                    />
                )}

                <AuthInput
                    label={isBn ? "নতুন পাসওয়ার্ড" : "New Password"}
                    type="password"
                    placeholder={isBn ? "কমপক্ষে ৮ অক্ষর লিখুন" : "Enter at least 8 characters"}
                    icon={Lock}
                    error={errors.password ? (isBn ? "কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা দিন" : errors.password.message) : undefined}
                    required
                    autoComplete="new-password"
                    {...register("password")}
                />

                <AuthInput
                    label={isBn ? "নতুন পাসওয়ার্ড নিশ্চিত করুন" : "Confirm New Password"}
                    type="password"
                    placeholder={isBn ? "পুনরায় পাসওয়ার্ডটি লিখুন" : "Re-enter your new password"}
                    icon={Lock}
                    error={errors.confirmPassword ? (isBn ? "উভয় পাসওয়ার্ড একই হতে হবে" : errors.confirmPassword.message) : undefined}
                    required
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                />

                {/* Password Criteria Checklist */}
                <div className="space-y-1 pt-1 text-xs text-text-secondary">
                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasMinLength ? "bg-primary" : "bg-border"}`} />
                        <span className={hasMinLength ? "text-foreground font-medium" : ""}>
                            {isBn ? "কমপক্ষে ৮ অক্ষরের দৈর্ঘ্য" : "At least 8 characters long"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasUppercase ? "bg-primary" : "bg-border"}`} />
                        <span className={hasUppercase ? "text-foreground font-medium" : ""}>
                            {isBn ? "কমপক্ষে একটি বড় হাতের অক্ষর (A-Z)" : "Contains at least one uppercase letter"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${hasNumber ? "bg-primary" : "bg-border"}`} />
                        <span className={hasNumber ? "text-foreground font-medium" : ""}>
                            {isBn ? "কমপক্ষে একটি সংখ্যা (0-9)" : "Contains at least one number"}
                        </span>
                    </div>

                    {confirmPasswordValue.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span
                                className={`size-1.5 rounded-full ${passwordsMatch ? "bg-primary" : "bg-destructive"}`}
                            />
                            <span className={passwordsMatch ? "text-foreground font-medium" : "text-destructive"}>
                                {isBn
                                    ? passwordsMatch
                                        ? "উভয় পাসওয়ার্ড মিলেছে"
                                        : "পাসওয়ার্ড দুটি মেলেনি"
                                    : "Passwords match"}
                            </span>
                        </div>
                    )}
                </div>

                <div className="pt-2">
                    <AuthButton
                        type="submit"
                        isLoading={isLoading}
                        icon={<ArrowRight className="size-4" />}
                    >
                        {isBn ? "পাসওয়ার্ড আপডেট করুন" : "Update Password"}
                    </AuthButton>
                </div>
            </form>

            <div className="pt-3 border-t border-border mt-4 text-center">
                <Link
                    href="/auth/forgot-password"
                    className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                    {isBn ? "নতুন রিসেট কোড চান? এখানে ক্লিক করুন" : "Need a new reset code? Click here"}
                </Link>
            </div>
        </div>
    );
};

export default ResetPasswordForm;