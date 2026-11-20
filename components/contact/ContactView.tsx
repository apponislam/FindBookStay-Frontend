"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { Mail, PhoneCall, MapPin, Send, CheckCircle2, ArrowRight, Building2, Hotel, Trophy, Home, ShieldCheck, Clock, Sparkles } from "@/components/Icons";
import siteData from "@/constants/siteData";

type InquiryCategory = "rent" | "book" | "sports" | "buy" | "partner";

interface CategoryOption {
    id: InquiryCategory;
    tag: string;
    label: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    description: string;
}

const CATEGORIES: CategoryOption[] = [
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

// Zod Schema for Contact Inquiry Form
const contactSchema = z.object({
    category: z.enum(["rent", "book", "sports", "buy", "partner"], {
        message: "Please select an inquiry category",
    }),
    fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(60, "Name cannot exceed 60 characters"),
    email: z.string().trim().min(1, "Email address is required").email("Enter a valid email address"),
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
                message: "Failed to send message. Please try again or reach our concierge directly.",
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
            <section className="relative w-full overflow-hidden border-b border-border bg-linear-to-b from-surface-secondary/70 via-background to-background pt-14 pb-16 lg:pt-20 lg:pb-20">
                {/* Ambient glow accent */}
                <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-212.5 h-112.5 bg-linear-to-tr from-accent/15 via-accent/5 to-transparent blur-3xl opacity-70" />

                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-accent/30 shadow-2xs text-xs font-semibold text-foreground">
                            <span className="size-2 rounded-full bg-accent animate-pulse" />
                            <span className="tracking-wide uppercase text-[11px] font-bold text-accent">FindBookStay Concierge</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15]">We&apos;re Here to Help</h1>

                        <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">Need help finding a flat, booking a resort, reserving a sports turf slot, or listing your property? Connect directly with our team.</p>

                        {/* Quick Contact Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-text-secondary">
                                <Clock className="size-3.5 text-accent" />
                                <span>Typical reply: &lt; 2 hours</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-text-secondary">
                                <ShieldCheck className="size-3.5 text-accent" />
                                <span>100% Direct Support & Zero Broker Friction</span>
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
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent block mb-1">Direct Channels</span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Get in Touch with Our Team</h2>
                                <p className="text-sm text-text-secondary mt-2 leading-relaxed">Whether you are a tenant looking for an apartment, a traveler booking a stay, a sports enthusiast reserving turf time, or a host managing properties, we are available round-the-clock.</p>
                            </div>

                            {/* Cards for Support Channels */}
                            <div className="space-y-3 pt-1">
                                {/* Hotline Card */}
                                <a href={`tel:${siteData.contacts.phone}`} className="group p-4 sm:p-5 rounded-2xl border border-border hover:border-accent/60 bg-surface/80 hover:bg-surface-secondary/40 transition-all duration-200 flex items-start gap-4 cursor-pointer active:scale-[0.99] shadow-2xs">
                                    <div className="size-11 rounded-xl bg-accent/10 group-hover:bg-accent group-hover:text-primary text-accent flex items-center justify-center shrink-0 transition-all duration-200">
                                        <PhoneCall className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-wider text-accent">Phone Hotline</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">24/7 Live</span>
                                        </div>
                                        <p className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors mt-0.5">{siteData.contacts.phone}</p>
                                        <p className="text-xs text-text-secondary mt-1">Urgent booking support, check-in assistance, and host inquiries.</p>
                                    </div>
                                </a>

                                {/* General Inquiries Email Card */}
                                <a href={`mailto:${siteData.contacts.supportEmail}`} className="group p-4 sm:p-5 rounded-2xl border border-border hover:border-accent/60 bg-surface/80 hover:bg-surface-secondary/40 transition-all duration-200 flex items-start gap-4 cursor-pointer active:scale-[0.99] shadow-2xs">
                                    <div className="size-11 rounded-xl bg-accent/10 group-hover:bg-accent group-hover:text-primary text-accent flex items-center justify-center shrink-0 transition-all duration-200">
                                        <Mail className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-wider text-accent">Support Email</span>
                                            <span className="text-[10px] text-text-secondary font-mono">Avg &lt;2h</span>
                                        </div>
                                        <p className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors mt-0.5">{siteData.contacts.supportEmail}</p>
                                        <p className="text-xs text-text-secondary mt-1">General questions, account issues, billing, and partner inquiries.</p>
                                    </div>
                                </a>

                                {/* Physical Location Card */}
                                <div className="p-4 sm:p-5 rounded-2xl border border-border bg-surface/80 flex items-start gap-4 shadow-2xs">
                                    <div className="size-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                        <MapPin className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-accent">Headquarters & Concierge</span>
                                        <p className="text-sm font-bold text-foreground mt-0.5">{siteData.name}</p>
                                        <p className="text-xs text-text-secondary mt-1 leading-relaxed">{siteData.address.full}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Help Center CTA Box */}
                            <div className="p-5 rounded-2xl bg-linear-to-br from-surface-secondary/70 to-surface border border-accent/20 space-y-2.5">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <Sparkles className="size-4 text-accent" />
                                    <span>Looking for fast answers?</span>
                                </div>
                                <p className="text-xs text-text-secondary leading-relaxed">Explore our comprehensive knowledge base with answers to frequently asked questions about booking, security deposits, cancellations, and host payouts.</p>
                                <Link href="/help" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors pt-1">
                                    <span>Browse Help Center & FAQs</span>
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
                                            <h3 className="text-2xl font-bold text-foreground">Inquiry Sent Successfully!</h3>
                                            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                                                Thank you, <span className="font-semibold text-foreground">{submittedData?.fullName}</span>. Your inquiry regarding <span className="font-semibold text-accent">{CATEGORIES.find((c) => c.id === submittedData?.category)?.label}</span> has been logged. Our concierge will respond to{" "}
                                                <span className="font-semibold text-foreground">{submittedData?.email}</span> within 2 business hours.
                                            </p>
                                        </div>

                                        <div className="pt-4">
                                            <button type="button" onClick={handleReset} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-xs active:scale-[0.98]">
                                                Send Another Message
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Send an Inquiry</h3>
                                            <p className="text-xs sm:text-sm text-text-secondary mt-1">Select the category your inquiry relates to and provide details below.</p>
                                        </div>

                                        {errors.root?.message && <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium animate-in fade-in duration-150">{errors.root.message}</div>}

                                        {/* Category Selection Tabs / Cards */}
                                        <div className="space-y-2 pt-1">
                                            <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                What can we help you with? <span className="text-destructive">*</span>
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                                                {CATEGORIES.map((cat) => {
                                                    const Icon = cat.icon;
                                                    const isSelected = selectedCategory === cat.id;
                                                    return (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => setValue("category", cat.id, { shouldValidate: true })}
                                                            className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between active:scale-[0.98] ${isSelected ? "border-accent bg-background text-primary shadow-2xs ring-1 ring-accent" : "bg-background text-text-secondary hover:border-accent/40 hover:text-foreground"}`}
                                                        >
                                                            <Icon className={`size-4 mb-2 ${isSelected ? "text-accent" : "text-text-secondary"}`} />
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
                                                        Full Name <span className="text-destructive">*</span>
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
                                                    placeholder="e.g. Alex Tan"
                                                    className={`w-full h-11 px-3.5 text-sm bg-background rounded-xl border border-border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs ${errors.fullName ? "border-destructive focus:ring-2 focus:ring-destructive/15" : "focus:border-primary focus:ring-2 focus:ring-primary/15"}`}
                                                    {...register("fullName")}
                                                />
                                            </div>

                                            {/* Email Address */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between min-h-6">
                                                    <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                        Email Address <span className="text-destructive">*</span>
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
                                                        Phone Number <span className="text-text-secondary font-normal">(Optional)</span>
                                                    </label>
                                                    {errors.phone && (
                                                        <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span>{errors.phone.message}</span>
                                                            <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                        </div>
                                                    )}
                                                </div>
                                                <input type="tel" placeholder="e.g. +880 1712-345678" className="w-full h-11 px-3.5 text-sm bg-background rounded-xl border border-border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs focus:border-primary focus:ring-2 focus:ring-primary/15" {...register("phone")} />
                                            </div>

                                            {/* Subject */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between min-h-6">
                                                    <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                        Subject <span className="text-destructive">*</span>
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
                                                    placeholder="e.g. Inquiring about flat rental"
                                                    className={`w-full h-11 px-3.5 text-sm bg-background rounded-xl border border-border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs ${errors.subject ? "border-destructive focus:ring-2 focus:ring-destructive/15" : "focus:border-primary focus:ring-2 focus:ring-primary/15"}`}
                                                    {...register("subject")}
                                                />
                                            </div>
                                        </div>

                                        {/* Message Textarea */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between min-h-6">
                                                <label className="block text-xs font-semibold text-foreground tracking-wide">
                                                    Your Message <span className="text-destructive">*</span>
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
                                                placeholder="Please provide details about your desired dates, property requirements, sports turf schedule, or questions..."
                                                className={`w-full p-4 text-sm bg-background rounded-xl border border-border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs resize-none ${errors.message ? "border-destructive focus:ring-2 focus:ring-destructive/15" : "focus:border-primary focus:ring-2 focus:ring-primary/15"}`}
                                                {...register("message")}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-2">
                                            <button type="submit" disabled={isSubmitting} className="w-full h-12 px-6 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 shadow-xs">
                                                {isSubmitting ? (
                                                    <span>Transmitting message...</span>
                                                ) : (
                                                    <>
                                                        <span>Send Inquiry</span>
                                                        <Send className="size-4" />
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
