"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
    Home,
    Building2,
    BedDouble,
    Hotel,
    Palmtree,
    Trophy,
    Dumbbell,
    Warehouse,
    ArrowRight,
} from "@/components/Icons";

interface CategoryMeta {
    id: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badgeKey?: "verified" | "popular" | "bestRate" | "trending" | "instantSlot" | "allSeason" | "cleanTitle" | "vetted";
}

const CATEGORY_ITEMS: CategoryMeta[] = [
    {
        id: "familyApartments",
        href: "/rent/family-apartments",
        icon: Home,
        badgeKey: "verified",
    },
    {
        id: "bachelorSeats",
        href: "/rent/bachelor-seats",
        icon: BedDouble,
        badgeKey: "popular",
    },
    {
        id: "hotels",
        href: "/book/hotels",
        icon: Hotel,
        badgeKey: "bestRate",
    },
    {
        id: "resorts",
        href: "/book/resorts",
        icon: Palmtree,
        badgeKey: "trending",
    },
    {
        id: "turfs",
        href: "/sports/turf-booking",
        icon: Trophy,
        badgeKey: "instantSlot",
    },
    {
        id: "indoorSports",
        href: "/sports/indoor-sports",
        icon: Dumbbell,
        badgeKey: "allSeason",
    },
    {
        id: "residentialBuy",
        href: "/buy/residential",
        icon: Building2,
        badgeKey: "cleanTitle",
    },
    {
        id: "landPlots",
        href: "/buy/land",
        icon: Warehouse,
        badgeKey: "vetted",
    },
];

export const CategoryGrid = () => {
    const t = useTranslations("Home.categoryGrid");

    return (
        <section className="py-14 bg-background border-b border-border">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                            <span className="w-3.5 h-0.5 bg-accent" />
                            <span className="text-[11px] font-bold tracking-widest text-primary uppercase font-mono">
                                {t("eyebrow")}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            {t("title")}
                        </h2>
                        <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
                            {t("description")}
                        </p>
                    </div>

                    <Link
                        href="/explore"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary-hover transition-colors group cursor-pointer"
                    >
                        <span>{t("viewAll")}</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {CATEGORY_ITEMS.map((cat) => {
                        const Icon = cat.icon;
                        const title = t(`categories.${cat.id}`);
                        const subtitle = t(`categories.${cat.id}Sub`);
                        const count = t(`categories.${cat.id}Count`);
                        const badge = cat.badgeKey ? t(`badges.${cat.badgeKey}`) : null;

                        return (
                            <Link
                                key={cat.id}
                                href={cat.href}
                                className="group relative p-5 rounded-2xl bg-white dark:bg-card border border-border hover:border-accent hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="size-11 rounded-2xl bg-surface-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200">
                                            <Icon className="size-5" />
                                        </div>
                                        {badge && (
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent uppercase tracking-wider">
                                                {badge}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                            {title}
                                        </h3>
                                        <p className="text-xs text-text-secondary leading-normal mt-0.5">
                                            {subtitle}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-3 border-t border-border/60 text-xs text-text-secondary font-medium">
                                    <span>{count}</span>
                                    <span className="text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                        {t("explore")} <ArrowRight className="size-3" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
