"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Heart, Camera, CheckCircle2, Eye } from "@/components/Icons";

export interface LivePreviewData {
    pillar: "rent" | "book" | "sports" | "buy";
    title: string;
    category: string;
    division: string;
    area: string;
    price: number | string;
    priceUnit?: string;
    coverImage?: string;
    specs: { label: string; value: string | number }[];
    amenitiesCount?: number;
}

interface PublishLiveCardProps {
    data: LivePreviewData;
    completenessScore?: number;
}

export const PublishLiveCard = ({ data, completenessScore = 75 }: PublishLiveCardProps) => {
    // Robust price formatter that never produces NaN
    const displayPrice = () => {
        if (typeof data.price === "number") {
            return `৳${data.price.toLocaleString("en-BD")}`;
        }
        if (typeof data.price === "string") {
            const trimmed = data.price.trim();
            if (trimmed.startsWith("৳")) return trimmed;
            const parsed = parseFloat(trimmed.replace(/,/g, ""));
            if (!isNaN(parsed) && !trimmed.toLowerCase().includes("crore") && !trimmed.toLowerCase().includes("lakh")) {
                return `৳${parsed.toLocaleString("en-BD")}`;
            }
            return `৳${trimmed}`;
        }
        return "৳0";
    };

    const badgeTheme = {
        rent: "bg-emerald-600 text-white dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
        book: "bg-teal-600 text-white dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/30",
        sports: "bg-amber-600 text-white dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30",
        buy: "bg-emerald-700 text-white dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
    };

    return (
        <div className="space-y-4 sticky top-24">
            {/* Header info pill */}
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground px-1">
                <div className="inline-flex items-center gap-1.5 text-foreground">
                    <Eye className="size-4 text-accent" />
                    <span>Search Feed Preview</span>
                </div>
            </div>

            {/* Simulated FindBookStay Feed Listing Card */}
            <div className="group rounded-3xl border border-border bg-white dark:bg-card overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                {/* Media frame */}
                <div className="relative aspect-16/10 w-full bg-surface-secondary dark:bg-surface overflow-hidden">
                    {data.coverImage ? (
                        <Image src={data.coverImage} alt={data.title || "Listing preview"} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 400px" priority />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2 p-6 text-center">
                            <Camera className="size-8 text-muted-foreground/40" />
                            <p className="text-xs font-semibold">Upload photos to preview image</p>
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-black/30" />

                    {/* Top tags */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm border border-transparent ${badgeTheme[data.pillar]}`}>{data.category || data.pillar.toUpperCase()}</span>

                        <div className="size-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 shadow-xs">
                            <Heart className="size-4" />
                        </div>
                    </div>

                    {/* Bottom overlay: Location badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold drop-shadow-md">
                        <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="size-3.5 text-accent shrink-0" />
                            <span className="truncate">{data.area && data.division ? `${data.area}, ${data.division}` : data.area || data.division || "Location not set"}</span>
                        </div>
                    </div>
                </div>

                {/* Content info */}
                <div className="p-5 space-y-4">
                    {/* Title */}
                    <div>
                        <h3 className="text-base sm:text-lg font-black text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{data.title || "Your Listing Title Appears Here..."}</h3>
                    </div>

                    {/* Specifications Chips */}
                    {data.specs && data.specs.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            {data.specs.map((spec, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-secondary dark:bg-surface text-foreground border border-border">
                                    <strong className="font-black">{spec.value}</strong> {spec.label}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* Pricing */}
                    <div className="flex items-end justify-between gap-2">
                        <div>
                            <span className="text-[11px] font-bold text-muted-foreground block">Price</span>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl sm:text-2xl font-black text-primary">{displayPrice()}</span>
                                {data.priceUnit && <span className="text-xs font-bold text-muted-foreground">{data.priceUnit}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quality Strength Box */}
            <div className="p-4 rounded-2xl border border-border bg-white dark:bg-card space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-accent" />
                        Listing Quality Score
                    </span>
                    <span className="font-black text-accent">{completenessScore}%</span>
                </div>
                <div className="w-full bg-surface-secondary dark:bg-surface rounded-full h-2 overflow-hidden border border-border">
                    <div className="bg-accent h-2 rounded-full transition-all duration-300" style={{ width: `${completenessScore}%` }} />
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Complete all 5 steps to reach 100% and unlock priority placement in FindBookStay search feeds.</p>
            </div>
        </div>
    );
};

export default PublishLiveCard;
