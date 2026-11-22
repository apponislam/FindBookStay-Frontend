"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
    MapPin,
    Bed,
    Bath,
    Maximize2,
    ShieldCheck,
    ArrowRight,
} from "@/components/Icons";
import { useLocale } from "@/hooks/useLocale";
import { formatLocaleNumber } from "@/lib/utils";

interface RentalItem {
    id: string;
    title: string;
    type: string;
    location: string;
    price: string;
    pricePeriod: string;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
    badge: string;
    verified: boolean;
    href: string;
}

const FEATURED_RENTALS: RentalItem[] = [
    {
        id: "1",
        title: "Modern 3BHK Family Flat in Prime Area",
        type: "Family Apartment",
        location: "Block D, Bashundhara R/A, Dhaka",
        price: "৳32,000",
        pricePeriod: "/ month",
        beds: 3,
        baths: 3,
        sqft: 1650,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        badge: "Family Flat",
        verified: true,
        href: "/rent/family-apartments",
    },
    {
        id: "2",
        title: "Executive Single Bachelor Seat with Food & WiFi",
        type: "Bachelor Seat",
        location: "Mirpur 10, Near Metro, Dhaka",
        price: "৳6,500",
        pricePeriod: "/ month",
        beds: 1,
        baths: 1,
        sqft: 280,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        badge: "Utilities Included",
        verified: true,
        href: "/rent/bachelor-seats",
    },
    {
        id: "3",
        title: "Fully Furnished Lakeview Duplex House",
        type: "Family House",
        location: "Sector 11, Uttara, Dhaka",
        price: "৳75,000",
        pricePeriod: "/ month",
        beds: 4,
        baths: 4,
        sqft: 2900,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        badge: "Furnished",
        verified: true,
        href: "/rent/family-houses",
    },
    {
        id: "4",
        title: "Cozy 2-Bedroom Sublet with Dedicated Balcony",
        type: "Monthly Sublet",
        location: "Dhanmondi 9/A, Dhaka",
        price: "৳24,000",
        pricePeriod: "/ month",
        beds: 2,
        baths: 2,
        sqft: 1100,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        badge: "Flexible Lease",
        verified: true,
        href: "/rent/sublets",
    },
];

export const FeaturedRentals = () => {
    const t = useTranslations("Home.featuredRentals");
    const { locale } = useLocale();
    const isBn = locale === "bn";

    return (
        <section className="py-16 bg-background">
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
                        href="/rent"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary-hover transition-colors group cursor-pointer"
                    >
                        <span>{t("viewAll")}</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Rental Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURED_RENTALS.map((rental) => {
                        const title = t.has(`items.${rental.id}.title`) ? t(`items.${rental.id}.title`) : rental.title;
                        const type = t.has(`items.${rental.id}.type`) ? t(`items.${rental.id}.type`) : rental.type;
                        const location = t.has(`items.${rental.id}.location`) ? t(`items.${rental.id}.location`) : rental.location;
                        const price = t.has(`items.${rental.id}.price`) ? t(`items.${rental.id}.price`) : rental.price;
                        const badge = t.has(`items.${rental.id}.badge`) ? t(`items.${rental.id}.badge`) : rental.badge;

                        return (
                            <div
                                key={rental.id}
                                className="group bg-white dark:bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
                            >
                                {/* Image Header with Badges */}
                                <div className="relative w-full h-48 overflow-hidden bg-surface-secondary">
                                    <Image
                                        src={rental.image}
                                        alt={title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60" />

                                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 dark:bg-card/90 backdrop-blur-md text-foreground shadow-xs">
                                            {badge}
                                        </span>
                                        {rental.verified && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-xs">
                                                <ShieldCheck className="size-3" />
                                                <span>{t("verified")}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-1.5">
                                        <div className="text-[11px] font-bold text-accent uppercase tracking-wider">
                                            {type}
                                        </div>
                                        <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                            {title}
                                        </h3>
                                        <p className="text-xs text-text-secondary flex items-center gap-1 line-clamp-1">
                                            <MapPin className="size-3.5 text-text-secondary/70 shrink-0" />
                                            <span>{location}</span>
                                        </p>
                                    </div>

                                    {/* Amenities stats */}
                                    <div className="flex items-center justify-between py-2.5 border-y border-border/70 text-xs text-text-secondary font-medium">
                                        <span className="flex items-center gap-1">
                                            <Bed className="size-3.5" />
                                            <span>{formatLocaleNumber(rental.beds, isBn)} {rental.beds === 1 ? t("bed") : t("beds")}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Bath className="size-3.5" />
                                            <span>{formatLocaleNumber(rental.baths, isBn)} {rental.baths === 1 ? t("bath") : t("baths")}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Maximize2 className="size-3.5" />
                                            <span>{formatLocaleNumber(rental.sqft, isBn)} {t("sqft")}</span>
                                        </span>
                                    </div>

                                    {/* Price and Action */}
                                    <div className="flex items-center justify-between pt-1">
                                        <div>
                                            <span className="text-base sm:text-lg font-extrabold text-foreground">
                                                {price}
                                            </span>
                                            <span className="text-xs text-text-secondary ml-1 font-medium">
                                                {t("month")}
                                            </span>
                                        </div>

                                        <Link
                                            href={rental.href}
                                            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover px-3 py-1.5 rounded-xl bg-surface-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all cursor-pointer"
                                        >
                                            <span>{t("details")}</span>
                                            <ArrowRight className="size-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedRentals;
