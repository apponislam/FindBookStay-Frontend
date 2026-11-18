"use client";

import React from "react";
import {
    ShieldCheck,
    CheckCircle2,
    Lock,
    Headphones,
    Users,
    Building,
    Star,
    Award,
} from "@/components/Icons";

export const WhyChooseUs = () => {
    const pillars = [
        {
            icon: ShieldCheck,
            title: "100% Verified Listings",
            description:
                "Every apartment, hotel, and sports arena undergoes physical on-site checks. No duplicate photos, no broker scams, no fake prices.",
            highlight: "Zero Scams Guaranteed",
        },
        {
            icon: Lock,
            title: "Direct & Transparent Deals",
            description:
                "Connect directly with verified landlords and property managers. All rent agreements and deposit terms are crystal clear upfront.",
            highlight: "Transparent Agreements",
        },
        {
            icon: Headphones,
            title: "24/7 Dedicated Support",
            description:
                "Our dedicated dispute resolution and concierge support team is always available to ensure smooth check-ins and stress-free stays.",
            highlight: "Concierge Assistance",
        },
    ];

    const stats = [
        { value: "15,000+", label: "Verified Spaces", icon: Building },
        { value: "99.4%", label: "Accuracy Rate", icon: Award },
        { value: "50+ Cities", label: "Nationwide Reach", icon: Users },
        { value: "4.9 / 5", label: "Average Review", icon: Star },
    ];

    return (
        <section className="py-20 bg-surface/60 border-t border-border">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold font-mono uppercase tracking-widest">
                        <span>TRUST & VERIFICATION</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                        Why Choose FindBookStay?
                    </h2>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        We are building the standard of trust for renting homes, booking vacation stays, reserving sports venues, and purchasing prime real estate.
                    </p>
                </div>

                {/* 3 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
                    {pillars.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <div
                                key={idx}
                                className="p-6 sm:p-8 rounded-3xl bg-white border border-border hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
                            >
                                <div className="space-y-4">
                                    <div className="size-14 rounded-2xl bg-surface-secondary text-primary flex items-center justify-center">
                                        <Icon className="size-7" />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-border flex items-center gap-2 text-xs font-bold text-accent">
                                    <CheckCircle2 className="size-4" />
                                    <span>{pillar.highlight}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Stats Bar */}
                <div className="p-6 sm:p-8 rounded-3xl bg-primary text-primary-foreground shadow-xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/15">
                        {stats.map((stat, i) => (
                            <div key={i} className="pt-4 lg:pt-0 first:pt-0 space-y-1">
                                <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-emerald-200/80 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
