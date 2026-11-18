export type RentCategory = "all" | "family-apartments" | "family-houses" | "bachelor-seats" | "shared-rooms" | "sublets" | "commercial";

export interface RentProperty {
    id: string;
    title: string;
    slug: string;
    category: RentCategory;
    categoryLabel: string;
    location: {
        area: string;
        city: string;
        address: string;
    };
    price: number;
    priceFormatted: string;
    pricePeriod: string;
    beds: number;
    baths: number;
    sqft: number;
    images: string[];
    badge: string;
    verified: boolean;
    featured?: boolean;
    furnishing: "Furnished" | "Semi-Furnished" | "Unfurnished";
    amenities: string[];
    availableFrom: string;
    host: {
        name: string;
        type: "Owner" | "Agent" | "Verified Host";
        phone?: string;
    };
    rating: number;
    reviewsCount: number;
}

export type SortOption = "recommended" | "price-asc" | "price-desc" | "newest" | "sqft-desc";

export interface RentFiltersState {
    search: string;
    category: RentCategory;
    minPrice: number | null;
    maxPrice: number | null;
    bedrooms: string; // "all" | "1" | "2" | "3" | "4+"
    furnishing: string; // "all" | "Furnished" | "Semi-Furnished" | "Unfurnished"
    amenities: string[];
    verifiedOnly: boolean;
    sortBy: SortOption;
}
