export interface SavedListingItem {
    id: string;
    title: string;
    type: string;
    category: "rent" | "book" | "sports" | "buy";
    location: string;
    price: string;
    pricePeriod: string;
    image: string;
    badge: string;
    href: string;
    specs: string[];
    savedAt: string;
}

export const INITIAL_SAVED_LISTINGS: SavedListingItem[] = [
    {
        id: "saved-1",
        title: "Modern 3BHK Family Flat in Prime Area",
        type: "Family Apartment",
        category: "rent",
        location: "Block D, Bashundhara R/A, Dhaka",
        price: "৳32,000",
        pricePeriod: "/ month",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        badge: "Verified Landlord",
        href: "/rent/family-apartments",
        specs: ["3 Beds", "3 Baths", "1,650 sqft"],
        savedAt: "Saved yesterday",
    },
    {
        id: "saved-2",
        title: "The Grand Waterfront Luxury Resort & Spa",
        type: "Luxury Resort",
        category: "book",
        location: "Marine Drive, Cox's Bazar",
        price: "৳12,500",
        pricePeriod: "/ night",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        badge: "Top Rated 4.9",
        href: "/book/resorts",
        specs: ["Infinity Pool", "Ocean View", "Free Breakfast"],
        savedAt: "Saved 2 days ago",
    },
    {
        id: "saved-3",
        title: "Green Horizon Standard Football Stadium Ground",
        type: "Soccer & Cricket Turf",
        category: "sports",
        location: "Sector 4, Uttara, Dhaka",
        price: "৳2,200",
        pricePeriod: "/ hour",
        image: "https://images.unsplash.com/photo-1529900241457-3f3659c25bb0?auto=format&fit=crop&w=800&q=80",
        badge: "Instant Slot",
        href: "/sports/turf-booking",
        specs: ["Floodlights", "FIFA Grass", "Changing Rooms"],
        savedAt: "Saved 3 days ago",
    },
];
