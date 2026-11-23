"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { Mail, PhoneCall, MapPin, Send, CheckCircle2, ArrowRight, Building2, Hotel, Trophy, Home, ShieldCheck, Clock, Sparkles } from "@/components/Icons";
import siteData from "@/constants/siteData";
import { useLocale } from "@/hooks/useLocale";
import LanguageSwitch from "@/components/header/LanguageSwitch";

type InquiryCategory = "rent" | "book" | "sports" | "buy" | "partner";

interface CategoryOption {
    id: InquiryCategory;
    tag: string;
    label: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    description: string;
}

const CATEGORIES_EN: CategoryOption[] = [
    {
        id: "rent",
        tag: "01 / RENT",
        label: "Rent Homes & Seats",
        icon: Home,
        description: "Family apartments, bachelor seats & flexible sublets",
    },
    {
        id: "book",
        tag: "02 / BOOK",
        label: "Book Stays & Resorts",
        icon: Hotel,
        description: "Boutique hotels, weekend retreats & vacation stays",
    },
    {
        id: "sports",
        tag: "03 / SPORTS",
        label: "Sports Turfs & Play",
        icon: Trophy,
        description: "Football turfs, cricket nets & badminton courts",
    },
    {
        id: "buy",
        tag: "04 / BUY",
        label: "Buy Real Estate",
        icon: Building2,
        description: "Verified residential homes, luxury flats & plots",
    },
    {
        id: "partner",
        tag: "05 / PARTNER",
        label: "Host & Partnerships",
        icon: ShieldCheck,
        description: "Listing management, owner onboarding & business",
    },
];

const CATEGORIES_BN: CategoryOption[] = [
    {
        id: "rent",
        tag: "০১ / ভাড়া",
        label: "বাসা ও সিট ভাড়া",
        icon: Home,
        description: "পারিবারিক অ্যাপার্টমেন্ট, ব্যাচেলর সিট ও ফ্লেক্সিবল সাবলেট",
    },
    {
        id: "book",
        tag: "০২ / স্টে",
        label: "হোটেল ও রিসোর্ট স্টে",
        icon: Hotel,
        description: "বুটিক হোটেল, ছুটির রিসোর্ট ও অবকাশকালীন হোমস্টে",
    },
    {
        id: "sports",
        tag: "০৩ / খেলাধুলা",
        label: "স্পোর্টস টার্ফ ও খেলাধুলা",
        icon: Trophy,
        description: "ফুটবল টার্ফ, ক্রিকেট প্র্যাকটিস নেট ও ব্যাডমিন্টন",
    },
    {
        id: "buy",
        tag: "০৪ / ক্রয়",
        label: "প্রপার্টি ও ফ্ল্যাট ক্রয়",
        icon: Building2,
        description: "যাচাইকৃত আবাসিক ফ্ল্যাট, বিলাসবহুল বাড়ি ও প্লট",
    },
    {
        id: "partner",
        tag: "০৫ / পার্টনার",
        label: "মালিক ও পার্টনারশিপ",
        icon: ShieldCheck,
        description: "লিস্টিং ব্যবস্থাপনা, প্রপার্টি হোস্ট ও ব্যবসায়িক যোগাযোগ",
    },
];

