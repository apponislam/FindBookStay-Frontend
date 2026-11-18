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
import { RentCategory, RentFiltersState, SortOption } from "./types";

interface RentHeroHeaderProps {
    filters: RentFiltersState;
    onChange: (updated: Partial<RentFiltersState>) => void;
    totalMatches: number;
    viewMode: "grid" | "list";
    onViewModeChange: (mode: "grid" | "list") => void;
    onOpenMobileFilters: () => void;
    activeFiltersCount: number;
}

const CATEGORIES: { id: RentCategory; label: string }[] = [
    { id: "all", label: "All Properties" },
    { id: "family-apartments", label: "Family Apartments" },
    { id: "family-houses", label: "Family Houses" },
    { id: "bachelor-seats", label: "Bachelor Seats" },
    { id: "shared-rooms", label: "Shared Rooms" },
    { id: "sublets", label: "Monthly Sublets" },
    { id: "commercial", label: "Commercial" },
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
    { id: "recommended", label: "Recommended" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "newest", label: "Newest First" },
    { id: "sqft-desc", label: "Largest Area" },
];

export const RentHeroHeader = ({
    filters,
    onChange,
    totalMatches,
    viewMode,
    onViewModeChange,
    onOpenMobileFilters,
    activeFiltersCount,
}: RentHeroHeaderProps) => {
    return (
        <div className="space-y-6 pt-6 pb-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-secondary">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <span>/</span>
                <span className="font-semibold text-foreground">Rent</span>
            </nav>

            {/* Title & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                        Rental Properties in Bangladesh
                    </h1>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-2xl">
                        Discover verified family flats, bachelor seats, duplex houses, and sublets with transparent monthly pricing and direct owner contacts.
                    </p>
                </div>
                <div className="text-xs text-text-secondary font-semibold shrink-0">
                    Showing <span className="font-bold text-foreground">{totalMatches}</span> verified properties
                </div>
            </div>

            {/* Category Quick Pills Slider */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => {
                    const isSelected = filters.category === cat.id;
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => onChange({ category: cat.id })}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                isSelected
                                    ? "bg-primary text-white shadow-md scale-102"
                                    : "bg-surface-secondary text-foreground hover:bg-zinc-200/80 border border-border/50"
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
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-text-secondary pointer-events-none" />
                    <input
                        type="search"
                        placeholder="Search area, neighborhood, or keyword..."
                        value={filters.search}
                        onChange={(e) => onChange({ search: e.target.value })}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-white text-xs font-semibold placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {filters.search && (
                        <button
                            type="button"
                            onClick={() => onChange({ search: "" })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 size-5 rounded-full hover:bg-surface-secondary flex items-center justify-center text-text-secondary cursor-pointer"
                        >
                            <X className="size-3" />
                        </button>
                    )}
                </div>

                {/* Right controls: Mobile Filter, Sort, View Toggle */}
                <div className="flex items-center gap-2.5 justify-between sm:justify-end">
                    {/* Mobile Filter Button (lg:hidden) */}
                    <button
                        type="button"
                        onClick={onOpenMobileFilters}
                        className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-white text-xs font-bold text-foreground hover:bg-surface-secondary transition-colors cursor-pointer shadow-xs"
                    >
                        <SlidersHorizontal className="size-4 text-primary" />
                        <span>Filters</span>
                        {activeFiltersCount > 0 && (
                            <span className="size-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={filters.sortBy}
                            onChange={(e) => onChange({ sortBy: e.target.value as SortOption })}
                            className="appearance-none bg-white border border-border text-xs font-bold text-foreground rounded-xl pl-3.5 pr-8 py-2.5 hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-xs"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-text-secondary pointer-events-none" />
                    </div>

                    {/* View Switcher: Grid vs List */}
                    <div className="hidden sm:flex items-center rounded-xl border border-border bg-white p-1 shadow-xs">
                        <button
                            type="button"
                            onClick={() => onViewModeChange("grid")}
                            aria-label="Grid view"
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                viewMode === "grid"
                                    ? "bg-primary text-white"
                                    : "text-text-secondary hover:text-foreground"
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
                                    ? "bg-primary text-white"
                                    : "text-text-secondary hover:text-foreground"
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

