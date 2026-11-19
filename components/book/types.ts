export type BookCategory =
    | "all"
    | "hotels"
    | "resorts"
    | "guest-houses"
    | "holiday-homes"
    | "short-stay"
    | "luxury";

export interface BookStay {
    id: string;
    title: string;
    slug: string;
    category: BookCategory;
    categoryLabel: string;
    location: {
        area: string;
        city: string;
        address: string;
    };
    price: number;
    priceFormatted: string;
    pricePeriod: string;
    images: string[];
    rating: number;
    reviewsCount: number;
    badge: string;
    verified: boolean;
    featured?: boolean;
    maxGuests: number;
    bedrooms: number;
    beds: number;
    baths: number;
    amenities: string[];
    cancellationPolicy: string;
    host: {
        name: string;
        type: "Superhost" | "Verified Hotel" | "Resort Host";
        responseTime?: string;
    };
    description?: string;
    checkInTime?: string;
    checkOutTime?: string;
    houseRules?: string[];
    roomTypes?: {
        name: string;
        beds: string;
        price: number;
        priceFormatted: string;
        capacity: string;
        features: string[];
    }[];
    nearbyAttractions?: {
        name: string;
        distance: string;
        type: string;
    }[];
    reviews?: {
        author: string;
        rating: number;
        date: string;
        comment: string;
    }[];
}

export type BookSortOption =
    | "recommended"
    | "price-asc"
    | "price-desc"
    | "rating-desc"
    | "popular";

export interface BookFiltersState {
    search: string;
    category: BookCategory;
    checkIn: string;
    checkOut: string;
    guests: number | "any";
    rooms: number | "any";
    minPrice: number | null;
    maxPrice: number | null;
    minRating: number | "any";
    amenities: string[];
    verifiedOnly: boolean;
    sortBy: BookSortOption;
}

