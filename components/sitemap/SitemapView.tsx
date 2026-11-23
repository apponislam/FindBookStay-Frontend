"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { useLocale } from "@/hooks/useLocale";


interface SitemapItem {
    name: string;
    desc: string;
    href: string;
    badge?: string;
}

interface SitemapSection {
    id: string;
    number: string;
    title: string;
    href: string;
    items: SitemapItem[];
}

const SECTIONS_EN: SitemapSection[] = [
    {
        id: "rent",
        number: "01",
        title: "Rent Properties",
        href: "/rent",
        items: [
            {
                name: "Family Apartments",
                desc: "2 to 4-bedroom rental flats in secure, family-friendly communities",
                href: "/rent/family-apartments",
            },
            {
                name: "Family Houses",
                desc: "Full independent duplexes, standalone villas and multi-story homes",
                href: "/rent/family-houses",
            },
            {
                name: "Bachelor Seats",
                desc: "Single and shared seats with high-speed WiFi, meal services and all utilities",
                href: "/rent/bachelor-seats",
                badge: "Popular",
            },
            {
                name: "Shared Rooms",
                desc: "Budget-conscious shared living spaces with verified flatmates",
                href: "/rent/shared-rooms",
            },
            {
                name: "Monthly Sublets",
                desc: "Furnished short and medium-term monthly leases for professionals",
                href: "/rent/sublets",
            },
            {
                name: "Commercial Rentals",
                desc: "Corporate office spaces, retail storefronts, showrooms and commercial floors",
                href: "/rent/commercial",
            },
        ],
    },
    {
        id: "book",
        number: "02",
        title: "Book Stays",
        href: "/book",
        items: [
            {
                name: "Boutique & City Hotels",
                desc: "Handpicked 5-star, business and boutique hotels in prime city centers",
                href: "/book/hotels",
            },
            {
                name: "Scenic Resorts",
                desc: "Lakeside retreats, mountain lodges, beach resorts and nature escapes",
                href: "/book/resorts",
                badge: "Hot",
            },
            {
                name: "Guest Houses & B&Bs",
                desc: "Cozy home-style bed & breakfast stays with hospitable local hosts",
                href: "/book/guest-houses",
            },
            {
                name: "Holiday Homes",
                desc: "Private seaside villas, rustic mountain cabins and vacation cottages",
                href: "/book/holiday-homes",
            },
            {
                name: "Serviced Short Stays",
                desc: "Executive suites with fully equipped kitchens, workspaces and concierge",
                href: "/book/short-stay",
            },
            {
                name: "Luxury VIP Suites",
                desc: "Exclusive presidential penthouses, private pool villas and weekend retreats",
                href: "/book/luxury",
            },
        ],
    },
    {
        id: "sports",
        number: "03",
        title: "Sports & Turfs",
        href: "/sports",
        items: [
            {
                name: "Turf Booking",
                desc: "FIFA-standard artificial grass soccer and cricket turfs with floodlights",
                href: "/sports/turf-booking",
                badge: "Trending",
            },
            {
                name: "Football Grounds",
                desc: "Full standard size grass grounds for club matches, practice and leagues",
                href: "/sports/football-grounds",
            },
            {
                name: "Indoor Sports Courts",
                desc: "Badminton courts, basketball arenas, table tennis hubs and futsal courts",
                href: "/sports/indoor-sports",
            },
            {
                name: "Swimming & Wellness",
                desc: "Olympic training pools, aquatic centers, wellness clubs and health centers",
                href: "/sports/swimming",
            },
            {
                name: "Tournament Venues",
                desc: "Book complete tournament complexes, grandstands and corporate sports days",
                href: "/sports/tournaments",
            },
            {
                name: "Other Activities",
                desc: "Paintball arenas, bowling alleys, go-kart tracks and recreation centers",
                href: "/sports/other-activities",
            },
        ],
    },
    {
        id: "buy",
        number: "04",
        title: "Buy Properties",
        href: "/buy",
        items: [
            {
                name: "Residential Properties",
                desc: "Family flats, townhouses and homes in prime vetted neighborhoods",
                href: "/buy/residential",
            },
            {
                name: "Commercial Properties",
                desc: "Corporate offices, retail plazas, shopping centers and commercial plots",
                href: "/buy/commercial",
            },
            {
                name: "Apartments & Flats",
                desc: "Modern luxury high-rise condominium units and cozy apartments",
                href: "/buy/apartments",
            },
            {
                name: "Houses & Villas",
                desc: "Independent duplexes, standalone executive homes and private villas",
                href: "/buy/houses",
            },
            {
                name: "Land & Plots",
                desc: "Verified residential, commercial and farmland plots with vetted title deeds",
                href: "/buy/land",
            },
            {
                name: "New Developments",
                desc: "Pre-launch gated communities, off-plan projects and developer deals",
                href: "/buy/new-developments",
                badge: "New",
            },
        ],
    },
    {
        id: "explore",
        number: "05",
        title: "Explore & Destinations",
        href: "/explore",
        items: [
            {
                name: "Popular Locations",
                desc: "Explore top cities, metropolitan hubs and scenic regional getaways",
                href: "/explore/locations",
            },
            {
                name: "Featured Properties",
                desc: "Curated premium listings with top ratings, verified titles and guest reviews",
                href: "/explore/featured",
            },
            {
                name: "Popular Hotels",
                desc: "Traveler favorite stays across premier international destinations",
                href: "/explore/popular-hotels",
            },
            {
                name: "Recently Added",
                desc: "Latest verified listings updated daily across all marketplace categories",
                href: "/explore/recently-added",
                badge: "Live",
            },
            {
                name: "Verification Guarantee",
                desc: "Our trust standards, host verification guidelines, and safety practices",
                href: "/trust",
            },
            {
                name: "About FindBookStay",
                desc: "Our platform story, vision, technology and international concierge team",
                href: "/about",
            },
        ],
    },
    {
        id: "company",
        number: "06",
        title: "Company & Resources",
        href: "/about",
        items: [
            {
                name: "Post a Listing",
                desc: "Host portal for homeowners, hoteliers and turf managers to earn safely",
                href: "/post-listing",
                badge: "Host",
            },
            {
                name: "Contact Us & Concierge Desk",
                desc: "Direct contact, inquiries, host partnership support, and headquarters details",
                href: "/contact",
                badge: "Support",
            },
            {
                name: "Verification Guarantee",
                desc: "Host profile verification, authentic specifications and fraud protection",
                href: "/trust",
            },
            {
                name: "Help & Support Center",
                desc: "24/7 concierge assistance, dispute resolution, booking changes and FAQs",
                href: "/help",
            },
            {
                name: "Share Feedback & App Ideas",
                desc: "Suggest features, report bugs, or share feedback on web and upcoming apps",
                href: "/feedback",
                badge: "Feedback",
            },
            {
                name: "Terms of Service",
                desc: "Host obligations, guest cancellation policies, liability and platform rules",
                href: "/terms",
            },
            {
                name: "Privacy Policy",
                desc: "Data encryption, GDPR compliance, cookie policies and user data rights",
                href: "/privacy",
            },
        ],
    },
];

