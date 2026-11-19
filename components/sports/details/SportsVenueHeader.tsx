"use client";

import React from "react";
import Link from "next/link";
import { Activity, Calendar, ChevronRight, Clock, Dumbbell, Layers, MapPin, ShieldCheck, Star, Users } from "@/components/Icons";
import { SportsVenue } from "../types";

interface SportsVenueHeaderProps {
    venue: SportsVenue;
}

export const SportsVenueHeader = ({ venue }: SportsVenueHeaderProps) => {
    return (
        <header className="space-y-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <Link href="/sports" className="hover:text-primary transition-colors">
                    Sports Turfs
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <Link href={`/sports?category=${venue.category}`} className="hover:text-primary transition-colors capitalize">
                    {venue.categoryLabel}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <span className="text-foreground font-medium line-clamp-1 max-w-[200px] sm:max-w-[320px]">{venue.name}</span>
            </nav>

            {/* Main Title & Address */}
            <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/60">{venue.categoryLabel}</span>
                    {venue.verified && (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-accent text-xs font-semibold flex items-center gap-1 border border-primary/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Verified Sports Arena
                        </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-surface-secondary text-muted-foreground text-xs font-medium border border-border">ID: {venue.id.toUpperCase()}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">{venue.name}</h1>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-medium text-foreground">{venue.location.address}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{venue.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground font-normal">({venue.reviewsCount} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metric Feature Pills Grid (3 Columns, Overflow-Safe) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Sports Supported</div>
                        <div className="text-sm font-bold text-foreground leading-snug break-words">{venue.sports.join(", ")}</div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Surface Quality</div>
                        <div className="text-sm font-bold text-foreground leading-snug break-words">{venue.surfaceType}</div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Team Capacity</div>
                        <div className="text-sm font-bold text-foreground leading-snug break-words">{venue.capacity}</div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Next Available</div>
                        <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-snug break-words">{venue.nextSlot}</div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Operating Hours</div>
                        <div className="text-sm font-bold text-foreground leading-snug break-words">{venue.operatingHours || "06:00 AM – 02:00 AM"}</div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center gap-3 min-w-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Dumbbell className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Arena Dimensions</div>
                        <div className="text-sm font-bold text-foreground leading-snug break-words">{venue.pitchDimensions || "Regulation Size"}</div>
                    </div>
                </div>
            </div>
        </header>
    );
};
