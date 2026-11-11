"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, Mail, PhoneCall, MapPin, ArrowRight, Sparkles, Building2, Hotel, Trophy, Home, ShieldCheck, Send } from "@/components/Icons";
import siteData from "@/constants/siteData";

interface FAQItem {
    id: string;
    category: "rent" | "book" | "sports" | "buy" | "general";
    categoryLabel: string;
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
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
        id: "general-post-listing",
        category: "general",
        categoryLabel: "General & Account",
        question: "How can I post my property, stay, or sports turf?",
        answer: "Click the floating 'Post Listing' button in the bottom-right corner of any page. Select your category (Rent Homes & Seats, Book Stays & Resorts, Sports & Turfs, or Buy Real Estate) and complete the intuitive listing form with your photos and pricing.",
    },
    {
        id: "general-apps",
        category: "general",
        categoryLabel: "General & Account",
        question: "When will the FindBookStay mobile apps be available?",
        answer: "Our dedicated iOS and Android mobile apps are currently under active development. You can preview upcoming updates or submit suggestions on our dedicated Feedback page to help shape mobile features.",
    },
    {
        id: "general-broker-fees",
        category: "general",
        categoryLabel: "General & Account",
        question: "Does FindBookStay charge unauthorized broker markups?",
        answer: "No. FindBookStay is built on transparency. We connect seekers directly with genuine homeowners, flat managers, hoteliers, and turf operators without unauthorized middleman markups.",
    },
];

const CATEGORIES = [
    { id: "all", label: "All Questions", icon: Sparkles },
    { id: "rent", label: "Rent Homes & Seats", icon: Building2 },
    { id: "book", label: "Book Stays & Resorts", icon: Hotel },
    { id: "sports", label: "Sports & Turfs", icon: Trophy },
    { id: "buy", label: "Buy Real Estate", icon: Home },
    { id: "general", label: "Account & General", icon: ShieldCheck },
];

