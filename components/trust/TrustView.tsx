"use client";

import React from "react";
import Link from "next/link";
import {
    ShieldCheck,
    CheckCircle2,
    Sparkles,
    Home,
    Hotel,
    Trophy,
    Building2,
    ArrowRight,
} from "@/components/Icons";
import { useLocale } from "@/hooks/useLocale";
import LanguageSwitch from "@/components/header/LanguageSwitch";

const VERIFICATION_PILLARS_EN = [
    {
        id: "rent",
        title: "Rental Homes & Bachelor Seats",
        badge: "Verified Landlord",
        icon: Home,
        description:
            "Every rental flat, duplex, and student bachelor seat is validated with government NID landlord verification, physical property audit, and zero-broker fee compliance.",
        checklist: [
            "Physical on-site address and bedroom photo verification",
            "National ID (NID) & utility bill validation for landlords",
            "Transparent lease agreements with deposit dispute protection",
            "No hidden broker charges or surprise rent increases",
        ],
    },
    {
        id: "book",
        title: "Vacation Stays & Resorts",
        badge: "100% Real Stays",
        icon: Hotel,
        description:
            "Say goodbye to misleading hotel photos and unexpected cancellations. All resorts, eco-cottages, and serviced apartments are inspected by our hospitality vetting team.",
        checklist: [
            "Room amenities verified (AC, geyser, Wi-Fi, swimming pool)",
            "Instant booking lock with guaranteed check-in",
            "Verified traveler reviews from authenticated check-ins",
            "24/7 concierge support during your stay",
        ],
    },
    {
        id: "sports",
        title: "Sports Turfs & Indoor Arenas",
        badge: "Live Slot Locked",
        icon: Trophy,
        description:
            "Book football turfs, cricket pitches, and badminton courts with confidence. Never face double-booked grounds or unmaintained grass.",
        checklist: [
            "Real-time synchronized slot schedule with zero double-booking",
            "Inspected commercial-grade LED floodlights for night matches",
            "FIFA standard shock-absorbent artificial grass auditing",
            "Dedicated changing rooms and clean shower amenities confirmed",
        ],
    },
    {
        id: "buy",
        title: "Buy Real Estate & Land Plots",
        badge: "Clean Title Deed",
        icon: Building2,
        description:
            "High-stakes property investments require institutional scrutiny. Our legal and land surveying partners vet every square foot before a listing goes live.",
        checklist: [
            "Complete land mutation, khatian, and deed history vetted",
            "RAJUK / CDA / local municipal layout approval validation",
            "Clear demarcated plot boundary check with GPS coordinates",
            "Direct developer & authenticated owner documentation",
        ],
    },
];

const VERIFICATION_PILLARS_BN = [
    {
        id: "rent",
        title: "বাসা ও ব্যাচেলর সিট ভাড়া",
        badge: "যাচাইকৃত বাড়িওয়ালা",
        icon: Home,
        description:
            "প্রতিটি ভাড়া ফ্ল্যাট, ডুপ্লেক্স ও ব্যাচেলর সিট জাতীয় পরিচয়পত্র যাচাই, সরেজমিনে পরিদর্শন এবং দালালমুক্ত সেবা নিশ্চিতের মাধ্যমে তালিকাভুক্ত করা হয়।",
        checklist: [
            "সরেজমিনে ঠিকানার সত্যতা ও আসল রুমের ছবি যাচাই",
            "বাড়িওয়ালার জাতীয় পরিচয়পত্র (এনআইডি) ও ইউটিলিটি বিল যাচাই",
            "স্বচ্ছ চুক্তি ও জামানত সুরক্ষা সহায়তা",
            "কোনো গোপন দালাল ফি বা অনাকাঙ্ক্ষিত ভাড়া বৃদ্ধি নেই",
        ],
    },
    {
        id: "book",
        title: "হোটেল, রিসোর্ট ও স্টে",
        badge: "১০০% আসল স্টে",
        icon: Hotel,
        description:
            "বিভ্রান্তিকর ছবি ও অনাকাঙ্ক্ষিত বুকিং বাতিলের ঝামেলা শেষ। প্রতিটি রিসোর্ট ও সার্ভিসড অ্যাপার্টমেন্ট আমাদের টিম দ্বারা যাচাইকৃত।",
        checklist: [
            "রুমের সুবিধাসমূহ (এসি, গিজার, ওয়াই-ফাই, সুইমিং পুল) যাচাই",
            "নিশ্চিত চেক-ইন নিশ্চয়তাসহ ইনস্ট্যান্ট স্লট বুকিং",
            "প্রকৃত অতিথিদের যাচাইকৃত রিভিউ ও রেটিং",
            "অবস্থানকালে ২৪/৭ ডেডিকেটেড কনসিয়ার্জ সহায়তা",
        ],
    },
    {
        id: "sports",
        title: "স্পোর্টস টার্ফ ও ইনডোর এরিনা",
        badge: "লাইভ স্লট লকড",
        icon: Trophy,
        description:
            "ফুটবল টার্ফ, ক্রিকেট পিচ ও ব্যাডমিন্টন কোর্ট বুক করুন নিরাপদে। ডাবল বুকিং বা নষ্ট ঘাসের মাঠে খেলার কোনো আশঙ্কা নেই।",
        checklist: [
            "রিয়েল-টাইম লাইভ শিডিউল — কোনো ডাবল বুকিং নেই",
            "নাইট ম্যাচের জন্য উচ্চমানের এলইডি ফ্লাডলাইট পরিদর্শন",
            "ফিফা স্ট্যান্ডার্ড কৃত্রিম ঘাস ও বাউন্স গুণমান পরীক্ষা",
            "নির্ধারিত চেঞ্জিং রুম ও পরিষ্কার ওয়াশরুম নিশ্চিতকরণ",
        ],
    },
    {
        id: "buy",
        title: "প্রপার্টি ও ফ্ল্যাট কেনাবেচা",
        badge: "নিষ্কলঙ্ক দলিল",
        icon: Building2,
        description:
            "রিয়েল এস্টেট ক্রয়ে প্রয়োজন সর্বোচ্চ আইনি সতর্কতা। আমাদের টিম প্রতিটি সম্পত্তির মালিকানা ও কাগজপত্র যাচাই করে প্রকাশ করে।",
        checklist: [
            "সম্পূর্ণ নামজারি, খতিয়ান ও দলিলের ধারাবাহিকতা যাচাই",
            "রাজউক / সিডিএ / স্থানীয় পৌরসভা প্ল্যান অনুমোদন পরীক্ষা",
            "জিপিএস কোঅর্ডিনেটসহ সীমানা ও প্লট অবস্থান যাচাই",
            "মালিক ও অনুমোদিত ডেভেলপারদের সরাসরি ডকুমেন্টস",
        ],
    },
];

