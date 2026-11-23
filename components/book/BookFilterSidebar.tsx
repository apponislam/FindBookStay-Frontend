"use client";

import React from "react";
import {
    RotateCcw,
    ShieldCheck,
    Check,
    X,
    Star,
} from "@/components/Icons";
import { BookCategory, BookFiltersState } from "./types";
import { STAY_AMENITY_OPTIONS } from "./bookData";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

interface BookFilterSidebarProps {
    filters: BookFiltersState;
    onChange: (updated: Partial<BookFiltersState>) => void;
    onReset: () => void;
    categoryCounts: Record<BookCategory, number>;
    totalStays: number;
    isMobileDrawer?: boolean;
    onCloseMobileDrawer?: () => void;
}

const CATEGORY_ITEMS_EN: { id: BookCategory; label: string }[] = [
    { id: "all", label: "All Stays & Getaways" },
    { id: "hotels", label: "Boutique & City Hotels" },
    { id: "resorts", label: "Scenic Resorts" },
    { id: "holiday-homes", label: "Holiday Homes & Villas" },
    { id: "guest-houses", label: "Guest Houses & B&Bs" },
    { id: "short-stay", label: "Serviced Short Stays" },
    { id: "luxury", label: "VIP Luxury Suites" },
];

const CATEGORY_ITEMS_BN: { id: BookCategory; label: string }[] = [
    { id: "all", label: "সকল স্টে ও গেটওয়ে" },
    { id: "hotels", label: "বুটিক ও সিটি হোটেল" },
    { id: "resorts", label: "প্রাকৃতিক রিসোর্ট" },
    { id: "holiday-homes", label: "হলিডে হোমস ও ভিলা" },
    { id: "guest-houses", label: "গেস্ট হাউস ও বিঅ্যান্ডবি" },
    { id: "short-stay", label: "সার্ভিসড শর্ট স্টে" },
    { id: "luxury", label: "ভিআইপি লাক্সারি স্যুট" },
];

const PRICE_PRESETS_EN = [
    { label: "Any Price", min: null, max: null },
    { label: "Under ৳6k", min: null, max: 6000 },
    { label: "৳6k - ৳12k", min: 6000, max: 12000 },
    { label: "৳12k - ৳25k", min: 12000, max: 25000 },
    { label: "৳25k+", min: 25000, max: null },
];

const PRICE_PRESETS_BN = [
    { label: "যেকোনো মূল্য", min: null, max: null },
    { label: "৳৬ হাজারের নিচে", min: null, max: 6000 },
    { label: "৳৬হাজার - ৳১২হাজার", min: 6000, max: 12000 },
    { label: "৳১২হাজার - ৳২৫হাজার", min: 12000, max: 25000 },
    { label: "৳২৫ হাজার+", min: 25000, max: null },
];

