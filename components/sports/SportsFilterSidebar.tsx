"use client";

import React from "react";
import { RotateCcw, ShieldCheck, Check, X, Clock } from "@/components/Icons";
import { SportsCategory, SportsFiltersState, TimeSlot } from "./types";
import { SPORTS_AMENITY_OPTIONS } from "./sportsData";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

interface SportsFilterSidebarProps {
    filters: SportsFiltersState;
    onChange: (updated: Partial<SportsFiltersState>) => void;
    onReset: () => void;
    categoryCounts: Record<SportsCategory, number>;
    totalVenues: number;
    isMobileDrawer?: boolean;
    onCloseMobileDrawer?: () => void;
}

const CATEGORY_ITEMS_EN: { id: SportsCategory; label: string }[] = [
    { id: "all", label: "All Venues & Arenas" },
    { id: "turf-booking", label: "Artificial Grass Turfs" },
    { id: "football-grounds", label: "Football Grounds" },
    { id: "indoor-sports", label: "Indoor Courts & Futsal" },
    { id: "swimming", label: "Swimming & Wellness" },
    { id: "tournaments", label: "Tournament Complexes" },
    { id: "other-activities", label: "Recreation & Activities" },
];

const CATEGORY_ITEMS_BN: { id: SportsCategory; label: string }[] = [
    { id: "all", label: "সকল ভেন্যু ও অ্যারেনা" },
    { id: "turf-booking", label: "কৃত্রিম ঘাসের টার্ফ" },
    { id: "football-grounds", label: "ফুটবল মাঠ" },
    { id: "indoor-sports", label: "ইনডোর কোর্ট ও ফুটসাল" },
    { id: "swimming", label: "সুইমিং ও ওয়েলনেস" },
    { id: "tournaments", label: "টুর্নামেন্ট কমপ্লেক্স" },
    { id: "other-activities", label: "বিনোদন ও কার্যক্রম" },
];

const PRICE_PRESETS_EN = [
    { label: "Any Rate", min: null, max: null },
    { label: "Under ৳2k", min: null, max: 2000 },
    { label: "৳2k - ৳3.5k", min: 2000, max: 3500 },
    { label: "৳3.5k - ৳5k", min: 3500, max: 5000 },
    { label: "৳5k+", min: 5000, max: null },
];

const PRICE_PRESETS_BN = [
    { label: "যেকোনো মূল্য", min: null, max: null },
    { label: "৳২ হাজারের নিচে", min: null, max: 2000 },
    { label: "৳২হাজার - ৳৩.৫হাজার", min: 2000, max: 3500 },
    { label: "৳৩.৫হাজার - ৳৫হাজার", min: 3500, max: 5000 },
    { label: "৳৫ হাজার+", min: 5000, max: null },
];

