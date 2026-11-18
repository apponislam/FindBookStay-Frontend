"use client";

import React, { useState, useRef, useEffect } from "react";
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
    Check,
    Plus,
    X,
    Clock,
    Sparkles,
    ChevronDown,
} from "@/components/Icons";

type SearchCategory = "rent" | "book" | "sports" | "buy";

interface LocationSuggestion {
    city: string;
    area: string;
    tag: string;
}

const POPULAR_LOCATIONS: LocationSuggestion[] = [
    { city: "Dhaka", area: "Gulshan & Banani", tag: "Diplomatic & Luxury" },
    { city: "Dhaka", area: "Bashundhara R/A", tag: "Family & Campus" },
    { city: "Dhaka", area: "Dhanmondi", tag: "Cultural Hub" },
    { city: "Dhaka", area: "Uttara", tag: "Metro & Airport" },
    { city: "Dhaka", area: "Mirpur", tag: "Affordable Living" },
    { city: "Chittagong", area: "GEC Circle", tag: "Commercial Port" },
    { city: "Cox's Bazar", area: "Marine Drive", tag: "Beachfront Stays" },
    { city: "Sylhet", area: "Sreemangal", tag: "Nature & Tea Estates" },
];

const RENTAL_TYPES = [
    { id: "family-apartments", label: "Family Apartments", desc: "2 to 4 BHK rental flats", icon: Home },
    { id: "bachelor-seats", label: "Bachelor Seats", desc: "Single & shared with utilities", icon: Users },
    { id: "family-houses", label: "Houses & Duplexes", desc: "Independent villas & homes", icon: Building2 },
    { id: "sublets", label: "Monthly Sublets", desc: "Furnished short/medium term", icon: Calendar },
    { id: "commercial", label: "Commercial Space", desc: "Offices, stores & showrooms", icon: Building2 },
];

const STAY_TYPES = [
    { id: "resorts", label: "Nature Resorts", desc: "Beachfront, lake & hills", icon: Hotel },
    { id: "hotels", label: "Boutique Hotels", desc: "City center & 5-star stays", icon: Hotel },
    { id: "holiday-homes", label: "Holiday Homes", desc: "Private vacation villas", icon: Home },
    { id: "guest-houses", label: "Guest Houses", desc: "Cozy bed & breakfast", icon: Home },
    { id: "short-stay", label: "Serviced Suites", desc: "Executive serviced flats", icon: Building2 },
];

const SPORT_TYPES = [
    { id: "turf-booking", label: "Soccer & Cricket Turf", desc: "Floodlit artificial grass", icon: Trophy },
    { id: "indoor-sports", label: "Indoor Arenas", desc: "Badminton, basketball & futsal", icon: Trophy },
    { id: "football-grounds", label: "Football Grounds", desc: "Standard 11v11 grass grounds", icon: Trophy },
    { id: "swimming", label: "Swimming & Wellness", desc: "Olympic pools & fitness clubs", icon: Trophy },
];

const BUY_TYPES = [
    { id: "apartments", label: "Apartments & Flats", desc: "Luxury residential high-rise", icon: Building2 },
    { id: "houses", label: "Houses & Villas", desc: "Standalone homes & duplexes", icon: Home },
    { id: "land", label: "Land & Plots", desc: "Verified freehold plots", icon: MapPin },
    { id: "commercial", label: "Commercial Plazas", desc: "Retail spaces & office floors", icon: Building2 },
    { id: "new-developments", label: "New Developments", desc: "Pre-launch gated projects", icon: Sparkles },
];

