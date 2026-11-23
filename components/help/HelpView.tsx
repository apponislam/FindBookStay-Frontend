"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    ChevronDown,
    Mail,
    PhoneCall,
    MapPin,
    ArrowRight,
    Building2,
    Hotel,
    Trophy,
    Home,
    ShieldCheck,
    Send,
} from "@/components/Icons";
import siteData from "@/constants/siteData";
import { useLocale } from "@/hooks/useLocale";
import LanguageSwitch from "@/components/header/LanguageSwitch";

interface FAQItem {
    id: string;
    category: "rent" | "book" | "sports" | "buy" | "general";
    categoryLabel: string;
    question: string;
    answer: string;
}

const FAQS_EN: FAQItem[] = [
    {
        id: "rent-contact",
        category: "rent",
        categoryLabel: "Rent Homes & Seats",
        question: "How do I contact a landlord or host for a rental flat or bachelor seat?",
        answer: "On every verified rental listing, you can view the verified host or landlord profile and initiate direct contact via phone or message. We do not use unauthorized middleman brokers, so negotiations and visit arrangements happen directly between you and the property owner.",
    },
    {
        id: "rent-bachelor-seats",
        category: "rent",
        categoryLabel: "Rent Homes & Seats",
        question: "What are bachelor seats and what utilities are included?",
        answer: "Bachelor seats are furnished single beds or shared rooms tailored for students and young working professionals. Each listing explicitly details whether high-speed Wi-Fi, water, electricity, gas, and cleaning services are included in the monthly rent to eliminate hidden surprises.",
    },
    {
        id: "rent-sublets",
        category: "rent",
        categoryLabel: "Rent Homes & Seats",
        question: "Can I find flexible monthly sublets without long-term commitments?",
        answer: "Yes! FindBookStay features a dedicated monthly sublet filter offering flexible 1-to-6 month stays. These spaces are typically furnished and ideal for visiting researchers, corporate assignees, and seasonal travelers.",
    },
    {
        id: "book-confirmations",
        category: "book",
        categoryLabel: "Book Stays & Resorts",
        question: "How do hotel and resort bookings work on FindBookStay?",
        answer: "Browse our handpicked collection of city boutique hotels, scenic lakeside eco-resorts, and private vacation cottages. Each stay provides high-definition photo galleries, real guest reviews, transparent amenity checklists, and direct host messaging for smooth check-ins.",
    },
    {
        id: "book-amenities",
        category: "book",
        categoryLabel: "Book Stays & Resorts",
        question: "How do I verify the exact amenities of a holiday home or resort?",
        answer: "Every stay listing displays an itemized amenities matrix (swimming pool, power generator backup, complimentary breakfast, Wi-Fi, kitchen access, and parking availability). If you have specific questions, you can reach out to the hotel manager directly through the listing inquiry option.",
    },
    {
        id: "sports-slots",
        category: "sports",
        categoryLabel: "Sports & Turfs",
        question: "How do I reserve a sports turf or indoor court?",
        answer: "Instead of making endless phone calls, visit the Sports section to view artificial grass soccer and cricket turfs, floodlit night pitches, and indoor badminton courts. Select your desired date and hour slot, and coordinate directly with the venue manager.",
    },
    {
        id: "sports-night-hours",
        category: "sports",
        categoryLabel: "Sports & Turfs",
        question: "Are night floodlight hours and equipment provided at sports turfs?",
        answer: "Yes! Most listed turf arenas feature commercial LED floodlights for night tournaments. The listing details whether footballs, bibs, cricket bats, and goal nets are supplied on-site or if you should bring your own gear.",
    },
    {
        id: "buy-ownership",
        category: "buy",
        categoryLabel: "Buy Real Estate",
        question: "How are properties for sale verified on FindBookStay?",
        answer: "We prioritize listings from verified property owners and reputable developers. Every sale listing displays transparent deed and registration details, layout blueprints, demarcation status, and direct contact with the owner so you can conduct your legal due diligence confidently.",
    },
    {
        id: "buy-plots-land",
        category: "buy",
        categoryLabel: "Buy Real Estate",
        question: "Can I inspect land plots before purchasing?",
        answer: "Absolutely. You can schedule a visit directly with the plot owner or developer representative through the listing page to verify location boundaries, road access, utility availability, and municipal permissions.",
    },
    {
        id: "general-verification",
        category: "general",
        categoryLabel: "Platform Trust",
        question: "What is the FindBookStay Verification Guarantee?",
        answer: "Our verification team conducts on-site checks, validates host identities, inspects land mutation records, and verifies accurate high-definition photos before a listing receives the verified badge.",
    },
];

