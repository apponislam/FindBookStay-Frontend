"use client";

import React from "react";
import Link from "next/link";
import {
    Search,
    SlidersHorizontal,
    LayoutGrid,
    List,
    X,
    ChevronDown,
} from "@/components/Icons";
import { BookCategory, BookFiltersState, BookSortOption } from "./types";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

interface BookHeroHeaderProps {
    filters: BookFiltersState;
    onChange: (updated: Partial<BookFiltersState>) => void;
    totalMatches: number;
    viewMode: "grid" | "list";
    onViewModeChange: (mode: "grid" | "list") => void;
    onOpenMobileFilters: () => void;
    activeFiltersCount: number;
}

const CATEGORIES_EN: { id: BookCategory; label: string }[] = [
    { id: "all", label: "All Stays" },
    { id: "hotels", label: "Hotels" },
    { id: "resorts", label: "Scenic Resorts" },
    { id: "holiday-homes", label: "Holiday Homes" },
    { id: "guest-houses", label: "Guest Houses" },
    { id: "short-stay", label: "Serviced Suites" },
    { id: "luxury", label: "VIP Luxury" },
];

const CATEGORIES_BN: { id: BookCategory; label: string }[] = [
    { id: "all", label: "সকল স্টে" },
    { id: "hotels", label: "হোটেল" },
    { id: "resorts", label: "প্রাকৃতিক রিসোর্ট" },
    { id: "holiday-homes", label: "হলিডে হোমস" },
    { id: "guest-houses", label: "গেস্ট হাউস" },
    { id: "short-stay", label: "সার্ভিসড স্যুট" },
    { id: "luxury", label: "ভিআইপি লাক্সারি" },
];

const SORT_OPTIONS_EN: { id: BookSortOption; label: string }[] = [
    { id: "recommended", label: "Recommended" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "rating-desc", label: "Top Rated" },
    { id: "popular", label: "Most Popular" },
];

const SORT_OPTIONS_BN: { id: BookSortOption; label: string }[] = [
    { id: "recommended", label: "প্রস্তাবিত" },
    { id: "price-asc", label: "মূল্য: কম থেকে বেশি" },
    { id: "price-desc", label: "মূল্য: বেশি থেকে কম" },
    { id: "rating-desc", label: "শীর্ষ রেটিং" },
    { id: "popular", label: "সর্বাধিক জনপ্রিয়" },
];

export const BookHeroHeader = ({
    filters,
    onChange,
    totalMatches,
    viewMode,
    onViewModeChange,
    onOpenMobileFilters,
    activeFiltersCount,
}: BookHeroHeaderProps) => {
    const { locale } = useLocale();
    const isBn = locale === "bn";

    const categories = isBn ? CATEGORIES_BN : CATEGORIES_EN;
    const sortOptions = isBn ? SORT_OPTIONS_BN : SORT_OPTIONS_EN;
    const formattedMatches = isBn ? toBengaliDigits(totalMatches) : totalMatches;
    const formattedActiveCount = isBn ? toBengaliDigits(activeFiltersCount) : activeFiltersCount;

    return (
        <div className="space-y-6 pt-6 pb-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-secondary">
                <Link href="/" className="hover:text-primary transition-colors">
                    {isBn ? "হোম" : "Home"}
                </Link>
                <span>/</span>
                <span className="font-semibold text-foreground">
                    {isBn ? "হোটেল ও রিসোর্ট" : "Book Stays"}
                </span>
            </nav>

            {/* Title & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                        {isBn ? "হোটেল, রিসোর্ট ও অবকাশযাপন" : "Hotels, Resorts & Vacation Stays"}
                    </h1>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-2xl">
                        {isBn
                            ? "যাচাইকৃত গেস্ট রিভিউ এবং তাৎক্ষণিক কনফার্মেশনসহ সমুদ্র সৈকতের রিসোর্ট, চা বাগান ভিলা, এক্সিকিউটিভ সিটি স্যুট এবং পাহাড়ের কটেজ বুক করুন।"
                            : "Handpicked beach resorts, tea garden villas, executive city suites, and hilltop cottages with verified guest reviews and instant confirmation."}
                    </p>
                </div>
                <div className="text-xs text-text-secondary font-semibold shrink-0">
                    {isBn ? (
                        <>
                            মোট <span className="font-bold text-foreground">{formattedMatches}</span> টি যাচাইকৃত স্টে
                        </>
                    ) : (
                        <>
                            Showing <span className="font-bold text-foreground">{formattedMatches}</span> verified stays
                        </>
                    )}
                </div>
            </div>

            {/* Category Quick Pills Slider */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => {
                    const isSelected = filters.category === cat.id;
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => onChange({ category: cat.id })}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                isSelected
                                    ? "bg-primary text-primary-foreground shadow-md scale-102"
                                    : "bg-surface-secondary text-foreground hover:bg-surface-secondary/80 border border-border"
                            }`}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Search, Filter Trigger, Sort & View Mode Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <input
                        type="search"
                        placeholder={isBn ? "শহর, গন্তব্য বা রিসোর্টের নাম দিয়ে খুঁজুন..." : "Search city, destination, or resort name..."}
                        value={filters.search}
                        onChange={(e) => onChange({ search: e.target.value })}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-foreground text-xs font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {filters.search && (
                        <button
                            type="button"
                            onClick={() => onChange({ search: "" })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 size-5 rounded-full hover:bg-surface-secondary flex items-center justify-center text-muted-foreground cursor-pointer"
                        >
                            <X className="size-3" />
                        </button>
                    )}
                </div>

                {/* Right Controls: Mobile Filter, Sort, View Toggle */}
                <div className="flex items-center gap-2.5 justify-between sm:justify-end">
                    {/* Mobile Filter Button (lg:hidden) */}
                    <button
                        type="button"
                        onClick={onOpenMobileFilters}
                        className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-xs font-bold text-foreground hover:bg-surface-secondary transition-colors cursor-pointer shadow-xs"
                    >
                        <SlidersHorizontal className="size-4 text-primary" />
                        <span>{isBn ? "ফিল্টার" : "Filters"}</span>
                        {activeFiltersCount > 0 && (
                            <span className="size-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                                {formattedActiveCount}
                            </span>
                        )}
                    </button>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={filters.sortBy}
                            onChange={(e) => onChange({ sortBy: e.target.value as BookSortOption })}
                            className="appearance-none bg-white dark:bg-card border border-border text-xs font-bold text-foreground rounded-xl pl-3.5 pr-8 py-2.5 hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-xs"
                        >
                            {sortOptions.map((opt) => (
                                <option key={opt.id} value={opt.id} className="bg-white dark:bg-card text-foreground">
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                    </div>

                    {/* View Switcher: Grid vs List */}
                    <div className="hidden sm:flex items-center rounded-xl border border-border bg-white dark:bg-card p-1 shadow-xs">
                        <button
                            type="button"
                            onClick={() => onViewModeChange("grid")}
                            aria-label="Grid view"
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                viewMode === "grid"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <LayoutGrid className="size-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onViewModeChange("list")}
                            aria-label="List view"
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                viewMode === "list"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <List className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
