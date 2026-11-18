"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    MapPin,
    Home,
    Hotel,
    Trophy,
    Building2,
    Calendar,
    Users,
    DollarSign,
} from "@/components/Icons";

type SearchCategory = "rent" | "book" | "sports" | "buy";

export const HomeSearchBar = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<SearchCategory>("rent");

    // Common search states
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("all");
    const [priceRange, setPriceRange] = useState("all");
    const [dates, setDates] = useState("");
    const [guests, setGuests] = useState("1");
    const [sportType, setSportType] = useState("all");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("location", location);

        if (activeTab === "rent") {
            if (propertyType !== "all") params.set("type", propertyType);
            if (priceRange !== "all") params.set("budget", priceRange);
            router.push(`/rent?${params.toString()}`);
        } else if (activeTab === "book") {
            if (dates) params.set("dates", dates);
            if (guests) params.set("guests", guests);
            router.push(`/book?${params.toString()}`);
        } else if (activeTab === "sports") {
            if (sportType !== "all") params.set("sport", sportType);
            router.push(`/sports?${params.toString()}`);
        } else if (activeTab === "buy") {
            if (propertyType !== "all") params.set("type", propertyType);
            if (priceRange !== "all") params.set("budget", priceRange);
            router.push(`/buy?${params.toString()}`);
        }
    };

    return (
        <div className="w-full relative z-30 -mt-10 sm:-mt-14 mb-10">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
                    {/* Purpose Tabs */}
                    <div className="flex items-center gap-1 p-2 sm:p-3 bg-surface-secondary/70 border-b border-border overflow-x-auto scrollbar-none">
                        <button
                            type="button"
                            onClick={() => setActiveTab("rent")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "rent"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-text-secondary hover:text-foreground hover:bg-white"
                            }`}
                        >
                            <Home className="size-4" />
                            <span>Rent</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("book")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "book"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-text-secondary hover:text-foreground hover:bg-white"
                            }`}
                        >
                            <Hotel className="size-4" />
                            <span>Book Stays</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("sports")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "sports"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-text-secondary hover:text-foreground hover:bg-white"
                            }`}
                        >
                            <Trophy className="size-4" />
                            <span>Sports</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("buy")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "buy"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-text-secondary hover:text-foreground hover:bg-white"
                            }`}
                        >
                            <Building2 className="size-4" />
                            <span>Buy Property</span>
                        </button>
                    </div>

                    {/* Dynamic Search Fields */}
                    <form onSubmit={handleSearch} className="p-4 sm:p-6" autoComplete="off">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
                            {/* Field 1: Location / City */}
                            <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface hover:bg-surface-secondary border border-border transition-colors">
                                <label
                                    htmlFor="fbs_search_location"
                                    className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5"
                                >
                                    <MapPin className="size-3.5 text-accent" />
                                    <span>Location</span>
                                </label>
                                <input
                                    id="fbs_search_location"
                                    name="fbs_search_location"
                                    type="search"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    data-lpignore="true"
                                    data-form-type="other"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder={
                                        activeTab === "sports"
                                            ? "City or Turf Area..."
                                            : "City, Area or Landmark..."
                                    }
                                    className="bg-transparent text-sm font-semibold text-foreground placeholder:text-text-secondary/60 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                                />
                            </div>

                            {/* Field 2: Contextual Type */}
                            {activeTab === "rent" && (
                                <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface hover:bg-surface-secondary border border-border transition-colors">
                                    <label
                                        htmlFor="fbs_rental_type"
                                        className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5"
                                    >
                                        <Home className="size-3.5 text-accent" />
                                        <span>Rental Type</span>
                                    </label>
                                    <select
                                        id="fbs_rental_type"
                                        name="fbs_rental_type"
                                        value={propertyType}
                                        onChange={(e) => setPropertyType(e.target.value)}
                                        className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
                                    >
                                        <option value="all">All Rentals</option>
                                        <option value="family-apartments">Family Apartments</option>
                                        <option value="family-houses">Family Houses</option>
                                        <option value="bachelor-seats">Bachelor Seats</option>
                                        <option value="shared-rooms">Shared Rooms</option>
                                        <option value="sublets">Monthly Sublets</option>
                                        <option value="commercial">Commercial</option>
                                    </select>
                                </div>
                            )}

                            {activeTab === "book" && (
                                <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface hover:bg-surface-secondary border border-border transition-colors">
                                    <label
                                        htmlFor="fbs_stay_dates"
                                        className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5"
                                    >
                                        <Calendar className="size-3.5 text-accent" />
                                        <span>Check-in Date</span>
                                    </label>
                                    <input
                                        id="fbs_stay_dates"
                                        name="fbs_stay_dates"
                                        type="date"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                        spellCheck={false}
                                        data-lpignore="true"
                                        data-form-type="other"
                                        value={dates}
                                        onChange={(e) => setDates(e.target.value)}
                                        className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
                                    />
                                </div>
                            )}

                            {activeTab === "sports" && (
                                <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface hover:bg-surface-secondary border border-border transition-colors">
                                    <label
                                        htmlFor="fbs_sport_type"
                                        className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5"
                                    >
                                        <Trophy className="size-3.5 text-accent" />
                                        <span>Sport Arena</span>
                                    </label>
                                    <select
                                        id="fbs_sport_type"
                                        name="fbs_sport_type"
                                        value={sportType}
                                        onChange={(e) => setSportType(e.target.value)}
                                        className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
                                    >
                                        <option value="all">All Venues</option>
                                        <option value="turf-booking">Soccer & Cricket Turf</option>
                                        <option value="football-grounds">Football Grounds</option>
                                        <option value="indoor-sports">Badminton & Indoor</option>
                                        <option value="swimming">Swimming & Wellness</option>
                                        <option value="tournaments">Tournaments</option>
                                    </select>
                                </div>
                            )}

                            {activeTab === "buy" && (
                                <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface hover:bg-surface-secondary border border-border transition-colors">
                                    <label
                                        htmlFor="fbs_buy_property_type"
                                        className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5"
                                    >
                                        <Building2 className="size-3.5 text-accent" />
                                        <span>Property Type</span>
                                    </label>
                                    <select
                                        id="fbs_buy_property_type"
                                        name="fbs_buy_property_type"
                                        value={propertyType}
                                        onChange={(e) => setPropertyType(e.target.value)}
                                        className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
                                    >
                                        <option value="all">All Properties</option>
                                        <option value="apartments">Apartments & Flats</option>
                                        <option value="houses">Houses & Villas</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="land">Land & Plots</option>
                                        <option value="new-developments">New Developments</option>
                                    </select>
                                </div>
                            )}

                            {/* Field 3: Budget or Capacity */}
                            {activeTab === "book" ? (
                                <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface hover:bg-surface-secondary border border-border transition-colors">
                                    <label
                                        htmlFor="fbs_search_guests"
                                        className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5"
                                    >
                                        <Users className="size-3.5 text-accent" />
                                        <span>Guests</span>
                                    </label>
                                    <select
                                        id="fbs_search_guests"
                                        name="fbs_search_guests"
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
                                    >
                                        <option value="1">1 Guest</option>
                                        <option value="2">2 Guests</option>
                                        <option value="3-4">3-4 Guests (Family)</option>
                                        <option value="5+">5+ Guests (Group)</option>
                                    </select>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface hover:bg-surface-secondary border border-border transition-colors">
                                    <label
                                        htmlFor="fbs_search_budget"
                                        className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5"
                                    >
                                        <DollarSign className="size-3.5 text-accent" />
                                        <span>
                                            {activeTab === "sports" ? "Slot Type" : "Budget Range"}
                                        </span>
                                    </label>
                                    <select
                                        id="fbs_search_budget"
                                        name="fbs_search_budget"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(e.target.value)}
                                        className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
                                    >
                                        {activeTab === "sports" ? (
                                            <>
                                                <option value="all">Any Slot</option>
                                                <option value="morning">Morning (6 AM - 12 PM)</option>
                                                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                                                <option value="evening">Evening Floodlight (5 PM - 11 PM)</option>
                                            </>
                                        ) : activeTab === "buy" ? (
                                            <>
                                                <option value="all">Any Price</option>
                                                <option value="under-50l">Under ৳50 Lakh</option>
                                                <option value="50l-1cr">৳50 Lakh - ৳1 Crore</option>
                                                <option value="1cr-3cr">৳1 Crore - ৳3 Crore</option>
                                                <option value="3cr+">৳3 Crore+</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="all">Any Budget</option>
                                                <option value="under-10k">Under ৳10,000 / mo</option>
                                                <option value="10k-25k">৳10,000 - ৳25,000 / mo</option>
                                                <option value="25k-50k">৳25,000 - ৳50,000 / mo</option>
                                                <option value="50k+">৳50,000+ / mo</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            )}

                            {/* Search Button */}
                            <div className="flex items-center gap-2 pt-1 sm:pt-0">
                                <button
                                    type="submit"
                                    className="w-full h-13.5 inline-flex items-center justify-center gap-2.5 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                                >
                                    <Search className="size-4" />
                                    <span>Search Available</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomeSearchBar;
