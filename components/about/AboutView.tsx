"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Home,
    Building2,
    Hotel,
    Trophy,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    MapPin,
    Mail,
    PhoneCall,
    Sparkles,
    Users,
    Clock,
    Globe,
    Zap,
    Search,
} from "@/components/Icons";
import siteData from "@/constants/siteData";

interface VerticalItem {
    id: string;
    number: string;
    title: string;
    tagline: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    href: string;
    badge: string;
    headline: string;
    description: string;
    highlights: string[];
    subcategories: { name: string; href: string }[];
}

const VERTICAL_TABS: VerticalItem[] = [
    {
        id: "buy",
        number: "01",
        title: "Buy Real Estate",
        tagline: "Prime Property Acquisition",
        icon: Home,
        href: "/buy",
        badge: "Verified Ownership",
        headline: "Discover prime residential and commercial properties with transparent ownership details.",
        description:
            "Say goodbye to duplicate broker ads and phantom postings. FindBookStay connects you directly with verified homeowners and developers across premier neighborhoods, commercial hubs, and verified plots.",
        highlights: [
            "Direct negotiations with verified homeowners & developers",
            "Residential duplexes, luxury penthouses, and gated villas",
            "Commercial plazas, office floors, and corporate locations",
            "Pre-launch developments and demarcated land plots",
        ],
        subcategories: [
            { name: "Residential Homes", href: "/buy/residential" },
            { name: "Luxury Apartments", href: "/buy/apartments" },
            { name: "Commercial Towers", href: "/buy/commercial" },
            { name: "Plots & Land", href: "/buy/land" },
            { name: "New Developments", href: "/buy/new-developments" },
        ],
    },
    {
        id: "rent",
        number: "02",
        title: "Rent Homes & Seats",
        tagline: "Residential Leasing",
        icon: Building2,
        href: "/rent",
        badge: "Direct Landlords",
        headline: "Family apartments, executive villas, and furnished bachelor seats without middleman stress.",
        description:
            "From secure multi-bedroom family homes to student-friendly bachelor seats with inclusive utilities, FindBookStay offers clear details on house rules, amenities, and host contact.",
        highlights: [
            "Direct communication with landlords and flat managers",
            "Family-tailored apartments and independent residences",
            "Single bachelor seats & shared rooms with utility breakdowns",
            "Flexible 1-to-6 month sublets for professionals and students",
        ],
        subcategories: [
            { name: "Family Apartments", href: "/rent/family-apartments" },
            { name: "Family Houses", href: "/rent/family-houses" },
            { name: "Bachelor Seats", href: "/rent/bachelor-seats" },
            { name: "Shared Rooms", href: "/rent/shared-rooms" },
            { name: "Monthly Sublets", href: "/rent/sublets" },
        ],
    },
    {
        id: "book",
        number: "03",
        title: "Book Stays & Resorts",
        tagline: "Hospitality & Travel",
        icon: Hotel,
        href: "/book",
        badge: "Handpicked Stays",
        headline: "Boutique city hotels, scenic nature getaways, and private vacation residences.",
        description:
            "Whether you need a centrally located city hotel for business, an eco-resort for a weekend retreat, or a cozy holiday home with personalized hosts, enjoy instant discovery with authentic details.",
        highlights: [
            "Handpicked city boutique and business hotels",
            "Lakeside, beach, and mountain getaway resorts",
            "Private holiday cottages and serviced executive suites",
            "Authentic host profiles, high-definition photo galleries & amenities",
        ],
        subcategories: [
            { name: "City Hotels", href: "/book/hotels" },
            { name: "Scenic Resorts", href: "/book/resorts" },
            { name: "Guest Houses & B&Bs", href: "/book/guest-houses" },
            { name: "Holiday Homes", href: "/book/holiday-homes" },
            { name: "Short-Stay Suites", href: "/book/short-stay" },
        ],
    },
    {
        id: "sports",
        number: "04",
        title: "Sports Turf Slots",
        tagline: "Recreation & Athletics",
        icon: Trophy,
        href: "/sports",
        badge: "Real-Time Booking",
        headline: "Reserve artificial football and cricket turfs, indoor courts, and tournament venues.",
        description:
            "Stop calling around to check if a turf is free. Explore modern artificial grass pitches, floodlit arenas, and indoor badminton courts with real-time slot schedules and transparent hourly pricing.",
        highlights: [
            "FIFA-standard artificial grass soccer & cricket turfs",
            "High-power floodlit arenas for night matches",
            "Indoor badminton, futsal, and squash courts",
            "Tournament venues and recreational community facilities",
        ],
        subcategories: [
            { name: "Turf Football & Cricket", href: "/sports/turf-booking" },
            { name: "Football Grounds", href: "/sports/football-grounds" },
            { name: "Indoor Sports Courts", href: "/sports/indoor-sports" },
            { name: "Swimming Clubs", href: "/sports/swimming" },
            { name: "Tournament Venues", href: "/sports/tournaments" },
        ],
    },
];