const FAQS_BN: FAQItem[] = [
    {
        id: "rent-contact",
        category: "rent",
        categoryLabel: "বাসা ও সিট ভাড়া",
        question: "ভাড়া ফ্ল্যাট বা ব্যাচেলর সিটের জন্য কীভাবে বাড়িওয়ালার সাথে যোগাযোগ করব?",
        answer: "প্রতিটি যাচাইকৃত লিস্টিংয়ে বাড়িওয়ালা বা হোস্টের প্রোফাইল থাকে, যেখানে সরাসরি ফোন বা মেসেজের মাধ্যমে কথা বলা যায়। এখানে কোনো মধ্যস্বত্বভোগী দালাল নেই, তাই সরাসরি মালিকের সাথে পরিদর্শন ও চুক্তি সম্পন্ন হয়।",
    },
    {
        id: "rent-bachelor-seats",
        category: "rent",
        categoryLabel: "বাসা ও সিট ভাড়া",
        question: "ব্যাচেলর সিট কী এবং এতে কী কী ইউটিলিটি সুবিধা অন্তর্ভুক্ত থাকে?",
        answer: "ব্যাচেলর সিট হলো ছাত্র ও চাকুরিজীবীদের জন্য সজ্জিত সিঙ্গেল বেড বা শেয়ার্ড রুম। প্রতিটি বিজ্ঞাপনে ওয়াই-ফাই, বিদ্যুৎ, গ্যাস, পানি এবং পরিচ্ছন্নতাকর্মীর চার্জ অন্তর্ভুক্ত কি না তা স্পষ্টভাবে উল্লেখ থাকে।",
    },
    {
        id: "rent-sublets",
        category: "rent",
        categoryLabel: "বাসা ও সিট ভাড়া",
        question: "দীর্ঘমেয়াদি চুক্তি ছাড়া কি ফ্লেক্সিবল মাসিক সাবলেট পাওয়া সম্ভব?",
        answer: "হ্যাঁ! FindBookStay-তে ১ থেকে ৬ মাসের জন্য ফ্লেক্সিবল মাসিক সাবলেট ফিল্টার রয়েছে। এগুলো সাধারণত ফার্নিশড থাকে এবং ইন্টার্ন, গবেষক বা সাময়িক ভ্রমণকারীদের জন্য আদর্শ।",
    },
    {
        id: "book-confirmations",
        category: "book",
        categoryLabel: "হোটেল ও রিসোর্ট স্টে",
        question: "FindBookStay-তে হোটেল এবং রিসোর্ট বুকিং কীভাবে কাজ করে?",
        answer: "শহরের সেরা বুটিক হোটেল, লেকভিউ বা পাহাড়ি রিসোর্ট ও প্রাইভেট কটেজগুলো সহজে ব্রাউজ করুন। আসল ছবি, অতিথিদের রিভিউ, পরিষ্কার সুবিধা তালিকা দেখে সরাসরি হোস্টের সাথে যোগাযোগের মাধ্যমে বুকিং নিশ্চিত করুন।",
    },
    {
        id: "book-amenities",
        category: "book",
        categoryLabel: "হোটেল ও রিসোর্ট স্টে",
        question: "রিসোর্ট বা হলিডে হোমের সঠিক সুবিধাসমূহ কীভাবে যাচাই করব?",
        answer: "প্রতিটি স্টে লিস্টিংয়ে সুইমিং পুল, জেনারেটর ব্যাকআপ, ব্রেকফাস্ট, ওয়াই-ফাই ও পার্কিং সুবিধার স্পষ্ট তালিকা রয়েছে। বিশেষ প্রশ্নের জন্য লিস্টিং থেকে সরাসরি ম্যানেজারকে মেসেজ করতে পারেন।",
    },
    {
        id: "sports-slots",
        category: "sports",
        categoryLabel: "টার্ফ ও খেলাধুলা",
        question: "ফুটবল টার্ফ বা ইনডোর কোর্ট কীভাবে বুক করব?",
        answer: "ফোনে বারবার খোঁজার ঝামেলা ছাড়াই স্পোর্টস বিভাগে গিয়ে কৃত্রিম ঘাসের ফুটবল টার্ফ বা ব্যাডমিন্টন কোর্ট দেখুন। পছন্দের তারিখ ও স্লট সময় নির্বাচন করে সরাসরি ভেন্যু ম্যানেজারের সাথে বুকিং চূড়ান্ত করুন।",
    },
    {
        id: "sports-night-hours",
        category: "sports",
        categoryLabel: "টার্ফ ও খেলাধুলা",
        question: "টার্ফে কি নাইট ফ্লাডলাইট এবং খেলার সরঞ্জাম পাওয়া যায়?",
        answer: "হ্যাঁ! প্রায় সকল টার্ফে রাতের ম্যাচের জন্য কমার্শিয়াল এলইডি ফ্লাডলাইট থাকে। বল, বিবস, ক্রিকেট ব্যাট ও নেট ভেন্যুতে আছে কি না তা লিস্টিংয়ের বিবরণীতে উল্লেখ থাকে।",
    },
    {
        id: "buy-ownership",
        category: "buy",
        categoryLabel: "প্রপার্টি কেনাবেচা",
        question: "FindBookStay-তে বিক্রির প্রপার্টিগুলো কীভাবে যাচাই করা হয়?",
        answer: "আমরা যাচাইকৃত মালিক ও নামী ডেভেলপারদের লিস্টিংকে অগ্রাধিকার দিই। প্রতিটি বিজ্ঞাপনে নামজারি, নকশা অনুমোদন এবং মালিকের সরাসরি যোগাযোগ নম্বর দেওয়া থাকে যাতে আপনি আইনি যাচাই নিশ্চিত করতে পারেন।",
    },
    {
        id: "buy-plots-land",
        category: "buy",
        categoryLabel: "প্রপার্টি কেনাবেচা",
        question: "ক্রয় করার পূর্বে কি সরাসরি জমি বা ফ্ল্যাট পরিদর্শন করা যাবে?",
        answer: "অবশ্যই। লিস্টিং পেজ থেকে সরাসরি মালিক বা প্রতিনিধির সাথে সময় নির্ধারণ করে সীমানা, চলাচলের রাস্তা এবং ইউটিলিটি সংযোগ সরেজমিনে দেখে আসতে পারেন।",
    },
    {
        id: "general-verification",
        category: "general",
        categoryLabel: "ট্রাস্ট ও বিশ্বাস",
        question: "FindBookStay ভেরিফিকেশন গ্যারান্টি কী?",
        answer: "আমাদের ভেরিফিকেশন টিম সরেজমিনে পরিদর্শন, হোস্টের এনআইডি যাচাই এবং আসল ছবি নিশ্চিত করার পরেই একটি লিস্টিংয়ে 'Verified' ব্যাজ প্রদান করে।",
    },
];

