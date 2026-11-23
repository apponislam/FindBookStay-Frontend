"use client";

import React from "react";
import Link from "next/link";
import {
    Home,
    Hotel,
    Trophy,
    Building2,
    ArrowRight,
    ShieldCheck,
} from "@/components/Icons";
import { useLocale } from "@/hooks/useLocale";
import LanguageSwitch from "@/components/header/LanguageSwitch";

const PILLARS_EN = [
    {
        id: "rent",
        title: "Rent Homes & Seats",
        badge: "Direct Listing",
        tag: "TENANTS & FAMILIES",
        desc: "List family apartments, bachelor seats, sublets, duplexes, or rooms for rent with direct tenant verification.",
        icon: Home,
        href: "/post-listing/rent",
        cta: "Start Rental Listing",
        stats: "3,800+ Active Inquiries This Week",
        color: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
        badgeColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    },
    {
        id: "book",
        title: "Book Stays & Resorts",
        badge: "Direct Booking",
        tag: "TRAVELERS & GUESTS",
        desc: "Publish boutique resorts, seaside villas, vacation cottages, or city hotels with direct guest reservations.",
        icon: Hotel,
        href: "/post-listing/book",
        cta: "Start Resort Listing",
        stats: "Cox's Bazar, Sajek, Sylhet Getaways",
        color: "hover:border-teal-500/50 hover:shadow-teal-500/10",
        badgeColor: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
    },
    {
        id: "sports",
        title: "Sports & Turfs",
        badge: "Hourly Slots",
        tag: "PLAYERS & TEAMS",
        desc: "List artificial football turfs, indoor cricket arenas, and badminton courts for tournament and match slots.",
        icon: Trophy,
        href: "/post-listing/sports",
        cta: "Start Turf Listing",
        stats: "Instant WhatsApp & Call Bookings",
        color: "hover:border-amber-500/50 hover:shadow-amber-500/10",
        badgeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    },
    {
        id: "buy",
        title: "Buy Real Estate",
        badge: "Verified Deed",
        tag: "DIRECT BUYERS",
        desc: "Sell residential flats, duplexes, approved plots, and commercial floors with direct buyer inquiries.",
        icon: Building2,
        href: "/post-listing/buy",
        cta: "Start Property Listing",
        stats: "Dhaka, Chittagong Prime Properties",
        color: "hover:border-blue-500/50 hover:shadow-blue-500/10",
        badgeColor: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
    },
];