const STATS = [
    {
        value: "4 in 1",
        label: "Integrated Ecosystem",
        detail: "Real estate, home rentals, hotel stays & sports turfs united",
        icon: Sparkles,
    },
    {
        value: "Direct",
        label: "Direct Host Contact",
        detail: "Connect straight with verified property owners & venue managers",
        icon: Users,
    },
    {
        value: "100%",
        label: "Transparent Details",
        detail: "Accurate photos, verified amenities & upfront pricing",
        icon: ShieldCheck,
    },
    {
        value: "24/7",
        label: "Customer Concierge",
        detail: "Stationed at Gulshan-2, Dhaka with international operational hubs",
        icon: Clock,
    },
];

const CORE_VALUES = [
    {
        icon: Users,
        title: "Direct Connections",
        description:
            "We cut out unauthorized brokers and confusing middleman tiers. You communicate directly with verified homeowners, landlords, hoteliers, and turf managers.",
        badge: "No Middleman Markup",
    },
    {
        icon: ShieldCheck,
        title: "Transparent & Authentic",
        description:
            "What you see is what you experience. Real photographs, accurate specifications, genuine amenity lists, and explicit house rules on every single listing.",
        badge: "Zero Surprises",
    },
    {
        icon: Zap,
        title: "Unified Convenience",
        description:
            "Instead of juggling four separate apps for property, apartment rentals, holiday hotels, and turf slots, manage your entire lifestyle with one modern account.",
        badge: "One Seamless Login",
    },
    {
        icon: Globe,
        title: "Global Reach, Local Depth",
        description:
            "Headquartered in Gulshan-2, Dhaka with regional operational hubs expanding across Asia and beyond, built from the ground up for international standards.",
        badge: "Worldwide Vision",
    },
];