const AUDIT_STEPS_EN = [
    {
        step: "01",
        title: "Documentation Submission",
        desc: "Owners and hosts upload authentic property deeds, NID copies, utility receipts, and trade licenses.",
    },
    {
        step: "02",
        title: "Field Officer Inspection",
        desc: "Our local verification officers visit the premises to take geolocated, unedited photos and measure dimensions.",
    },
    {
        step: "03",
        title: "Verification Badge Granted",
        desc: "Only properties and turfs passing 100% of our safety, hygiene, and legal criteria receive the Verified badge.",
    },
    {
        step: "04",
        title: "Continuous Monitoring",
        desc: "Customer ratings and guest feedback continuously audit hosts. Repeated issues trigger immediate delisting.",
    },
];

const AUDIT_STEPS_BN = [
    {
        step: "০১",
        title: "ডকুমেন্টস জমাদান",
        desc: "মালিক ও হোস্টরা মূল দলিলের কপি, এনআইডি, ইউটিলিটি রসিদ ও ট্রেড লাইসেন্স জমা দেন।",
    },
    {
        step: "০২",
        title: "সরেজমিনে পরিদর্শন",
        desc: "আমাদের ফিল্ড অফিসাররা সরাসরি স্পেসটি পরিদর্শন করে আন-এডিটেড ছবি ও পরিমাপ সংগ্রহ করেন।",
    },
    {
        step: "০৩",
        title: "ভেরিফায়েড ব্যাজ প্রদান",
        desc: "নিরাপত্তা, পরিচ্ছন্নতা ও আইনি শর্তে ১০০% উত্তীর্ণ হলেই কেবল 'Verified' ব্যাজ দেওয়া হয়।",
    },
    {
        step: "০৪",
        title: "নিয়মিত পর্যবেক্ষণ",
        desc: "ব্যবহারকারীদের রেটিং ও ফিডব্যাকের মাধ্যমে মান নিয়ন্ত্রণ করা হয়। ত্রুটি থাকলে তালিকা বাতিল হয়।",
    },
];