const PILLARS_BN = [
    {
        id: "rent",
        title: "বাসা ও সিট ভাড়া",
        badge: "সরাসরি লিস্টিং",
        tag: "ভাড়াটিয়া ও পরিবার",
        desc: "পারিবারিক অ্যাপার্টমেন্ট, ব্যাচেলর সিট, সাবলেট বা ডুপ্লেক্স ভাড়া দিন সরাসরি ভাড়াটিয়া ভেরিফিকেশনের মাধ্যমে।",
        icon: Home,
        href: "/post-listing/rent",
        cta: "ভাড়া লিস্টিং শুরু করুন",
        stats: "এই সপ্তাহে ৩,৮০০+ সক্রিয় অনুসন্ধান",
        color: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
        badgeColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    },
    {
        id: "book",
        title: "হোটেল ও রিসোর্ট স্টে",
        badge: "সরাসরি বুকিং",
        tag: "ভ্রমণকারী ও পর্যটক",
        desc: "বুটিক রিসোর্ট, সমুদ্রতীরবর্তী ভিলা, অবকাশকালীন কটেজ বা সিটি হোটেল লিস্টিং করুন সরাসরি বুকিং নিশ্চিত করতে।",
        icon: Hotel,
        href: "/post-listing/book",
        cta: "হোটেল লিস্টিং শুরু করুন",
        stats: "কক্সবাজার, সাজেক ও সিলেটের জনপ্রিয় স্পট",
        color: "hover:border-teal-500/50 hover:shadow-teal-500/10",
        badgeColor: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
    },
    {
        id: "sports",
        title: "স্পোর্টস টার্ফ ও খেলাধুলা",
        badge: "ঘণ্টাপ্রতি স্লট",
        tag: "খেলোয়াড় ও দল",
        desc: "কৃত্রিম ঘাসের ফুটবল টার্ফ, ইনডোর ক্রিকেট ও ব্যাডমিন্টন কোর্ট ঘণ্টার স্লটে বুকিং দিন সরাসরি খেলোয়াড়দের কাছে।",
        icon: Trophy,
        href: "/post-listing/sports",
        cta: "টার্ফ লিস্টিং শুরু করুন",
        stats: "তাৎক্ষণিক ফোন ও হোয়াটসঅ্যাপ বুকিং",
        color: "hover:border-amber-500/50 hover:shadow-amber-500/10",
        badgeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    },
    {
        id: "buy",
        title: "প্রপার্টি ও ফ্ল্যাট বিক্রয়",
        badge: "যাচাইকৃত দলিল",
        tag: "সরাসরি ক্রেতা",
        desc: "আবাসিক ফ্ল্যাট, ডুপ্লেক্স, অনুমোদিত প্লট ও বাণিজ্যিক স্পেস সরাসরি প্রকৃত ক্রেতাদের কাছে বিক্রি করুন।",
        icon: Building2,
        href: "/post-listing/buy",
        cta: "প্রপার্টি লিস্টিং শুরু করুন",
        stats: "ঢাকা ও চট্টগ্রামের প্রাইম প্রপার্টি",
        color: "hover:border-blue-500/50 hover:shadow-blue-500/10",
        badgeColor: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
    },
];

export default function PublishIndexPage() {
    const { isBn, locale } = useLocale();
    const pillars = isBn ? PILLARS_BN : PILLARS_EN;

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
            {/* Top Bar with Language Switch */}
            <div className="flex items-center justify-between gap-4 mb-8">
                <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
                    <span>{isBn ? "← মূল সাইটে ফিরে যান" : "← Back to Homepage"}</span>
                </Link>
                <LanguageSwitch />
            </div>

            {/* Studio Hero Header */}
            <div className="text-center space-y-4 max-w-3xl mx-auto mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-wide">
                    <span className="size-2 rounded-full bg-accent" />
                    <span>
                        {isBn
                            ? "FINDBOOKSTAY লিস্টিং স্টুডিও • ১০০% বিনামূল্যে লিস্টিং"
                            : "FINDBOOKSTAY LISTING STUDIO • 100% FREE PUBLISHING"}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
                    {isBn ? "আপনি কোন ধরনের স্পেস প্রকাশ করতে চান?" : "Which Type of Space Would You Like to Publish?"}
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {isBn
                        ? "নিচের চারটি মূল বিভাগ থেকে আপনার স্পেস নির্বাচন করুন। লাইভ ফিড প্রিভিউসহ আমাদের সহজ ৫-ধাপের উইজার্ড দিয়ে সরাসরি যাচাইকৃত গ্রাহকদের কাছে পৌঁছান।"
                        : "Choose from one of our four core pillars below. Experience our 5-step guided wizard with live feed preview and direct verified inquiries."}
                </p>
            </div>

            {/* 4 Pillar Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pillars.map((p) => {
                    const Icon = p.icon;
                    return (
                        <Link
                            key={p.id}
                            href={`/${locale}${p.href}`}
                            className={`group relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${p.color}`}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="size-14 rounded-2xl bg-surface-secondary dark:bg-surface text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300 shadow-xs">
                                        <Icon className="size-7" />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${p.badgeColor}`}>
                                            {p.badge}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <span className="text-[11px] font-black tracking-wider text-accent uppercase">
                                        {p.tag}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                                        {p.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {p.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                                    <ShieldCheck className="size-4 text-accent" />
                                    {p.stats}
                                </span>

                                <span className="inline-flex items-center gap-2 text-xs font-black text-primary group-hover:text-accent transition-colors">
                                    <span>{p.cta}</span>
                                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
