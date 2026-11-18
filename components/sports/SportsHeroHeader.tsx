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
import { SportsCategory, SportsFiltersState, SportsSortOption } from "./types";

interface SportsHeroHeaderProps {
    filters: SportsFiltersState;
    onChange: (updated: Partial<SportsFiltersState>) => void;
    totalMatches: number;
    viewMode: "grid" | "list";
    onViewModeChange: (mode: "grid" | "list") => void;
    onOpenMobileFilters: () => void;
    activeFiltersCount: number;
}

const CATEGORIES: { id: SportsCategory; label: string }[] = [
    { id: "all", label: "All Venues" },
    { id: "turf-booking", label: "Artificial Turfs" },
    { id: "football-grounds", label: "Football Grounds" },
    { id: "indoor-sports", label: "Indoor Courts" },
    { id: "swimming", label: "Swimming & Wellness" },
    { id: "tournaments", label: "Tournaments" },
    { id: "other-activities", label: "Recreation Hubs" },
];

const SORT_OPTIONS: { id: SportsSortOption; label: string }[] = [
    { id: "recommended", label: "Recommended" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "rating-desc", label: "Top Rated" },
    { id: "popular", label: "Most Popular" },
];

export const SportsHeroHeader = ({
    filters,
    onChange,
    totalMatches,
    viewMode,
    onViewModeChange,
    onOpenMobileFilters,
    activeFiltersCount,
}: SportsHeroHeaderProps) => {
    return (
        <div className="space-y-6 pt-6 pb-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-secondary">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <span>/</span>
                <span className="font-semibold text-foreground">Sports & Arenas</span>
            </nav>

            {/* Title & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                        Sports Turfs, Grounds & Arenas
                    </h1>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-2xl">
                        Book verified floodlit football and cricket turfs, indoor badminton courts, and swimming complexes with live hourly slot reservation.
                    </p>
                </div>
                <div className="text-xs text-text-secondary font-semibold shrink-0">
                    Showing <span className="font-bold text-foreground">{totalMatches}</span> verified arenas
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
                        placeholder="Search arena name, sport, or neighborhood..."
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

                {/* Right Controls: Mobile Filter, Sort, View Toggle */}
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
                            onChange={(e) => onChange({ sortBy: e.target.value as SportsSortOption })}
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