export const SportsFilterSidebar = ({ filters, onChange, onReset, categoryCounts, totalVenues, isMobileDrawer = false, onCloseMobileDrawer }: SportsFilterSidebarProps) => {
    const { locale } = useLocale();
    const isBn = locale === "bn";

    const categoryItems = isBn ? CATEGORY_ITEMS_BN : CATEGORY_ITEMS_EN;
    const pricePresets = isBn ? PRICE_PRESETS_BN : PRICE_PRESETS_EN;

    const slotPresets: { id: TimeSlot; label: string; time: string }[] = isBn
        ? [
              { id: "any", label: "যেকোনো সময়", time: "সারাদিন" },
              { id: "morning", label: "সকাল", time: "সকাল ৬টা - দুপুর ১২টা" },
              { id: "afternoon", label: "দুপুর/বিকাল", time: "১২টা - বিকাল ৫টা" },
              { id: "evening", label: "সন্ধ্যা", time: "বিকাল ৫টা - রাত ৯টা" },
              { id: "night", label: "রাতের স্লট", time: "রাত ৯টা - রাত ১২টা" },
          ]
        : [
              { id: "any", label: "Any Time", time: "All Day" },
              { id: "morning", label: "Morning", time: "6 AM - 12 PM" },
              { id: "afternoon", label: "Afternoon", time: "12 PM - 5 PM" },
              { id: "evening", label: "Evening", time: "5 PM - 9 PM" },
              { id: "night", label: "Night Slot", time: "9 PM - 12 AM" },
          ];

    const surfaceOptions = [
        { id: "all", en: "Any Playing Surface", bn: "যেকোনো সারফেস" },
        { id: "FIFA Artificial Grass", en: "FIFA Artificial Grass", bn: "ফিফা কৃত্রিম ঘাস" },
        { id: "Natural Grass", en: "Natural Grass", bn: "প্রাকৃতিক ঘাস" },
        { id: "Synthetic Wooden Court", en: "Synthetic Wooden Court", bn: "সিন্থেটিক উডেন কোর্ট" },
        { id: "Olympic Acrylic", en: "Olympic Acrylic", bn: "অলিম্পিক অ্যাক্রিলিক" },
        { id: "Clay Court", en: "Clay Court", bn: "ক্লে কোর্ট" },
    ];

    const handleAmenityToggle = (amenity: string) => {
        const next = filters.amenities.includes(amenity) ? filters.amenities.filter((a) => a !== amenity) : [...filters.amenities, amenity];
        onChange({ amenities: next });
    };

    const hasActiveFilters = filters.category !== "all" || filters.slot !== "any" || filters.surface !== "all" || filters.minPrice !== null || filters.maxPrice !== null || filters.amenities.length > 0 || filters.verifiedOnly || filters.search.trim().length > 0;

    return (
        <aside className={`bg-white dark:bg-card rounded-2xl border border-border p-5 space-y-6 ${isMobileDrawer ? "shadow-none border-none p-4" : "shadow-xs"}`}>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-foreground">{isBn ? "ফিল্টার" : "Filters"}</span>
                    {hasActiveFilters && <span className="size-2 rounded-full bg-primary animate-pulse" />}
                </div>
                <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                        <button type="button" onClick={onReset} className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer transition-colors">
                            <RotateCcw className="size-3" />
                            <span>{isBn ? "রিসেট" : "Reset"}</span>
                        </button>
                    )}
                    {isMobileDrawer && onCloseMobileDrawer && (
                        <button type="button" onClick={onCloseMobileDrawer} className="size-8 rounded-full bg-surface-secondary flex items-center justify-center text-foreground hover:bg-border transition-colors cursor-pointer">
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
                        <div className="text-xs font-bold text-foreground">{isBn ? "শুধু যাচাইকৃত ভেন্যু" : "Verified Arenas Only"}</div>
                        <div className="text-[10px] text-muted-foreground">{isBn ? "শারীরিক পরিদর্শন সম্পন্ন" : "Physical inspection done"}</div>
                    </div>
                </div>
                <button type="button" role="switch" aria-checked={filters.verifiedOnly} onClick={() => onChange({ verifiedOnly: !filters.verifiedOnly })} className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer focus:outline-none ${filters.verifiedOnly ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"}`}>
                    <span className={`absolute top-1 left-1 size-4 rounded-full bg-white transition-transform ${filters.verifiedOnly ? "translate-x-4" : "translate-x-0"}`} />
                </button>
            </div>

            {/* Time Slots */}
            <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    <Clock className="size-3.5 text-primary" />
                    <span>{isBn ? "পছন্দের খেলার স্লট" : "Preferred Playing Slot"}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {slotPresets.map((slot) => {
                        const isSelected = filters.slot === slot.id;
                        return (
                            <button key={slot.id} type="button" onClick={() => onChange({ slot: slot.id })} className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${isSelected ? "border-primary bg-primary/10 text-primary font-bold shadow-xs" : "border-border text-foreground hover:bg-surface-secondary"}`}>
                                <div className="text-xs font-bold">{slot.label}</div>
                                <div className="text-[10px] text-muted-foreground">{slot.time}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Categories */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "ভেন্যুর ধরন" : "Sports & Venue Type"}
                </label>
                <div className="space-y-1">
                    {categoryItems.map((cat) => {
                        const isSelected = filters.category === cat.id;
                        const count = cat.id === "all" ? totalVenues : categoryCounts[cat.id] || 0;
                        const displayCount = isBn ? toBengaliDigits(count) : count;
                        return (
                            <button key={cat.id} type="button" onClick={() => onChange({ category: cat.id })} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${isSelected ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-foreground hover:bg-surface-secondary"}`}>
                                <span className="truncate">{cat.label}</span>
                                <span className={`text-[11px] px-2 py-0.5 rounded-full ${isSelected ? "bg-black/20 text-primary-foreground" : "bg-surface-secondary text-muted-foreground"}`}>{displayCount}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "ঘণ্টাপ্রতি বাজেট" : "Hourly Budget"}
                </label>

                {/* Preset Brackets */}
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {pricePresets.map((preset, idx) => {
                        const isSelected = filters.minPrice === preset.min && filters.maxPrice === preset.max;
                        return (
                            <button key={idx} type="button" onClick={() => onChange({ minPrice: preset.min, maxPrice: preset.max })} className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border text-center transition-colors cursor-pointer ${isSelected ? "border-primary bg-primary/10 text-primary font-bold" : "border-border text-foreground hover:bg-surface-secondary"}`}>
                                {preset.label}
                            </button>
                        );
                    })}
                </div>

                {/* Min / Max Inputs */}
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <span className="block text-[10px] text-muted-foreground mb-1">{isBn ? "সর্বনিম্ন (৳)" : "Min (৳)"}</span>
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
                        <span className="block text-[10px] text-muted-foreground mb-1">{isBn ? "সর্বোচ্চ (৳)" : "Max (৳)"}</span>
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

            {/* Surface Type */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "খেলার সারফেস" : "Playing Surface"}
                </label>
                <div className="space-y-1">
                    {surfaceOptions.map((surf) => {
                        const isSelected = filters.surface === surf.id;
                        return (
                            <button key={surf.id} type="button" onClick={() => onChange({ surface: surf.id })} className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-colors cursor-pointer ${isSelected ? "border-primary bg-primary/10 text-primary font-bold" : "border-border text-foreground hover:bg-surface-secondary"}`}>
                                <span>{isBn ? surf.bn : surf.en}</span>
                                {isSelected && <Check className="size-3.5 text-primary" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Key Amenities */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "ভেন্যুর সুবিধাসমূহ" : "Arena Facilities"}
                </label>
                <div className="space-y-2">
                    {SPORTS_AMENITY_OPTIONS.map((amenity) => {
                        const isChecked = filters.amenities.includes(amenity);
                        return (
                            <label key={amenity} onClick={() => handleAmenityToggle(amenity)} className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer select-none group">
                                <div className={`size-4 rounded-md border flex items-center justify-center transition-colors ${isChecked ? "border-primary bg-primary text-primary-foreground" : "border-border group-hover:border-primary/60 bg-white dark:bg-card"}`}>{isChecked && <Check className="size-3" />}</div>
                                <span className={isChecked ? "font-bold text-primary" : "font-medium"}>{amenity}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Close Button on Mobile */}
            {isMobileDrawer && onCloseMobileDrawer && (
                <div className="pt-4 border-t border-border">
                    <button type="button" onClick={onCloseMobileDrawer} className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-colors cursor-pointer shadow-md">
                        {isBn ? "ভেন্যু দেখুন" : "Show Arenas"}
                    </button>
                </div>
            )}
        </aside>
    );
};