const SECTIONS_BN: SitemapSection[] = [
    {
        id: "rent",
        number: "০১",
        title: "ভাড়ার প্রোপার্টি",
        href: "/rent",
        items: [
            {
                name: "ফ্যামিলি অ্যাপার্টমেন্ট",
                desc: "নিরাপদ এবং পরিবারবান্ধব এলাকায় ২ থেকে ৪ বেডরুমের ভাড়ার ফ্ল্যাট",
                href: "/rent/family-apartments",
            },
            {
                name: "ফ্যামিলি হাউস",
                desc: "সম্পূর্ণ স্বাধীন ডুপ্লেক্স, স্বতন্ত্র ভিলা এবং বহুতল বাড়ি",
                href: "/rent/family-houses",
            },
            {
                name: "ব্যাচেলর সিট",
                desc: "হাই-স্পিড ওয়াইফাই, মিল ব্যবস্থা এবং সমস্ত ইউটিলিটিসহ একক ও শেয়ার্ড সিট",
                href: "/rent/bachelor-seats",
                badge: "জনপ্রিয়",
            },
            {
                name: "শেয়ার্ড রুম",
                desc: "যাচাইকৃত রুমমেটদের সাথে সাশ্রয়ী বাজেটের শেয়ার্ড থাকার ব্যবস্থা",
                href: "/rent/shared-rooms",
            },
            {
                name: "মাসিক সাবলেট",
                desc: "চাকরিজীবী ও পেশাদারদের জন্য আসবাবপত্রসহ স্বল্প ও মধ্যমেয়াদী মাসিক লিজ",
                href: "/rent/sublets",
            },
            {
                name: "বাণিজ্যিক ভাড়া",
                desc: "কর্পোরেট অফিস স্পেস, রিটেল শোরুম ও বাণিজ্যিক ফ্লোর",
                href: "/rent/commercial",
            },
        ],
    },
    {
        id: "book",
        number: "০২",
        title: "হোটেল ও রিসোর্ট বুকিং",
        href: "/book",
        items: [
            {
                name: "বুটিক ও সিটি হোটেল",
                desc: "শহরের প্রাণকেন্দ্রে নির্বাচিত ৫-স্টার, বিজনেস ও বুটিক হোটেল",
                href: "/book/hotels",
            },
            {
                name: "প্রাকৃতিক রিসোর্ট",
                desc: "লেকভিউ কটেজ, পাহাড়ের রিসোর্ট, সমুদ্র সৈকত ও প্রকৃতির কাছাকাছি অবকাশ কেন্দ্র",
                href: "/book/resorts",
                badge: "হট",
            },
            {
                name: "গেস্ট হাউস ও বিঅ্যান্ডবি",
                desc: "আন্তরিক আতিথেয়তাসহ পারিবারিক পরিবেশে আরামদায়ক গেস্ট হাউস",
                href: "/book/guest-houses",
            },
            {
                name: "হলিডে হোমস",
                desc: "ব্যক্তিগত সমুদ্র উপকূলীয় ভিলা, পাহাড়ের উডেন কটেজ ও অবকাশকালীন বাড়ি",
                href: "/book/holiday-homes",
            },
            {
                name: "সার্ভিসড শর্ট স্টে",
                desc: "রান্নাঘর ও ওয়ার্কস্পেস সুবিধাসম্পন্ন এক্সিকিউটিভ স্যুট",
                href: "/book/short-stay",
            },
            {
                name: "লাক্সারি ভিআইপি স্যুট",
                desc: "এক্সক্লুসিভ প্রেসিডেন্সিয়াল পেন্টহাউস, প্রাইভেট পুল ভিলা ও উইকএন্ড রিট্রিট",
                href: "/book/luxury",
            },
        ],
    },
    {
        id: "sports",
        number: "০৩",
        title: "খেলাধুলা ও টার্ফ",
        href: "/sports",
        items: [
            {
                name: "টার্ফ বুকিং",
                desc: "ফিফা মানের কৃত্রিম ঘাসের ফুটবল ও ক্রিকেট টার্ফ ফ্লাডলাইট সুবিধাসহ",
                href: "/sports/turf-booking",
                badge: "ট্রেন্ডিং",
            },
            {
                name: "ফুটবল মাঠ",
                desc: "ক্লাব ম্যাচ, অনুশীলন ও টুর্নামেন্টের জন্য পূর্ণাঙ্গ ঘাসের মাঠ",
                href: "/sports/football-grounds",
            },
            {
                name: "ইনডোর স্পোর্টস কোর্ট",
                desc: "ব্যাডমিন্টন কোর্ট, বাস্কেটবল অ্যারেনা, টেবিল টেনিস ও ফুটসাল হাব",
                href: "/sports/indoor-sports",
            },
            {
                name: "সুইমিং ও ওয়েলনেস",
                desc: "অলিম্পিক সুইমিং পুল, অ্যাকোয়াটিক সেন্টার ও হেলথ ক্লাব",
                href: "/sports/swimming",
            },
            {
                name: "টুর্নামেন্ট ভেন্যু",
                desc: "কর্পোরেট স্পোর্টস ডে এবং সম্পূর্ণ টুর্নামেন্ট কমপ্লেক্স বুকিং",
                href: "/sports/tournaments",
            },
            {
                name: "অন্যান্য বিনোদন",
                desc: "পেইন্টবল অ্যারেনা, বোলিং অ্যালি, গো-কার্ট ট্র্যাক ও রিক্রিয়েশন সেন্টার",
                href: "/sports/other-activities",
            },
        ],
    },
    {
        id: "buy",
        number: "০৪",
        title: "প্রোপার্টি ক্রয়",
        href: "/buy",
        items: [
            {
                name: "আবাসিক প্রোপার্টি",
                desc: "নিরাপদ ও সুপরিচিত এলাকায় পারিবারিক ফ্ল্যাট, টাউনহাউস ও বাড়ি",
                href: "/buy/residential",
            },
            {
                name: "বাণিজ্যিক প্রোপার্টি",
                desc: "কর্পোরেট অফিস, শপিং সেন্টার, বাণিজ্যিক প্লাজা ও কমার্শিয়াল প্লট",
                href: "/buy/commercial",
            },
            {
                name: "অ্যাপার্টমেন্ট ও ফ্ল্যাট",
                desc: "আধুনিক লাক্সারি কনডোমিনিয়াম ও রুচিশীল ফ্ল্যাট",
                href: "/buy/apartments",
            },
            {
                name: "বাড়ি ও ভিলা",
                desc: "স্বাধীন ডুপ্লেক্স, এক্সিকিউটিভ বাড়ি ও ব্যক্তিগত ভিলা",
                href: "/buy/houses",
            },
            {
                name: "জমি ও প্লট",
                desc: "কাগজপত্র যাচাইকৃত আবাসিক, বাণিজ্যিক ও কৃষিজমি",
                href: "/buy/land",
            },
            {
                name: "নতুন আবাসন প্রকল্প",
                desc: "ডেভেলপারদের প্রি-লঞ্চ গেটেড কমিউনিটি ও অফ-প্ল্যান প্রজেক্ট",
                href: "/buy/new-developments",
                badge: "নতুন",
            },
        ],
    },
    {
        id: "explore",
        number: "০৫",
        title: "এক্সপ্লোর ও গন্তব্য",
        href: "/explore",
        items: [
            {
                name: "জনপ্রিয় এলাকা",
                desc: "শীর্ষ শহর, মেট্রোপলিটন হাব ও দর্শনীয় আঞ্চলিক গন্তব্য অন্বেষণ করুন",
                href: "/explore/locations",
            },
            {
                name: "ফিচার্ড প্রোপার্টি",
                desc: "শীর্ষ রেটিং, যাচাইকৃত মালিকানা ও রিভিউসহ নির্বাচিত সেরা তালিকা",
                href: "/explore/featured",
            },
            {
                name: "জনপ্রিয় হোটেল",
                desc: "ভ্রমণপিপাসুদের পছন্দের শীর্ষ হোটেল ও রিসোর্ট",
                href: "/explore/popular-hotels",
            },
            {
                name: "সম্প্রতি যুক্ত",
                desc: "প্রতিদিন হালনাগাদ হওয়া নতুন যাচাইকৃত প্রোপার্টি তালিকা",
                href: "/explore/recently-added",
                badge: "লাইভ",
            },
            {
                name: "ভেরিফিকেশন গ্যারান্টি",
                desc: "আমাদের বিশ্বাসযোগ্যতার মানদণ্ড, হোস্ট ভেরিফিকেশন নীতি ও সুরক্ষা গ্যারান্টি",
                href: "/trust",
            },
            {
                name: "ফাইন্ডবুকস্টে সম্পর্কে",
                desc: "আমাদের প্ল্যাটফর্মের গল্প, উদ্দেশ্য, প্রযুক্তি ও আন্তর্জাতিক কনসিয়ার্জ টিম",
                href: "/about",
            },
        ],
    },
    {
        id: "company",
        number: "০৬",
        title: "কোম্পানি ও রিসোর্স",
        href: "/about",
        items: [
            {
                name: "বিজ্ঞাপন পোস্ট করুন",
                desc: "বাড়িওয়ালা, হোটেল মালিক ও টার্ফ পরিচালকদের জন্য নিরাপদ আয়ের হোস্ট পোর্টাল",
                href: "/post-listing",
                badge: "হোস্ট",
            },
            {
                name: "যোগাযোগ ও হেল্পডেস্ক",
                desc: "সরাসরি যোগাযোগ, অনুসন্ধান, পার্টনারশিপ সাপোর্ট ও হেডকোয়ার্টার তথ্য",
                href: "/contact",
                badge: "সাপোর্ট",
            },
            {
                name: "ভেরিফিকেশন গ্যারান্টি",
                desc: "হোস্ট ভেরিফিকেশন, সঠিক স্পেসিফিকেশন ও জালিয়াতি সুরক্ষা",
                href: "/trust",
            },
            {
                name: "সহায়তা কেন্দ্র ও প্রশ্নোত্তর",
                desc: "২৪/৭ কনসিয়ার্জ সহায়তা, বুকিং পরিবর্তন ও সচরাচর জিজ্ঞাসিত প্রশ্ন",
                href: "/help",
            },
            {
                name: "মতামত ও প্রতিক্রিয়া",
                desc: "নতুন ফিচারের প্রস্তাব দিন, বাগ রিপোর্ট করুন এবং মতামত জানান",
                href: "/feedback",
                badge: "ফিডব্যাক",
            },
            {
                name: "ব্যবহারের শর্তাবলী",
                desc: "হোস্ট দায়িত্ব, বাতিলকরণ নীতিমালা, দায়বদ্ধতা ও প্ল্যাটফর্মের নিয়মাবলী",
                href: "/terms",
            },
            {
                name: "গোপনীয়তা নীতি",
                desc: "ডেটা এনক্রিপশন, জিডিপিআর নীতি, কুকি পলিসি ও ব্যবহারকারীর তথ্যের অধিকার",
                href: "/privacy",
            },
        ],
    },
];

