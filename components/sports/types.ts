export type SportsCategory =
    | "all"
    | "turf-booking"
    | "football-grounds"
    | "indoor-sports"
    | "swimming"
    | "tournaments"
    | "other-activities";

export type TimeSlot = "any" | "morning" | "afternoon" | "evening" | "night";

export interface SportsVenue {
    id: string;
    name: string;
    slug: string;
    category: SportsCategory;
    categoryLabel: string;
    sports: string[];
    location: {
        area: string;
        city: string;
        address: string;
    };
    hourlyPrice: number;
    priceFormatted: string;
    priceUnit: string;
    images: string[];
    rating: number;
    reviewsCount: number;
    surfaceType: string;
    capacity: string;
    slotsAvailable: TimeSlot[];
    nextSlot: string;
    badge: string;
    verified: boolean;
    featured?: boolean;
    amenities: string[];
    rules: string[];
    host: {
        name: string;
        type: "Arena Operator" | "Sports Complex";
        phone?: string;
    };
}

export type SportsSortOption =
    | "recommended"
    | "price-asc"
    | "price-desc"
    | "rating-desc"
    | "popular";

export interface SportsFiltersState {
    search: string;
    category: SportsCategory;
    slot: TimeSlot;
    surface: string;
    minPrice: number | null;
    maxPrice: number | null;
    amenities: string[];
    verifiedOnly: boolean;
    sortBy: SportsSortOption;
}