export const HomeSearchBar = () => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    // Active Category Tab
    const [activeTab, setActiveTab] = useState<SearchCategory>("rent");

    // Active Dropdown Popover
    const [openPopover, setOpenPopover] = useState<"location" | "type" | "seg3" | "seg4" | null>(null);

    // Form Filter States
    const [location, setLocation] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedTypeLabel, setSelectedTypeLabel] = useState<string>("All Categories");

    // Dates for Stays (Book)
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");

    // Guests for Stays (Book)
    const [adults, setAdults] = useState(2);
    const [childrenCount, setChildrenCount] = useState(0);
    const [rooms, setRooms] = useState(1);

    // Bedrooms for Rent & Buy
    const [bedroomCount, setBedroomCount] = useState<string>("any");

    // Time Slot for Sports
    const [sportSlot, setSportSlot] = useState<string>("any");

    // Budget Range
    const [budgetRange, setBudgetRange] = useState<string>("any");

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpenPopover(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenPopover(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Switch Category Tab
    const handleTabSwitch = (tab: SearchCategory) => {
        setActiveTab(tab);
        setSelectedType("all");
        setSelectedTypeLabel("All Categories");
        setOpenPopover(null);
    };

    // Form Submit Handler
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenPopover(null);

        const params = new URLSearchParams();
        if (location.trim()) params.set("location", location.trim());

        if (activeTab === "rent") {
            if (selectedType !== "all") params.set("type", selectedType);
            if (bedroomCount !== "any") params.set("beds", bedroomCount);
            if (budgetRange !== "any") params.set("budget", budgetRange);
            router.push(`/rent?${params.toString()}`);
        } else if (activeTab === "book") {
            if (selectedType !== "all") params.set("type", selectedType);
            if (checkInDate) params.set("checkin", checkInDate);
            if (checkOutDate) params.set("checkout", checkOutDate);
            params.set("guests", String(adults + childrenCount));
            params.set("rooms", String(rooms));
            router.push(`/book?${params.toString()}`);
        } else if (activeTab === "sports") {
            if (selectedType !== "all") params.set("sport", selectedType);
            if (sportSlot !== "any") params.set("slot", sportSlot);
            if (budgetRange !== "any") params.set("budget", budgetRange);
            router.push(`/sports?${params.toString()}`);
        } else if (activeTab === "buy") {
            if (selectedType !== "all") params.set("type", selectedType);
            if (bedroomCount !== "any") params.set("beds", bedroomCount);
            if (budgetRange !== "any") params.set("budget", budgetRange);
            router.push(`/buy?${params.toString()}`);
        }
    };

    const hasActiveFilters = Boolean(
        location ||
        selectedType !== "all" ||
        checkInDate ||
        checkOutDate ||
        bedroomCount !== "any" ||
        budgetRange !== "any" ||
        sportSlot !== "any" ||
        adults !== 2 ||
        childrenCount !== 0 ||
        rooms !== 1
    );

    const handleClearFilters = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLocation("");
        setSelectedType("all");
        setSelectedTypeLabel("All Categories");
        setCheckInDate("");
        setCheckOutDate("");
        setAdults(2);
        setChildrenCount(0);
        setRooms(1);
        setBedroomCount("any");
        setBudgetRange("any");
        setSportSlot("any");
    };

    const currentTypes =
        activeTab === "rent"
            ? RENTAL_TYPES
            : activeTab === "book"
            ? STAY_TYPES
            : activeTab === "sports"
            ? SPORT_TYPES
            : BUY_TYPES;

    return (
        <section aria-label="FindBookStay Multi-Purpose Search" className="w-full relative z-30 -mt-10 sm:-mt-14 mb-12 select-none">
            <div className="container mx-auto px-4" ref={containerRef}>
                <div className="bg-white rounded-3xl shadow-2xl border border-border/80 overflow-visible transition-shadow hover:shadow-emerald-950/15">
                    {/* 1. Purpose Selector Header Tabs */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 bg-surface-secondary/70 border-b border-border/80 rounded-t-3xl overflow-x-auto scrollbar-none">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <button
                                type="button"
                                onClick={() => handleTabSwitch("rent")}
                                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                                    activeTab === "rent"
                                        ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                        : "text-text-secondary hover:text-foreground hover:bg-white"
                                }`}
                            >
                                <Home className="size-4" />
                                <span>Rent</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleTabSwitch("book")}
                                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                                    activeTab === "book"
                                        ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                        : "text-text-secondary hover:text-foreground hover:bg-white"
                                }`}
                            >
                                <Hotel className="size-4" />
                                <span>Book Stays</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleTabSwitch("sports")}
                                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                                    activeTab === "sports"
                                        ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                        : "text-text-secondary hover:text-foreground hover:bg-white"
                                }`}
                            >
                                <Trophy className="size-4" />
                                <span>Sports</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleTabSwitch("buy")}
                                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                                    activeTab === "buy"
                                        ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                        : "text-text-secondary hover:text-foreground hover:bg-white"
                                }`}
                            >
                                <Building2 className="size-4" />
                                <span>Buy Property</span>
                            </button>
                        </div>

                        {/* Reset / Clear Button */}
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-text-secondary hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            >
                                <X className="size-3.5" />
                                <span>Clear Filters</span>
                            </button>
                        )}
                    </div>

                    {/* 2. Unified Multi-Segment Search Bar (12-Column Responsive Layout) */}
                    <form onSubmit={handleSearchSubmit} className="p-3 sm:p-4" autoComplete="off">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-2.5 items-stretch bg-surface p-2 rounded-2xl border border-border/80">
                            {/* Segment 1: Location (Cols 3) */}
                            <div className="md:col-span-3 relative">
                                <div
                                    onClick={() => setOpenPopover(openPopover === "location" ? null : "location")}
                                    className={`h-full p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-3 border ${
                                        openPopover === "location"
                                            ? "bg-white border-primary/40 shadow-sm ring-2 ring-primary/10"
                                            : "bg-white hover:bg-white/90 border-transparent"
                                    }`}
                                >
                                    <div className="size-10 rounded-xl bg-surface-secondary text-primary flex items-center justify-center shrink-0">
                                        <MapPin className="size-5 text-accent" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                                            Location / Area
                                        </span>
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenPopover("location");
                                            }}
                                            placeholder={
                                                activeTab === "sports"
                                                    ? "City or Turf Area..."
                                                    : "City or Area..."
                                            }
                                            className="w-full bg-transparent text-sm font-bold placeholder:text-text-secondary/60 focus:outline-none truncate [&::-webkit-search-cancel-button]:hidden"
                                        />
                                    </div>
                                </div>

                                {/* Popover 1: Location Suggestions */}
                                {openPopover === "location" && (
                                    <div className="absolute left-0 top-full mt-2 w-full sm:w-84 p-3 bg-white rounded-2xl shadow-2xl border border-border z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="flex items-center justify-between pb-2 border-b border-border/60 mb-2">
                                            <span className="text-xs font-bold text-foreground">
                                                Top Hubs & Destinations
                                            </span>
                                            <span className="text-[10px] text-text-secondary font-mono uppercase">
                                                Quick Pick
                                            </span>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin">
                                            {POPULAR_LOCATIONS.map((loc, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => {
                                                        setLocation(`${loc.area}, ${loc.city}`);
                                                        setOpenPopover(null);
                                                    }}
                                                    className="w-full text-left p-2 rounded-xl hover:bg-surface-secondary transition-colors flex items-center justify-between group cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <MapPin className="size-4 text-text-secondary group-hover:text-primary shrink-0 transition-colors" />
                                                        <div className="truncate">
                                                            <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                                                {loc.area}
                                                            </div>
                                                            <div className="text-[11px] text-text-secondary">
                                                                {loc.city} &middot; {loc.tag}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {location.includes(loc.area) && (
                                                        <Check className="size-4 text-accent shrink-0" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Segment 2: Category / Type (Cols 3) */}
                            <div className="md:col-span-3 relative">
                                <div
                                    onClick={() => setOpenPopover(openPopover === "type" ? null : "type")}
                                    className={`h-full p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-3 border ${
                                        openPopover === "type"
                                            ? "bg-white border-primary/40 shadow-sm ring-2 ring-primary/10"
                                            : "bg-white hover:bg-white/90 border-transparent"
                                    }`}
                                >
                                    <div className="size-10 rounded-xl bg-surface-secondary text-primary flex items-center justify-center shrink-0">
                                        {activeTab === "rent" ? (
                                            <Home className="size-5 text-accent" />
                                        ) : activeTab === "book" ? (
                                            <Hotel className="size-5 text-accent" />
                                        ) : activeTab === "sports" ? (
                                            <Trophy className="size-5 text-accent" />
                                        ) : (
                                            <Building2 className="size-5 text-accent" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                                            {activeTab === "sports" ? "Arena Type" : "Category / Type"}
                                        </span>
                                        <span className="block text-sm font-bold text-foreground truncate">
                                            {selectedTypeLabel}
                                        </span>
                                    </div>
                                    <ChevronDown className="size-4 text-text-secondary shrink-0" />
                                </div>

                                {/* Popover 2: Category Selector */}
                                {openPopover === "type" && (
                                    <div className="absolute left-0 top-full mt-2 w-full sm:w-80 p-3 bg-white rounded-2xl shadow-2xl border border-border z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="flex items-center justify-between pb-2 border-b border-border/60 mb-2">
                                            <span className="text-xs font-bold text-foreground">
                                                Select {activeTab.toUpperCase()} Category
                                            </span>
                                            {selectedType !== "all" && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedType("all");
                                                        setSelectedTypeLabel("All Categories");
                                                    }}
                                                    className="text-[11px] text-accent font-semibold hover:underline"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedType("all");
                                                    setSelectedTypeLabel("All Categories");
                                                    setOpenPopover(null);
                                                }}
                                                className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                                                    selectedType === "all" ? "bg-primary/5 text-primary" : "hover:bg-surface-secondary"
                                                }`}
                                            >
                                                <span className="text-xs font-bold">All Categories (Any)</span>
                                                {selectedType === "all" && <Check className="size-4 text-accent" />}
                                            </button>

                                            {currentTypes.map((item) => {
                                                const ItemIcon = item.icon;
                                                const isSelected = selectedType === item.id;
                                                return (
                                                    <button
                                                        key={item.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedType(item.id);
                                                            setSelectedTypeLabel(item.label);
                                                            setOpenPopover(null);
                                                        }}
                                                        className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between cursor-pointer group ${
                                                            isSelected ? "bg-primary/5 text-primary" : "hover:bg-surface-secondary"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                            <ItemIcon className="size-4 text-text-secondary group-hover:text-primary transition-colors shrink-0" />
                                                            <div className="truncate">
                                                                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                                                    {item.label}
                                                                </div>
                                                                <div className="text-[10px] text-text-secondary">
                                                                    {item.desc}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {isSelected && <Check className="size-4 text-accent shrink-0" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Segment 3: Dates (Book) / Bedrooms (Rent & Buy) / Playing Slot (Sports) (Cols 2) */}
                            <div className="md:col-span-2 relative">
                                <div
                                    onClick={() => setOpenPopover(openPopover === "seg3" ? null : "seg3")}
                                    className={`h-full p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-3 border ${
                                        openPopover === "seg3"
                                            ? "bg-white border-primary/40 shadow-sm ring-2 ring-primary/10"
                                            : "bg-white hover:bg-white/90 border-transparent"
                                    }`}
                                >
                                    <div className="size-10 rounded-xl bg-surface-secondary text-primary flex items-center justify-center shrink-0">
                                        {activeTab === "book" ? (
                                            <Calendar className="size-5 text-accent" />
                                        ) : activeTab === "sports" ? (
                                            <Clock className="size-5 text-accent" />
                                        ) : (
                                            <Home className="size-5 text-accent" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                                            {activeTab === "book" ? "Dates" : activeTab === "sports" ? "Slot" : "Bedrooms"}
                                        </span>
                                        <span className="block text-sm font-bold text-foreground truncate">
                                            {activeTab === "book"
                                                ? checkInDate
                                                    ? `${checkInDate.slice(5)}`
                                                    : "Dates"
                                                : activeTab === "sports"
                                                ? sportSlot === "any"
                                                    ? "Any Slot"
                                                    : sportSlot
                                                : bedroomCount === "any"
                                                ? "Any Beds"
                                                : `${bedroomCount} Beds`}
                                        </span>
                                    </div>
                                    <ChevronDown className="size-4 text-text-secondary shrink-0" />
                                </div>

                                {/* Popover 3: Segment 3 Dropdown */}
                                {openPopover === "seg3" && (
                                    <div className="absolute left-0 top-full mt-2 w-full sm:w-80 p-4 bg-white rounded-2xl shadow-2xl border border-border z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3">
                                        {activeTab === "book" ? (
                                            <>
                                                <div className="flex items-center justify-between pb-2 border-b border-border">
                                                    <span className="text-xs font-bold text-foreground">Select Stay Dates</span>
                                                    {(checkInDate || checkOutDate) && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setCheckInDate("");
                                                                setCheckOutDate("");
                                                            }}
                                                            className="text-[11px] text-accent font-semibold hover:underline"
                                                        >
                                                            Clear
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1">
                                                            Check-in
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={checkInDate}
                                                            onChange={(e) => setCheckInDate(e.target.value)}
                                                            className="w-full p-2.5 rounded-xl border border-border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1">
                                                            Check-out
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={checkOutDate}
                                                            min={checkInDate}
                                                            onChange={(e) => setCheckOutDate(e.target.value)}
                                                            className="w-full p-2.5 rounded-xl border border-border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="pt-2 border-t border-border flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenPopover(null)}
                                                        className="px-4 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover cursor-pointer"
                                                    >
                                                        Done
                                                    </button>
                                                </div>
                                            </>
                                        ) : activeTab === "sports" ? (
                                            <>
                                                <div className="text-xs font-bold text-foreground mb-2">Select Preferred Playing Time</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {[
                                                        { id: "any", label: "Any Slot", time: "All Day" },
                                                        { id: "morning", label: "Morning", time: "6 AM - 12 PM" },
                                                        { id: "afternoon", label: "Afternoon", time: "12 PM - 5 PM" },
                                                        { id: "evening", label: "Floodlight", time: "5 PM - 11 PM" },
                                                    ].map((slot) => (
                                                        <button
                                                            key={slot.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setSportSlot(slot.id);
                                                                setOpenPopover(null);
                                                            }}
                                                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                                                                sportSlot === slot.id
                                                                    ? "border-primary bg-primary/5 text-primary"
                                                                    : "border-border hover:bg-surface-secondary"
                                                            }`}
                                                        >
                                                            <div className="text-xs font-bold">{slot.label}</div>
                                                            <div className="text-[10px] text-text-secondary">{slot.time}</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-xs font-bold text-foreground mb-2">Number of Bedrooms</div>
                                                <div className="grid grid-cols-5 gap-1.5">
                                                    {["any", "1", "2", "3", "4+"].map((bed) => (
                                                        <button
                                                            key={bed}
                                                            type="button"
                                                            onClick={() => {
                                                                setBedroomCount(bed);
                                                                setOpenPopover(null);
                                                            }}
                                                            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                                                bedroomCount === bed
                                                                    ? "bg-primary text-white shadow-xs"
                                                                    : "bg-surface-secondary text-text-secondary hover:text-foreground"
                                                            }`}
                                                        >
                                                            {bed === "any" ? "Any" : `${bed} BHK`}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Segment 4: Guests (Book) OR Budget (Rent / Sports / Buy) (Cols 2) */}
                            <div className="md:col-span-2 relative">
                                <div
                                    onClick={() => setOpenPopover(openPopover === "seg4" ? null : "seg4")}
                                    className={`h-full p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-3 border ${
                                        openPopover === "seg4"
                                            ? "bg-white border-primary/40 shadow-sm ring-2 ring-primary/10"
                                            : "bg-white hover:bg-white/90 border-transparent"
                                    }`}
                                >
                                    <div className="size-10 rounded-xl bg-surface-secondary text-primary flex items-center justify-center shrink-0">
                                        {activeTab === "book" ? (
                                            <Users className="size-5 text-accent" />
                                        ) : (
                                            <DollarSign className="size-5 text-accent" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                                            {activeTab === "book" ? "Guests" : "Budget"}
                                        </span>
                                        <span className="block text-sm font-bold text-foreground truncate">
                                            {activeTab === "book"
                                                ? `${adults + childrenCount} Guests`
                                                : budgetRange === "any"
                                                ? "Any Budget"
                                                : budgetRange}
                                        </span>
                                    </div>
                                    <ChevronDown className="size-4 text-text-secondary shrink-0" />
                                </div>

                                {/* Popover 4: Guests Counter OR Budget Pills */}
                                {openPopover === "seg4" && (
                                    <div className="absolute right-0 top-full mt-2 w-full sm:w-80 p-4 bg-white rounded-2xl shadow-2xl border border-border z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-4">
                                        {activeTab === "book" ? (
                                            <>
                                                <div className="text-xs font-bold text-foreground pb-2 border-b border-border">
                                                    Select Guests & Rooms
                                                </div>

                                                {/* Adults Stepper */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-xs font-bold text-foreground">Adults</div>
                                                        <div className="text-[10px] text-text-secondary">Ages 13 or above</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            disabled={adults <= 1}
                                                            onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                                                            className="size-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface-secondary disabled:opacity-30 disabled:pointer-events-none cursor-pointer font-bold"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs font-bold w-4 text-center">{adults}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setAdults((prev) => prev + 1)}
                                                            className="size-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface-secondary cursor-pointer font-bold"
                                                        >
                                                            <Plus className="size-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Children Stepper */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-xs font-bold text-foreground">Children</div>
                                                        <div className="text-[10px] text-text-secondary">Ages 2-12</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            disabled={childrenCount <= 0}
                                                            onClick={() => setChildrenCount((prev) => Math.max(0, prev - 1))}
                                                            className="size-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface-secondary disabled:opacity-30 disabled:pointer-events-none cursor-pointer font-bold"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs font-bold w-4 text-center">{childrenCount}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setChildrenCount((prev) => prev + 1)}
                                                            className="size-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface-secondary cursor-pointer font-bold"
                                                        >
                                                            <Plus className="size-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Rooms Stepper */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-xs font-bold text-foreground">Rooms</div>
                                                        <div className="text-[10px] text-text-secondary">Number of suites</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            disabled={rooms <= 1}
                                                            onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
                                                            className="size-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface-secondary disabled:opacity-30 disabled:pointer-events-none cursor-pointer font-bold"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs font-bold w-4 text-center">{rooms}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setRooms((prev) => prev + 1)}
                                                            className="size-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface-secondary cursor-pointer font-bold"
                                                        >
                                                            <Plus className="size-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="pt-2 border-t border-border flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenPopover(null)}
                                                        className="px-4 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover cursor-pointer"
                                                    >
                                                        Done
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-xs font-bold text-foreground mb-2">Budget Target</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {(activeTab === "buy"
                                                        ? [
                                                              { id: "any", label: "Any Price" },
                                                              { id: "under-50l", label: "Under ৳50L" },
                                                              { id: "50l-1cr", label: "৳50L - ৳1Cr" },
                                                              { id: "1cr+", label: "৳1 Crore+" },
                                                          ]
                                                        : activeTab === "sports"
                                                        ? [
                                                              { id: "any", label: "Any Rate" },
                                                              { id: "under-2k", label: "Under ৳2k/hr" },
                                                              { id: "2k-4k", label: "৳2k - ৳4k/hr" },
                                                              { id: "4k+", label: "৳4k+/hr" },
                                                          ]
                                                        : [
                                                              { id: "any", label: "Any Rent" },
                                                              { id: "under-15k", label: "Under ৳15k" },
                                                              { id: "15k-35k", label: "৳15k - ৳35k" },
                                                              { id: "35k+", label: "৳35k / mo+" },
                                                          ]
                                                    ).map((b) => (
                                                        <button
                                                            key={b.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setBudgetRange(b.id);
                                                                setOpenPopover(null);
                                                            }}
                                                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                                                budgetRange === b.id
                                                                    ? "border-primary bg-primary/5 text-primary"
                                                                    : "border-border hover:bg-surface-secondary text-foreground"
                                                            }`}
                                                        >
                                                            {b.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Segment 5: Search Button (Cols 2) */}
                            <div className="md:col-span-2 flex items-center">
                                <button
                                    type="submit"
                                    className="w-full h-full min-h-13.5 inline-flex items-center justify-center gap-2.5 px-6 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                >
                                    <Search className="size-4.5" />
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HomeSearchBar;
