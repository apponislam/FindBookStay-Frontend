"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
    RotateCcw,
    X,
    Building2,
} from "@/components/Icons";
import { BookCategory, BookFiltersState, BookStay, BookSortOption } from "./types";
import { BOOK_STAYS } from "./bookData";
import { BookHeroHeader } from "./BookHeroHeader";
import { BookFilterSidebar } from "./BookFilterSidebar";
import { BookCard } from "./BookCard";
import { Pagination } from "@/components/Pagination";

const INITIAL_FILTERS: BookFiltersState = {
    search: "",
    category: "all",
    checkIn: "",
    checkOut: "",
    guests: "any",
    rooms: "any",
    minPrice: null,
    maxPrice: null,
    minRating: "any",
    amenities: [],
    verifiedOnly: false,
    sortBy: "recommended",
};

export const BookListings = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Initialize state directly from URL search params (clean React 19 pattern)
    const [filters, setFilters] = useState<BookFiltersState>(() => {
        const querySearch = searchParams.get("search") || searchParams.get("location") || "";
        const queryCategory = searchParams.get("category") || searchParams.get("type") || "all";
        const queryCheckIn = searchParams.get("checkin") || searchParams.get("checkIn") || "";
        const queryCheckOut = searchParams.get("checkout") || searchParams.get("checkOut") || "";
        const rawGuests = searchParams.get("guests");
        const queryGuests = rawGuests && rawGuests !== "any" ? Number(rawGuests) : "any";
        const rawRooms = searchParams.get("rooms");
        const queryRooms = rawRooms && rawRooms !== "any" ? Number(rawRooms) : "any";

        const rawMinPrice = searchParams.get("minPrice");
        const rawMaxPrice = searchParams.get("maxPrice");
        const rawRating = searchParams.get("rating") || searchParams.get("minRating");
        const queryRating = rawRating && rawRating !== "any" ? Number(rawRating) : "any";

        const queryAmenities = searchParams.get("amenities")
            ? searchParams.get("amenities")!.split(",").filter(Boolean)
            : [];
        const queryVerified = searchParams.get("verified") === "true";
        const querySort = (searchParams.get("sort") as BookSortOption) || "recommended";

        return {
            search: querySearch,
            category: (queryCategory as BookCategory) || "all",
            checkIn: queryCheckIn,
            checkOut: queryCheckOut,
            guests: queryGuests,
            rooms: queryRooms,
            minPrice: rawMinPrice ? Number(rawMinPrice) : null,
            maxPrice: rawMaxPrice ? Number(rawMaxPrice) : null,
            minRating: queryRating,
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
        (nextFilters: BookFiltersState, nextView: "grid" | "list", pageNum: number = 1) => {
            const params = new URLSearchParams();

            if (pageNum > 1) {
                params.set("page", String(pageNum));
            }
            if (nextFilters.category && nextFilters.category !== "all") {
                params.set("category", nextFilters.category);
            }
            if (nextFilters.search && nextFilters.search.trim()) {
                params.set("search", nextFilters.search.trim());
            }
            if (nextFilters.checkIn) {
                params.set("checkin", nextFilters.checkIn);
            }
            if (nextFilters.checkOut) {
                params.set("checkout", nextFilters.checkOut);
            }
            if (nextFilters.guests !== "any") {
                params.set("guests", String(nextFilters.guests));
            }
            if (nextFilters.rooms !== "any") {
                params.set("rooms", String(nextFilters.rooms));
            }
            if (nextFilters.minPrice !== null && nextFilters.minPrice > 0) {
                params.set("minPrice", String(nextFilters.minPrice));
            }
            if (nextFilters.maxPrice !== null && nextFilters.maxPrice > 0) {
                params.set("maxPrice", String(nextFilters.maxPrice));
            }
            if (nextFilters.minRating !== "any") {
                params.set("rating", String(nextFilters.minRating));
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
        [pathname, router]
    );

    const handleFilterChange = (updated: Partial<BookFiltersState>) => {
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
        const counts: Record<BookCategory, number> = {
            all: BOOK_STAYS.length,
            hotels: 0,
            resorts: 0,
            "holiday-homes": 0,
            "guest-houses": 0,
            "short-stay": 0,
            luxury: 0,
        };

        BOOK_STAYS.forEach((stay) => {
            if (counts[stay.category] !== undefined) {
                counts[stay.category]++;
            }
        });

        return counts;
    }, []);

    // Active filters count for mobile badge
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.category !== "all") count++;
        if (filters.checkIn !== "" || filters.checkOut !== "") count++;
        if (filters.guests !== "any") count++;
        if (filters.minPrice !== null || filters.maxPrice !== null) count++;
        if (filters.minRating !== "any") count++;
        if (filters.amenities.length > 0) count += filters.amenities.length;
        if (filters.verifiedOnly) count++;
        if (filters.search.trim().length > 0) count++;
        return count;
    }, [filters]);

    // Filter and Sort Stays
    const filteredStays = useMemo(() => {
        return BOOK_STAYS.filter((stay: BookStay) => {
            // Keyword Search
            if (filters.search.trim()) {
                const q = filters.search.toLowerCase().trim();
                const matchesTitle = stay.title.toLowerCase().includes(q);
                const matchesArea = stay.location.area.toLowerCase().includes(q);
                const matchesCity = stay.location.city.toLowerCase().includes(q);
                const matchesCat = stay.categoryLabel.toLowerCase().includes(q);
                if (!matchesTitle && !matchesArea && !matchesCity && !matchesCat) {
                    return false;
                }
            }

            // Category Filter
            if (filters.category !== "all" && stay.category !== filters.category) {
                return false;
            }

            // Guests Capacity Filter
            if (filters.guests !== "any" && stay.maxGuests < Number(filters.guests)) {
                return false;
            }

            // Price Min Filter
            if (filters.minPrice !== null && stay.price < filters.minPrice) {
                return false;
            }

            // Price Max Filter
            if (filters.maxPrice !== null && stay.price > filters.maxPrice) {
                return false;
            }

            // Rating Filter
            if (filters.minRating !== "any" && stay.rating < Number(filters.minRating)) {
                return false;
            }

            // Amenities Filter (stay must have all checked amenities)
            if (filters.amenities.length > 0) {
                const hasAllAmenities = filters.amenities.every((a) =>
                    stay.amenities.includes(a)
                );
                if (!hasAllAmenities) return false;
            }

            // Verified Only
            if (filters.verifiedOnly && !stay.verified) {
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
    const total = filteredStays.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const paginatedStays = filteredStays.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
            <BookHeroHeader
                filters={filters}
                onChange={handleFilterChange}
                totalMatches={filteredStays.length}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                onOpenMobileFilters={() => setMobileFiltersOpen(true)}
                activeFiltersCount={activeFiltersCount}
            />

            {/* Active Filter Chips Bar */}
            {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
                    <span className="text-xs font-bold text-text-secondary mr-1">
                        Active Filters:
                    </span>

                    {filters.search && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Search: &ldquo;{filters.search}&rdquo;
                            <button
                                type="button"
                                onClick={() => handleFilterChange({ search: "" })}
                                className="cursor-pointer hover:text-primary-hover"
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.category !== "all" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Type: {filters.category.replace("-", " ")}
                            <button
                                type="button"
                                onClick={() => handleFilterChange({ category: "all" })}
                                className="cursor-pointer hover:text-primary-hover"
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.checkIn && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            In: {filters.checkIn}
                            <button
                                type="button"
                                onClick={() => handleFilterChange({ checkIn: "" })}
                                className="cursor-pointer hover:text-primary-hover"
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.checkOut && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Out: {filters.checkOut}
                            <button
                                type="button"
                                onClick={() => handleFilterChange({ checkOut: "" })}
                                className="cursor-pointer hover:text-primary-hover"
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.guests !== "any" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Guests: {filters.guests}+
                            <button
                                type="button"
                                onClick={() => handleFilterChange({ guests: "any" })}
                                className="cursor-pointer hover:text-primary-hover"
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {(filters.minPrice !== null || filters.maxPrice !== null) && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Budget: {filters.minPrice ? `৳${filters.minPrice.toLocaleString()}` : "৳0"} -{" "}
                            {filters.maxPrice ? `৳${filters.maxPrice.toLocaleString()}` : "Any"}
                            <button
                                type="button"
                                onClick={() => handleFilterChange({ minPrice: null, maxPrice: null })}
                                className="cursor-pointer hover:text-primary-hover"
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.minRating !== "any" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Rating: {filters.minRating}+
                            <button
                                type="button"
                                onClick={() => handleFilterChange({ minRating: "any" })}
                                className="cursor-pointer hover:text-primary-hover"
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.verifiedOnly && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Verified Stays
                            <button
                                type="button"
                                onClick={() => handleFilterChange({ verifiedOnly: false })}
                                className="cursor-pointer hover:text-emerald-800"
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    )}

                    {filters.amenities.map((amenity) => (
                        <span
                            key={amenity}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-secondary text-foreground border border-border"
                        >
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

                    <button
                        type="button"
                        onClick={handleResetFilters}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 ml-auto cursor-pointer"
                    >
                        <RotateCcw className="size-3" />
                        <span>Clear All</span>
                    </button>
                </div>
            )}

            {/* Main Content Layout: Sidebar + Listings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Desktop Sticky Sidebar (1 col) */}
                <div className="hidden lg:block lg:col-span-1 sticky top-24">
                    <BookFilterSidebar
                        filters={filters}
                        onChange={handleFilterChange}
                        onReset={handleResetFilters}
                        categoryCounts={categoryCounts}
                        totalStays={BOOK_STAYS.length}
                    />
                </div>

                {/* Listings Grid / List (3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                    {filteredStays.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-border flex flex-col items-center">
                            <div className="size-16 rounded-full bg-surface-secondary flex items-center justify-center text-text-secondary mb-4">
                                <Building2 className="size-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-1">
                                No Stays Match Your Criteria
                            </h3>
                            <p className="text-xs sm:text-sm text-text-secondary max-w-md mb-6">
                                Try expanding your travel dates, adjusting your budget range, or clearing amenities filters.
                            </p>
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                            >
                                <RotateCcw className="size-3.5" />
                                <span>Reset All Filters</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Cards Container */}
                            <div
                                className={
                                    viewMode === "grid"
                                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                        : "space-y-4"
                                }
                            >
                                {paginatedStays.map((stay) => (
                                    <BookCard
                                        key={stay.id}
                                        stay={stay}
                                        viewMode={viewMode}
                                    />
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
                    <div
                        onClick={() => setMobileFiltersOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                    />

                    {/* Drawer Panel */}
                    <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl p-4 overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
                        <BookFilterSidebar
                            filters={filters}
                            onChange={handleFilterChange}
                            onReset={handleResetFilters}
                            categoryCounts={categoryCounts}
                            totalStays={BOOK_STAYS.length}
                            isMobileDrawer={true}
                            onCloseMobileDrawer={() => setMobileFiltersOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

