"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { RotateCcw, X, Building2 } from "@/components/Icons";
import { BuyCategory, BuyFiltersState, BuyProperty, BuySortOption } from "./types";
import { BUY_PROPERTIES } from "./buyData";
import { BuyHeroHeader } from "./BuyHeroHeader";
import { BuyFilterSidebar } from "./BuyFilterSidebar";
import { BuyCard } from "./BuyCard";
import { Pagination } from "@/components/Pagination";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

const INITIAL_FILTERS: BuyFiltersState = {
    search: "",
    category: "all",
    bedrooms: "all",
    status: "all",
    minPrice: null,
    maxPrice: null,
    amenities: [],
    verifiedOnly: false,
    sortBy: "recommended",
};

export const BuyListings = () => {
    const { locale } = useLocale();
    const isBn = locale === "bn";
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Initialize state directly from URL search params (clean React 19 pattern)
    const [filters, setFilters] = useState<BuyFiltersState>(() => {
        const querySearch = searchParams.get("search") || searchParams.get("location") || "";
        const queryCategory = searchParams.get("type") || searchParams.get("category") || "all";
        const queryBeds = searchParams.get("beds") || searchParams.get("bedrooms") || "all";
        const queryStatus = searchParams.get("status") || "all";

        const rawMinPrice = searchParams.get("minPrice");
        const rawMaxPrice = searchParams.get("maxPrice");
        const queryBudget = searchParams.get("budget") || "";

        let minP: number | null = rawMinPrice ? Number(rawMinPrice) : null;
        let maxP: number | null = rawMaxPrice ? Number(rawMaxPrice) : null;

        if (queryBudget === "under-1cr") {
            maxP = 10000000;
        } else if (queryBudget === "1cr-3cr") {
            minP = 10000000;
            maxP = 30000000;
        } else if (queryBudget === "3cr-5cr") {
            minP = 30000000;
            maxP = 50000000;
        } else if (queryBudget === "5cr-plus") {
            minP = 50000000;
        }

        const queryAmenities = searchParams.get("amenities") ? searchParams.get("amenities")!.split(",").filter(Boolean) : [];
        const queryVerified = searchParams.get("verified") === "true";
        const querySort = (searchParams.get("sort") as BuySortOption) || "recommended";

        return {
            search: querySearch,
            category: (queryCategory as BuyCategory) || "all",
            bedrooms: queryBeds,
            status: queryStatus,
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
        (nextFilters: BuyFiltersState, nextView: "grid" | "list", pageNum: number = 1) => {
            const params = new URLSearchParams();

            if (pageNum > 1) {
                params.set("page", String(pageNum));
            }
            if (nextFilters.category && nextFilters.category !== "all") {
                params.set("type", nextFilters.category);
            }
            if (nextFilters.search && nextFilters.search.trim()) {
                params.set("search", nextFilters.search.trim());
            }
            if (nextFilters.bedrooms && nextFilters.bedrooms !== "all") {
                params.set("beds", nextFilters.bedrooms);
            }
            if (nextFilters.status && nextFilters.status !== "all") {
                params.set("status", nextFilters.status);
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

    const handleFilterChange = (updated: Partial<BuyFiltersState>) => {
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
        const counts: Record<BuyCategory, number> = {
            all: BUY_PROPERTIES.length,
            apartments: 0,
            residential: 0,
            houses: 0,
            commercial: 0,
            land: 0,
            "new-developments": 0,
        };

        BUY_PROPERTIES.forEach((prop) => {
            if (counts[prop.category] !== undefined) {
                counts[prop.category]++;
            }
        });

        return counts;
    }, []);

    // Active filters count for mobile badge
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.category !== "all") count++;
        if (filters.bedrooms !== "all") count++;
        if (filters.status !== "all") count++;
        if (filters.minPrice !== null || filters.maxPrice !== null) count++;
        if (filters.amenities.length > 0) count += filters.amenities.length;
        if (filters.verifiedOnly) count++;
        if (filters.search.trim().length > 0) count++;
        return count;
    }, [filters]);

    // Filter and Sort Properties
    const filteredProperties = useMemo(() => {
        return BUY_PROPERTIES.filter((prop: BuyProperty) => {
            // Keyword Search
            if (filters.search.trim()) {
                const q = filters.search.toLowerCase().trim();
                const matchesTitle = prop.title.toLowerCase().includes(q);
                const matchesArea = prop.location.area.toLowerCase().includes(q);
                const matchesCity = prop.location.city.toLowerCase().includes(q);
                const matchesCat = prop.categoryLabel.toLowerCase().includes(q);
                const matchesDev = prop.developer.name.toLowerCase().includes(q);
                if (!matchesTitle && !matchesArea && !matchesCity && !matchesCat && !matchesDev) {
                    return false;
                }
            }

            // Category Filter
            if (filters.category !== "all" && prop.category !== filters.category) {
                return false;
            }

            // Bedrooms Filter
            if (filters.bedrooms !== "all") {
                if (filters.bedrooms === "4+") {
                    if (prop.beds < 4) return false;
                } else {
                    if (prop.beds !== Number(filters.bedrooms)) return false;
                }
            }

            // Status Filter
            if (filters.status !== "all" && prop.completionStatus !== filters.status) {
                return false;
            }

            // Price Min Filter
            if (filters.minPrice !== null && prop.price < filters.minPrice) {
                return false;
            }

            // Price Max Filter
            if (filters.maxPrice !== null && prop.price > filters.maxPrice) {
                return false;
            }

            // Amenities Filter
            if (filters.amenities.length > 0) {
                const hasAllAmenities = filters.amenities.every((a) => prop.amenities.includes(a));
                if (!hasAllAmenities) return false;
            }

            // Verified Only
            if (filters.verifiedOnly && !prop.verified) {
                return false;
            }

            return true;
        }).sort((a, b) => {
            // Sorting Logic
            switch (filters.sortBy) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "sqft-desc":
                    return b.sqft - a.sqft;
                case "newest":
                    return b.id.localeCompare(a.id);
                case "recommended":
                default:
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.rating - a.rating;
            }
        });
    }, [filters]);

    // Pagination calculations
    const total = filteredProperties.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const paginatedProperties = filteredProperties.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
            <BuyHeroHeader filters={filters} onChange={handleFilterChange} totalMatches={filteredProperties.length} viewMode={viewMode} onViewModeChange={handleViewModeChange} onOpenMobileFilters={() => setMobileFiltersOpen(true)} activeFiltersCount={activeFiltersCount} />

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

                    {filters.status !== "all" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {isBn ? "অবস্থা:" : "Status:"} {filters.status}
                            <button type="button" onClick={() => handleFilterChange({ status: "all" })} className="cursor-pointer hover:text-primary-hover">
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.bedrooms !== "all" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {isBn ? "বেডরুম:" : "Beds:"} {isBn ? toBengaliDigits(filters.bedrooms) : filters.bedrooms}
                            <button type="button" onClick={() => handleFilterChange({ bedrooms: "all" })} className="cursor-pointer hover:text-primary-hover">
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {(filters.minPrice !== null || filters.maxPrice !== null) && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {isBn ? "বাজেট:" : "Budget:"}{" "}
                            {filters.minPrice ? `৳${isBn ? toBengaliDigits((filters.minPrice / 10000000).toFixed(2)) + " কোটি" : (filters.minPrice / 10000000).toFixed(2) + " Cr"}` : "৳০"} -{" "}
                            {filters.maxPrice ? `৳${isBn ? toBengaliDigits((filters.maxPrice / 10000000).toFixed(2)) + " কোটি" : (filters.maxPrice / 10000000).toFixed(2) + " Cr"}` : isBn ? "যেকোনো" : "Any"}
                            <button type="button" onClick={() => handleFilterChange({ minPrice: null, maxPrice: null })} className="cursor-pointer hover:text-primary-hover">
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.verifiedOnly && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {isBn ? "যাচাইকৃত দলিল" : "Verified Title"}
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
                    <BuyFilterSidebar filters={filters} onChange={handleFilterChange} onReset={handleResetFilters} categoryCounts={categoryCounts} totalProperties={BUY_PROPERTIES.length} />
                </div>

                {/* Listings Grid / List (3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                    {filteredProperties.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-16 px-4 bg-white dark:bg-card rounded-2xl border border-dashed border-border flex flex-col items-center">
                            <div className="size-16 rounded-full bg-surface-secondary flex items-center justify-center text-text-secondary mb-4">
                                <Building2 className="size-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-1">
                                {isBn ? "আপনার পছন্দের সাথে মিল রেখে বিক্রির কোনো প্রোপার্টি পাওয়া যায়নি" : "No Properties for Sale Match Your Criteria"}
                            </h3>
                            <p className="text-xs sm:text-sm text-text-secondary max-w-md mb-6">
                                {isBn ? "বাজেটের পরিধি বাড়ান, বেডরুমের শর্ত শিথিল করুন অথবা লোকেশন অনুসন্ধান বিস্তৃত করুন।" : "Try expanding your budget range, removing bedroom limits, or broadening your location search."}
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
                                {paginatedProperties.map((prop) => (
                                    <BuyCard key={prop.id} property={prop} viewMode={viewMode} />
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
                        <BuyFilterSidebar filters={filters} onChange={handleFilterChange} onReset={handleResetFilters} categoryCounts={categoryCounts} totalProperties={BUY_PROPERTIES.length} isMobileDrawer={true} onCloseMobileDrawer={() => setMobileFiltersOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};