export const BookFilterSidebar = ({
    filters,
    onChange,
    onReset,
    categoryCounts,
    totalStays,
    isMobileDrawer = false,
    onCloseMobileDrawer,
}: BookFilterSidebarProps) => {
    const { locale } = useLocale();
    const isBn = locale === "bn";

    const categoryItems = isBn ? CATEGORY_ITEMS_BN : CATEGORY_ITEMS_EN;
    const pricePresets = isBn ? PRICE_PRESETS_BN : PRICE_PRESETS_EN;

    const ratingPresets = [
        { label: isBn ? "যেকোনো রেটিং" : "Any Rating", val: "any" },
        { label: isBn ? "৪.৮+ অসাধারণ" : "4.8+ Exceptional", val: 4.8 },
        { label: isBn ? "৪.৫+ চমৎকার" : "4.5+ Superb", val: 4.5 },
        { label: isBn ? "৪.০+ খুব ভালো" : "4.0+ Very Good", val: 4.0 },
    ];

    const handleAmenityToggle = (amenity: string) => {
        const next = filters.amenities.includes(amenity)
            ? filters.amenities.filter((a) => a !== amenity)
            : [...filters.amenities, amenity];
        onChange({ amenities: next });
    };

    const hasActiveFilters =
        filters.category !== "all" ||
        filters.checkIn !== "" ||
        filters.checkOut !== "" ||
        filters.guests !== "any" ||
        filters.minPrice !== null ||
        filters.maxPrice !== null ||
        filters.minRating !== "any" ||
        filters.amenities.length > 0 ||
        filters.verifiedOnly ||
        filters.search.trim().length > 0;

    return (
        <aside
            className={`bg-white dark:bg-card rounded-2xl border border-border p-5 space-y-6 ${
                isMobileDrawer ? "shadow-none border-none p-4" : "shadow-xs"
            }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-foreground">
                        {isBn ? "ফিল্টার" : "Filters"}
                    </span>
                    {hasActiveFilters && (
                        <span className="size-2 rounded-full bg-primary animate-pulse" />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={onReset}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                            <RotateCcw className="size-3" />
                            <span>{isBn ? "রিসেট" : "Reset"}</span>
                        </button>
                    )}
                    {isMobileDrawer && onCloseMobileDrawer && (
                        <button
                            type="button"
                            onClick={onCloseMobileDrawer}
                            className="size-8 rounded-full bg-surface-secondary flex items-center justify-center text-foreground hover:bg-border transition-colors cursor-pointer"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Verified Only Toggle */}
            <div className="p-3 rounded-xl bg-surface-secondary/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                        <div className="text-xs font-bold text-foreground">
                            {isBn ? "শুধু যাচাইকৃত স্টে" : "Verified Stays Only"}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                            {isBn ? "শারীরিক পরিদর্শন সম্পন্ন" : "Physical inspection done"}
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    role="switch"
                    aria-checked={filters.verifiedOnly}
                    onClick={() => onChange({ verifiedOnly: !filters.verifiedOnly })}
                    className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer focus:outline-none ${
                        filters.verifiedOnly ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                >
                    <span
                        className={`absolute top-1 left-1 size-4 rounded-full bg-white transition-transform ${
                            filters.verifiedOnly ? "translate-x-4" : "translate-x-0"
                        }`}
                    />
                </button>
            </div>

            {/* Travel Dates */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "ভ্রমণের তারিখ" : "Stay Dates"}
                </label>
                <div className="space-y-2">
                    <div>
                        <span className="block text-[10px] text-muted-foreground mb-1">
                            {isBn ? "চেক-ইন" : "Check-in"}
                        </span>
                        <input
                            type="date"
                            value={filters.checkIn}
                            onChange={(e) => onChange({ checkIn: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-xl border border-border bg-white dark:bg-card text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        />
                    </div>
                    <div>
                        <span className="block text-[10px] text-muted-foreground mb-1">
                            {isBn ? "চেক-আউট" : "Check-out"}
                        </span>
                        <input
                            type="date"
                            min={filters.checkIn}
                            value={filters.checkOut}
                            onChange={(e) => onChange({ checkOut: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-xl border border-border bg-white dark:bg-card text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "থাকার ধরন" : "Accommodation Type"}
                </label>
                <div className="space-y-1">
                    {categoryItems.map((cat) => {
                        const isSelected = filters.category === cat.id;
                        const count = cat.id === "all" ? totalStays : categoryCounts[cat.id] || 0;
                        const displayCount = isBn ? toBengaliDigits(count) : count;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => onChange({ category: cat.id })}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                    isSelected
                                        ? "bg-primary text-primary-foreground font-bold shadow-xs"
                                        : "text-foreground hover:bg-surface-secondary"
                                }`}
                            >
                                <span className="truncate">{cat.label}</span>
                                <span
                                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                                        isSelected
                                            ? "bg-primary-foreground/20 text-primary-foreground"
                                            : "bg-surface-secondary text-muted-foreground"
                                    }`}
                                >
                                    {displayCount}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "প্রতি রাতের বাজেট" : "Nightly Budget"}
                </label>

                {/* Preset Brackets */}
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {pricePresets.map((preset, idx) => {
                        const isSelected =
                            filters.minPrice === preset.min && filters.maxPrice === preset.max;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                    onChange({ minPrice: preset.min, maxPrice: preset.max })
                                }
                                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border text-center transition-colors cursor-pointer ${
                                    isSelected
                                        ? "border-primary bg-primary/10 text-primary font-bold"
                                        : "border-border text-foreground hover:bg-surface-secondary"
                                }`}
                            >
                                {preset.label}
                            </button>
                        );
                    })}
                </div>

                {/* Min / Max Inputs */}
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <span className="block text-[10px] text-muted-foreground mb-1">
                            {isBn ? "সর্বনিম্ন (৳)" : "Min (৳)"}
                        </span>
                        <input
                            type="number"
                            placeholder={isBn ? "সর্বনিম্ন" : "Min"}
                            value={filters.minPrice ?? ""}
                            onChange={(e) =>
                                onChange({
                                    minPrice: e.target.value ? Number(e.target.value) : null,
                                })
                            }
                            className="w-full px-2.5 py-1.5 rounded-xl border border-border bg-white dark:bg-card text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <span className="text-muted-foreground text-xs mt-4">-</span>
                    <div className="flex-1">
                        <span className="block text-[10px] text-muted-foreground mb-1">
                            {isBn ? "সর্বোচ্চ (৳)" : "Max (৳)"}
                        </span>
                        <input
                            type="number"
                            placeholder={isBn ? "সর্বোচ্চ" : "Max"}
                            value={filters.maxPrice ?? ""}
                            onChange={(e) =>
                                onChange({
                                    maxPrice: e.target.value ? Number(e.target.value) : null,
                                })
                            }
                            className="w-full px-2.5 py-1.5 rounded-xl border border-border bg-white dark:bg-card text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
            </div>

            {/* Minimum Star Rating */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "অতিথি রেটিং" : "Guest Rating"}
                </label>
                <div className="space-y-1.5">
                    {ratingPresets.map((item, idx) => {
                        const isSelected = filters.minRating === item.val;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => onChange({ minRating: item.val as number | "any" })}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border transition-colors cursor-pointer ${
                                    isSelected
                                        ? "border-primary bg-primary/10 text-primary font-bold"
                                        : "border-border text-foreground hover:bg-surface-secondary"
                                }`}
                            >
                                <div className="flex items-center gap-1.5">
                                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                                    <span>{item.label}</span>
                                </div>
                                {isSelected && <Check className="size-3.5 text-primary" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Guests Capacity */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "অতিথি ধারণক্ষমতা" : "Guests Capacity"}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                    {[
                        { label: isBn ? "যেকোনো" : "Any", val: "any" },
                        { label: isBn ? "১-২" : "1-2", val: 2 },
                        { label: isBn ? "৩-৪" : "3-4", val: 4 },
                        { label: isBn ? "৫+" : "5+", val: 5 },
                    ].map((g, idx) => {
                        const isSelected = filters.guests === g.val;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => onChange({ guests: g.val as number | "any" })}
                                className={`py-1.5 rounded-xl text-xs font-bold border text-center transition-colors cursor-pointer ${
                                    isSelected
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border text-foreground hover:bg-surface-secondary"
                                }`}
                            >
                                {g.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Key Amenities */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "জনপ্রিয় সুবিধাসমূহ" : "Popular Amenities"}
                </label>
                <div className="space-y-2">
                    {STAY_AMENITY_OPTIONS.map((amenity) => {
                        const isChecked = filters.amenities.includes(amenity);
                        return (
                            <label
                                key={amenity}
                                onClick={() => handleAmenityToggle(amenity)}
                                className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer select-none group"
                            >
                                <div
                                    className={`size-4 rounded-md border flex items-center justify-center transition-colors ${
                                        isChecked
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border group-hover:border-primary/60 bg-white dark:bg-card"
                                    }`}
                                >
                                    {isChecked && <Check className="size-3" />}
                                </div>
                                <span className={isChecked ? "font-bold text-primary" : "font-medium"}>
                                    {amenity}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Close Button */}
            {isMobileDrawer && onCloseMobileDrawer && (
                <div className="pt-4 border-t border-border">
                    <button
                        type="button"
                        onClick={onCloseMobileDrawer}
                        className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-colors cursor-pointer shadow-md"
                    >
                        {isBn ? "স্টে দেখুন" : "Show Stays"}
                    </button>
                </div>
            )}
        </aside>
    );
};
