"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Heart,
    ArrowRight,
    ArrowLeft,
    MapPin,
    ShieldCheck,
    X,
} from "@/components/Icons";
import { INITIAL_SAVED_LISTINGS, SavedListingItem } from "@/constants/savedData";

type SavedFilter = "all" | "rent" | "book" | "sports" | "buy";

export const SavedView = () => {
    const [savedItems, setSavedItems] = useState<SavedListingItem[]>(INITIAL_SAVED_LISTINGS);
    const [activeFilter, setActiveFilter] = useState<SavedFilter>("all");

    const handleRemove = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSavedItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleClearAll = () => {
        setSavedItems([]);
    };

    const filteredItems = savedItems.filter((item) => {
        if (activeFilter === "all") return true;
        return item.category === activeFilter;
    });

    return (
        <div className="min-h-screen bg-background text-foreground py-10 sm:py-14">
            <div className="container mx-auto px-4">
                {/* 1. Header & Navigation */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors mb-3 group cursor-pointer"
                    >
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2.5">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                                    Saved Listings
                                </h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-primary/15 text-primary">
                                    {savedItems.length} items
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Your bookmarked rental apartments, vacation resorts, and floodlit sports arenas.
                            </p>
                        </div>

                        {savedItems.length > 0 && (
                            <button
                                type="button"
                                onClick={handleClearAll}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-bold transition-colors self-start sm:self-auto cursor-pointer"
                            >
                                <X className="size-3.5" />
                                <span>Clear all saved</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* 2. Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                    {[
                        { id: "all", label: `All Saved (${savedItems.length})` },
                        {
                            id: "rent",
                            label: `Rentals (${savedItems.filter((i) => i.category === "rent").length})`,
                        },
                        {
                            id: "book",
                            label: `Hotels & Resorts (${savedItems.filter((i) => i.category === "book").length})`,
                        },
                        {
                            id: "sports",
                            label: `Sports Turfs (${savedItems.filter((i) => i.category === "sports").length})`,
                        },
                        {
                            id: "buy",
                            label: `Buy Real Estate (${savedItems.filter((i) => i.category === "buy").length})`,
                        },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveFilter(tab.id as SavedFilter)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                activeFilter === tab.id
                                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                    : "bg-white dark:bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 3. Saved Listings Grid */}
                {filteredItems.length === 0 ? (
                    <div className="p-12 sm:p-16 rounded-3xl border border-border bg-white dark:bg-card text-center space-y-3 max-w-2xl mx-auto">
                        <div className="size-14 rounded-2xl bg-surface-secondary text-muted-foreground flex items-center justify-center mx-auto">
                            <Heart className="size-7" />
                        </div>
                        <h3 className="text-base font-bold text-foreground">
                            {activeFilter === "all"
                                ? "No saved listings yet"
                                : "No listings saved in this category"}
                        </h3>
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                            Browse verified family flats, vacation resorts, and sports turfs and click the heart icon on any card to save it for quick access.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:bg-primary-hover transition-colors cursor-pointer"
                            >
                                <span>Browse Marketplace</span>
                                <ArrowRight className="size-3.5" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="group rounded-3xl border border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Listing Image */}
                                    <div className="relative h-52 sm:h-56 w-full bg-surface-secondary overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                                        {/* Top Badges */}
                                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/95 dark:bg-card/95 text-foreground backdrop-blur-md shadow-xs flex items-center gap-1">
                                                <ShieldCheck className="size-3 text-accent" />
                                                <span>{item.badge}</span>
                                            </span>
                                        </div>

                                        {/* Remove Heart Button */}
                                        <button
                                            type="button"
                                            onClick={(e) => handleRemove(item.id, e)}
                                            className="absolute top-3 right-3 size-8 rounded-full bg-black/50 hover:bg-destructive hover:scale-110 active:scale-95 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md"
                                            title="Remove from saved"
                                        >
                                            <Heart className="size-4 fill-accent text-accent hover:fill-white hover:text-white transition-colors" />
                                        </button>

                                        {/* Price on image bottom */}
                                        <div className="absolute bottom-3 left-3 text-white">
                                            <span className="text-lg font-extrabold drop-shadow-md">
                                                {item.price}
                                            </span>
                                            <span className="text-xs font-normal text-white/90 ml-1">
                                                {item.pricePeriod}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Listing Details */}
                                    <div className="p-5 space-y-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[9.5px] font-extrabold uppercase tracking-wider">
                                                    {item.type}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    &bull; {item.savedAt}
                                                </span>
                                            </div>

                                            <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                {item.title}
                                            </h2>

                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <MapPin className="size-3.5 text-primary shrink-0" />
                                                <span className="truncate">{item.location}</span>
                                            </div>
                                        </div>

                                        {/* Specs Chips */}
                                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                            {item.specs.map((spec, sIdx) => (
                                                <span
                                                    key={sIdx}
                                                    className="px-2.5 py-1 rounded-lg bg-surface-secondary text-[11px] font-medium text-foreground"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer CTA */}
                                <div className="p-5 pt-0">
                                    <Link
                                        href={item.href}
                                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                    >
                                        <span>View Listing Details</span>
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedView;
