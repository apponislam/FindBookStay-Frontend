"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Building2, Hotel, Trophy, ShieldCheck, CheckCircle2, ArrowRight, MapPin, Mail, PhoneCall, Sparkles, Users, Clock, Globe, Zap, Search } from "@/components/Icons";
import siteData from "@/constants/siteData";
import { useLocale } from "@/hooks/useLocale";
import LanguageSwitch from "@/components/header/LanguageSwitch";

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

const VERTICAL_TABS_EN: VerticalItem[] = [
    {
        id: "rent",
        number: "01",
        title: "Rent Homes & Seats",
        tagline: "Residential Leasing",
        icon: Building2,
        href: "/rent",
        badge: "Direct Landlords",
        headline: "Family apartments, executive villas, and furnished bachelor seats without middleman stress.",
        description: "From secure multi-bedroom family homes to student-friendly bachelor seats with inclusive utilities, FindBookStay offers clear details on house rules, amenities, and direct host contact.",
        highlights: ["Direct communication with landlords and flat managers", "Family-tailored apartments and independent residences", "Single bachelor seats & shared rooms with utility breakdowns", "Flexible 1-to-6 month sublets for professionals and students"],
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
        number: "02",
        title: "Book Stays & Resorts",
        tagline: "Hospitality & Travel",
        icon: Hotel,
        href: "/book",
        badge: "Handpicked Stays",
        headline: "Boutique city hotels, scenic nature getaways, and private vacation residences.",
        description: "Whether you need a centrally located city hotel for business, an eco-resort for a weekend retreat, or a cozy holiday home with personalized hosts, enjoy instant discovery with authentic details.",
        highlights: ["Handpicked city boutique and business hotels", "Lakeside, beach, and mountain getaway resorts", "Private holiday cottages and serviced executive suites", "Authentic host profiles, high-definition photo galleries & amenities"],
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
        number: "03",
        title: "Sports Turfs & Play",
        tagline: "Active Recreation",
        icon: Trophy,
        href: "/sports",
        badge: "Live Schedules",
        headline: "Football turfs, cricket practice nets, and indoor badminton courts.",
        description: "Organize competitive weekend matches and team training sessions effortlessly. Check real-time hourly slot availability, lighting conditions, and turf surface specs before booking.",
        highlights: ["High-grade artificial grass football grounds", "Cricket practice pitches with protective netting", "Indoor badminton & multi-sport synthetic courts", "Transparent hourly rates, floodlight fees & amenities"],
        subcategories: [
            { name: "Football Turfs", href: "/sports/football" },
            { name: "Cricket Nets", href: "/sports/cricket" },
            { name: "Badminton Courts", href: "/sports/badminton" },
            { name: "Indoor Arenas", href: "/sports/indoor" },
            { name: "Swimming Facilities", href: "/sports/swimming" },
        ],
    },
    {
        id: "buy",
        number: "04",
        title: "Buy Real Estate",
        tagline: "Property Acquisition",
        icon: Home,
        href: "/buy",
        badge: "Verified Titles",
        headline: "High-value residential flats, luxury penthouses, and commercial plots.",
        description: "Investing in property requires transparency and accuracy. Browse verified listings featuring direct owner contacts, municipal layout permissions, and comprehensive physical details.",
        highlights: ["Direct seller & developer verified listings", "Clear property specifications & floor plan insights", "Residential family homes, ready apartments & plots", "Zero duplicate listings or confusing intermediary loops"],
        subcategories: [
            { name: "Apartments & Flats", href: "/buy/apartments" },
            { name: "Ready Homes & Villas", href: "/buy/homes" },
            { name: "Residential Plots", href: "/buy/plots" },
            { name: "Commercial Spaces", href: "/buy/commercial" },
            { name: "Luxury Penthouses", href: "/buy/luxury" },
        ],
    },
];