export const TrustView = () => {
    const { isBn } = useLocale();

    const verificationPillars = isBn ? VERIFICATION_PILLARS_BN : VERIFICATION_PILLARS_EN;
    const auditSteps = isBn ? AUDIT_STEPS_BN : AUDIT_STEPS_EN;

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* 1. Hero Section */}
            <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20 border-b border-border bg-surface-secondary/40">
                <div className="container mx-auto px-4">
                    {/* Top utility row with Badge and Language Switch */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="size-4" />
                            <span>{isBn ? "FindBookStay ট্রাস্ট ও ভেরিফিকেশন" : "FindBookStay Trust Framework"}</span>
                        </div>

                        {/* Direct on-page Language Switch */}
                        <LanguageSwitch />
                    </div>

                    <div className="max-w-3xl space-y-5">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                            {isBn ? "আমাদের যাচাইকরণ গ্যারান্টি: শূন্য প্রতারণা, ১০০% সত্যতা।" : "Our Verification Guarantee: Zero Scams, 100% Authenticity."}
                        </h1>

                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                            {isBn
                                ? "ঢাকায় ব্যাচেলর সিট খোঁজা, শ্রীমঙ্গলে উইকেন্ড রিসোর্ট বুকিং, চট্টগ্রামে নাইট টার্ফ ম্যাচ আয়োজন কিংবা গুলশানে অ্যাপার্টমেন্ট ক্রয়—প্রতিটি পদক্ষেপে FindBookStay আপনার সুরক্ষা নিশ্চিত করে।"
                                : "Whether renting a bachelor seat in Dhaka, booking a weekend resort in Sreemangal, reserving a night turf in Chittagong, or buying a luxury flat in Gulshan, FindBookStay protects you at every step."}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link
                                href="/help"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                            >
                                <span>{isBn ? "হেল্প ও প্রশ্নোত্তর দেখুন" : "Browse Help & FAQs"}</span>
                                <ArrowRight className="size-4" />
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-card border border-border hover:bg-surface-secondary text-foreground text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                            >
                                <span>{isBn ? "লিস্টিং সম্পর্কে রিপোর্ট করুন" : "Report a Listing"}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Four Verification Pillars */}
            <section className="py-16 sm:py-20 border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-12">
                        <div className="flex items-center gap-1.5 mb-2">
                            <span className="w-3.5 h-0.5 bg-accent" />
                            <span className="text-[11px] font-bold tracking-widest text-primary uppercase font-mono">
                                {isBn ? "৪টি মূল কাঠামো" : "4-PILLAR FRAMEWORK"}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            {isBn ? "আমরা যেভাবে প্রতিটি ক্যাটাগরি যাচাই করি" : "How We Verify Each Category"}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {isBn
                                ? "ভিন্ন ভিন্ন স্পেসের জন্য ভিন্ন যাচাইকরণ মানদণ্ড প্রযোজ্য। নিচে আমাদের যাচাইকরণ পদ্ধতির বিস্তারিত দেওয়া হলো:"
                                : "Different spaces have different safety and verification requirements. Here is our rigorous vetting breakdown:"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {verificationPillars.map((pillar) => {
                            const IconComponent = pillar.icon;
                            return (
                                <div
                                    key={pillar.id}
                                    className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-card border border-border shadow-xs hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="size-12 rounded-2xl bg-surface-secondary text-primary flex items-center justify-center">
                                                <IconComponent className="size-6 text-accent" />
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent/10 text-accent uppercase tracking-wider">
                                                {pillar.badge}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                {pillar.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                                                {pillar.description}
                                            </p>
                                        </div>

                                        <ul className="space-y-2.5 pt-2 border-t border-border/70">
                                            {pillar.checklist.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                                                    <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. The 4-Step Verification Process */}
            <section className="py-16 sm:py-20 bg-surface-secondary/30 border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
                        <span className="text-[11px] font-bold tracking-widest text-primary uppercase font-mono">
                            {isBn ? "কঠোর যাচাইকরণ প্রক্রিয়া" : "RIGOROUS AUDITING"}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            {isBn ? "FindBookStay যাচাইকরণ প্রোটোকল" : "The FindBookStay Verification Protocol"}
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            {isBn
                                ? "আমাদের প্ল্যাটফর্মে তালিকাভুক্ত প্রতিটি প্রপার্টি ও ভেন্যুকে চারটি ধাপে যাচাই করা হয়।"
                                : "Every space listed on our platform undergoes a four-tier screening sequence before receiving verified credentials."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {auditSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="relative p-6 rounded-2xl bg-white dark:bg-card border border-border shadow-xs hover:border-accent transition-all"
                            >
                                <span className="font-mono text-3xl font-extrabold text-accent/60">
                                    {step.step}
                                </span>
                                <h3 className="text-base font-bold text-foreground mt-3 mb-1.5">
                                    {step.title}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Host Commitment & Dispute Resolution CTA */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-emerald-950 via-emerald-900 to-[#062F2B] dark:from-[#0B1A17] dark:via-[#132B25] dark:to-[#0B1A17] text-white shadow-xl border border-emerald-800/40 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-2xl space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
                                <Sparkles className="size-3.5" />
                                <span>{isBn ? "শূন্য জালিয়াতি প্রতিশ্রুতি" : "Zero Fraud Commitment"}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                {isBn ? "কোনো অমিল পেয়েছেন? আমরা ১০০% সমাধানের নিশ্চয়তা দিই।" : "Found a Discrepancy? We Guarantee 100% Resolution."}
                            </h2>
                            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                                {isBn
                                    ? "যদি কোনো প্রপার্টি বা টার্ফ তার প্রদত্ত বিবরণ বা ছবির সাথে না মেলে, তবে আমাদের টিম দ্রুত হস্তক্ষেপ করে অন্য ভেন্যু বুকিং বা অর্থ ফেরত নিশ্চিত করে।"
                                    : "If an on-site property or sports venue doesn't match its verified description or photos, our concierge support team steps in immediately to rebook you or issue a swift refund."}
                            </p>
                        </div>

                        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/contact"
                                className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer"
                            >
                                {isBn ? "অভিযোগ নিষ্পত্তিকারী টিম" : "Contact Dispute Team"}
                            </Link>
                            <Link
                                href="/help"
                                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all text-center cursor-pointer"
                            >
                                {isBn ? "সাধারণ প্রশ্নোত্তর দেখুন" : "Read Policy FAQs"}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrustView;