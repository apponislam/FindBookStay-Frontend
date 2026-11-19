"use client";

import React from "react";
import Link from "next/link";
import { Bath, Bed, BedDouble, ChevronRight, Clock, MapPin, ShieldCheck, Star, Users } from "@/components/Icons";
import { BookStay } from "../types";

interface BookStayHeaderProps {
    stay: BookStay;
}

export const BookStayHeader = ({ stay }: BookStayHeaderProps) => {
    return (
        <header className="space-y-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <Link href="/book" className="hover:text-primary transition-colors">
                    Book Stay
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <Link href={`/book?category=${stay.category}`} className="hover:text-primary transition-colors capitalize">
                    {stay.categoryLabel}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <span className="text-foreground font-medium line-clamp-1 max-w-[200px] sm:max-w-[320px]">{stay.title}</span>
            </nav>

            {/* Main Title & Address */}
            <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/60">{stay.categoryLabel}</span>
                    {stay.verified && (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-accent text-xs font-semibold flex items-center gap-1 border border-primary/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Verified Hospitality
                        </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-surface-secondary text-muted-foreground text-xs font-medium border border-border">ID: {stay.id.toUpperCase()}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">{stay.title}</h1>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-medium text-foreground">{stay.location.address}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{stay.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground font-normal">({stay.reviewsCount} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metric Feature Pills Grid (3 Columns, Overflow-Safe) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Max Guests</div>
                        <div className="text-sm font-bold text-foreground leading-snug">Up to {stay.maxGuests} Guests</div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <BedDouble className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Bedrooms</div>
                        <div className="text-sm font-bold text-foreground leading-snug">
                            {stay.bedrooms} {stay.bedrooms === 1 ? "Room" : "Rooms"}
                        </div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Bed className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Beds Total</div>
                        <div className="text-sm font-bold text-foreground leading-snug">
                            {stay.beds} {stay.beds === 1 ? "Bed" : "Beds"}
                        </div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Bath className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Bathrooms</div>
                        <div className="text-sm font-bold text-foreground leading-snug">
                            {stay.baths} {stay.baths === 1 ? "Bath" : "Baths"}
                        </div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Check-In Time</div>
                        <div className="text-sm font-bold text-foreground leading-snug wrap-break-word">{stay.checkInTime || "From 02:00 PM"}</div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Check-Out Time</div>
                        <div className="text-sm font-bold text-foreground leading-snug wrap-break-word">{stay.checkOutTime || "By 11:30 AM"}</div>
                    </div>
                </div>
            </div>
        </header>
    );
};