const VERTICAL_TABS_BN: VerticalItem[] = [
    {
        id: "rent",
        number: "০১",
        title: "বাসা ও সিট ভাড়া",
        tagline: "আবাসিক লিজিং",
        icon: Building2,
        href: "/rent",
        badge: "সরাসরি বাড়িওয়ালা",
        headline: "পারিবারিক ফ্ল্যাট, ডুপ্লেক্স ও ব্যাচেলর সিট ভাড়া — কোনো দালাল ছাড়া।",
        description: "নিরাপদ পারিবারিক বাসা থেকে শুরু করে ইউটিলিটি বিলসহ ছাত্র ও কর্মজীবীদের জন্য ব্যাচেলর সিট—বাড়িওয়ালার সরাসরি যোগাযোগসহ স্পষ্ট তথ্য পান।",
        highlights: ["বাড়িওয়ালা ও ফ্ল্যাট ম্যানেজারের সাথে সরাসরি যোগাযোগ", "পারিবারিক অ্যাপার্টমেন্ট ও স্বাধীন বাসস্থান", "ব্যাচেলর সিঙ্গেল সিট ও শেয়ার্ড রুম (বিলসহ)", "১ থেকে ৬ মাসের ফ্লেক্সিবল সাবলেট সুবিধা"],
        subcategories: [
            { name: "পারিবারিক অ্যাপার্টমেন্ট", href: "/rent/family-apartments" },
            { name: "পারিবারিক বাড়ি", href: "/rent/family-houses" },
            { name: "ব্যাচেলর সিট", href: "/rent/bachelor-seats" },
            { name: "শেয়ার্ড রুম", href: "/rent/shared-rooms" },
            { name: "মাসিক সাবলেট", href: "/rent/sublets" },
        ],
    },
    {
        id: "book",
        number: "০২",
        title: "হোটেল ও রিসোর্ট স্টে",
        tagline: "ভ্রমণ ও আতিথেয়তা",
        icon: Hotel,
        href: "/book",
        badge: "বাছাইকৃত স্টে",
        headline: "বুটিক সিটি হোটেল, মনোরম রিসোর্ট ও অবকাশকালীন হোমস্টে।",
        description: "ব্যবসায়িক কাজে শহরের হোটেল বা ছুটির দিনে পরিবারসহ ইকো রিসোর্ট—যাচাইকৃত ছবি ও সুনির্দিষ্ট তথ্যের মাধ্যমে সহজে বুক করুন।",
        highlights: ["শহরের সেরা বুটিক ও বিজনেস হোটেল", "লেকভিউ, সমুদ্র ও পাহাড়ের মনোরম রিসোর্ট", "প্রাইভেট হলিডে কটেজ ও সার্ভিসড স্যুট", "আসল ছবি, বিস্তারিত সুবিধা ও সরাসরি যোগাযোগ"],
        subcategories: [
            { name: "সিটি হোটেল", href: "/book/hotels" },
            { name: "মনোরম রিসোর্ট", href: "/book/resorts" },
            { name: "গেস্ট হাউস ও বিএনবি", href: "/book/guest-houses" },
            { name: "হলিডে হোমস", href: "/book/holiday-homes" },
            { name: "শর্ট-স্টে স্যুট", href: "/book/short-stay" },
        ],
    },
    {
        id: "sports",
        number: "০৩",
        title: "স্পোর্টস টার্ফ ও খেলাধুলা",
        tagline: "টার্ফ বুকিং",
        icon: Trophy,
        href: "/sports",
        badge: "লাইভ স্লট শিডিউল",
        headline: "ফুটবল টার্ফ, ক্রিকেট প্র্যাকটিস নেট ও ইনডোর ব্যাডমিন্টন কোর্ট।",
        description: "বন্ধুদের সাথে ম্যাচ বা টুর্নামেন্ট আয়োজন করুন সহজে। লাইভ স্লট শিডিউল, ফ্লাডলাইট এবং টার্ফের সাইজ দেখে সরাসরি বুক করুন।",
        highlights: ["উন্নত মানের কৃত্রিম ঘাসের ফুটবল টার্ফ", "নেটসহ ক্রিকেট প্র্যাকটিস পিচ", "ইনডোর ব্যাডমিন্টন ও সিন্থেটিক কোর্ট", "স্বচ্ছ ঘণ্টাপ্রতি রেট ও ফ্লাডলাইট সুবিধা"],
        subcategories: [
            { name: "ফুটবল টার্ফ", href: "/sports/football" },
            { name: "ক্রিকেট নেট", href: "/sports/cricket" },
            { name: "ব্যাডমিন্টন কোর্ট", href: "/sports/badminton" },
            { name: "ইনডোর এরিনা", href: "/sports/indoor" },
            { name: "সুইমিং পুল", href: "/sports/swimming" },
        ],
    },
    {
        id: "buy",
        number: "০৪",
        title: "প্রপার্টি ও ফ্ল্যাট ক্রয়",
        tagline: "রিয়েল এস্টেট",
        icon: Home,
        href: "/buy",
        badge: "যাচাইকৃত দলিল",
        headline: "আবাসিক ফ্ল্যাট, বিলাসবহুল পেন্টহাউস ও প্লট কেনাবেচা।",
        description: "রিয়েল এস্টেটে বিনিয়োগের জন্য প্রয়োজন শতভাগ স্বচ্ছতা। রাজউক অনুমোদিত ও মালিকের সরাসরি তালিকাভুক্ত প্রপার্টি ব্রাউজ করুন।",
        highlights: ["মালিক ও ডেভেলপারদের সরাসরি তালিকাভুক্ত প্রপার্টি", "ফ্লোর প্ল্যান ও জমির বিস্তারিত স্পেসিফিকেশন", "রেডি অ্যাপার্টমেন্ট, ডুপ্লেক্স ও আবাসিক প্লট", "কোনো জাল লিস্টিং বা মধ্যস্বত্বভোগী নেই"],
        subcategories: [
            { name: "অ্যাপার্টমেন্ট ও ফ্ল্যাট", href: "/buy/apartments" },
            { name: "রেডি হোমস ও ভিলা", href: "/buy/homes" },
            { name: "আবাসিক প্লট", href: "/buy/plots" },
            { name: "বাণিজ্যিক স্পেস", href: "/buy/commercial" },
            { name: "লাক্সারি পেন্টহাউস", href: "/buy/luxury" },
        ],
    },
];

