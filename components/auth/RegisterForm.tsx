"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    ArrowRight,
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Building,
    Gift,
    Lock,
    Check,
    Camera,
    Trash2,
} from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthCheckbox from "./AuthCheckbox";
import AuthButton from "./AuthButton";
import AuthFooterLink from "./AuthFooterLink";
import { cn } from "@/lib/utils";
import {
    useRegisterMutation,
    useLazyValidateReferralCodeQuery,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

interface RegisterFormProps {
    onSuccess?: () => void;
    redirectUrl?: string;
}

// Zod Schema for 3-Step Registration
const registerSchema = z
    .object({
        // Step 1: Profile & Contact
        profileImage: z.string().optional(),
        name: z
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
            .min(6, "Phone number is required")
            .regex(
                /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/,
                "Enter a valid phone number"
            ),

        // Step 2: Address & Referral
        street: z
            .string()
            .trim()
            .min(2, "Street address / area is required"),
        city: z
            .string()
            .trim()
            .min(2, "City is required"),
        state: z.string().trim().optional(),
        zipCode: z.string().trim().optional(),
        country: z
            .string()
            .trim()
            .min(2, "Country is required"),
        referralCode: z.string().trim().optional(),

        // Step 3: Password & Terms
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[0-9]/, "Password must contain at least 1 number"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        agreeToTerms: z
            .boolean()
            .refine((val) => val === true, "Must accept terms of service"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

// Client-side image compressor: scales to avatar dimensions (400x400) and compresses to ~30-50KB
const compressImage = (file: File, maxWidth = 400, maxHeight = 400, quality = 0.82): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new window.Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let { width, height } = img;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    resolve(event.target?.result as string);
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/jpeg", quality));
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

export const RegisterForm = ({ onSuccess, redirectUrl = "/" }: RegisterFormProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [registerMutation] = useRegisterMutation();
    const [triggerValidateReferral, { isFetching: isValidatingReferral }] = useLazyValidateReferralCodeQuery();

    const [referrerInfo, setReferrerInfo] = useState<{ id: string; name: string } | null>(null);
    const [referralStatus, setReferralStatus] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        setError,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            profileImage: "",
            name: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            referralCode: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
        },
        mode: "onTouched",
    });

    const passwordValue = useWatch({ control, name: "password" }) || "";
    const agreeToTermsValue = useWatch({ control, name: "agreeToTerms" });
    const referralCodeValue = useWatch({ control, name: "referralCode" }) || "";

    // Image upload handler with client-side compression
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            setError("profileImage", { message: "Image size must be under 10MB" });
            return;
        }

        try {
            const compressedBase64 = await compressImage(file, 400, 400, 0.82);
            setImagePreview(compressedBase64);
            setValue("profileImage", compressedBase64, { shouldValidate: true });
        } catch {
            setError("profileImage", { message: "Failed to process image. Please try another." });
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setValue("profileImage", "");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Calculate password strength score
    const getPasswordScore = (pass: string) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const passwordScore = getPasswordScore(passwordValue);

    // Validate referral code
    const handleCheckReferral = async () => {
        if (!referralCodeValue.trim()) return;
        setReferralStatus("Checking code...");
        try {
            const res = await triggerValidateReferral(referralCodeValue.trim()).unwrap();
            if (res.data?.valid) {
                setReferrerInfo({ id: res.data.referrerId, name: res.data.referrerName });
                setReferralStatus(`Invited by ${res.data.referrerName}`);
            } else {
                setReferrerInfo(null);
                setReferralStatus("Invalid referral code");
            }
        } catch {
            setReferrerInfo(null);
            setReferralStatus("Invalid or expired referral code");
        }
    };

    // Step navigation validations
    const handleGoToStep2 = async () => {
        const isValid = await trigger(["name", "email", "phone"]);
        if (isValid) {
            setCurrentStep(2);
        }
    };

    const handleGoToStep3 = async () => {
        const isValid = await trigger(["street", "city", "country"]);
        if (isValid) {
            setCurrentStep(3);
        }
    };

    // Final Form Submission
    const onSubmit = async (data: RegisterFormData) => {
        try {
            const address = {
                street: data.street.trim() || undefined,
                city: data.city.trim() || undefined,
                state: data.state?.trim() || undefined,
                zipCode: data.zipCode?.trim() || undefined,
                country: data.country.trim() || undefined,
            };

            const res = await registerMutation({
                name: data.name.trim(),
                email: data.email.trim().toLowerCase(),
                phone: data.phone.trim() || undefined,
                profileImage: data.profileImage || undefined,
                password: data.password,
                role: "USER",
                presentAddress: address,
                permanentAddress: address,
                referredBy: referrerInfo?.id || data.referralCode?.trim() || undefined,
            }).unwrap();

            if (res.data?.user) {
                dispatch(
                    setUser({
                        user: res.data.user,
                        token: res.data.accessToken || "",
                    })
                );
            }

            if (onSuccess) {
                onSuccess();
            }

            // Redirect to dedicated OTP verification page under /auth/
            const cleanEmail = data.email.trim().toLowerCase();
            const redirectParam = redirectUrl && redirectUrl !== "/" ? `&redirectUrl=${encodeURIComponent(redirectUrl)}` : "";
            router.push(`/auth/verify-email?email=${encodeURIComponent(cleanEmail)}${redirectParam}`);
        } catch (err: unknown) {
            const apiError = err as { data?: { message?: string }; error?: string };
            const errorMessage =
                apiError?.data?.message ||
                apiError?.error ||
                "Failed to create account. Please verify details and try again.";
            setError("root", { message: errorMessage });
        }
    };

    return (
        <div className="w-full animate-in fade-in duration-150">
            {/* 3-Step Centered Glowing Indicator */}
            <div className="flex items-center justify-center gap-3 mb-5 select-none">
                {[1, 2, 3].map((step, index) => {
                    const isCurrent = currentStep === step;
                    const isCompleted = currentStep > step;
                    return (
                        <React.Fragment key={step}>
                            <div className="relative flex items-center justify-center">
                                {isCurrent && (
                                    <span className="absolute -inset-1.5 rounded-full bg-accent/35 blur-sm pointer-events-none animate-pulse" />
                                )}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (isCompleted) setCurrentStep(step as 1 | 2 | 3);
                                    }}
                                    disabled={!isCompleted && !isCurrent}
                                    className={cn(
                                        "relative size-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                                        isCurrent
                                            ? "bg-primary text-primary-foreground ring-4 ring-accent/30 shadow-[0_0_18px_rgba(16,185,129,0.5)] scale-105"
                                            : isCompleted
                                            ? "bg-primary text-primary-foreground shadow-xs cursor-pointer hover:scale-105"
                                            : "bg-surface-secondary text-text-secondary border border-border opacity-70"
                                    )}
                                    aria-label={`Step ${step}`}
                                >
                                    {isCompleted ? <Check className="size-4 stroke-[2.5]" /> : step}
                                </button>
                            </div>
                            {index < 2 && (
                                <div
                                    className={cn(
                                        "w-12 sm:w-16 h-0.5 rounded-full transition-colors duration-300",
                                        currentStep > step ? "bg-accent" : "bg-border"
                                    )}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <AuthHeader
                category={`Step ${currentStep} of 3`}
                title={
                    currentStep === 1
                        ? "Personal Information"
                        : currentStep === 2
                        ? "Address & Referral"
                        : "Secure Your Account"
                }
                subtitle={
                    currentStep === 1
                        ? "Upload a photo and provide your name, email, and phone."
                        : currentStep === 2
                        ? "Enter your primary address and optional referral invite code."
                        : "Set a strong password to complete your FindBookStay account."
                }
            />

            {errors.root?.message && (
                <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">
                    {errors.root.message}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                {/* ========================================================= */}
                {/* STEP 1: IMAGE, NAME, EMAIL, PHONE                         */}
                {/* ========================================================= */}
                {currentStep === 1 && (
                    <div className="space-y-3 animate-in fade-in duration-150">
                        {/* Profile Photo Uploader */}
                        <div className="flex flex-col items-center justify-center py-1 mb-1">
                            <div className="relative group">
                                <div
                                    className={cn(
                                        "relative size-20 rounded-full flex items-center justify-center overflow-hidden bg-surface-secondary shadow-2xs transition-colors",
                                        imagePreview
                                            ? "border-2 border-primary/50"
                                            : "border-2 border-dashed border-border group-hover:border-primary"
                                    )}
                                >
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Profile Preview"
                                            fill
                                            sizes="80px"
                                            unoptimized
                                            className="object-cover rounded-full"
                                        />
                                    ) : (
                                        <User className="size-8 text-text-secondary" />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="cursor-pointer absolute -bottom-1 -right-1 size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xs hover:bg-primary-hover transition-colors ring-2 ring-background z-10"
                                    title="Upload photo"
                                >
                                    <Camera className="size-3.5" />
                                </button>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                                >
                                    {imagePreview ? "Change Photo" : "Upload Photo (Optional)"}
                                </button>
                                {imagePreview && (
                                    <>
                                        <span className="text-text-secondary text-xs">•</span>
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="text-[11px] font-semibold text-destructive hover:underline cursor-pointer inline-flex items-center gap-0.5"
                                        >
                                            <Trash2 className="size-3" />
                                            <span>Remove</span>
                                        </button>
                                    </>
                                )}
                            </div>
                            {errors.profileImage && (
                                <p className="text-xs text-destructive mt-1">{errors.profileImage.message}</p>
                            )}
                        </div>

                        {/* Full Name */}
                        <AuthInput
                            label="Full Name"
                            type="text"
                            placeholder="e.g. Appon Islam"
                            icon={User}
                            error={errors.name?.message}
                            required
                            autoComplete="name"
                            {...register("name")}
                        />

                        {/* Email Address */}
                        <AuthInput
                            label="Email Address"
                            type="email"
                            placeholder="e.g. appon@example.com"
                            icon={Mail}
                            error={errors.email?.message}
                            required
                            autoComplete="email"
                            {...register("email")}
                        />

                        {/* Phone Number */}
                        <AuthInput
                            label="Phone Number"
                            type="tel"
                            placeholder="e.g. +1 555-0199"
                            icon={Phone}
                            error={errors.phone?.message}
                            required
                            autoComplete="tel"
                            {...register("phone")}
                        />

                        {/* Step 1 Next Button */}
                        <div className="pt-2">
                            <AuthButton
                                type="button"
                                onClick={handleGoToStep2}
                                icon={<ArrowRight className="size-3.5" />}
                            >
                                Continue
                            </AuthButton>
                        </div>
                    </div>
                )}

                {/* ========================================================= */}
                {/* STEP 2: ADDRESS & REFERRAL                                */}
                {/* ========================================================= */}
                {currentStep === 2 && (
                    <div className="space-y-3 animate-in fade-in duration-150">
                        {/* Street / Road Address */}
                        <AuthInput
                            label="Street / Road / Area Address"
                            type="text"
                            placeholder="e.g. 123 Main St, Apt 4B"
                            icon={MapPin}
                            error={errors.street?.message}
                            required
                            autoComplete="street-address"
                            {...register("street")}
                        />

                        {/* City & State / Division Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <AuthInput
                                label="City"
                                type="text"
                                placeholder="e.g. New York"
                                icon={Building}
                                error={errors.city?.message}
                                required
                                autoComplete="address-level2"
                                {...register("city")}
                            />
                            <AuthInput
                                label="State / Province / Division (Optional)"
                                type="text"
                                placeholder="e.g. NY"
                                error={errors.state?.message}
                                autoComplete="address-level1"
                                {...register("state")}
                            />
                        </div>

                        {/* Postal Code & Country Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <AuthInput
                                label="Postal / Zip Code (Optional)"
                                type="text"
                                placeholder="e.g. 10001"
                                error={errors.zipCode?.message}
                                autoComplete="postal-code"
                                {...register("zipCode")}
                            />
                            <AuthInput
                                label="Country"
                                type="text"
                                placeholder="Enter country"
                                error={errors.country?.message}
                                required
                                autoComplete="country-name"
                                {...register("country")}
                            />
                        </div>

                        {/* Optional Referral Code */}
                        <div className="space-y-1 pt-0.5">
                            <AuthInput
                                label="Referral Code (Optional)"
                                type="text"
                                placeholder="e.g. FB8K2026"
                                icon={Gift}
                                autoCapitalize="characters"
                                error={errors.referralCode?.message}
                                rightElement={
                                    referralCodeValue.trim() ? (
                                        <button
                                            type="button"
                                            onClick={handleCheckReferral}
                                            disabled={isValidatingReferral}
                                            className="text-[11px] font-semibold text-primary hover:underline cursor-pointer disabled:opacity-50"
                                        >
                                            {isValidatingReferral ? "Checking..." : "Validate"}
                                        </button>
                                    ) : null
                                }
                                {...register("referralCode")}
                            />
                            {referralStatus && (
                                <p
                                    className={cn(
                                        "text-[11px] font-medium px-1",
                                        referrerInfo ? "text-primary" : "text-destructive"
                                    )}
                                >
                                    {referralStatus}
                                </p>
                            )}
                        </div>

                        {/* Step 2 Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="cursor-pointer inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-border bg-surface text-foreground text-xs font-semibold hover:bg-surface-secondary transition-colors"
                            >
                                <ArrowLeft className="size-3.5" />
                                <span>Back</span>
                            </button>
                            <div className="flex-1">
                                <AuthButton
                                    type="button"
                                    onClick={handleGoToStep3}
                                    icon={<ArrowRight className="size-3.5" />}
                                >
                                    Continue
                                </AuthButton>
                            </div>
                        </div>
                    </div>
                )}

                {/* ========================================================= */}
                {/* STEP 3: PASSWORD & TERMS                                  */}
                {/* ========================================================= */}
                {currentStep === 3 && (
                    <div className="space-y-3 animate-in fade-in duration-150">
                        {/* Password */}
                        <div className="space-y-1">
                            <AuthInput
                                label="Create Password"
                                type="password"
                                placeholder="Min. 8 characters with at least 1 number"
                                icon={Lock}
                                error={errors.password?.message}
                                required
                                autoComplete="new-password"
                                {...register("password")}
                            />

                            {/* Live Password Strength Meter */}
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
                                    <p className="text-[10px] text-text-secondary mt-1">
                                        {passwordScore <= 1
                                            ? "Weak password"
                                            : passwordScore === 2
                                            ? "Medium strength"
                                            : passwordScore === 3
                                            ? "Strong password"
                                            : "Very strong password"}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <AuthInput
                            label="Confirm Password"
                            type="password"
                            placeholder="Re-type your password"
                            icon={Lock}
                            error={errors.confirmPassword?.message}
                            required
                            autoComplete="new-password"
                            {...register("confirmPassword")}
                        />

                        {/* Terms of Service Checkbox */}
                        <div className="pt-1">
                            <AuthCheckbox
                                id="agree-terms"
                                checked={Boolean(agreeToTermsValue)}
                                onChange={(checked) =>
                                    setValue("agreeToTerms", checked, { shouldValidate: true })
                                }
                                error={errors.agreeToTerms?.message}
                                label={
                                    <span>
                                        I accept the{" "}
                                        <Link
                                            href="/terms"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-primary hover:underline"
                                        >
                                            Terms of Service
                                        </Link>{" "}
                                        and acknowledge the{" "}
                                        <Link
                                            href="/privacy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-primary hover:underline"
                                        >
                                            Privacy Policy
                                        </Link>
                                        .
                                    </span>
                                }
                            />
                        </div>

                        {/* Step 3 Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(2)}
                                className="cursor-pointer inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-border bg-surface text-foreground text-xs font-semibold hover:bg-surface-secondary transition-colors"
                            >
                                <ArrowLeft className="size-3.5" />
                                <span>Back</span>
                            </button>
                            <div className="flex-1">
                                <AuthButton
                                    type="submit"
                                    isLoading={isSubmitting}
                                    icon={<ArrowRight className="size-3.5" />}
                                >
                                    Create Account
                                </AuthButton>
                            </div>
                        </div>
                    </div>
                )}
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
