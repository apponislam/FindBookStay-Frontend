"use client";

import React from "react";
import Link from "next/link";
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

interface CategoryCard {
    title: string;
    subtitle: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    count: string;
}

const FEATURED_CATEGORIES: CategoryCard[] = [
    {
        title: "Family Apartments",
        subtitle: "2 to 4-bedroom verified rental flats",
        href: "/rent/family-apartments",
        icon: Home,
        badge: "Verified",
        count: "2,400+ listings",
    },
    {
        title: "Bachelor Seats",
        subtitle: "Single & shared seats with utilities",
        href: "/rent/bachelor-seats",
        icon: BedDouble,
        badge: "Popular",
        count: "1,850+ seats",
    },
    {
        title: "Hotels & Stays",
        subtitle: "Handpicked 5-star & boutique hotels",
        href: "/book/hotels",
        icon: Hotel,
        badge: "Best Rate",
        count: "950+ hotels",
    },
    {
        title: "Nature Resorts",
        subtitle: "Lakeside, beach & mountain retreats",
        href: "/book/resorts",
        icon: Palmtree,
        badge: "Trending",
        count: "320+ resorts",
    },
    {
        title: "Turf Booking",
        subtitle: "Floodlit soccer & cricket turfs",
        href: "/sports/turf-booking",
        icon: Trophy,
        badge: "Instant Slot",
        count: "180+ turfs",
    },
    {
        title: "Indoor Sports",
        subtitle: "Badminton, basketball & futsal arenas",
        href: "/sports/indoor-sports",
        icon: Dumbbell,
        count: "140+ arenas",
    },
    {
        title: "Residential Properties",
        subtitle: "Flats & duplexes in prime areas",
        href: "/buy/residential",
        icon: Building2,
        badge: "Clean Title",
        count: "890+ for sale",
    },
    {
        title: "Land & Plots",
        subtitle: "100% vetted residential & farmland",
        href: "/buy/land",
        icon: Warehouse,
        count: "410+ plots",
    },
];

export const CategoryGrid = () => {
    return (
        <section className="py-14 bg-surface/50 border-y border-border">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                            <span className="w-3.5 h-0.5 bg-accent" />
                            <span className="text-[11px] font-bold tracking-widest text-primary uppercase font-mono">
                                EXPLORE SERVICES
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            Browse by Category
                        </h2>
                        <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
                            Find verified living spaces, vacation stays, sports grounds, and prime real estate across the country.
                        </p>
                    </div>

                    <Link
                        href="/explore"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary-hover transition-colors group cursor-pointer"
                    >
                        <span>View All Categories</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {FEATURED_CATEGORIES.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <Link
                                key={idx}
                                href={cat.href}
                                className="group relative p-5 rounded-2xl bg-white border border-border hover:border-accent hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="size-11 rounded-2xl bg-surface-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200">
                                            <Icon className="size-5" />
                                        </div>
                                        {cat.badge && (
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent uppercase tracking-wider">
                                                {cat.badge}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                            {cat.title}
                                        </h3>
                                        <p className="text-xs text-text-secondary leading-normal mt-0.5">
                                            {cat.subtitle}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-3 border-t border-border/60 text-xs text-text-secondary font-medium">
                                    <span>{cat.count}</span>
                                    <span className="text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                        Explore <ArrowRight className="size-3" />
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