export const SitemapView = () => {
    const { locale } = useLocale();
    const isBn = locale === "bn";
    const sections = isBn ? SECTIONS_BN : SECTIONS_EN;

    return (
        <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-200">
            {/* ============================================================== */}
            {/* 1. EDITORIAL HERO HEADER                                       */}
            {/* ============================================================== */}
            <div className="border-b border-border bg-linear-to-b from-surface-secondary/80 via-surface to-background">
                <div className="container mx-auto px-4 py-12 lg:py-16">
                    <div className="max-w-3xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border shadow-2xs text-xs font-semibold text-primary">
                            <span className="size-2 rounded-full bg-accent animate-pulse" />
                            <span className="uppercase tracking-wider text-[11px] font-bold">
                                {isBn ? "প্ল্যাটফর্ম ডিরেক্টরি" : "Platform Directory"}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                            {isBn ? "ফাইন্ডবুকস্টে সাইটম্যাপ" : "FindBookStay Sitemap"}
                        </h1>

                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                            {isBn
                                ? "মার্কেটপ্লেসের সমস্ত গন্তব্যের একটি সম্পূর্ণ এবং ব্যবহারবান্ধব ক্যাটালগ। ফ্ল্যাট ভাড়া, হোটেল রিজার্ভেশন, স্পোর্টস টার্ফ স্লট বুকিং, রিয়েল এস্টেট ক্রয় এবং প্ল্যাটফর্মের আইনি নির্দেশিকা ব্রাউজ করুন।"
                                : "A complete human-readable catalog of all marketplace destinations. Browse property rentals, hotel reservations, sports turf bookings, real estate purchases, and platform legal disclosures."}
                        </p>
                    </div>

                    {/* Quick Category Jump Pills */}
                    <div className="flex flex-wrap gap-2 pt-6">
                        {sections.map((sec) => (
                            <a
                                key={sec.id}
                                href={`#${sec.id}`}
                                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-card border border-border text-foreground hover:border-accent hover:text-accent hover:bg-surface-secondary shadow-2xs transition-all duration-200"
                            >
                                <span className="font-mono text-accent font-bold">{sec.number}</span>
                                <span>{sec.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* 2. CATEGORY SECTIONS GRID                                      */}
            {/* ============================================================== */}
            <div className="container mx-auto px-4 py-12 lg:py-16 space-y-16">
                {sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-28 space-y-6">
                        {/* Section Title Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xl sm:text-2xl font-mono font-bold text-accent">
                                    {section.number}
                                </span>
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                    {section.title}
                                </h2>
                            </div>
                            <Link
                                href={section.href}
                                className="cursor-pointer inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover transition-colors group"
                            >
                                <span>
                                    {isBn
                                        ? `${section.title}-এর সকল তালিকা দেখুন`
                                        : `Browse all in ${section.title}`}
                                </span>
                                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>

                        {/* Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.items.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className="cursor-pointer group flex flex-col justify-between p-4.5 rounded-2xl border border-border bg-white dark:bg-card hover:border-accent/60 hover:bg-surface-secondary/50 hover:shadow-md transition-all duration-200"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                                {item.name}
                                            </h3>
                                            {item.badge && (
                                                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 uppercase tracking-wide">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-1.5 text-xs text-text-secondary leading-relaxed line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                                        <span className="font-mono text-[11px] text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-50">
                                            {item.href}
                                        </span>
                                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default SitemapView;
