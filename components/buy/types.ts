export type BuyCategory = "all" | "apartments" | "residential" | "houses" | "commercial" | "land" | "new-developments";

export interface BuyProperty {
    id: string;
    title: string;
    slug: string;
    category: BuyCategory;
    categoryLabel: string;
    location: {
        area: string;
        city: string;
        address: string;
    };
    price: number;
    priceFormatted: string;
    pricePerSqft?: string;
    beds: number;
    baths: number;
    sqft: number;
    completionStatus: "Ready to Move" | "Under Construction" | "Handover 2027" | "Vacant Plot";
    images: string[];
    rating: number;
    reviewsCount: number;
    badge: string;
    verified: boolean;
    featured?: boolean;
    amenities: string[];
    developer: {
        name: string;
        type: "Direct Owner" | "Verified Developer" | "Exclusive Agency";
        phone?: string;
    };
}

export type BuySortOption = "recommended" | "price-asc" | "price-desc" | "sqft-desc" | "newest";

export interface BuyFiltersState {
    search: string;
    category: BuyCategory;
    bedrooms: string;
    status: string;
    minPrice: number | null;
    maxPrice: number | null;
    amenities: string[];
    verifiedOnly: boolean;
    sortBy: BuySortOption;
}