const STATS_EN = [
    { value: "500+", label: "Verified Spaces", detail: "Carefully audited listings across residential, hospitality & sports", icon: Sparkles },
    { value: "0%", label: "Broker Commission", detail: "Direct connection with verified property owners & venue managers", icon: Users },
    { value: "100%", label: "Transparent Details", detail: "Accurate photos, verified amenities & upfront pricing", icon: ShieldCheck },
    { value: "24/7", label: "Customer Concierge", detail: "Stationed at Gulshan-2, Dhaka with dedicated support", icon: Clock },
];

const STATS_BN = [
    { value: "৫০০+", label: "যাচাইকৃত স্পেস", detail: "আবাসন, হোটেল ও স্পোর্টস টার্ফের যাচাইকৃত লিস্টিং", icon: Sparkles },
    { value: "০%", label: "দালাল কমিশন", detail: "মালিক ও ভেন্যু পরিচালকদের সাথে সরাসরি যোগাযোগ", icon: Users },
    { value: "১০০%", label: "স্বচ্ছ বিবরণ", detail: "আসল ছবি, নিশ্চিত সুবিধাসমূহ ও নির্দিষ্ট মূল্যতালিকা", icon: ShieldCheck },
    { value: "২৪/৭", label: "গ্রাহক সহায়তা", detail: "গুলশান-২, ঢাকা থেকে সার্বক্ষণিক সক্রিয় কনসিয়ার্জ সেবা", icon: Clock },
];

