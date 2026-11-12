"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import {
    Mail,
    PhoneCall,
    MapPin,
    Send,
    CheckCircle2,
    ArrowRight,
    Building2,
    Hotel,
    Trophy,
    Home,
    ShieldCheck,
    Clock,
    Sparkles,
} from "@/components/Icons";
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

export const ContactView = () => {
    const [selectedCategory, setSelectedCategory] = useState<InquiryCategory>("rent");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const newErrors: Record<string, string> = {};
        if (!fullName.trim()) newErrors.fullName = "Please enter your full name";
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please enter a valid email address";
        if (!subject.trim()) newErrors.subject = "Please enter a subject";
        if (!message.trim() || message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            setIsSubmitted(true);
        } catch {
            setErrors({ general: "Failed to send message. Please try again or reach our hotline directly." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setFullName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        setErrors({});
    };

    return (
        <div className="w-full bg-background text-foreground">
            {/* ============================================================== */}
            {/* 1. HERO HEADER (FULL WIDTH WITH AMBIENT LIGHTING)               */}
            {/* ============================================================== */}
            <section className="relative w-full overflow-hidden border-b border-border bg-linear-to-b from-surface-secondary/80 via-surface to-background pt-14 pb-16 lg:pt-20 lg:pb-24">
                {/* Ambient glow decoration */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-212.5 h-112.5 bg-linear-to-tr from-accent/15 via-emerald-400/10 to-transparent blur-3xl opacity-70"
                />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="w-full text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-accent/30 shadow-xs text-xs font-semibold text-primary">
                            <span className="size-2 rounded-full bg-accent" />
                            <span className="tracking-wide uppercase text-[11px] font-bold">24/7 Concierge & Inquiries</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.15] max-w-4xl mx-auto">
                            Get in Touch with FindBookStay
                        </h1>

                        <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                            Whether you need help finding a rental apartment, booking a hotel stay, scheduling a sports turf, or listing your property as a host, our direct concierge team is here to assist.
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 2. DIRECT CONTACT BENTO CHANNELS (FULL CONTAINER WIDTH)         */}
            {/* ============================================================== */}
            <section className="w-full py-12 lg:py-16 border-b border-border bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Channel 1: Hotline */}
                        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between hover:border-accent/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-background border border-border flex items-center justify-center text-accent">
                                    <PhoneCall className="size-5" />
                                </div>
                                <h2 className="text-base font-bold text-primary">24/7 Direct Hotline</h2>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Speak directly with our concierge team for urgent booking or check-in support.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-border">
                                <a
                                    href={`tel:${siteData.contacts.phoneClean}`}
                                    className="cursor-pointer text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
                                >
                                    <span>{siteData.contacts.phoneDisplay}</span>
                                    <ArrowRight className="size-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Channel 2: Support Email */}
                        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between hover:border-accent/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-background border border-border flex items-center justify-center text-accent">
                                    <Mail className="size-5" />
                                </div>
                                <h2 className="text-base font-bold text-primary">General Support</h2>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Send us your questions, booking details, or account assistance requests.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-border">
                                <a
                                    href={`mailto:${siteData.contacts.supportEmail}`}
                                    className="cursor-pointer text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
                                >
                                    <span>{siteData.contacts.supportEmail}</span>
                                    <ArrowRight className="size-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Channel 3: Host & Turf Partnerships */}
                        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between hover:border-accent/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-background border border-border flex items-center justify-center text-accent">
                                    <ShieldCheck className="size-5" />
                                </div>
                                <h2 className="text-base font-bold text-primary">Host & Turf Partners</h2>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Dedicated onboarding and account assistance for owners and managers.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-border">
                                <a
                                    href={`mailto:${siteData.contacts.partnersEmail}`}
                                    className="cursor-pointer text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
                                >
                                    <span>{siteData.contacts.partnersEmail}</span>
                                    <ArrowRight className="size-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Channel 4: Headquarters */}
                        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between hover:border-accent/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-background border border-border flex items-center justify-center text-accent">
                                    <MapPin className="size-5" />
                                </div>
                                <h2 className="text-base font-bold text-primary">Global Headquarters</h2>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    {siteData.address.full}
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-border">
                                <span className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                                    <span>Mon – Sun, 24/7 Ops</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 3. MAIN INTERACTIVE CONTACT SECTION (EXPANSIVE 12-COL LAYOUT)   */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                        {/* ---------------------------------------------------------- */}
                        {/* Left Side: Brand Story, Guarantees & FAQ Shortcut (5 cols) */}
                        {/* ---------------------------------------------------------- */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                                    <Sparkles className="size-3.5" />
                                    <span>Direct & Transparent</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                                    Send a message to our direct desk
                                </h2>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Our marketplace eliminates middleman brokers and unauthorized agents. When you reach out, your inquiry is directly routed to our verified category specialists who will coordinate between you, property landlords, and turf managers.
                                </p>
                            </div>

                            {/* Trust Highlights */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface border border-border">
                                    <div className="size-8 rounded-lg bg-background border border-border flex items-center justify-center text-accent shrink-0 mt-0.5">
                                        <Clock className="size-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-primary">Under 15 Minutes Response</h3>
                                        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                                            Our active concierge monitors inquiries round-the-clock to ensure rapid assistance.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface border border-border">
                                    <div className="size-8 rounded-lg bg-background border border-border flex items-center justify-center text-accent shrink-0 mt-0.5">
                                        <ShieldCheck className="size-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-primary">Zero Broker Markups</h3>
                                        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                                            100% transparent pricing directly agreed with property owners and venue operators.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Help Center Callout */}
                            <div className="p-6 rounded-2xl bg-surface-secondary border border-border space-y-3">
                                <h3 className="text-sm font-bold text-primary">Need an immediate answer?</h3>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Explore our comprehensive Help Center containing answers to questions about booking deposits, cancellation policies, and turf equipment.
                                </p>
                                <Link
                                    href="/help"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors pt-1 cursor-pointer"
                                >
                                    <span>Browse Searchable FAQs</span>
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* ---------------------------------------------------------- */}
                        {/* Right Side: Main Contact Form (7 cols)                     */}
                        {/* ---------------------------------------------------------- */}
                        <div className="lg:col-span-7">
                            <div className="p-6 sm:p-10 rounded-3xl bg-surface border border-border shadow-xs">
                                {isSubmitted ? (
                                    /* Success State */
                                    <div className="py-12 sm:py-16 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="size-16 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto shadow-2xs">
                                            <CheckCircle2 className="size-9" />
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary">Message Sent Successfully</h3>
                                            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                                                Thank you, <span className="font-semibold text-foreground">{fullName}</span>. Your inquiry regarding{" "}
                                                <span className="font-semibold text-primary">{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</span> has been logged. Our concierge will respond to{" "}
                                                <span className="font-semibold text-foreground">{email}</span> within 15 minutes.
                                            </p>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="button"
                                                onClick={handleReset}
                                                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                                            >
                                                Send Another Message
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
                                                Send an Inquiry
                                            </h3>
                                            <p className="text-xs sm:text-sm text-text-secondary mt-1">
                                                Select the vertical your inquiry relates to and provide details below.
                                            </p>
                                        </div>

                                        {errors.general && (
                                            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium">
                                                {errors.general}
                                            </div>
                                        )}

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
                                                            onClick={() => setSelectedCategory(cat.id)}
                                                            className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
                                                                isSelected
                                                                    ? "border-accent bg-background text-primary shadow-2xs ring-1 ring-accent"
                                                                    : "bg-background text-text-secondary hover:border-accent/40 hover:text-foreground"
                                                            }`}
                                                        >
                                                            <Icon className={`size-4 mb-2 ${isSelected ? "text-accent" : "text-text-secondary"}`} />
                                                            <div>
                                                                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-accent block">
                                                                    {cat.tag}
                                                                </span>
                                                                <span className="text-xs font-bold leading-tight block mt-0.5 text-foreground">
                                                                    {cat.label}
                                                                </span>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
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
                                                            <span>{errors.fullName}</span>
                                                            <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="e.g. Alex Tan"
                                                    className={`w-full h-11 px-3.5 text-sm bg-background rounded-xl border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs ${
                                                        errors.fullName
                                                            ? "border-destructive focus:ring-2 focus:ring-destructive/15"
                                                            : "focus:border-primary focus:ring-2 focus:ring-primary/15"
                                                    }`}
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
                                                            <span>{errors.email}</span>
                                                            <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="alex.tan@example.com"
                                                    className={`w-full h-11 px-3.5 text-sm bg-background rounded-xl border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs ${
                                                        errors.email
                                                            ? "border-destructive focus:ring-2 focus:ring-destructive/15"
                                                            : "focus:border-primary focus:ring-2 focus:ring-primary/15"
                                                    }`}
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
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="e.g. +880 1712-345678"
                                                    className="w-full h-11 px-3.5 text-sm bg-background rounded-xl border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs focus:border-primary focus:ring-2 focus:ring-primary/15"
                                                />
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
                                                            <span>{errors.subject}</span>
                                                            <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="text"
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    placeholder="e.g. Inquiring about flat rental"
                                                    className={`w-full h-11 px-3.5 text-sm bg-background rounded-xl border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs ${
                                                        errors.subject
                                                            ? "border-destructive focus:ring-2 focus:ring-destructive/15"
                                                            : "focus:border-primary focus:ring-2 focus:ring-primary/15"
                                                    }`}
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
                                                        <span>{errors.message}</span>
                                                        <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                                                    </div>
                                                )}
                                            </div>
                                            <textarea
                                                rows={5}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Please provide details about your desired dates, property requirements, sports turf schedule, or questions..."
                                                className={`w-full p-4 text-sm bg-background rounded-xl border placeholder:text-muted-foreground transition-all duration-200 outline-none shadow-2xs resize-none ${
                                                    errors.message
                                                        ? "border-destructive focus:ring-2 focus:ring-destructive/15"
                                                        : "focus:border-primary focus:ring-2 focus:ring-primary/15"
                                                }`}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-12 px-6 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 shadow-xs"
                                            >
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