// Zod Schema for Contact Inquiry Form
const contactSchema = z.object({
    category: z.enum(["rent", "book", "sports", "buy", "partner"]),
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(70, "Full name cannot exceed 70 characters"),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z
        .string()
        .trim()
        .optional()
        .refine((val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(val), "Enter a valid phone number"),
    subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(120, "Subject cannot exceed 120 characters"),
    message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message cannot exceed 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactView = () => {
    const { isBn } = useLocale();
    const categories = isBn ? CATEGORIES_BN : CATEGORIES_EN;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            category: "rent",
            fullName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
        mode: "onTouched",
    });

    const selectedCategory = useWatch({ control, name: "category" }) ?? "rent";

    const onSubmit = async (data: ContactFormData) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            setSubmittedData(data);
            setIsSubmitted(true);
        } catch {
            setError("root", {
                message: isBn ? "বার্তা পাঠানো ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" : "Failed to send message. Please try again or reach our concierge directly.",
            });
        }
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
            <section className="relative w-full overflow-hidden border-b border-border bg-linear-to-b from-surface-secondary/70 via-background to-background pt-10 pb-16 lg:pt-16 lg:pb-20">
                {/* Ambient glow accent */}
                <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-212.5 h-112.5 bg-linear-to-tr from-accent/15 via-accent/5 to-transparent blur-3xl opacity-70" />

                <div className="container mx-auto px-4 relative">
                    {/* Top utility row with Badge and Language Switch */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-card border border-accent/30 shadow-2xs text-xs font-semibold text-foreground">
                            <span className="size-2 rounded-full bg-accent animate-pulse" />
                            <span className="tracking-wide uppercase text-[11px] font-bold text-accent">
                                {isBn ? "FindBookStay কনসিয়ার্জ সহায়তা" : "FindBookStay Concierge"}
                            </span>
                        </div>

                        {/* Direct on-page Language Switch */}
                        <LanguageSwitch />
                    </div>

                    <div className="max-w-3xl mx-auto text-center space-y-4">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15]">
                            {isBn ? "আমরা আপনার সেবায় প্রস্তুত" : "We're Here to Help"}
                        </h1>

                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            {isBn
                                ? "ফ্ল্যাট বা সিট ভাড়া, রিসোর্ট স্টে, স্পোর্টস টার্ফ বুকিং অথবা আপনার প্রপার্টি তালিকাভুক্ত করার যেকোনো প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করুন।"
                                : "Need help finding a flat, booking a resort, reserving a sports turf slot, or listing your property? Connect directly with our team."}
                        </p>

                        {/* Quick Contact Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-card border border-border text-xs font-medium text-muted-foreground">
                                <Clock className="size-3.5 text-accent" />
                                <span>{isBn ? "গড় উত্তর সময়: ২ ঘণ্টার কম" : "Typical reply: < 2 hours"}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-card border border-border text-xs font-medium text-muted-foreground">
                                <ShieldCheck className="size-3.5 text-accent" />
                                <span>{isBn ? "১০০% সরাসরি যোগাযোগ ও দালালমুক্ত সহায়তা" : "100% Direct Support & Zero Broker Friction"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 2. MAIN CONTACT SECTION (INFO CARDS + INQUIRY FORM)            */}
            {/* ============================================================== */}
            <section className="w-full py-14 lg:py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* LEFT COLUMN: Channels & Direct Help (5 cols) */}
                        <div className="lg:col-span-5 space-y-6">
                            <div>
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent block mb-1">
                                    {isBn ? "সরাসরি চ্যানেলসমূহ" : "Direct Channels"}
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                                    {isBn ? "আমাদের টিমের সাথে কথা বলুন" : "Get in Touch with Our Team"}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                    {isBn
                                        ? "আপনি ফ্ল্যাট বা সিটের সন্ধানকারী ভাড়াটিয়া, ভ্রমণকারী, খেলার মাঠ বুকিংকারী অথবা প্রপার্টি মালিক—আমাদের সাপোর্ট টিম সার্বক্ষণিক প্রস্তুত।"
                                        : "Whether you are a tenant looking for an apartment, a traveler booking a stay, a sports enthusiast reserving turf time, or a host managing properties, we are available round-the-clock."}
                                </p>
                            </div>

                            {/* Cards for Support Channels */}
                            <div className="space-y-3 pt-1">
                                {/* Hotline Card */}
                                <a href={`tel:${siteData.contacts.phone}`} className="group p-4 sm:p-5 rounded-2xl border border-border hover:border-accent/60 bg-white dark:bg-card hover:bg-surface-secondary/40 transition-all duration-200 flex items-start gap-4 cursor-pointer active:scale-[0.99] shadow-2xs">
                                    <div className="size-11 rounded-xl bg-accent/10 group-hover:bg-accent group-hover:text-primary text-accent flex items-center justify-center shrink-0 transition-all duration-200">
                                        <PhoneCall className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-wider text-accent">
                                                {isBn ? "সরাসরি ফোন ও হোয়াটসঅ্যাপ" : "Customer Hotline & WhatsApp"}
                                            </span>
                                            <span className="text-[10px] font-mono font-semibold text-accent/80 bg-accent/10 px-2 py-0.5 rounded">
                                                {isBn ? "২৪/৭ সার্বক্ষণিক" : "24/7"}
                                            </span>
                                        </div>
                                        <p className="text-base font-bold text-foreground mt-0.5">{siteData.contacts.phone}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {isBn ? "তাৎক্ষণিক বুকিং ও জরুরি সহায়তার জন্য কল করুন।" : "Direct line for bookings, host verification, and emergency concierge."}
                                        </p>
                                    </div>
                                </a>

                                {/* Email Support Card */}
                                <a href={`mailto:${siteData.contacts.supportEmail}`} className="group p-4 sm:p-5 rounded-2xl border border-border hover:border-accent/60 bg-white dark:bg-card hover:bg-surface-secondary/40 transition-all duration-200 flex items-start gap-4 cursor-pointer active:scale-[0.99] shadow-2xs">
                                    <div className="size-11 rounded-xl bg-accent/10 group-hover:bg-accent group-hover:text-primary text-accent flex items-center justify-center shrink-0 transition-all duration-200">
                                        <Mail className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-wider text-accent">
                                                {isBn ? "ইমেইল সহায়তা" : "Email Support"}
                                            </span>
                                            <span className="text-[10px] font-mono font-semibold text-accent/80 bg-accent/10 px-2 py-0.5 rounded">
                                                {isBn ? "< ২ ঘণ্টা" : "< 2 Hours"}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-foreground mt-0.5">{siteData.contacts.supportEmail}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {isBn ? "যেকোনো সাধারণ প্রশ্ন, অ্যাকাউন্ট বা ব্যবসায়িক যোগাযোগ।" : "General questions, account issues, billing, and partner inquiries."}
                                        </p>
                                    </div>
                                </a>

                                {/* Physical Location Card */}
                                <div className="p-4 sm:p-5 rounded-2xl border border-border bg-white dark:bg-card flex items-start gap-4 shadow-2xs">
                                    <div className="size-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                        <MapPin className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-accent">
                                            {isBn ? "প্রধান কার্যালয় ও কনসিয়ার্জ" : "Headquarters & Concierge"}
                                        </span>
                                        <p className="text-sm font-bold text-foreground mt-0.5">{siteData.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                            {isBn ? "গুলশান-২, ঢাকা - ১২১২, বাংলাদেশ" : siteData.address.full}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Help Center CTA Box */}
                            <div className="p-5 rounded-2xl bg-surface-secondary/40 border border-accent/20 space-y-2.5">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <Sparkles className="size-4 text-accent" />
                                    <span>{isBn ? "দ্রুত উত্তর খুঁজছেন?" : "Looking for fast answers?"}</span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {isBn
                                        ? "বুকিং, সিকিউরিটি ডিপোজিট, বাতিলকরণ নীতি এবং হোস্ট পেআউট সম্পর্কিত আমাদের সাধারণ জিজ্ঞাসাসমূহ দেখুন।"
                                        : "Explore our comprehensive knowledge base with answers to frequently asked questions about booking, security deposits, cancellations, and host payouts."}
                                </p>
                                <Link href="/help" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors pt-1">
                                    <span>{isBn ? "হেল্প সেন্টার ও সাধারণ প্রশ্নোত্তর দেখুন" : "Browse Help Center & FAQs"}</span>
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Interactive Form with React Hook Form + Zod (7 cols) */}
                        <div className="lg:col-span-7">
                            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl border border-border bg-white dark:bg-card shadow-xs">
                                {isSubmitted ? (
                                    /* SUBMISSION SUCCESS STATE */
                                    <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="size-16 mx-auto rounded-full bg-accent/15 text-accent flex items-center justify-center shadow-xs">
                                            <CheckCircle2 className="size-9" />
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-foreground">
                                                {isBn ? "বার্তা সফলভাবে পাঠানো হয়েছে!" : "Inquiry Sent Successfully!"}
                                            </h3>
                                            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                                                {isBn ? (
                                                    <>
                                                        ধন্যবাদ, <span className="font-semibold text-foreground">{submittedData?.fullName}</span>। আপনার বার্তাটি গ্রহণ করা হয়েছে। আমাদের কনসিয়ার্জ টিম ২ ঘণ্টার মধ্যে আপনার ইমেইল{" "}
                                                        <span className="font-semibold text-foreground">{submittedData?.email}</span> এ যোগাযোগ করবে।
                                                    </>
                                                ) : (
                                                    <>
                                                        Thank you, <span className="font-semibold text-foreground">{submittedData?.fullName}</span>. Your inquiry regarding <span className="font-semibold text-accent">{categories.find((c) => c.id === submittedData?.category)?.label}</span> has been logged. Our concierge will respond to{" "}
                                                        <span className="font-semibold text-foreground">{submittedData?.email}</span> within 2 business hours.
                                                    </>
                                                )}
                                            </p>
                                        </div>

                                        <div className="pt-4">
                                            <button type="button" onClick={handleReset} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-xs active:scale-[0.98]">
                                                {isBn ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                                                {isBn ? "যোগাযোগ বার্তা পাঠান" : "Send an Inquiry"}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                                {isBn ? "আপনার জিজ্ঞাসার ধরন নির্বাচন করুন এবং বিস্তারিত লিখুন।" : "Select the category your inquiry relates to and provide details below."}
                                            </p>
                                        </div>

                                        {errors.root?.message && <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">{errors.root.message}</div>}

                                        {/* Category Selection Tabs / Cards */}
                                        <div className="space-y-2 pt-1">
                                            <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                {isBn ? "আমরা কীভাবে আপনাকে সাহায্য করতে পারি?" : "What can we help you with?"} <span className="text-destructive">*</span>
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                                                {categories.map((cat) => {
                                                    const Icon = cat.icon;
                                                    const isSelected = selectedCategory === cat.id;
                                                    return (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => setValue("category", cat.id, { shouldValidate: true })}
                                                            className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between active:scale-[0.98] ${isSelected ? "border-accent bg-surface-secondary text-primary shadow-2xs ring-1 ring-accent" : "bg-white dark:bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground"}`}
                                                        >
                                                            <Icon className={`size-4 mb-2 ${isSelected ? "text-accent" : "text-muted-foreground"}`} />
                                                            <div>
                                                                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-accent block">{cat.tag}</span>
                                                                <span className="text-xs font-bold leading-tight block mt-0.5 text-foreground">{cat.label}</span>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            {errors.category && <p className="text-xs text-destructive font-medium pt-1">{errors.category.message}</p>}
                                        </div>

                                        {/* Name & Email (2 columns) */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                            {/* Full Name */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between min-h-6">
                                                    <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                        {isBn ? "আপনার পুরো নাম" : "Full Name"} <span className="text-destructive">*</span>
                                                    </label>
                                                    {errors.fullName && (
                                                        <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span>{errors.fullName.message}</span>
                                                            <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder={isBn ? "যেমন: তানভীর আহমেদ" : "e.g. Alex Tan"}
                                                    className={`w-full h-11 px-3.5 text-sm bg-background rounded-xl border border-border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs ${errors.fullName ? "border-destructive focus:ring-2 focus:ring-destructive/15" : "focus:border-primary focus:ring-2 focus:ring-primary/15"}`}
                                                    {...register("fullName")}
                                                />
                                            </div>

                                            {/* Email Address */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between min-h-6">
                                                    <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                        {isBn ? "ইমেইল ঠিকানা" : "Email Address"} <span className="text-destructive">*</span>
                                                    </label>
                                                    {errors.email && (
                                                        <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span>{errors.email.message}</span>
                                                            <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="email"
                                                    placeholder="alex.tan@example.com"
                                                    className={`w-full h-11 px-3.5 text-sm bg-background rounded-xl border border-border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs ${errors.email ? "border-destructive focus:ring-2 focus:ring-destructive/15" : "focus:border-primary focus:ring-2 focus:ring-primary/15"}`}
                                                    {...register("email")}
                                                />
                                            </div>
                                        </div>

                                        {/* Phone & Subject (2 columns) */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Phone */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between min-h-6">
                                                    <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                        {isBn ? "ফোন নম্বর" : "Phone Number"} <span className="text-muted-foreground font-normal">({isBn ? "ঐচ্ছিক" : "Optional"})</span>
                                                    </label>
                                                    {errors.phone && (
                                                        <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span>{errors.phone.message}</span>
                                                            <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="tel"
                                                    placeholder="+880 1700-000000"
                                                    className={`w-full h-11 px-3.5 text-sm bg-background rounded-xl border border-border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs ${errors.phone ? "border-destructive focus:ring-2 focus:ring-destructive/15" : "focus:border-primary focus:ring-2 focus:ring-primary/15"}`}
                                                    {...register("phone")}
                                                />
                                            </div>

                                            {/* Subject */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between min-h-6">
                                                    <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                        {isBn ? "বিষয়" : "Subject"} <span className="text-destructive">*</span>
                                                    </label>
                                                    {errors.subject && (
                                                        <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span>{errors.subject.message}</span>
                                                            <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder={isBn ? "যেমন: ব্যাচেলর সিট ভাড়া সম্পর্কিত তথ্য" : "e.g. Inquiry regarding bachelor seat sublet"}
                                                    className={`w-full h-11 px-3.5 text-sm bg-background rounded-xl border border-border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs ${errors.subject ? "border-destructive focus:ring-2 focus:ring-destructive/15" : "focus:border-primary focus:ring-2 focus:ring-primary/15"}`}
                                                    {...register("subject")}
                                                />
                                            </div>
                                        </div>

                                        {/* Message Textarea */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between min-h-6">
                                                <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                    {isBn ? "আপনার বিস্তারিত বার্তা" : "Message"} <span className="text-destructive">*</span>
                                                </label>
                                                {errors.message && (
                                                    <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span>{errors.message.message}</span>
                                                        <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                    </div>
                                                )}
                                            </div>
                                            <textarea
                                                rows={5}
                                                placeholder={isBn ? "আপনার প্রয়োজনীয় তারিখ, এলাকা বা বিশদ বিবরণ লিখুন..." : "Please describe your inquiry, move-in dates, location preference, or listing details in as much detail as possible..."}
                                                className={`w-full p-3.5 text-sm bg-background rounded-xl border border-border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs resize-none ${errors.message ? "border-destructive focus:ring-2 focus:ring-destructive/15" : "focus:border-primary focus:ring-2 focus:ring-primary/15"}`}
                                                {...register("message")}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-hover transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.99] select-none ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                                            >
                                                {isSubmitting ? (
                                                    <span>{isBn ? "পাঠানো হচ্ছে..." : "Sending..."}</span>
                                                ) : (
                                                    <>
                                                        <Send className="size-4" />
                                                        <span>{isBn ? "বার্তা প্রেরণ করুন" : "Send Inquiry"}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactView;