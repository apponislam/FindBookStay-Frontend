"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ShieldCheck, ArrowRight } from "@/components/Icons";
import { BUY_PROPERTIES } from "../buyData";

interface SimilarPropertiesProps {
    currentId: string;
    category: string;
}

export const SimilarProperties = ({ currentId, category }: SimilarPropertiesProps) => {
    // Find 3 properties excluding current, prioritizing same category
    const similar = BUY_PROPERTIES.filter((p) => p.id !== currentId)
        .sort((a) => (a.category === category ? -1 : 1))
        .slice(0, 3);

    if (similar.length === 0) return null;

    return (
        <div className="space-y-6 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                    <span className="text-[11px] font-bold tracking-widest text-primary uppercase font-mono">
                        EXPLORE SIMILAR SPACES
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                        Similar Verified Properties for Sale
                    </h3>
                </div>

                <Link
                    href="/buy"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer"
                >
                    <span>View all properties</span>
                    <ArrowRight className="size-3.5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((prop) => (
                    <Link
                        key={prop.id}
                        href={`/buy/${prop.slug}`}
                        className="group rounded-3xl border border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                        <div>
                            {/* Image Header */}
                            <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
                                <Image
                                    src={prop.images[0]}
                                    alt={prop.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white/95 dark:bg-card/95 text-foreground backdrop-blur-md shadow-xs flex items-center gap-1">
                                        <ShieldCheck className="size-3 text-accent" />
                                        <span>{prop.badge || "Verified"}</span>
                                    </span>
                                </div>

                                <div className="absolute bottom-3 left-3 text-white">
                                    <span className="text-base font-extrabold drop-shadow-md">
                                        {prop.priceFormatted}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 space-y-2">
                                <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[9.5px] font-bold uppercase tracking-wider">
                                    {prop.categoryLabel}
                                </span>
                                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {prop.title}
                                </h4>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="size-3 text-primary shrink-0" />
                                    <span className="truncate">{prop.location.area}</span>
                                </div>
                            </div>
                        </div>

                        {/* Specs Strip */}
                        <div className="p-4 pt-0">
                            <div className="flex items-center justify-between pt-3 border-t border-border/70 text-xs font-semibold text-foreground">
                                {prop.beds > 0 && <span>{prop.beds} Beds</span>}
                                {prop.baths > 0 && <span>{prop.baths} Baths</span>}
                                {prop.sqft > 0 && <span>{prop.sqft.toLocaleString()} sqft</span>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarProperties;
