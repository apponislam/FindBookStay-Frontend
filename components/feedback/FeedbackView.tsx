"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, ArrowRight, ArrowLeft, Star, Search, Trophy, Sparkles } from "@/components/Icons";
import { Smartphone, MessageSquare, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackCategory {
    id: string;
    label: string;
    tagline: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: FeedbackCategory[] = [
    {
        id: "mobile-app",
        label: "Mobile Apps (iOS / Android)",
        tagline: "Upcoming Apps",
        description: "Suggestions, features & early tester interest for our upcoming native mobile apps.",
        icon: Smartphone,
    },
    {
        id: "turf-sports",
        label: "Sports & Turf Bookings",
        tagline: "Sports Venues",
        description: "Turf slot availability radar, football / cricket scheduling & match organizing.",
        icon: Trophy,
    },
    {
        id: "rentals-seats",
        label: "Home Rentals & Bachelor Seats",
        tagline: "Living & Rentals",
        description: "Apartment search filters, roommate matching, flat listings & pricing transparency.",
        icon: Search,
    },
    {
        id: "general-ui",
        label: "Marketplace UI & Speed",
        tagline: "User Experience",
        description: "Navigation, dark/light theme, speed improvements, and visual responsiveness.",
        icon: Sparkles,
    },
    {
        id: "other",
        label: "General Inquiry / Other",
        tagline: "Other Ideas",
        description: "Partnership proposals, bug reports, and novel feature concepts.",
        icon: MessageSquare,
    },
];

const RATING_LABELS = ["Select your rating", "Needs Improvement", "Fair Experience", "Good Platform", "Very Good", "Exceptional!"];

// Zod Schema for Product Feedback Form
const feedbackSchema = z.object({
    category: z.string().min(1, "Please select a category"),
    rating: z.number().min(1, "Please provide a rating").max(5),
    fullName: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(60, "Name cannot exceed 60 characters"),
    email: z
        .string()
        .trim()
        .min(1, "Email address is required")
        .email("Enter a valid email address"),
    userRole: z.string().min(1, "Please select how you use FindBookStay"),
    platform: z.string().min(1, "Please select your device / platform"),
    title: z.string().trim().optional(),
    message: z
        .string()
        .trim()
        .min(10, "Feedback message must be at least 10 characters")
        .max(3000, "Feedback cannot exceed 3000 characters"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const FeedbackView = () => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState<FeedbackFormData | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            category: "mobile-app",
            rating: 5,
            fullName: "",
            email: "",
            userRole: "Seeker / Tenant / Guest",
            platform: "Web Desktop (Chrome / Safari / Firefox)",
            title: "",
            message: "",
        },
        mode: "onTouched",
    });

    const selectedCategory = useWatch({ control, name: "category" }) ?? "mobile-app";
    const currentRating = useWatch({ control, name: "rating" }) ?? 5;

    const onSubmit = async (data: FeedbackFormData) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setSubmittedData(data);
        setIsSubmitted(true);
    };

    const handleReset = () => {
        reset();
        setSubmittedData(null);
        setIsSubmitted(false);
    };

    return (
        <div className="w-full bg-background text-foreground">
            {/* ============================================================== */}
            {/* 1. HERO HEADER                                                 */}
            {/* ============================================================== */}
            <section className="relative w-full overflow-hidden border-b border-border bg-linear-to-b from-surface-secondary/80 via-surface to-background pt-14 pb-16 lg:pt-20 lg:pb-20">
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-212.5 h-112.5 bg-linear-to-tr from-accent/15 via-accent/5 to-transparent blur-3xl opacity-70"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="w-full text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-accent/30 shadow-2xs text-xs font-semibold text-primary">
                            <span className="size-2 rounded-full bg-accent animate-pulse" />
                            <span className="tracking-wide uppercase text-[11px] font-bold text-accent">
                                Product Feedback & Updates
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.15] max-w-4xl mx-auto">
                            Share Your Feedback & Shape FindBookStay
                        </h1>

                        <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                            We are building this platform for you. Tell us about your experience using our web marketplace, share ideas for our upcoming mobile apps, or report bugs directly to our product engineering team.
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 2. MAIN FEEDBACK FORM (FULL WIDTH CONTAINER)                   */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isSubmitted ? (
                        /* SUCCESS STATE */
                        <div className="w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-surface border border-accent/40 text-center space-y-6 shadow-xs animate-in fade-in zoom-in-95 duration-300">
                            <div className="size-16 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto shadow-xs">
                                <CheckCircle2 className="size-9" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
                                    Thank you for your valuable feedback!
                                </h2>
                                <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
                                    Your thoughts have been logged directly for our engineering and design team. We review every single submission as we release new updates to the web platform and mobile apps.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-background border border-border text-xs text-text-secondary max-w-md mx-auto text-left space-y-1.5 shadow-2xs">
                                <div className="flex items-center justify-between font-semibold text-primary">
                                    <span>Category:</span>
                                    <span className="uppercase text-[11px] font-bold text-accent">
                                        {CATEGORIES.find((c) => c.id === submittedData?.category)?.label}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Submitted by:</span>
                                    <span className="font-medium text-foreground">
                                        {submittedData?.fullName} ({submittedData?.email})
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all shadow-xs active:scale-[0.98]"
                                >
                                    Submit Another Feedback
                                </button>
                                <Link
                                    href="/"
                                    className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl border border-border bg-surface text-foreground text-xs font-semibold hover:border-accent hover:bg-surface-secondary transition-all"
                                >
                                    Back to Marketplace
                                </Link>
                            </div>
                        </div>
                    ) : (
                        /* FORM STATE */
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-12" noValidate>
                            {/* Step A: Select Topic / Category (5 Cards) */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                                        1
                                    </span>
                                    <h3 className="text-lg font-bold text-primary">What is your feedback regarding?</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                                    {CATEGORIES.map((cat) => {
                                        const CatIcon = cat.icon;
                                        const isSelected = selectedCategory === cat.id;
                                        return (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setValue("category", cat.id, { shouldValidate: true })}
                                                className={cn(
                                                    "cursor-pointer p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 active:scale-[0.98]",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                                                        : "bg-surface border-border text-foreground hover:border-accent/50 hover:bg-surface-secondary/50"
                                                )}
                                            >
                                                <div className="space-y-3">
                                                    <div
                                                        className={cn(
                                                            "size-10 rounded-xl flex items-center justify-center transition-colors text-accent",
                                                            isSelected ? "bg-white/10" : "bg-surface-secondary"
                                                        )}
                                                    >
                                                        <CatIcon className="size-5" />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] uppercase font-bold tracking-wider block text-accent">
                                                            {cat.tagline}
                                                        </span>
                                                        <h4 className="text-xs sm:text-sm font-bold mt-0.5 leading-snug">
                                                            {cat.label}
                                                        </h4>
                                                    </div>
                                                </div>

                                                <p
                                                    className={cn(
                                                        "mt-2 text-[11px] leading-relaxed",
                                                        isSelected ? "text-primary-foreground/80" : "text-text-secondary"
                                                    )}
                                                >
                                                    {cat.description}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.category && (
                                    <p className="text-xs text-destructive font-medium">{errors.category.message}</p>
                                )}
                            </div>

                            {/* Step B: Overall Experience Rating */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                                        2
                                    </span>
                                    <h3 className="text-lg font-bold text-primary">
                                        Rate your overall experience with FindBookStay
                                    </h3>
                                </div>

                                <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((starValue) => {
                                            const isFilled = hoverRating !== null ? starValue <= hoverRating : starValue <= currentRating;
                                            return (
                                                <button
                                                    key={starValue}
                                                    type="button"
                                                    onClick={() => setValue("rating", starValue, { shouldValidate: true })}
                                                    onMouseEnter={() => setHoverRating(starValue)}
                                                    onMouseLeave={() => setHoverRating(null)}
                                                    className="cursor-pointer p-1 transition-transform hover:scale-125 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                                                    aria-label={`Rate ${starValue} stars`}
                                                >
                                                    <Star
                                                        className={cn(
                                                            "size-7 transition-colors",
                                                            isFilled
                                                                ? "text-amber-400 fill-amber-400"
                                                                : "text-border fill-transparent"
                                                        )}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="text-xs sm:text-sm font-bold text-primary bg-background px-4 py-2 rounded-xl border border-border shadow-2xs">
                                        {hoverRating !== null ? RATING_LABELS[hoverRating] : RATING_LABELS[currentRating]}
                                    </div>
                                </div>
                                {errors.rating && (
                                    <p className="text-xs text-destructive font-medium">{errors.rating.message}</p>
                                )}
                            </div>

                            {/* Step C: Details & Message (Inputs) */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                                        3
                                    </span>
                                    <h3 className="text-lg font-bold text-primary">Tell us what you think</h3>
                                </div>

                                <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-6">
                                    {/* Row 1: Name & Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between min-h-6">
                                                <label className="text-xs font-bold text-foreground">
                                                    Your Full Name <span className="text-destructive">*</span>
                                                </label>
                                                {errors.fullName && (
                                                    <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-xs animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span>{errors.fullName.message}</span>
                                                        <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45" />
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="e.g. Appon Islam"
                                                className={cn(
                                                    "w-full px-4 py-3 rounded-xl bg-background border text-xs sm:text-sm placeholder:text-muted-foreground outline-none transition-all duration-200 shadow-2xs",
                                                    errors.fullName
                                                        ? "border-destructive focus:ring-2 focus:ring-destructive/15"
                                                        : "focus:border-accent focus:ring-2 focus:ring-accent/15"
                                                )}
                                                {...register("fullName")}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between min-h-6">
                                                <label className="text-xs font-bold text-foreground">
                                                    Email Address <span className="text-destructive">*</span>
                                                </label>
                                                {errors.email && (
                                                    <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-xs animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span>{errors.email.message}</span>
                                                        <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45" />
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="e.g. appon@example.com"
                                                className={cn(
                                                    "w-full px-4 py-3 rounded-xl bg-background border text-xs sm:text-sm placeholder:text-muted-foreground outline-none transition-all duration-200 shadow-2xs",
                                                    errors.email
                                                        ? "border-destructive focus:ring-2 focus:ring-destructive/15"
                                                        : "focus:border-accent focus:ring-2 focus:ring-accent/15"
                                                )}
                                                {...register("email")}
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: User Persona & Device */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-foreground">
                                                How do you use FindBookStay?
                                            </label>
                                            <select
                                                className="cursor-pointer w-full px-4 py-3 rounded-xl bg-background border text-xs sm:text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200 shadow-2xs"
                                                {...register("userRole")}
                                            >
                                                <option>Seeker / Tenant / Guest</option>
                                                <option>Property Owner / Landlord</option>
                                                <option>Hotel / Resort Host</option>
                                                <option>Sports Turf Player / Club Manager</option>
                                                <option>Tech & App Enthusiast</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-foreground">
                                                Device / Platform
                                            </label>
                                            <select
                                                className="cursor-pointer w-full px-4 py-3 rounded-xl bg-background border text-xs sm:text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200 shadow-2xs"
                                                {...register("platform")}
                                            >
                                                <option>Web Desktop (Chrome / Safari / Firefox)</option>
                                                <option>Mobile Web Browser (iOS / Android)</option>
                                                <option>Upcoming iOS App (Feature Requests)</option>
                                                <option>Upcoming Android App (Feature Requests)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 3: Subject line */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-foreground">
                                            Subject / Summary (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Quick filters for bachelor seats or Turf booking instant notifications"
                                            className="w-full px-4 py-3 rounded-xl bg-background border text-xs sm:text-sm placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200 shadow-2xs"
                                            {...register("title")}
                                        />
                                    </div>

                                    {/* Row 4: Detailed Message */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between min-h-6">
                                            <label className="text-xs font-bold text-foreground">
                                                Detailed Feedback or Suggestion <span className="text-destructive">*</span>
                                            </label>
                                            {errors.message && (
                                                <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-xs animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                                                    <AlertCircle className="size-3.5 shrink-0" />
                                                    <span>{errors.message.message}</span>
                                                    <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45" />
                                                </div>
                                            )}
                                        </div>
                                        <textarea
                                            rows={5}
                                            placeholder="Please describe what you liked, what can be improved, or features you want to see in upcoming web and app updates..."
                                            className={cn(
                                                "w-full p-4 rounded-xl bg-background border text-xs sm:text-sm placeholder:text-muted-foreground outline-none transition-all duration-200 shadow-2xs resize-none",
                                                errors.message
                                                    ? "border-destructive focus:ring-2 focus:ring-destructive/15"
                                                    : "focus:border-accent focus:ring-2 focus:ring-accent/15"
                                            )}
                                            {...register("message")}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all group disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99]"
                                        >
                                            {isSubmitting ? (
                                                <span>Transmitting feedback...</span>
                                            ) : (
                                                <>
                                                    <Send className="size-4" />
                                                    <span>Send Feedback to Team</span>
                                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* ============================================================== */}
            {/* 3. PRODUCT ROADMAP & UPCOMING UPDATES (FULL WIDTH)             */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-20 bg-surface border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-full mb-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                            Product Roadmap & Updates
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                            What we are currently building
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
                            Your feedback directly influences our weekly updates. Here is a preview of platform enhancements in our pipeline.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-2xl bg-background border border-border shadow-2xs space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                                Mobile Apps
                            </span>
                            <h4 className="text-sm font-bold text-primary">Dedicated iOS & Android Apps</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                                Native mobile apps featuring instant turf slot booking, offline favoriting, and direct push alerts when new rental seats or properties are posted.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-background border border-border shadow-2xs space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                                Search & Filters
                            </span>
                            <h4 className="text-sm font-bold text-primary">Bachelor Seat & Utility Filters</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                                Granular filters to sort rentals by included utilities (Wi-Fi, meal systems, attached bath, and gas backup) to simplify roommate matching.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-background border border-border shadow-2xs space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                                Sports Engine
                            </span>
                            <h4 className="text-sm font-bold text-primary">Live Turf Availability Radar</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                                Interactive real-time slot calendar allowing football and cricket teams to instantly check open floodlit hours across nearby artificial turfs.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-background border border-border shadow-2xs space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                                Host Dashboard
                            </span>
                            <h4 className="text-sm font-bold text-primary">Unified Host Portal</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                                An upgraded management dashboard for landlords, resort hosts, and turf operators to update slot pricing, photos, and direct inquiries.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 p-6 rounded-2xl bg-background border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-surface-secondary text-accent flex items-center justify-center shrink-0">
                                <Sparkles className="size-5" />
                            </div>
                            <div>
                                <h4 className="text-xs sm:text-sm font-bold text-primary">
                                    Want to be an early beta tester for the mobile apps?
                                </h4>
                                <p className="text-xs text-text-secondary">
                                    Select &ldquo;Mobile Apps (iOS / Android)&rdquo; above and leave your email to get early invite links.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/help"
                            className="cursor-pointer text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 shrink-0 transition-colors"
                        >
                            <ArrowLeft className="size-3.5" />
                            <span>Visit Help & Support Center</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeedbackView;
