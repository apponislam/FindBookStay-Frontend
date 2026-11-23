"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { RotateCcw, X, Trophy } from "@/components/Icons";
import { SportsCategory, SportsFiltersState, SportsVenue, SportsSortOption, TimeSlot } from "./types";
import { SPORTS_VENUES } from "./sportsData";
import { SportsHeroHeader } from "./SportsHeroHeader";
import { SportsFilterSidebar } from "./SportsFilterSidebar";
import { SportsCard } from "./SportsCard";
import { Pagination } from "@/components/Pagination";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

const INITIAL_FILTERS: SportsFiltersState = {
    search: "",
    category: "all",
    slot: "any",
    surface: "all",
    minPrice: null,
    maxPrice: null,
    amenities: [],
    verifiedOnly: false,
    sortBy: "recommended",
};

export const SportsListings = () => {
    const { locale } = useLocale();
    const isBn = locale === "bn";
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Initialize state directly from URL search params (clean React 19 pattern)
    const [filters, setFilters] = useState<SportsFiltersState>(() => {
        const querySearch = searchParams.get("search") || searchParams.get("location") || "";
        const queryCategory = searchParams.get("sport") || searchParams.get("category") || "all";
        const querySlot = (searchParams.get("slot") as TimeSlot) || "any";
        const querySurface = searchParams.get("surface") || "all";

        const rawMinPrice = searchParams.get("minPrice");
        const rawMaxPrice = searchParams.get("maxPrice");
        const queryBudget = searchParams.get("budget") || "";

        let minP: number | null = rawMinPrice ? Number(rawMinPrice) : null;
        let maxP: number | null = rawMaxPrice ? Number(rawMaxPrice) : null;

        if (queryBudget === "under-2k") {
            maxP = 2000;
        } else if (queryBudget === "2k-3.5k") {
            minP = 2000;
            maxP = 3500;
        } else if (queryBudget === "3.5k-5k") {
            minP = 3500;
            maxP = 5000;
        } else if (queryBudget === "5k-plus") {
            minP = 5000;
        }

        const queryAmenities = searchParams.get("amenities") ? searchParams.get("amenities")!.split(",").filter(Boolean) : [];
        const queryVerified = searchParams.get("verified") === "true";
        const querySort = (searchParams.get("sort") as SportsSortOption) || "recommended";

        return {
            search: querySearch,
            category: (queryCategory as SportsCategory) || "all",
            slot: querySlot,
            surface: querySurface,
            minPrice: minP,
            maxPrice: maxP,
            amenities: queryAmenities,
            verifiedOnly: queryVerified,
            sortBy: querySort,
        };
    });

    const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
        return searchParams.get("view") === "list" ? "list" : "grid";
    });

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(() => {
        const queryPage = Number(searchParams.get("page"));
        return queryPage > 0 ? queryPage : 1;
    });
    const pageSize = 6;

    // Sync state changes into URL query parameters
    const syncUrlWithFilters = useCallback(
        (nextFilters: SportsFiltersState, nextView: "grid" | "list", pageNum: number = 1) => {
            const params = new URLSearchParams();

            if (pageNum > 1) {
                params.set("page", String(pageNum));
            }
            if (nextFilters.category && nextFilters.category !== "all") {
                params.set("sport", nextFilters.category);
            }
            if (nextFilters.search && nextFilters.search.trim()) {
                params.set("search", nextFilters.search.trim());
            }
            if (nextFilters.slot && nextFilters.slot !== "any") {
                params.set("slot", nextFilters.slot);
            }
            if (nextFilters.surface && nextFilters.surface !== "all") {
                params.set("surface", nextFilters.surface);
            }
            if (nextFilters.minPrice !== null && nextFilters.minPrice > 0) {
                params.set("minPrice", String(nextFilters.minPrice));
            }
            if (nextFilters.maxPrice !== null && nextFilters.maxPrice > 0) {
                params.set("maxPrice", String(nextFilters.maxPrice));
            }
            if (nextFilters.amenities && nextFilters.amenities.length > 0) {
                params.set("amenities", nextFilters.amenities.join(","));
            }
            if (nextFilters.verifiedOnly) {
                params.set("verified", "true");
            }
            if (nextFilters.sortBy && nextFilters.sortBy !== "recommended") {
                params.set("sort", nextFilters.sortBy);
            }
            if (nextView === "list") {
                params.set("view", "list");
            }

            const queryString = params.toString();
            const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
            router.replace(newUrl, { scroll: false });
        },
        [pathname, router],
    );

    const handleFilterChange = (updated: Partial<SportsFiltersState>) => {
        const nextFilters = { ...filters, ...updated };
        setFilters(nextFilters);
        setCurrentPage(1); // Reset page on filter change
        syncUrlWithFilters(nextFilters, viewMode, 1);
    };

    const handleResetFilters = () => {
        setFilters(INITIAL_FILTERS);
        setCurrentPage(1);
        syncUrlWithFilters(INITIAL_FILTERS, viewMode, 1);
    };

    const handleViewModeChange = (mode: "grid" | "list") => {
        setViewMode(mode);
        syncUrlWithFilters(filters, mode, currentPage);
    };

    // Calculate category counts
    const categoryCounts = useMemo(() => {
        const counts: Record<SportsCategory, number> = {
            all: SPORTS_VENUES.length,
            "turf-booking": 0,
            "football-grounds": 0,
            "indoor-sports": 0,
            swimming: 0,
            tournaments: 0,
            "other-activities": 0,
        };

        SPORTS_VENUES.forEach((venue) => {
            if (counts[venue.category] !== undefined) {
                counts[venue.category]++;
            }
        });

        return counts;
    }, []);

    // Active filters count for mobile badge
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.category !== "all") count++;
        if (filters.slot !== "any") count++;
        if (filters.surface !== "all") count++;
        if (filters.minPrice !== null || filters.maxPrice !== null) count++;
        if (filters.amenities.length > 0) count += filters.amenities.length;
        if (filters.verifiedOnly) count++;
        if (filters.search.trim().length > 0) count++;
        return count;
    }, [filters]);

    // Filter and Sort Venues
    const filteredVenues = useMemo(() => {
        return SPORTS_VENUES.filter((venue: SportsVenue) => {
            // Keyword Search
            if (filters.search.trim()) {
                const q = filters.search.toLowerCase().trim();
                const matchesName = venue.name.toLowerCase().includes(q);
                const matchesArea = venue.location.area.toLowerCase().includes(q);
                const matchesCity = venue.location.city.toLowerCase().includes(q);
                const matchesCat = venue.categoryLabel.toLowerCase().includes(q);
                const matchesSport = venue.sports.some((s) => s.toLowerCase().includes(q));
                if (!matchesName && !matchesArea && !matchesCity && !matchesCat && !matchesSport) {
                    return false;
                }
            }

            // Category Filter
            if (filters.category !== "all" && venue.category !== filters.category) {
                return false;
            }

            // Slot Filter
            if (filters.slot !== "any" && !venue.slotsAvailable.includes(filters.slot)) {
                return false;
            }

            // Surface Filter
            if (filters.surface !== "all" && !venue.surfaceType.toLowerCase().includes(filters.surface.toLowerCase())) {
                return false;
            }

            // Price Min Filter
            if (filters.minPrice !== null && venue.hourlyPrice < filters.minPrice) {
                return false;
            }

            // Price Max Filter
            if (filters.maxPrice !== null && venue.hourlyPrice > filters.maxPrice) {
                return false;
            }

            // Amenities Filter (venue must have all checked amenities)
            if (filters.amenities.length > 0) {
                const hasAllAmenities = filters.amenities.every((a) => venue.amenities.includes(a));
                if (!hasAllAmenities) return false;
            }

            // Verified Only
            if (filters.verifiedOnly && !venue.verified) {
                return false;
            }

            return true;
        }).sort((a, b) => {
            // Sorting Logic
            switch (filters.sortBy) {
                case "price-asc":
                    return a.hourlyPrice - b.hourlyPrice;
                case "price-desc":
                    return b.hourlyPrice - a.hourlyPrice;
                case "rating-desc":
                    return b.rating - a.rating;
                case "popular":
                    return b.reviewsCount - a.reviewsCount;
                case "recommended":
                default:
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.rating - a.rating;
            }
        });
    }, [filters]);

    // Pagination calculations
    const total = filteredVenues.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const paginatedVenues = filteredVenues.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const paginationMeta = {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <SportsHeroHeader filters={filters} onChange={handleFilterChange} totalMatches={filteredVenues.length} viewMode={viewMode} onViewModeChange={handleViewModeChange} onOpenMobileFilters={() => setMobileFiltersOpen(true)} activeFiltersCount={activeFiltersCount} />

            {/* Active Filter Chips Bar */}
            {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
                    <span className="text-xs font-bold text-text-secondary mr-1">Active Filters:</span>

                    {filters.search && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Search: &ldquo;{filters.search}&rdquo;
                            <button type="button" onClick={() => handleFilterChange({ search: "" })} className="cursor-pointer hover:text-primary-hover">
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.category !== "all" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Type: {filters.category.replace("-", " ")}
                            <button type="button" onClick={() => handleFilterChange({ category: "all" })} className="cursor-pointer hover:text-primary-hover">
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.slot !== "any" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 capitalize">
                            Slot: {filters.slot}
                            <button type="button" onClick={() => handleFilterChange({ slot: "any" })} className="cursor-pointer hover:text-primary-hover">
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.surface !== "all" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {isBn ? "সারফেস:" : "Surface:"} {filters.surface}
                            <button type="button" onClick={() => handleFilterChange({ surface: "all" })} className="cursor-pointer hover:text-primary-hover">
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {(filters.minPrice !== null || filters.maxPrice !== null) && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {isBn ? "রেট:" : "Rate:"} {filters.minPrice ? `৳${isBn ? toBengaliDigits(filters.minPrice.toLocaleString()) : filters.minPrice.toLocaleString()}` : "৳০"} - {filters.maxPrice ? `৳${isBn ? toBengaliDigits(filters.maxPrice.toLocaleString()) : filters.maxPrice.toLocaleString()}` : isBn ? "যেকোনো" : "Any"}
                            <button type="button" onClick={() => handleFilterChange({ minPrice: null, maxPrice: null })} className="cursor-pointer hover:text-primary-hover">
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.verifiedOnly && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {isBn ? "যাচাইকৃত ভেন্যু" : "Verified Arenas"}
                            <button type="button" onClick={() => handleFilterChange({ verifiedOnly: false })} className="cursor-pointer hover:text-emerald-800">
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.amenities.map((amenity) => (
                        <span key={amenity} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-secondary text-foreground border border-border">
                            {amenity}
                            <button
                                type="button"
                                onClick={() =>
                                    handleFilterChange({
                                        amenities: filters.amenities.filter((a) => a !== amenity),
                                    })
                                }
                                className="cursor-pointer hover:text-rose-500"
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    ))}

                    <button type="button" onClick={handleResetFilters} className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 ml-auto cursor-pointer">
                        <RotateCcw className="size-3" />
                        <span>{isBn ? "সকল মুছুন" : "Clear All"}</span>
                    </button>
                </div>
            )}

            {/* Main Content Layout: Sidebar + Listings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Desktop Sticky Sidebar (1 col) */}
                <div className="hidden lg:block lg:col-span-1 sticky top-24">
                    <SportsFilterSidebar filters={filters} onChange={handleFilterChange} onReset={handleResetFilters} categoryCounts={categoryCounts} totalVenues={SPORTS_VENUES.length} />
                </div>

                {/* Listings Grid / List (3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                    {filteredVenues.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-16 px-4 bg-white dark:bg-card rounded-2xl border border-dashed border-border flex flex-col items-center">
                            <div className="size-16 rounded-full bg-surface-secondary flex items-center justify-center text-text-secondary mb-4">
                                <Trophy className="size-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-1">
                                {isBn ? "আপনার পছন্দের সাথে মিল রেখে কোনো ভেন্যু পাওয়া যায়নি" : "No Sports Arenas Match Your Criteria"}
                            </h3>
                            <p className="text-xs sm:text-sm text-text-secondary max-w-md mb-6">
                                {isBn ? "খেলার স্লট পরিবর্তন করুন, ঘণ্টার বাজেট সমন্বয় করুন অথবা সুবিধার ফিল্টার পরিষ্কার করুন।" : "Try expanding your preferred playing slot, adjusting hourly budget, or clearing facility filters."}
                            </p>
                            <button type="button" onClick={handleResetFilters} className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
                                <RotateCcw className="size-3.5" />
                                <span>{isBn ? "ফিল্টার রিসেট করুন" : "Reset All Filters"}</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Cards Container */}
                            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                                {paginatedVenues.map((venue) => (
                                    <SportsCard key={venue.id} venue={venue} viewMode={viewMode} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            <Pagination
                                meta={paginationMeta}
                                onPageChange={(newPage) => {
                                    setCurrentPage(newPage);
                                    syncUrlWithFilters(filters, viewMode, newPage);
                                    if (typeof window !== "undefined") {
                                        window.scrollTo({ top: 220, behavior: "smooth" });
                                    }
                                }}
                                className="pt-6 border-t border-border mt-8"
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Filter Modal Drawer */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div onClick={() => setMobileFiltersOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

                    {/* Drawer Panel */}
                    <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white dark:bg-card shadow-2xl p-4 overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
                        <SportsFilterSidebar filters={filters} onChange={handleFilterChange} onReset={handleResetFilters} categoryCounts={categoryCounts} totalVenues={SPORTS_VENUES.length} isMobileDrawer={true} onCloseMobileDrawer={() => setMobileFiltersOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};
