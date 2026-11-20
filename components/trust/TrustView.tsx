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

const VERIFICATION_PILLARS = [
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

const AUDIT_STEPS = [
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

export const TrustView = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* 1. Hero Section */}
            <section className="relative overflow-hidden py-16 sm:py-24 border-b border-border bg-surface-secondary/40">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="size-4" />
                            <span>FindBookStay Trust Framework</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                            Our Verification Guarantee: Zero Scams, 100% Authenticity.
                        </h1>

                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                            Whether renting a bachelor seat in Dhaka, booking a weekend resort in Sreemangal, reserving a night turf in Chittagong, or buying a luxury flat in Gulshan, FindBookStay protects you at every step.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link
                                href="/help"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                            >
                                <span>Browse Help & FAQs</span>
                                <ArrowRight className="size-4" />
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-card border border-border hover:bg-surface-secondary text-foreground text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                            >
                                <span>Report a Listing</span>
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
                                4-PILLAR FRAMEWORK
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            How We Verify Each Category
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Different spaces have different safety and verification requirements. Here is our rigorous vetting breakdown:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {VERIFICATION_PILLARS.map((pillar) => {
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
                            RIGOROUS AUDITING
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            The FindBookStay Verification Protocol
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Every space listed on our platform undergoes a four-tier screening sequence before receiving verified credentials.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {AUDIT_STEPS.map((step, idx) => (
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
                                <span>Zero Fraud Commitment</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                Found a Discrepancy? We Guarantee 100% Resolution.
                            </h2>
                            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                                If an on-site property or sports venue doesn&apos;t match its verified description or photos, our concierge support team steps in immediately to rebook you or issue a swift refund.
                            </p>
                        </div>

                        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/contact"
                                className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer"
                            >
                                Contact Dispute Team
                            </Link>
                            <Link
                                href="/help"
                                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all text-center cursor-pointer"
                            >
                                Read Policy FAQs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrustView;
