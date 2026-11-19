"use client";

import React from "react";
import Link from "next/link";
import { Bath, Bed, Building2, Calendar, ChevronRight, MapPin, Maximize2, ShieldCheck, Star } from "@/components/Icons";
import { RentProperty } from "../types";

interface RentPropertyHeaderProps {
    property: RentProperty;
}

export const RentPropertyHeader = ({ property }: RentPropertyHeaderProps) => {
    return (
        <header className="space-y-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <Link href="/rent" className="hover:text-primary transition-colors">
                    Rent
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <Link href={`/rent?category=${property.category}`} className="hover:text-primary transition-colors capitalize">
                    {property.categoryLabel}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <span className="text-foreground font-medium line-clamp-1 max-w-[200px] sm:max-w-[320px]">{property.title}</span>
            </nav>

            {/* Main Header Info */}
            <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/60">{property.categoryLabel}</span>
                    {property.verified && (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-accent text-xs font-semibold flex items-center gap-1 border border-primary/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Physically Verified
                        </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-surface-secondary text-muted-foreground text-xs font-medium border border-border">ID: {property.id.toUpperCase()}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">{property.title}</h1>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-medium text-foreground">{property.location.address}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{property.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground font-normal">({property.reviewsCount} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metric Feature Pills Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-surface border border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Bed className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Bedrooms</div>
                        <div className="text-sm font-bold text-foreground">
                            {property.beds} {property.beds === 1 ? "Bed" : "Beds"}
                        </div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface border border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Bath className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Bathrooms</div>
                        <div className="text-sm font-bold text-foreground">
                            {property.baths} {property.baths === 1 ? "Bath" : "Baths"}
                        </div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface border border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Maximize2 className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Area Size</div>
                        <div className="text-sm font-bold text-foreground">{property.sqft.toLocaleString()} sqft</div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface border border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Furnishing</div>
                        <div className="text-sm font-bold text-foreground truncate">{property.furnishing}</div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface border border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Floor Level</div>
                        <div className="text-sm font-bold text-foreground truncate">{property.floor || "4th Floor"}</div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface border border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Available</div>
                        <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 truncate">{property.availableFrom}</div>
                    </div>
                </div>
            </div>
        </header>
    );
};
