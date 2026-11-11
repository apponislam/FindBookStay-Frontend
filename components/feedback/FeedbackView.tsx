"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, Star, Send, ArrowRight, ArrowLeft, Building2, Hotel, Trophy, Home } from "@/components/Icons";

interface FeedbackCategory {
    id: string;
    label: string;
    tagline: string;
    description: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
}

const CATEGORIES: FeedbackCategory[] = [
    {
        id: "mobile-app",
        label: "Mobile Apps (iOS / Android)",
        tagline: "App Updates",
        description: "Suggestions, features & interface ideas for our upcoming mobile applications",
        icon: Sparkles,
    },
    {
        id: "web-platform",
        label: "Web Platform Experience",
        tagline: "Website & Search",
        description: "Navigation, search filters, loading speed & overall desktop/mobile browser experience",
        icon: Building2,
    },
    {
        id: "feature-request",
        label: "New Feature Suggestion",
        tagline: "Roadmap Ideas",
        description: "New tools, category options, or platform capabilities you want to see built",
        icon: Trophy,
    },
    {
        id: "host-tools",
        label: "Host & Owner Tools",
        tagline: "Listing Management",
        description: "Experience posting listings for rent, stays, sports turfs, or property sales",
        icon: Home,
    },
    {
        id: "bug-report",
        label: "Bug or Issue Report",
        tagline: "Technical Fixes",
        description: "Report a broken link, visual glitch, or unexpected behavior on the site",
        icon: Hotel,
    },
];

const RATING_LABELS = ["Select your rating", "Needs Improvement", "Fair Experience", "Good Platform", "Very Good", "Exceptional!"];