const CORE_VALUES_EN = [
    {
        icon: Users,
        title: "Direct Connections",
        description: "We cut out unauthorized brokers and confusing middleman tiers. You communicate directly with verified homeowners, landlords, hoteliers, and turf managers.",
        badge: "No Middleman Markup",
    },
    {
        icon: ShieldCheck,
        title: "Transparent & Authentic",
        description: "What you see is what you experience. Real photographs, accurate specifications, genuine amenity lists, and explicit house rules on every single listing.",
        badge: "Zero Surprises",
    },
    {
        icon: Zap,
        title: "Unified Convenience",
        description: "Instead of juggling four separate apps for rentals, holiday stays, turf slots, and property, manage your entire lifestyle with one modern account.",
        badge: "One Seamless Login",
    },
    {
        icon: Globe,
        title: "Global Reach, Local Depth",
        description: "Headquartered in Gulshan-2, Dhaka with regional operational hubs expanding across Asia and beyond, built from the ground up for international standards.",
        badge: "Worldwide Vision",
    },
];

const CORE_VALUES_BN = [
    {
        icon: Users,
        title: "সরাসরি যোগাযোগ",
        description: "আমরা অননুমোদিত দালাল ও মধ্যস্বত্বভোগীদের ঝামেলা দূর করেছি। বাড়িওয়ালা, হোটেল ম্যানেজার ও টার্ফ পরিচালকদের সাথে সরাসরি কথা বলুন।",
        badge: "দালালমুক্ত সেবা",
    },
    {
        icon: ShieldCheck,
        title: "স্বচ্ছ ও খাঁটি তথ্য",
        description: "যা দেখছেন ঠিক তাই পাবেন। প্রতিটি লিস্টিংয়ে আসল ফটোগ্রাফ, সঠিক স্পেসিফিকেশন ও নিয়মনীতি স্পষ্টভাবে তুলে ধরা হয়।",
        badge: "শতভাগ স্বচ্ছতা",
    },
    {
        icon: Zap,
        title: "একক প্ল্যাটফর্ম",
        description: "বাসা ভাড়া, রিসোর্ট বুকিং, টার্ফ রিজার্ভেশন এবং জমি কেনাবেচার জন্য আলাদা অ্যাপের প্রয়োজন নেই—এক প্ল্যাটফর্মেই সব সমাধান।",
        badge: "সহজ অভিজ্ঞতা",
    },
    {
        icon: Globe,
        title: "স্থানীয় ও আন্তর্জাতিক মান",
        description: "গুলশান-২, ঢাকা থেকে পরিচালিত আধুনিক আন্তর্জাতিক মানের নির্ভরযোগ্য প্রপার্টি ও বুকিং মার্কেটপ্লেস।",
        badge: "আধুনিক দৃষ্টিভঙ্গি",
    },
];