const AboutView = () => {
    const [activeTab, setActiveTab] = useState<string>("buy");

    const currentVertical = VERTICAL_TABS.find((tab) => tab.id === activeTab) || VERTICAL_TABS[0];
    const ActiveIcon = currentVertical.icon;

    return (
        <div className="w-full bg-white text-[#172B2A]">
            {/* ============================================================== */}
            {/* 1. CINEMATIC HERO SECTION                                      */}
            {/* ============================================================== */}
            <section className="relative w-full overflow-hidden border-b border-[#E2EAE6] bg-gradient-to-b from-[#F0F5F3]/80 via-[#F8FAF9] to-white pt-14 pb-16 lg:pt-20 lg:pb-24">
                {/* Luminous emerald ambient glows */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#10B981]/15 via-[#34D399]/10 to-transparent blur-3xl opacity-70"
                />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="w-full text-center space-y-6">
                        {/* Eyebrow badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#10B981]/30 shadow-xs text-xs font-semibold text-[#073B35]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                            </span>
                            <span className="tracking-wide uppercase text-[11px] font-bold text-[#073B35]">
                                The Modern International Marketplace
                            </span>
                        </div>

                        {/* Hero Headline */}
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#073B35] tracking-tight leading-[1.15] max-w-5xl mx-auto">
                            Connecting You Directly with{" "}
                            <span className="bg-gradient-to-r from-[#073B35] via-[#0E5A51] to-[#10B981] bg-clip-text text-transparent">
                                Stays, Homes & Sports Spaces.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] leading-relaxed max-w-3xl mx-auto font-normal">
                            FindBookStay unites property sales, residential rentals, hotel stays, and sports turf bookings into one seamless, transparent digital ecosystem—designed for modern living without middleman friction.
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                            <Link
                                href="/post-listing"
                                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#073B35] to-[#0E5A51] hover:from-[#052F2A] hover:to-[#073B35] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 group"
                            >
                                <span>Post Your Space as Owner</span>
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/sitemap"
                                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E2EAE6] bg-white text-[#172B2A] text-sm font-semibold hover:border-[#10B981] hover:bg-[#F0F5F3] hover:text-[#073B35] transition-all duration-200"
                            >
                                <Search className="size-4 text-[#10B981]" />
                                <span>Explore All Marketplace Verticals</span>
                            </Link>
                        </div>
                    </div>

                    {/* ============================================================== */}
                    {/* STATS BAR (FULL CONTAINER WIDTH)                               */}
                    {/* ============================================================== */}
                    <div className="w-full mt-14 lg:mt-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {STATS.map((stat, idx) => {
                                const StatIcon = stat.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="w-full p-6 rounded-2xl bg-white border border-[#E2EAE6] shadow-2xs hover:border-[#10B981]/50 hover:shadow-sm transition-all duration-200"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl sm:text-3xl font-extrabold text-[#073B35] tracking-tight">
                                                {stat.value}
                                            </span>
                                            <div className="size-10 rounded-xl bg-[#F0F5F3] flex items-center justify-center text-[#10B981]">
                                                <StatIcon className="size-5" />
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-bold text-[#172B2A]">
                                            {stat.label}
                                        </h3>
                                        <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                                            {stat.detail}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 2. THE 4-IN-1 ECOSYSTEM (FULL WIDTH INTERACTIVE SHOWCASE)      */}
            {/* ============================================================== */}
            <section id="ecosystem" className="w-full py-16 lg:py-24 border-b border-[#E2EAE6] bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="w-full mb-10 lg:mb-14">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
                                Integrated Marketplace
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#073B35] tracking-tight">
                            One Platform. Four Core Pillars.
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-3xl leading-relaxed">
                            No more hopping between disjointed apps, outdated classified sites, or chaotic social groups. FindBookStay brings property buying, residential leasing, travel hospitality, and sports turf reservations together under one unified umbrella.
                        </p>
                    </div>

                    {/* Tab Navigation Pill Bar (Spans full width) */}
                    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#F8FAF9] border border-[#E2EAE6] mb-8">
                        {VERTICAL_TABS.map((tab) => {
                            const TabIcon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    type="button"
                                    className={`cursor-pointer w-full flex items-center justify-center sm:justify-start gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                                        isActive
                                            ? "bg-[#073B35] text-white shadow-sm"
                                            : "text-[#64748B] hover:text-[#073B35] hover:bg-white"
                                    }`}
                                >
                                    <TabIcon className={`size-4 shrink-0 ${isActive ? "text-[#34D399]" : "text-[#64748B]"}`} />
                                    <span className="truncate">{tab.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Tab Full-Width Feature Card */}
                    <div className="w-full rounded-2xl border border-[#E2EAE6] bg-[#F8FAF9] p-6 sm:p-10 lg:p-12 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            {/* Left Column: Details & Highlights (7 cols) */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-xs font-mono font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-md">
                                        VERTICAL {currentVertical.number}
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#073B35]">
                                        {currentVertical.tagline}
                                    </span>
                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border border-[#E2EAE6] text-[#64748B]">
                                        {currentVertical.badge}
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#073B35] tracking-tight leading-snug">
                                    {currentVertical.headline}
                                </h3>

                                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                                    {currentVertical.description}
                                </p>

                                {/* Highlights check grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {currentVertical.highlights.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#172B2A]">
                                            <CheckCircle2 className="size-4.5 text-[#10B981] shrink-0 mt-0.5" />
                                            <span className="leading-snug">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Direct CTA Button */}
                                <div className="pt-2">
                                    <Link
                                        href={currentVertical.href}
                                        className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#073B35] hover:bg-[#052F2A] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all group"
                                    >
                                        <span>Explore {currentVertical.title}</span>
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right Column: Subcategory Pills & Visual Box (5 cols) */}
                            <div className="lg:col-span-5 w-full">
                                <div className="w-full p-6 sm:p-8 rounded-2xl bg-white border border-[#E2EAE6] shadow-2xs space-y-5">
                                    <div className="flex items-center gap-3 border-b border-[#E2EAE6] pb-4">
                                        <div className="size-11 rounded-xl bg-[#F0F5F3] flex items-center justify-center text-[#073B35]">
                                            <ActiveIcon className="size-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-[#073B35]">
                                                {currentVertical.title} Directory
                                            </h4>
                                            <p className="text-xs text-[#64748B]">
                                                Browse verified categories
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs font-bold text-[#172B2A] uppercase tracking-wider block">
                                            Popular Subcategories
                                        </span>
                                        <div className="flex flex-col gap-2">
                                            {currentVertical.subcategories.map((sub, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={sub.href}
                                                    className="cursor-pointer flex items-center justify-between p-3 rounded-xl border border-[#E2EAE6] bg-[#F8FAF9] hover:bg-white hover:border-[#10B981] hover:shadow-2xs text-xs font-semibold text-[#172B2A] transition-all group"
                                                >
                                                    <span>{sub.name}</span>
                                                    <ArrowRight className="size-3.5 text-[#64748B] group-hover:text-[#10B981] transition-transform group-hover:translate-x-0.5" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-[#F0F5F3] border border-[#10B981]/20 text-xs text-[#073B35] flex items-center gap-2.5">
                                        <ShieldCheck className="size-4 text-[#10B981] shrink-0" />
                                        <span>Direct host negotiation with no hidden brokerage fees</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 3. CORE VALUES & ADVANTAGES (FULL WIDTH 4-CARD BENTO)          */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-24 border-b border-[#E2EAE6] bg-[#F8FAF9]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="w-full mb-12 lg:mb-16">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
                                Why FindBookStay
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#073B35] tracking-tight">
                            Built for Clarity, Speed & Real Connections.
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-3xl leading-relaxed">
                            Traditional portals are flooded with fake listings, outdated photos, duplicate broker ads, and hidden fees. We built FindBookStay to restore trust through direct communication and transparent information.
                        </p>
                    </div>

                    {/* 4-Card Bento Grid (Full width) */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CORE_VALUES.map((val, idx) => {
                            const ValIcon = val.icon;
                            return (
                                <div
                                    key={idx}
                                    className="w-full p-6 sm:p-7 rounded-2xl bg-white border border-[#E2EAE6] shadow-2xs hover:border-[#10B981]/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="size-12 rounded-xl bg-[#F0F5F3] flex items-center justify-center text-[#10B981]">
                                                <ValIcon className="size-6" />
                                            </div>
                                            <span className="text-[11px] font-bold text-[#073B35] bg-[#F0F5F3] px-2.5 py-1 rounded-full">
                                                {val.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-[#073B35]">
                                            {val.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                                            {val.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 4. THE FINDBOOKSTAY STORY & MISSION (2-COLUMN FULL WIDTH)       */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-24 border-b border-[#E2EAE6] bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        {/* Left Column: Narrative (6 cols) */}
                        <div className="lg:col-span-6 space-y-6">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
                                    Our Story & Vision
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#073B35] tracking-tight leading-tight">
                                Why We Built FindBookStay.
                            </h2>

                            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                                In today&apos;s digital era, finding a place to buy, rent, stay, or play is unnecessarily fragmented. Property buyers are left sifting through clunky broker classifieds; students and young professionals hunt for bachelor seats on social media groups; families switch to hotel aggregators for getaways; and athletes make endless phone calls to reserve turf slots.
                            </p>

                            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                                FindBookStay was born to unify these everyday lifestyle decisions into one clean, modern, intuitive platform. We prioritize authentic host profiles, clear pricing, and direct communication so you can find and secure what you need with confidence.
                            </p>

                            <div className="pt-2 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#073B35] bg-[#F8FAF9] px-3.5 py-2 rounded-xl border border-[#E2EAE6]">
                                    <CheckCircle2 className="size-4 text-[#10B981]" />
                                    <span>Direct Landlord & Host Contact</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#073B35] bg-[#F8FAF9] px-3.5 py-2 rounded-xl border border-[#E2EAE6]">
                                    <CheckCircle2 className="size-4 text-[#10B981]" />
                                    <span>Upfront Transparent Pricing</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#073B35] bg-[#F8FAF9] px-3.5 py-2 rounded-xl border border-[#E2EAE6]">
                                    <CheckCircle2 className="size-4 text-[#10B981]" />
                                    <span>4 Integrated Verticals</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Guiding Principles Card (6 cols) */}
                        <div className="lg:col-span-6 w-full">
                            <div className="w-full p-8 sm:p-10 rounded-2xl bg-[#F8FAF9] border border-[#E2EAE6] space-y-6">
                                <h3 className="text-lg sm:text-xl font-bold text-[#073B35]">
                                    Our Core Platform Principles
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="size-8 rounded-lg bg-[#073B35] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            01
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#172B2A]">
                                                Transparency & Authenticity
                                            </h4>
                                            <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                                                Every listing includes exact room configurations, real photographs, verified amenities, and transparent pricing.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="size-8 rounded-lg bg-[#073B35] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            02
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#172B2A]">
                                                Direct Empowerment
                                            </h4>
                                            <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                                                We empower homeowners, flat managers, hoteliers, and turf managers to showcase their spaces directly to qualified seekers.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="size-8 rounded-lg bg-[#073B35] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            03
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#172B2A]">
                                                Inclusivity for All Needs
                                            </h4>
                                            <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                                                From budget bachelor seats and shared rooms to luxury high-rise villas and community sports grounds—every user finds their space.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 5. 24/7 CONCIERGE & GLOBAL HUB CTA BANNER (FULL WIDTH)         */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-full rounded-3xl bg-gradient-to-br from-[#073B35] via-[#0A4740] to-[#0E5A51] p-8 sm:p-12 lg:p-16 text-white shadow-md relative overflow-hidden">
                        {/* Background light glow */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-12 -right-12 w-96 h-96 bg-[#10B981]/20 rounded-full blur-3xl"
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
                            {/* Left Content (7 cols) */}
                            <div className="lg:col-span-7 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#34D399]">
                                    <Sparkles className="size-3.5" />
                                    <span>24/7 Dedicated Assistance</span>
                                </div>

                                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                                    We are here whenever you travel, move, or play.
                                </h2>

                                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                                    Have a question about a listing, want to register as a property host, or need assistance booking a sports turf? Our concierge team is ready to help around the clock.
                                </p>

                                <div className="space-y-2.5 pt-3 text-xs sm:text-sm text-white/90">
                                    <div className="flex items-center gap-2.5">
                                        <MapPin className="size-4 text-[#34D399] shrink-0" />
                                        <span>{siteData.address.headquartersDisplay}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Mail className="size-4 text-[#34D399] shrink-0" />
                                        <a
                                            href={`mailto:${siteData.contacts.supportEmail}`}
                                            className="cursor-pointer hover:text-[#34D399] font-medium transition-colors"
                                        >
                                            {siteData.contacts.supportEmail}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <PhoneCall className="size-4 text-[#34D399] shrink-0" />
                                        <a
                                            href={`tel:${siteData.contacts.phoneClean}`}
                                            className="cursor-pointer hover:text-[#34D399] font-medium transition-colors"
                                        >
                                            {siteData.contacts.phoneDisplay}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Action Buttons (5 cols) */}
                            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
                                <Link
                                    href="/post-listing"
                                    className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all group"
                                >
                                    <span>Post a Listing as Owner</span>
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href="/sitemap"
                                    className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all"
                                >
                                    <span>Explore Complete Platform Sitemap</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutView;