const FeedbackView = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("mobile-app");
    const [rating, setRating] = useState<number>(5);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [userRole, setUserRole] = useState("Seeker / Tenant / Guest");
    const [platform, setPlatform] = useState("Web Desktop");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !email || !message) return;
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setTitle("");
        setMessage("");
        setRating(5);
    };

    return (
        <div className="w-full bg-white text-[#172B2A]">
            {/* ============================================================== */}
            {/* 1. HERO HEADER                                                 */}
            {/* ============================================================== */}
            <section className="relative w-full overflow-hidden border-b border-[#E2EAE6] bg-linear-to-b from-[#F0F5F3]/80 via-[#F8FAF9] to-white pt-14 pb-16 lg:pt-20 lg:pb-20">
                {/* Ambient glow */}
                <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-212.5 h-112.5 bg-linear-to-tr from-[#10B981]/15 via-[#34D399]/10 to-transparent blur-3xl opacity-70" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="w-full text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#10B981]/30 shadow-xs text-xs font-semibold text-[#073B35]">
                            <span className="size-2 rounded-full bg-[#10B981]" />
                            <span className="tracking-wide uppercase text-[11px] font-bold text-[#073B35]">Product Feedback & Updates</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#073B35] tracking-tight leading-[1.15] max-w-4xl mx-auto">Share Your Feedback & Shape FindBookStay</h1>

                        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
                            We are building this platform for you. Tell us about your experience using our web marketplace, share ideas for our upcoming mobile apps, or report bugs directly to our product engineering team.
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 2. MAIN FEEDBACK FORM (FULL WIDTH CONTAINER)                   */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {isSubmitted ? (
                        /* SUCCESS STATE */
                        <div className="w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#F8FAF9] border border-[#10B981]/40 text-center space-y-6 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                            <div className="size-16 rounded-2xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mx-auto">
                                <CheckCircle2 className="size-9" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#073B35]">Thank you for your valuable feedback!</h2>
                                <p className="text-sm text-[#64748B] leading-relaxed max-w-lg mx-auto">Your thoughts have been logged directly for our engineering and design team. We review every single submission as we release new updates to the web platform and mobile apps.</p>
                            </div>

                            <div className="p-4 rounded-xl bg-white border border-[#E2EAE6] text-xs text-[#64748B] max-w-md mx-auto text-left">
                                <div className="flex items-center justify-between font-semibold text-[#073B35] mb-1">
                                    <span>Category:</span>
                                    <span className="uppercase text-[11px] text-[#10B981]">{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Submitted by:</span>
                                    <span className="font-medium text-[#172B2A]">
                                        {fullName} ({email})
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                                <button type="button" onClick={handleReset} className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl bg-[#073B35] text-white text-xs font-bold hover:bg-[#052F2A] transition-all">
                                    Submit Another Feedback
                                </button>
                                <Link href="/" className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E2EAE6] bg-white text-[#172B2A] text-xs font-semibold hover:border-[#10B981] hover:bg-[#F0F5F3] transition-all">
                                    Back to Marketplace
                                </Link>
                            </div>
                        </div>
                    ) : (
                        /* FORM STATE */
                        <form onSubmit={handleSubmit} className="w-full space-y-12">
                            {/* Step A: Select Topic / Category (5 Cards) */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-6 rounded-full bg-[#073B35] text-white text-xs font-bold flex items-center justify-center">1</span>
                                    <h3 className="text-lg font-bold text-[#073B35]">What is your feedback regarding?</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                                    {CATEGORIES.map((cat) => {
                                        const CatIcon = cat.icon;
                                        const isSelected = selectedCategory === cat.id;
                                        return (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`cursor-pointer p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 ${
                                                    isSelected ? "bg-[#073B35] text-white border-[#073B35] shadow-sm scale-[1.02]" : "bg-white border-[#E2EAE6] text-[#172B2A] hover:border-[#10B981]/50 hover:bg-[#F8FAF9]"
                                                }`}
                                            >
                                                <div className="space-y-3">
                                                    <div className={`size-10 rounded-xl flex items-center justify-center ${isSelected ? "bg-white/10 text-[#34D399]" : "bg-[#F0F5F3] text-[#10B981]"}`}>
                                                        <CatIcon className="size-5" />
                                                    </div>
                                                    <div>
                                                        <span className={`text-[10px] uppercase font-bold tracking-wider block ${isSelected ? "text-[#34D399]" : "text-[#10B981]"}`}>{cat.tagline}</span>
                                                        <h4 className="text-xs sm:text-sm font-bold mt-0.5 leading-snug">{cat.label}</h4>
                                                    </div>
                                                </div>

                                                <p className={`mt-2 text-[11px] leading-relaxed ${isSelected ? "text-white/80" : "text-[#64748B]"}`}>{cat.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Step B: Overall Experience Rating */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-6 rounded-full bg-[#073B35] text-white text-xs font-bold flex items-center justify-center">2</span>
                                    <h3 className="text-lg font-bold text-[#073B35]">Rate your overall experience with FindBookStay</h3>
                                </div>

                                <div className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#E2EAE6] flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((starValue) => {
                                            const isFilled = hoverRating !== null ? starValue <= hoverRating : starValue <= rating;
                                            return (
                                                <button
                                                    key={starValue}
                                                    type="button"
                                                    onClick={() => setRating(starValue)}
                                                    onMouseEnter={() => setHoverRating(starValue)}
                                                    onMouseLeave={() => setHoverRating(null)}
                                                    className="cursor-pointer p-1 transition-transform hover:scale-125 focus:outline-hidden"
                                                    aria-label={`Rate ${starValue} stars`}
                                                >
                                                    <Star className={`size-7 transition-colors ${isFilled ? "text-amber-400 fill-amber-400" : "text-[#E2EAE6] fill-transparent"}`} />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="text-xs sm:text-sm font-bold text-[#073B35] bg-white px-4 py-2 rounded-xl border border-[#E2EAE6]">{hoverRating !== null ? RATING_LABELS[hoverRating] : RATING_LABELS[rating]}</div>
                                </div>
                            </div>

                            {/* Step C: Details & Message (Inputs) */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-6 rounded-full bg-[#073B35] text-white text-xs font-bold flex items-center justify-center">3</span>
                                    <h3 className="text-lg font-bold text-[#073B35]">Tell us what you think</h3>
                                </div>

                                <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAF9] border border-[#E2EAE6] space-y-6">
                                    {/* Row 1: Name & Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#172B2A]">
                                                Your Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="e.g. Appon Islam"
                                                className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2EAE6] text-xs sm:text-sm text-[#172B2A] placeholder:text-[#64748B] focus:outline-hidden focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#172B2A]">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="e.g. appon@example.com"
                                                className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2EAE6] text-xs sm:text-sm text-[#172B2A] placeholder:text-[#64748B] focus:outline-hidden focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: User Persona & Device */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#172B2A]">How do you use FindBookStay?</label>
                                            <select
                                                value={userRole}
                                                onChange={(e) => setUserRole(e.target.value)}
                                                className="cursor-pointer w-full px-4 py-3 rounded-xl bg-white border border-[#E2EAE6] text-xs sm:text-sm text-[#172B2A] focus:outline-hidden focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15"
                                            >
                                                <option>Seeker / Tenant / Guest</option>
                                                <option>Property Owner / Landlord</option>
                                                <option>Hotel / Resort Host</option>
                                                <option>Sports Turf Player / Club Manager</option>
                                                <option>Tech & App Enthusiast</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#172B2A]">Device / Platform</label>
                                            <select
                                                value={platform}
                                                onChange={(e) => setPlatform(e.target.value)}
                                                className="cursor-pointer w-full px-4 py-3 rounded-xl bg-white border border-[#E2EAE6] text-xs sm:text-sm text-[#172B2A] focus:outline-hidden focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15"
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
                                        <label className="text-xs font-bold text-[#172B2A]">Subject / Summary</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. Quick filters for bachelor seats or Turf booking instant notifications"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2EAE6] text-xs sm:text-sm text-[#172B2A] placeholder:text-[#64748B] focus:outline-hidden focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15"
                                        />
                                    </div>

                                    {/* Row 4: Detailed Message */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#172B2A]">
                                            Detailed Feedback or Suggestion <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Please describe what you liked, what can be improved, or features you want to see in upcoming web and app updates..."
                                            className="w-full p-4 rounded-xl bg-white border border-[#E2EAE6] text-xs sm:text-sm text-[#172B2A] placeholder:text-[#64748B] focus:outline-hidden focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-linear-to-r from-[#073B35] to-[#0E5A51] hover:from-[#052F2A] hover:to-[#073B35] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all group"
                                        >
                                            <Send className="size-4" />
                                            <span>Send Feedback to Team</span>
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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
            <section className="w-full py-16 lg:py-20 bg-[#F8FAF9] border-t border-[#E2EAE6]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-full mb-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] block mb-2">Product Roadmap & Updates</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#073B35] tracking-tight">What we are currently building</h2>
                        <p className="mt-2 text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">Your feedback directly influences our weekly updates. Here is a preview of platform enhancements in our pipeline.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-2xl bg-white border border-[#E2EAE6] shadow-2xs space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#10B981]/10 px-2.5 py-1 rounded-full">Mobile Apps</span>
                            <h4 className="text-sm font-bold text-[#073B35]">Dedicated iOS & Android Apps</h4>
                            <p className="text-xs text-[#64748B] leading-relaxed">Native mobile apps featuring instant turf slot booking, offline favoriting, and direct push alerts when new rental seats or properties are posted.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white border border-[#E2EAE6] shadow-2xs space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#10B981]/10 px-2.5 py-1 rounded-full">Search & Filters</span>
                            <h4 className="text-sm font-bold text-[#073B35]">Bachelor Seat & Utility Filters</h4>
                            <p className="text-xs text-[#64748B] leading-relaxed">Granular filters to sort rentals by included utilities (Wi-Fi, meal systems, attached bath, and gas backup) to simplify roommate matching.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white border border-[#E2EAE6] shadow-2xs space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#10B981]/10 px-2.5 py-1 rounded-full">Sports Engine</span>
                            <h4 className="text-sm font-bold text-[#073B35]">Live Turf Availability Radar</h4>
                            <p className="text-xs text-[#64748B] leading-relaxed">Interactive real-time slot calendar allowing football and cricket teams to instantly check open floodlit hours across nearby artificial turfs.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white border border-[#E2EAE6] shadow-2xs space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#10B981]/10 px-2.5 py-1 rounded-full">Host Dashboard</span>
                            <h4 className="text-sm font-bold text-[#073B35]">Unified Host Portal</h4>
                            <p className="text-xs text-[#64748B] leading-relaxed">An upgraded management dashboard for landlords, resort hosts, and turf operators to update slot pricing, photos, and direct inquiries.</p>
                        </div>
                    </div>

                    <div className="mt-10 p-6 rounded-2xl bg-white border border-[#E2EAE6] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-[#F0F5F3] text-[#10B981] flex items-center justify-center shrink-0">
                                <Sparkles className="size-5" />
                            </div>
                            <div>
                                <h4 className="text-xs sm:text-sm font-bold text-[#073B35]">Want to be an early beta tester for the mobile apps?</h4>
                                <p className="text-xs text-[#64748B]">Select &ldquo;Mobile Apps (iOS / Android)&rdquo; above and leave your email to get early invite links.</p>
                            </div>
                        </div>

                        <Link href="/help" className="cursor-pointer text-xs font-bold text-[#073B35] hover:text-[#10B981] flex items-center gap-1.5 shrink-0">
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