export const AboutView = () => {
    const { isBn } = useLocale();
    const [activeTab, setActiveTab] = useState<string>("rent");

    const verticalTabs = isBn ? VERTICAL_TABS_BN : VERTICAL_TABS_EN;
    const stats = isBn ? STATS_BN : STATS_EN;
    const coreValues = isBn ? CORE_VALUES_BN : CORE_VALUES_EN;

    const currentVertical = verticalTabs.find((tab) => tab.id === activeTab) || verticalTabs[0];
    const ActiveIcon = currentVertical.icon;

    return (
        <div className="w-full bg-background text-foreground">
            {/* ============================================================== */}
            {/* 1. CINEMATIC HERO SECTION                                      */}
            {/* ============================================================== */}
            <section className="relative w-full overflow-hidden border-b border-border bg-linear-to-b from-surface-secondary/70 via-background to-background pt-10 pb-16 lg:pt-16 lg:pb-24">
                {/* Luminous emerald ambient glows */}
                <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-linear-to-tr from-accent/20 via-primary/10 to-transparent blur-3xl opacity-70" />

                <div className="container mx-auto px-4 relative">
                    {/* Top utility row with Badge and Language Switch */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-accent/30 shadow-xs text-xs font-semibold text-foreground">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                            </span>
                            <span className="tracking-wide uppercase text-[11px] font-bold text-accent">
                                {isBn ? "আধুনিক আন্তর্জাতিক মার্কেটপ্লেস" : "The Modern International Marketplace"}
                            </span>
                        </div>

                        {/* Direct on-page Language Switch */}
                        <LanguageSwitch />
                    </div>

                    <div className="w-full text-center space-y-6">
                        {/* Hero Headline */}
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15] max-w-5xl mx-auto">
                            {isBn ? (
                                <>
                                    সরাসরি সংযোগ <span className="bg-linear-to-r from-emerald-600 via-primary to-accent dark:from-emerald-400 dark:via-teal-300 dark:to-accent bg-clip-text text-transparent">ভাড়া, হোটেল স্টে, স্পোর্টস টার্ফ ও প্রপার্টিতে।</span>
                                </>
                            ) : (
                                <>
                                    Connecting You Directly with <span className="bg-linear-to-r from-emerald-600 via-primary to-accent dark:from-emerald-400 dark:via-teal-300 dark:to-accent bg-clip-text text-transparent">Rentals, Stays, Sports & Properties.</span>
                                </>
                            )}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-normal">
                            {isBn
                                ? "FindBookStay আবাসিক ফ্ল্যাট ও সিট ভাড়া, হোটেল রিসোর্ট বুকিং, স্পোর্টস টার্ফ রিজার্ভেশন এবং প্রপার্টি কেনাবেচাকে এক প্ল্যাটফর্মে একত্রিত করেছে—কোনো দালাল বা মধ্যস্বত্বভোগী ঝামেলা ছাড়াই।"
                                : "FindBookStay unites residential rentals, hotel stays, sports turf bookings, and property sales into one seamless, transparent digital ecosystem—designed for modern living without middleman friction."}
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                            <Link href="/post-listing" className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 group">
                                <span>{isBn ? "মালিক হিসেবে প্রপার্টি বা ভেন্যু পোস্ট করুন" : "Post Your Space as Owner"}</span>
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link href="/sitemap" className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-white dark:bg-card text-foreground text-sm font-semibold hover:border-accent hover:bg-surface-secondary transition-all duration-200">
                                <Search className="size-4 text-accent" />
                                <span>{isBn ? "সকল মার্কেটপ্লেস বিভাগ অন্বেষণ করুন" : "Explore All Marketplace Verticals"}</span>
                            </Link>
                        </div>
                    </div>

                    {/* ============================================================== */}
                    {/* STATS BAR                                                      */}
                    {/* ============================================================== */}
                    <div className="w-full mt-14 lg:mt-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {stats.map((stat, idx) => {
                                const StatIcon = stat.icon;
                                return (
                                    <div key={idx} className="w-full p-6 rounded-2xl bg-white dark:bg-card border border-border shadow-2xs hover:border-accent/50 hover:shadow-sm transition-all duration-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</span>
                                            <div className="size-10 rounded-xl bg-surface-secondary flex items-center justify-center text-accent">
                                                <StatIcon className="size-5" />
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-bold text-foreground">{stat.label}</h3>
                                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{stat.detail}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 2. THE 4-IN-1 ECOSYSTEM (INTERACTIVE SHOWCASE)                 */}
            {/* ============================================================== */}
            <section id="ecosystem" className="w-full py-16 lg:py-24 border-b border-border bg-background">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="w-full mb-10 lg:mb-14">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-accent">
                                {isBn ? "একীভূত মার্কেটপ্লেস" : "Integrated Marketplace"}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                            {isBn ? "একটি প্ল্যাটফর্ম। চারটি প্রধান স্তম্ভ।" : "One Platform. Four Core Pillars."}
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                            {isBn
                                ? "আলাদা আলাদা অ্যাপ ও সামাজিক মাধ্যমের জটিলতা ভুলে যান। FindBookStay আবাসন ভাড়া, পর্যটন স্টে, স্পোর্টস টার্ফ বুকিং ও প্রপার্টি কেনাবেচা নিয়ে এসেছে এক ছাদের নিচে।"
                                : "No more hopping between disjointed apps, outdated classified sites, or chaotic social groups. FindBookStay brings residential leasing, travel hospitality, sports turf reservations, and property buying together under one unified umbrella."}
                        </p>
                    </div>

                    {/* Tab Navigation Pill Bar */}
                    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-surface-secondary/40 border border-border mb-8">
                        {verticalTabs.map((tab) => {
                            const TabIcon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    type="button"
                                    className={`cursor-pointer w-full flex items-center justify-center sm:justify-start gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary"}`}
                                >
                                    <TabIcon className={`size-4 shrink-0 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                                    <span className="truncate">{tab.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Tab Feature Card */}
                    <div className="w-full rounded-2xl border border-border bg-white dark:bg-card p-6 sm:p-10 lg:p-12 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            {/* Left Column: Details & Highlights */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                                        {isBn ? `বিভাগ ${currentVertical.number}` : `VERTICAL ${currentVertical.number}`}
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">{currentVertical.tagline}</span>
                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-surface-secondary border border-border text-foreground">{currentVertical.badge}</span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-snug">{currentVertical.headline}</h3>

                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{currentVertical.description}</p>

                                {/* Highlights check grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {currentVertical.highlights.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                                            <CheckCircle2 className="size-4.5 text-accent shrink-0 mt-0.5" />
                                            <span className="leading-snug">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Direct CTA Button */}
                                <div className="pt-2">
                                    <Link href={currentVertical.href} className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all group">
                                        <span>{isBn ? `${currentVertical.title} ব্রাউজ করুন` : `Explore ${currentVertical.title}`}</span>
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right Column: Subcategory Pills & Visual Box */}
                            <div className="lg:col-span-5 w-full">
                                <div className="w-full p-6 sm:p-8 rounded-2xl bg-surface-secondary/40 border border-border shadow-2xs space-y-5">
                                    <div className="flex items-center gap-3 border-b border-border pb-4">
                                        <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <ActiveIcon className="size-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-foreground">
                                                {isBn ? `${currentVertical.title} ক্যাটাগরি` : `${currentVertical.title} Directory`}
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                {isBn ? "যাচাইকৃত ক্যাটাগরি ব্রাউজ করুন" : "Browse verified categories"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
                                            {isBn ? "জনপ্রিয় সাব-ক্যাটাগরি" : "Popular Subcategories"}
                                        </span>
                                        <div className="flex flex-col gap-2">
                                            {currentVertical.subcategories.map((sub, idx) => (
                                                <Link key={idx} href={sub.href} className="cursor-pointer flex items-center justify-between p-3 rounded-xl border border-border bg-white dark:bg-card hover:bg-surface-secondary hover:border-accent text-xs font-semibold text-foreground transition-all group">
                                                    <span>{sub.name}</span>
                                                    <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-accent transition-transform group-hover:translate-x-0.5" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white dark:bg-card border border-accent/20 text-xs text-foreground flex items-center gap-2.5">
                                        <ShieldCheck className="size-4 text-accent shrink-0" />
                                        <span>{isBn ? "মালিকের সাথে সরাসরি সমঝোতা — কোনো দালাল ফি নেই" : "Direct host negotiation with no hidden brokerage fees"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 3. CORE VALUES & ADVANTAGES (4-CARD BENTO)                     */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-24 border-b border-border bg-surface-secondary/30">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="w-full mb-12 lg:mb-16">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-accent">
                                {isBn ? "কেন FindBookStay" : "Why FindBookStay"}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                            {isBn ? "স্বচ্ছতা, ক্ষিপ্রতা ও সরাসরি যোগাযোগের নিশ্চয়তা।" : "Built for Clarity, Speed & Real Connections."}
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                            {isBn
                                ? "অপ্রয়োজনীয় দালাল ফি, নকল ছবি ও বিভ্রান্তিকর বিজ্ঞাপনের দিন শেষ। FindBookStay আপনাকে দেয় সরাসরি সংযোগ ও সম্পূর্ণ স্বচ্ছ তথ্য।"
                                : "Traditional portals are flooded with fake listings, outdated photos, duplicate broker ads, and hidden fees. We built FindBookStay to restore trust through direct communication and transparent information."}
                        </p>
                    </div>

                    {/* 4-Card Bento Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((val, idx) => {
                            const ValIcon = val.icon;
                            return (
                                <div key={idx} className="w-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-card border border-border shadow-2xs hover:border-accent/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="size-12 rounded-xl bg-surface-secondary flex items-center justify-center text-accent">
                                                <ValIcon className="size-6" />
                                            </div>
                                            <span className="text-[11px] font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">{val.badge}</span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-foreground">{val.title}</h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 4. THE FINDBOOKSTAY STORY & MISSION                            */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-24 border-b border-border bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        {/* Left Column: Narrative */}
                        <div className="lg:col-span-6 space-y-6">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                                    {isBn ? "আমাদের গল্প ও লক্ষ্য" : "Our Story & Vision"}
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                                {isBn ? "কেন আমরা FindBookStay তৈরি করেছি।" : "Why We Built FindBookStay."}
                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {isBn
                                    ? "আজকের ডিজিটাল যুগে বাসা খোঁজা, ভ্রমণ স্টে বুকিং করা বা টার্ফে খেলার মাঠ রিজার্ভেশন অত্যন্ত বিভক্ত ও জটিল ছিল। শিক্ষার্থী ও চাকরিজীবীদের ফেসবুক গ্রুপে ঘুরে ঘুরে ব্যাচেলর সিট বা ফ্ল্যাট খুঁজতে হতো, খেলার জন্য বারবার ফোন কল দিতে হতো। FindBookStay এই সকল দৈনন্দিন অভিজ্ঞতাকে একটি আধুনিক, স্বচ্ছ প্ল্যাটফর্মে একত্রিত করেছে।"
                                    : "In today's digital era, finding a place to live, stay, play, or purchase is unnecessarily fragmented. Young professionals and students hunt for bachelor seats or flats on chaotic social media groups; travelers switch to hotel aggregators for weekend getaways; sports teams make endless phone calls to reserve turf slots; and property seekers sift through clunky broker classifieds."}
                            </p>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {isBn
                                    ? "আমরা গুরুত্ব দিই যাচাইকৃত হোস্ট প্রোফাইল, স্বচ্ছ মূল্য এবং সরাসরি যোগাযোগকে—যাতে আপনি পূর্ণ আস্থার সাথে আপনার প্রয়োজনীয় স্পেসটি খুঁজে পেতে পারেন।"
                                    : "FindBookStay was born to unify these everyday lifestyle decisions into one clean, modern, intuitive platform. We prioritize authentic host profiles, clear pricing, and direct communication so you can find and secure what you need with confidence."}
                            </p>

                            <div className="pt-2 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-white dark:bg-card px-3.5 py-2 rounded-xl border border-border">
                                    <CheckCircle2 className="size-4 text-accent" />
                                    <span>{isBn ? "বাড়িওয়ালা ও হোস্টের সাথে সরাসরি কথা" : "Direct Landlord & Host Contact"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-white dark:bg-card px-3.5 py-2 rounded-xl border border-border">
                                    <CheckCircle2 className="size-4 text-accent" />
                                    <span>{isBn ? "স্বচ্ছ মূল্য ও শর্তাবলী" : "Upfront Transparent Pricing"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-white dark:bg-card px-3.5 py-2 rounded-xl border border-border">
                                    <CheckCircle2 className="size-4 text-accent" />
                                    <span>{isBn ? "৪টি সুনির্দিষ্ট সেবা বিভাগ" : "4 Integrated Verticals"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Guiding Principles Card */}
                        <div className="lg:col-span-6 w-full">
                            <div className="w-full p-8 sm:p-10 rounded-2xl bg-white dark:bg-card border border-border space-y-6">
                                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                                    {isBn ? "আমাদের মূল প্ল্যাটফর্ম নীতিসমূহ" : "Our Core Platform Principles"}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            {isBn ? "০১" : "01"}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-foreground">
                                                {isBn ? "স্বচ্ছতা ও সত্যতা" : "Transparency & Authenticity"}
                                            </h4>
                                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                                {isBn ? "প্রতিটি লিস্টিংয়ে সঠিক কক্ষ বিন্যাস, আসল ছবি, যাচাইকৃত সুবিধা এবং স্বচ্ছ ভাড়া উল্লেখ থাকে।" : "Every listing includes exact room configurations, real photographs, verified amenities, and transparent pricing."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            {isBn ? "০২" : "02"}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-foreground">
                                                {isBn ? "মালিকদের প্রত্যক্ষ ক্ষমতায়ন" : "Direct Empowerment"}
                                            </h4>
                                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                                {isBn ? "বাড়িওয়ালা, হোটেলিয়ার ও টার্ফ ম্যানেজাররা সরাসরি তাদের স্পেস গ্রাহকদের কাছে উপস্থাপন করতে পারেন।" : "We empower homeowners, flat managers, hoteliers, and turf managers to showcase their spaces directly to qualified seekers."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            {isBn ? "০৩" : "03"}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-foreground">
                                                {isBn ? "সকলের জন্য সহজলভ্য" : "Inclusivity for All Needs"}
                                            </h4>
                                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                                {isBn ? "বাজেট ব্যাচেলর সিট থেকে শুরু করে বিলাসবহুল ভিলা ও কমিউনিটি খেলার মাঠ—সকলের জন্যই উপযুক্ত সমাধান।" : "From budget bachelor seats and shared rooms to luxury high-rise villas and community sports grounds—every user finds their space."}
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
            {/* 5. 24/7 CONCIERGE & GLOBAL HUB CTA BANNER                      */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="w-full rounded-3xl bg-linear-to-br from-emerald-950 via-primary to-[#062F2B] dark:from-[#0B1A17] dark:via-[#132B25] dark:to-[#0B1A17] p-8 sm:p-12 lg:p-16 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
                        {/* Background light glow */}
                        <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
                            {/* Left Content */}
                            <div className="lg:col-span-7 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-300">
                                    <Sparkles className="size-3.5" />
                                    <span>{isBn ? "২৪/৭ সার্বক্ষণিক সহায়তা" : "24/7 Dedicated Assistance"}</span>
                                </div>

                                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                                    {isBn ? "আপনার ভ্রমণ, আবাসন বা খেলাধুলার যেকোনো প্রয়োজনে পাশে আছি।" : "We are here whenever you travel, move, or play."}
                                </h2>

                                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                                    {isBn ? "লিস্টিং সম্পর্কে প্রশ্ন, হোস্ট হিসেবে নিবন্ধন বা টার্ফ বুকিং সংক্রান্ত যেকোনো প্রয়োজনে আমাদের কনসিয়ার্জ টিম সার্বক্ষণিক প্রস্তুত।" : "Have a question about a listing, want to register as a property host, or need assistance booking a sports turf? Our concierge team is ready to help around the clock."}
                                </p>

                                <div className="space-y-2.5 pt-3 text-xs sm:text-sm text-white/90">
                                    <div className="flex items-center gap-2.5">
                                        <MapPin className="size-4 text-emerald-400 shrink-0" />
                                        <span>{isBn ? "গুলশান-২, ঢাকা - ১২১২, বাংলাদেশ" : siteData.address.headquartersDisplay}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Mail className="size-4 text-emerald-400 shrink-0" />
                                        <a href={`mailto:${siteData.contacts.supportEmail}`} className="cursor-pointer hover:text-emerald-300 font-medium transition-colors">
                                            {siteData.contacts.supportEmail}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <PhoneCall className="size-4 text-emerald-400 shrink-0" />
                                        <a href={`tel:${siteData.contacts.phoneClean}`} className="cursor-pointer hover:text-emerald-300 font-medium transition-colors">
                                            {siteData.contacts.phoneDisplay}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Action Buttons */}
                            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
                                <Link href="/post-listing" className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 text-sm font-bold shadow-sm hover:shadow-md transition-all group">
                                    <span>{isBn ? "মালিক হিসেবে প্রপার্টি বা ভেন্যু পোস্ট করুন" : "Post a Listing as Owner"}</span>
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <Link href="/sitemap" className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all">
                                    <span>{isBn ? "সম্পূর্ণ মার্কেটপ্লেস সাইটম্যাপ দেখুন" : "Explore Complete Platform Sitemap"}</span>
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