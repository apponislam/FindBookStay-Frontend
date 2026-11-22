"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
    const t = useTranslations("Home.whyChooseUs");

    const pillars = [
        {
            icon: ShieldCheck,
            title: t("pillar1Title"),
            description: t("pillar1Desc"),
            highlight: t("pillar1Highlight"),
        },
        {
            icon: Lock,
            title: t("pillar2Title"),
            description: t("pillar2Desc"),
            highlight: t("pillar2Highlight"),
        },
        {
            icon: Headphones,
            title: t("pillar3Title"),
            description: t("pillar3Desc"),
            highlight: t("pillar3Highlight"),
        },
    ];

    const stats = [
        { value: t("stats.stat1Value"), label: t("stats.stat1Label"), icon: Building },
        { value: t("stats.stat2Value"), label: t("stats.stat2Label"), icon: Award },
        { value: t("stats.stat3Value"), label: t("stats.stat3Label"), icon: Users },
        { value: t("stats.stat4Value"), label: t("stats.stat4Label"), icon: Star },
    ];

    return (
        <section className="py-20 bg-background border-t border-border">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold font-mono uppercase tracking-widest">
                        <span>{t("eyebrow")}</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                        {t("title")}
                    </h2>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {t("description")}
                    </p>
                </div>

                {/* 3 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
                    {pillars.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <div
                                key={idx}
                                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
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
                <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-emerald-950 via-emerald-900 to-[#062F2B] dark:from-[#0B1A17] dark:via-[#112822] dark:to-[#0B1A17] text-white shadow-xl border border-emerald-800/40">
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