const HelpView = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [openAccordionId, setOpenAccordionId] = useState<string | null>("rent-contact");

    const filteredFaqs = useMemo(() => {
        return FAQS.filter((faq) => {
            const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
            const matchesSearch = searchQuery.trim() === "" || faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) || faq.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const toggleAccordion = (id: string) => {
        setOpenAccordionId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="w-full bg-white text-[#172B2A]">
            {/* ============================================================== */}
            {/* 1. HERO HEADER WITH LIVE SEARCH                                */}
            {/* ============================================================== */}
            <section className="relative w-full overflow-hidden border-b border-[#E2EAE6] bg-linear-to-b from-[#F0F5F3]/80 via-[#F8FAF9] to-white pt-14 pb-16 lg:pt-20 lg:pb-20">
                {/* Ambient glow */}
                <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-212.5 h-112.5 bg-linear-to-tr from-[#10B981]/15 via-[#34D399]/10 to-transparent blur-3xl opacity-70" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="w-full text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#10B981]/30 shadow-xs text-xs font-semibold text-[#073B35]">
                            <span className="size-2 rounded-full bg-[#10B981]" />
                            <span className="tracking-wide uppercase text-[11px] font-bold text-[#073B35]">Help & Support Center</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#073B35] tracking-tight leading-[1.15] max-w-4xl mx-auto">How can we help you today?</h1>

                        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">Find immediate answers to questions regarding rentals, hotel bookings, sports turfs, and property purchases, or reach our concierge directly.</p>

                        {/* Search Input Bar */}
                        <div className="w-full max-w-2xl mx-auto pt-2">
                            <div className="relative flex items-center">
                                <Search className="absolute left-4 size-5 text-[#64748B] pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search questions (e.g. bachelor seats, turf booking, direct contact)..."
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#E2EAE6] shadow-sm text-sm text-[#172B2A] placeholder:text-[#64748B] focus:outline-hidden focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/15 transition-all"
                                />
                                {searchQuery && (
                                    <button type="button" onClick={() => setSearchQuery("")} className="cursor-pointer absolute right-4 text-xs font-semibold text-[#64748B] hover:text-[#073B35] bg-[#F0F5F3] px-2 py-1 rounded-md">
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Popular Search Tags */}
                            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-[#64748B]">
                                <span className="font-semibold text-[#073B35]">Popular:</span>
                                {["Bachelor Seats", "Turf Booking", "Direct Contact", "Post Listing", "Mobile Apps"].map((tag) => (
                                    <button key={tag} type="button" onClick={() => setSearchQuery(tag)} className="cursor-pointer px-2.5 py-1 rounded-lg bg-white border border-[#E2EAE6] hover:border-[#10B981] hover:text-[#073B35] transition-colors">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 2. TOP 4 CONTACT & FEEDBACK CHANNELS (BENTO GRID FULL WIDTH)   */}
            {/* ============================================================== */}
            <section className="w-full py-12 lg:py-16 border-b border-[#E2EAE6] bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Channel 1: 24/7 Hotline */}
                        <div className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#E2EAE6] flex flex-col justify-between hover:border-[#10B981]/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-white border border-[#E2EAE6] flex items-center justify-center text-[#10B981]">
                                    <PhoneCall className="size-5" />
                                </div>
                                <h3 className="text-base font-bold text-[#073B35]">24/7 Direct Hotline</h3>
                                <p className="text-xs text-[#64748B] leading-relaxed">Speak directly with our customer concierge for urgent listing or reservation support.</p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-[#E2EAE6]">
                                <a href={`tel:${siteData.contacts.phoneClean}`} className="cursor-pointer text-xs font-bold text-[#073B35] hover:text-[#10B981] flex items-center gap-1.5 transition-colors">
                                    <span>{siteData.contacts.phoneDisplay}</span>
                                    <ArrowRight className="size-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Channel 2: Email Concierge */}
                        <div className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#E2EAE6] flex flex-col justify-between hover:border-[#10B981]/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-white border border-[#E2EAE6] flex items-center justify-center text-[#10B981]">
                                    <Mail className="size-5" />
                                </div>
                                <h3 className="text-base font-bold text-[#073B35]">Concierge Email</h3>
                                <p className="text-xs text-[#64748B] leading-relaxed">Send us your detailed inquiries, partner propositions, or account support tickets.</p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-[#E2EAE6]">
                                <a href={`mailto:${siteData.contacts.supportEmail}`} className="cursor-pointer text-xs font-bold text-[#073B35] hover:text-[#10B981] flex items-center gap-1.5 transition-colors">
                                    <span>{siteData.contacts.supportEmail}</span>
                                    <ArrowRight className="size-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Channel 3: Headquarters & Global Hubs */}
                        <div className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#E2EAE6] flex flex-col justify-between hover:border-[#10B981]/50 hover:shadow-xs transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-white border border-[#E2EAE6] flex items-center justify-center text-[#10B981]">
                                    <MapPin className="size-5" />
                                </div>
                                <h3 className="text-base font-bold text-[#073B35]">Headquarters</h3>
                                <p className="text-xs text-[#64748B] leading-relaxed">Stationed in Gulshan-2, Dhaka with regional hubs managing operations across global territories.</p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-[#E2EAE6]">
                                <span className="text-xs font-bold text-[#073B35] block truncate">{siteData.address.full}</span>
                            </div>
                        </div>

                        {/* Channel 4: Feedback & App Suggestions */}
                        <div className="p-6 rounded-2xl bg-linear-to-br from-[#073B35] to-[#0E5A51] text-white flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                            <div className="space-y-3">
                                <div className="size-11 rounded-xl bg-white/10 flex items-center justify-center text-[#34D399]">
                                    <Send className="size-5" />
                                </div>
                                <h3 className="text-base font-bold">Share App & Web Feedback</h3>
                                <p className="text-xs text-white/80 leading-relaxed">Have ideas for mobile app features or web updates? Tell our product team directly.</p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-white/20">
                                <Link href="/feedback" className="cursor-pointer text-xs font-bold text-[#34D399] hover:text-white flex items-center gap-1.5 transition-colors group">
                                    <span>Open Feedback Portal</span>
                                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 3. INTERACTIVE FAQ ACCORDION (FULL WIDTH)                      */}
            {/* ============================================================== */}
            <section className="w-full py-16 lg:py-24 bg-[#F8FAF9]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="w-full mb-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] block mb-2">Frequently Asked Questions</span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#073B35] tracking-tight">Explore by Category</h2>
                        <p className="mt-2 text-sm sm:text-base text-[#64748B] max-w-2xl">Select a category or search above to find detailed guidance on managing listings and reservations.</p>
                    </div>

                    {/* Category Tabs Bar */}
                    <div className="w-full flex flex-wrap gap-2 mb-8">
                        {CATEGORIES.map((cat) => {
                            const CatIcon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                                        isActive ? "bg-[#073B35] text-white shadow-xs" : "bg-white border border-[#E2EAE6] text-[#64748B] hover:text-[#073B35] hover:border-[#10B981]/50"
                                    }`}
                                >
                                    <CatIcon className={`size-4 ${isActive ? "text-[#34D399]" : "text-[#10B981]"}`} />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Accordion List */}
                    <div className="w-full space-y-3">
                        {filteredFaqs.length === 0 ? (
                            <div className="p-12 text-center bg-white rounded-2xl border border-[#E2EAE6] space-y-3">
                                <p className="text-base font-bold text-[#073B35]">No questions found matching &ldquo;{searchQuery}&rdquo;</p>
                                <p className="text-xs text-[#64748B]">Try searching with different terms or select &ldquo;All Questions&rdquo;.</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("all");
                                    }}
                                    className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#073B35] text-white text-xs font-semibold mt-2"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            filteredFaqs.map((faq) => {
                                const isOpen = openAccordionId === faq.id;
                                return (
                                    <div key={faq.id} className={`w-full rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? "bg-white border-[#10B981] shadow-xs" : "bg-white border-[#E2EAE6] hover:border-[#10B981]/50"}`}>
                                        <button type="button" onClick={() => toggleAccordion(faq.id)} className="cursor-pointer w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors" aria-expanded={isOpen}>
                                            <div className="flex items-center gap-3 pr-4">
                                                <span className="text-[11px] font-bold text-[#10B981] bg-[#F0F5F3] px-2.5 py-1 rounded-md shrink-0 uppercase tracking-wider">{faq.categoryLabel}</span>
                                                <span className="text-sm sm:text-base font-bold text-[#073B35]">{faq.question}</span>
                                            </div>
                                            <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 bg-[#F0F5F3] text-[#073B35]" : "text-[#64748B]"}`}>
                                                <ChevronDown className="size-4" />
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[#E2EAE6]/60">
                                                <p className="pt-3 text-xs sm:text-sm text-[#64748B] leading-relaxed">{faq.answer}</p>
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
            <section className="w-full py-16 bg-white border-t border-[#E2EAE6]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-full rounded-3xl bg-linear-to-br from-[#073B35] via-[#0A4740] to-[#0E5A51] p-8 sm:p-12 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 max-w-xl">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#34D399]">Dedicated Concierge</span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Still have questions or need personalized guidance?</h2>
                            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">Our support staff is stationed around the clock to assist with owner registrations, reservation inquiries, and venue details.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <a
                                href={`mailto:${siteData.contacts.supportEmail}`}
                                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all"
                            >
                                <Mail className="size-4" />
                                <span>Email Support</span>
                            </a>

                            <Link href="/feedback" className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all">
                                <Send className="size-4" />
                                <span>Submit Feedback</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelpView;
