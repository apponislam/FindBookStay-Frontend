"use client";

import React from "react";
import { RotateCcw, ShieldCheck, Check, X } from "@/components/Icons";
import { BuyCategory, BuyFiltersState } from "./types";
import { BUY_AMENITY_OPTIONS } from "./buyData";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

interface BuyFilterSidebarProps {
    filters: BuyFiltersState;
    onChange: (updated: Partial<BuyFiltersState>) => void;
    onReset: () => void;
    categoryCounts: Record<BuyCategory, number>;
    totalProperties: number;
    isMobileDrawer?: boolean;
    onCloseMobileDrawer?: () => void;
}

const CATEGORY_ITEMS_EN: { id: BuyCategory; label: string }[] = [
    { id: "all", label: "All Properties for Sale" },
    { id: "apartments", label: "Apartments & Flats" },
    { id: "residential", label: "Residential Homes" },
    { id: "houses", label: "Houses & Duplex Villas" },
    { id: "commercial", label: "Commercial Properties" },
    { id: "land", label: "Land & Plots" },
    { id: "new-developments", label: "New Developments & Off-Plan" },
];

const CATEGORY_ITEMS_BN: { id: BuyCategory; label: string }[] = [
    { id: "all", label: "বিক্রির জন্য সকল প্রোপার্টি" },
    { id: "apartments", label: "অ্যাপার্টমেন্ট ও ফ্ল্যাট" },
    { id: "residential", label: "আবাসিক বাড়ি" },
    { id: "houses", label: "বাড়ি ও ডুপ্লেক্স ভিলা" },
    { id: "commercial", label: "বাণিজ্যিক প্রোপার্টি" },
    { id: "land", label: "জমি ও প্লট" },
    { id: "new-developments", label: "নতুন আবাসন ও অফ-প্ল্যান" },
];

const PRICE_PRESETS_EN = [
    { label: "Any Budget", min: null, max: null },
    { label: "Under ৳1 Cr", min: null, max: 10000000 },
    { label: "৳1 Cr - ৳3 Cr", min: 10000000, max: 30000000 },
    { label: "৳3 Cr - ৳6 Cr", min: 30000000, max: 60000000 },
    { label: "৳6 Cr+", min: 60000000, max: null },
];

const PRICE_PRESETS_BN = [
    { label: "যেকোনো বাজেট", min: null, max: null },
    { label: "৳১ কোটির নিচে", min: null, max: 10000000 },
    { label: "৳১ কোটি - ৳৩ কোটি", min: 10000000, max: 30000000 },
    { label: "৳৩ কোটি - ৳৬ কোটি", min: 30000000, max: 60000000 },
    { label: "৳৬ কোটি+", min: 60000000, max: null },
];

export const BuyFilterSidebar = ({ filters, onChange, onReset, categoryCounts, totalProperties, isMobileDrawer = false, onCloseMobileDrawer }: BuyFilterSidebarProps) => {
    const { locale } = useLocale();
    const isBn = locale === "bn";

    const categoryItems = isBn ? CATEGORY_ITEMS_BN : CATEGORY_ITEMS_EN;
    const pricePresets = isBn ? PRICE_PRESETS_BN : PRICE_PRESETS_EN;

    const statusOptions = [
        { id: "all", en: "Any Status", bn: "যেকোনো অবস্থা" },
        { id: "Ready to Move", en: "Ready to Move", bn: "রেডি টু মুভ" },
        { id: "Under Construction", en: "Under Construction", bn: "নির্মাণাধীন" },
        { id: "Vacant Plot", en: "Vacant Plot", bn: "খালি প্লট" },
    ];

    const handleAmenityToggle = (amenity: string) => {
        const next = filters.amenities.includes(amenity) ? filters.amenities.filter((a) => a !== amenity) : [...filters.amenities, amenity];
        onChange({ amenities: next });
    };

    const hasActiveFilters = filters.category !== "all" || filters.bedrooms !== "all" || filters.status !== "all" || filters.minPrice !== null || filters.maxPrice !== null || filters.amenities.length > 0 || filters.verifiedOnly || filters.search.trim().length > 0;

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

            {/* Verified Title Only Toggle */}
            <div className="p-3 rounded-xl bg-surface-secondary/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                        <div className="text-xs font-bold text-foreground">{isBn ? "শুধু যাচাইকৃত দলিল" : "Verified Title Only"}</div>
                        <div className="text-[10px] text-muted-foreground">{isBn ? "রাজউক ও নামজারি অনুমোদিত" : "RAJUK & Mutation verified"}</div>
                    </div>
                </div>
                <button type="button" role="switch" aria-checked={filters.verifiedOnly} onClick={() => onChange({ verifiedOnly: !filters.verifiedOnly })} className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer focus:outline-none ${filters.verifiedOnly ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"}`}>
                    <span className={`absolute top-1 left-1 size-4 rounded-full bg-white transition-transform ${filters.verifiedOnly ? "translate-x-4" : "translate-x-0"}`} />
                </button>
            </div>

            {/* Categories */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "প্রোপার্টির ধরন" : "Property Type"}
                </label>
                <div className="space-y-1">
                    {categoryItems.map((cat) => {
                        const isSelected = filters.category === cat.id;
                        const count = cat.id === "all" ? totalProperties : categoryCounts[cat.id] || 0;
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

            {/* Completion Status */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "নির্মাণ অবস্থা" : "Completion Status"}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                    {statusOptions.map((st) => {
                        const isSelected = filters.status === st.id;
                        return (
                            <button key={st.id} type="button" onClick={() => onChange({ status: st.id })} className={`px-2 py-1.5 rounded-xl text-[11px] font-semibold border text-center transition-colors cursor-pointer truncate ${isSelected ? "border-primary bg-primary text-primary-foreground font-bold" : "border-border text-foreground hover:bg-surface-secondary"}`}>
                                {isBn ? st.bn : st.en}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "মূল্যের পরিধি" : "Price Range"}
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

            {/* Bedrooms */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "বেডরুম" : "Bedrooms"}
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                    {["all", "1", "2", "3", "4+"].map((bed) => {
                        const isSelected = filters.bedrooms === bed;
                        let displayLabel = bed;
                        if (isBn) {
                            if (bed === "all") displayLabel = "সকল";
                            else if (bed === "4+") displayLabel = "৪+";
                            else displayLabel = toBengaliDigits(bed);
                        } else {
                            if (bed === "all") displayLabel = "All";
                        }
                        return (
                            <button key={bed} type="button" onClick={() => onChange({ bedrooms: bed })} className={`py-1.5 rounded-xl text-xs font-bold border text-center transition-colors cursor-pointer ${isSelected ? "border-primary bg-primary text-primary-foreground font-bold" : "border-border text-foreground hover:bg-surface-secondary"}`}>
                                {displayLabel}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Key Amenities */}
            <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                    {isBn ? "প্রধান সুবিধাসমূহ" : "Key Features"}
                </label>
                <div className="space-y-2">
                    {BUY_AMENITY_OPTIONS.map((amenity) => {
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

            {/* Mobile Close Button */}
            {isMobileDrawer && onCloseMobileDrawer && (
                <div className="pt-4 border-t border-border">
                    <button type="button" onClick={onCloseMobileDrawer} className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-colors cursor-pointer shadow-md">
                        {isBn ? "প্রোপার্টি দেখুন" : "Show Properties"}
                    </button>
                </div>
            )}
        </aside>
    );
};