const CATEGORIES_EN = [
    { id: "all", label: "All Questions", icon: ShieldCheck },
    { id: "rent", label: "Rentals & Seats", icon: Home },
    { id: "book", label: "Stays & Resorts", icon: Hotel },
    { id: "sports", label: "Turf & Sports", icon: Trophy },
    { id: "buy", label: "Property & Land", icon: Building2 },
];

const CATEGORIES_BN = [
    { id: "all", label: "সকল প্রশ্নোত্তর", icon: ShieldCheck },
    { id: "rent", label: "বাসা ও সিট ভাড়া", icon: Home },
    { id: "book", label: "হোটেল ও স্টে", icon: Hotel },
    { id: "sports", label: "টার্ফ ও খেলাধুলা", icon: Trophy },
    { id: "buy", label: "প্রপার্টি ও ফ্ল্যাট", icon: Building2 },
];

export const HelpView = () => {
    const { isBn } = useLocale();
    const faqs = isBn ? FAQS_BN : FAQS_EN;
    const categories = isBn ? CATEGORIES_BN : CATEGORIES_EN;

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [openAccordionId, setOpenAccordionId] = useState<string | null>("rent-contact");

    const filteredFaqs = useMemo(() => {
        return faqs.filter((faq) => {
            const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
            const matchesSearch =
                searchQuery.trim() === "" ||
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [faqs, selectedCategory, searchQuery]);

    const toggleAccordion = (id: string) => {
        setOpenAccordionId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="w-full bg-background text-foreground">
            {/* ============================================================== */}
            {/* 1. HERO HEADER WITH LIVE SEARCH                                */}
            {/* ============================================================== */}
            <section className="relative w-full overflow-hidden border-b border-border bg-linear-to-b from-surface-secondary/70 via-background to-background pt-10 pb-16 lg:pt-16 lg:pb-20">
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-linear-to-tr from-accent/20 via-primary/10 to-transparent blur-3xl opacity-70"
                />

                <div className="container mx-auto px-4 relative">
                    {/* Top utility row with Badge and Language Switch */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-accent/30 shadow-xs text-xs font-semibold text-foreground">
                            <span className="size-2 rounded-full bg-accent animate-pulse" />
                            <span className="tracking-wide uppercase text-[11px] font-bold text-accent">
                                {isBn ? "হেল্প ও সাপোর্ট সেন্টার" : "Help & Support Center"}
                            </span>
                        </div>

                        {/* Direct on-page Language Switch */}
                        <LanguageSwitch />
                    </div>

                    <div className="w-full text-center space-y-6">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15] max-w-4xl mx-auto">
                            {isBn ? "আমরা কীভাবে আপনাকে সাহায্য করতে পারি?" : "How can we help you today?"}
                        </h1>

                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            {isBn
                                ? "বাসা ভাড়া, হোটেল বুকিং, স্পোর্টস টার্ফ রিজার্ভেশন এবং প্রপার্টি সংক্রান্ত যেকোনো প্রশ্নের তাৎক্ষণিক উত্তর পান অথবা সরাসরি আমাদের সাথে কথা বলুন।"
                                : "Find immediate answers to questions regarding rentals, hotel bookings, sports turfs, and property purchases, or reach our concierge directly."}
                        </p>

                        {/* Search Input Bar */}
                        <div className="w-full max-w-2xl mx-auto pt-2">
                            <div className="relative flex items-center">
                                <Search className="absolute left-4 size-5 text-muted-foreground pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={
                                        isBn
                                            ? "প্রশ্ন খুঁজুন (যেমন ব্যাচেলর সিট, টার্ফ বুকিং, সরাসরি যোগাযোগ)..."
                                            : "Search questions (e.g. bachelor seats, turf booking, direct contact)..."
                                    }
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-card border border-border shadow-xs text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-accent focus:ring-4 focus:ring-accent/15 transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="cursor-pointer absolute right-4 text-xs font-semibold text-muted-foreground hover:text-foreground bg-surface-secondary px-2.5 py-1 rounded-md transition-colors"
                                    >
                                        {isBn ? "মুছুন" : "Clear"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 2. TOP 4 CONTACT & FEEDBACK CHANNELS                           */}
            {/* ============================================================== */}
            <section className="w-full py-12 lg:py-16 border-b border-border bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Channel 1: 24/7 Hotline */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-card border border-border flex flex-col justify-between hover:border-accent/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-surface-secondary flex items-center justify-center text-accent">
                                    <PhoneCall className="size-5" />
                                </div>
                                <h3 className="text-base font-bold text-foreground">
                                    {isBn ? "২৪/৭ সরাসরি হটলাইন" : "24/7 Direct Hotline"}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {isBn
                                        ? "জরুরি বুকিং বা লিস্টিং সহায়তার জন্য সরাসরি আমাদের সাপোর্ট টিমের সাথে কথা বলুন।"
                                        : "Speak directly with our customer concierge for urgent listing or reservation support."}
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-border">
                                <a
                                    href={`tel:${siteData.contacts.phoneClean}`}
                                    className="cursor-pointer text-xs font-bold text-foreground hover:text-accent flex items-center gap-1.5 transition-colors"
                                >
                                    <span>{siteData.contacts.phoneDisplay}</span>
                                    <ArrowRight className="size-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Channel 2: Email Concierge */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-card border border-border flex flex-col justify-between hover:border-accent/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-surface-secondary flex items-center justify-center text-accent">
                                    <Mail className="size-5" />
                                </div>
                                <h3 className="text-base font-bold text-foreground">
                                    {isBn ? "কনসিয়ার্জ ইমেইল" : "Concierge Email"}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {isBn
                                        ? "যেকোনো বিস্তারিত প্রশ্ন, পার্টনারশিপ বা অ্যাকাউন্ট সহায়তার জন্য ইমেইল করুন।"
                                        : "Send us your detailed inquiries, partner propositions, or account support tickets."}
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-border">
                                <a
                                    href={`mailto:${siteData.contacts.supportEmail}`}
                                    className="cursor-pointer text-xs font-bold text-foreground hover:text-accent flex items-center gap-1.5 transition-colors"
                                >
                                    <span>{siteData.contacts.supportEmail}</span>
                                    <ArrowRight className="size-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Channel 3: Headquarters */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-card border border-border flex flex-col justify-between hover:border-accent/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-surface-secondary flex items-center justify-center text-accent">
                                    <MapPin className="size-5" />
                                </div>
                                <h3 className="text-base font-bold text-foreground">
                                    {isBn ? "প্রধান কার্যালয়" : "Headquarters"}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {isBn
                                        ? "গুলশান-২, ঢাকা থেকে সার্বক্ষণিক পরিচালিত আধুনিক মার্কেটপ্লেস হাব।"
                                        : "Stationed in Gulshan-2, Dhaka with regional hubs managing operations across global territories."}
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-border">
                                <span className="text-xs font-bold text-foreground block truncate">
                                    {isBn ? "গুলশান-২, ঢাকা - ১২১২, বাংলাদেশ" : siteData.address.full}
                                </span>
                            </div>
                        </div>

                        {/* Channel 4: Feedback Portal */}
                        <div className="p-6 rounded-2xl bg-linear-to-br from-emerald-950 via-primary to-[#062F2B] dark:from-[#0B1A17] dark:via-[#132B25] dark:to-[#0B1A17] text-white flex flex-col justify-between shadow-xs border border-emerald-800/40 hover:shadow-md transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                                    <Send className="size-5" />
                                </div>
                                <h3 className="text-base font-bold text-white">
                                    {isBn ? "মতামত ও পরামর্শ দিন" : "Share App & Web Feedback"}
                                </h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    {isBn
                                        ? "ওয়েব বা অ্যাপের উন্নতির জন্য আপনার মূল্যবান মতামত সরাসরি আমাদের প্রোডাক্ট টিমকে জানান।"
                                        : "Have ideas for mobile app features or web updates? Tell our product team directly."}
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-white/20">
                                <Link
                                    href="/feedback"
                                    className="cursor-pointer text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1.5 transition-colors group"
                                >
                                    <span>{isBn ? "ফিডব্যাক পোর্টাল খুলুন" : "Open Feedback Portal"}</span>
                                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 3. INTERACTIVE FAQ ACCORDION                                   */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-24 bg-surface-secondary/20 border-b border-border">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="w-full mb-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                            {isBn ? "সাধারণ জিজ্ঞাসাসমূহ" : "Frequently Asked Questions"}
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                            {isBn ? "ক্যাটাগরি অনুযায়ী অন্বেষণ করুন" : "Explore by Category"}
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                            {isBn
                                ? "লিস্টিং ও রিজার্ভেশন সম্পর্কিত বিস্তারিত দিকনির্দেশনা পেতে নির্দিষ্ট বিভাগ নির্বাচন করুন।"
                                : "Select a category or search above to find detailed guidance on managing listings and reservations."}
                        </p>
                    </div>

                    {/* Category Tabs Bar */}
                    <div className="w-full flex flex-wrap gap-2 mb-8">
                        {categories.map((cat) => {
                            const CatIcon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-xs"
                                            : "bg-white dark:bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50"
                                    }`}
                                >
                                    <CatIcon className={`size-4 ${isActive ? "text-primary-foreground" : "text-accent"}`} />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Accordion List */}
                    <div className="w-full space-y-3">
                        {filteredFaqs.length === 0 ? (
                            <div className="p-12 text-center bg-white dark:bg-card rounded-2xl border border-border space-y-3">
                                <p className="text-base font-bold text-foreground">
                                    {isBn ? `"${searchQuery}" এর সাথে সম্পর্কিত কোনো প্রশ্ন পাওয়া যায়নি` : `No questions found matching "${searchQuery}"`}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {isBn ? "অন্য কোনো শব্দ দিয়ে খুঁজুন অথবা 'সকল প্রশ্নোত্তর' নির্বাচন করুন।" : "Try searching with different terms or select 'All Questions'."}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("all");
                                    }}
                                    className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold mt-2"
                                >
                                    {isBn ? "ফিল্টার রিসেট করুন" : "Reset Filters"}
                                </button>
                            </div>
                        ) : (
                            filteredFaqs.map((faq) => {
                                const isOpen = openAccordionId === faq.id;
                                return (
                                    <div
                                        key={faq.id}
                                        className={`w-full rounded-2xl border transition-all duration-200 overflow-hidden ${
                                            isOpen
                                                ? "bg-white dark:bg-card border-accent shadow-xs"
                                                : "bg-white dark:bg-card border-border hover:border-accent/50"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleAccordion(faq.id)}
                                            className="cursor-pointer w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors"
                                            aria-expanded={isOpen}
                                        >
                                            <div className="flex items-center gap-3 pr-4">
                                                <span className="text-[11px] font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md shrink-0 uppercase tracking-wider border border-accent/20">
                                                    {faq.categoryLabel}
                                                </span>
                                                <span className="text-sm sm:text-base font-bold text-foreground">
                                                    {faq.question}
                                                </span>
                                            </div>
                                            <div
                                                className={`size-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                                                    isOpen
                                                        ? "rotate-180 bg-surface-secondary text-foreground"
                                                        : "text-muted-foreground"
                                                }`}
                                            >
                                                <ChevronDown className="size-4" />
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-border/60">
                                                <p className="pt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 4. STILL HAVE QUESTIONS CTA BANNER                             */}
            {/* ============================================================== */}
            <section className="w-full py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="w-full rounded-3xl bg-linear-to-br from-emerald-950 via-primary to-[#062F2B] dark:from-[#0B1A17] dark:via-[#132B25] dark:to-[#0B1A17] p-8 sm:p-12 text-white shadow-xl border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 max-w-xl">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                                {isBn ? "ডেডিকেটেড কনসিয়ার্জ" : "Dedicated Concierge"}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                                {isBn ? "আরও কোনো প্রশ্ন আছে বা ব্যক্তিগত দিকনির্দেশনা চান?" : "Still have questions or need personalized guidance?"}
                            </h2>
                            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                                {isBn
                                    ? "মালিক হিসেবে রেজিস্ট্রেশন, রিজার্ভেশন সংক্রান্ত জিজ্ঞাসা বা ভেন্যুর তথ্যের জন্য আমাদের সাপোর্ট টিম সার্বক্ষণিক প্রস্তুত।"
                                    : "Our support staff is stationed around the clock to assist with owner registrations, reservation inquiries, and venue details."}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <a
                                href={`mailto:${siteData.contacts.supportEmail}`}
                                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all"
                            >
                                <Mail className="size-4" />
                                <span>{isBn ? "ইমেইল সাপোর্ট" : "Email Support"}</span>
                            </a>

                            <Link
                                href="/feedback"
                                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all"
                            >
                                <Send className="size-4" />
                                <span>{isBn ? "মতামত জানান" : "Submit Feedback"}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelpView;