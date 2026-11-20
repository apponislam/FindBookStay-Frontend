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
    Check,
    X,
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

    const handleClearFilters = () => {
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

    // Segment 3 Label & Value Helper
    const getSeg3Info = () => {
        if (activeTab === "book") {
            const dateStr = checkInDate ? checkInDate.slice(5) : "Add Dates";
            const guestStr = `${adults + childrenCount} Guests`;
            return {
                label: "WHEN & WHO",
                value: checkInDate ? `${dateStr} · ${guestStr}` : "Dates & Guests",
            };
        }
        if (activeTab === "sports") {
            return {
                label: "TIME SLOT",
                value:
                    sportSlot === "evening"
                        ? "Evening (6PM-10PM)"
                        : sportSlot === "night"
                        ? "Night (10PM-1AM)"
                        : sportSlot === "morning"
                        ? "Morning (6AM-10AM)"
                        : "Any Time Slot",
            };
        }
        return {
            label: "BEDROOMS",
            value:
                bedroomCount === "1"
                    ? "1 Bed"
                    : bedroomCount === "2"
                    ? "2 Beds"
                    : bedroomCount === "3"
                    ? "3 Beds"
                    : bedroomCount === "4+"
                    ? "4+ Beds"
                    : "Any Beds",
        };
    };

    // Segment 4 Budget Label & Value Helper
    const getSeg4Info = () => {
        if (activeTab === "buy") {
            return {
                label: "PRICE RANGE",
                value:
                    budgetRange === "under-50l"
                        ? "Under ৳50L"
                        : budgetRange === "50l-1cr"
                        ? "৳50L - ৳1Cr"
                        : budgetRange === "1cr+"
                        ? "৳1 Crore+"
                        : "Any Budget",
            };
        }
        if (activeTab === "sports") {
            return {
                label: "HOURLY RATE",
                value:
                    budgetRange === "under-2k"
                        ? "Under ৳2k/hr"
                        : budgetRange === "2k-4k"
                        ? "৳2k - ৳4k/hr"
                        : budgetRange === "4k+"
                        ? "৳4k+/hr"
                        : "Any Rate",
            };
        }
        return {
            label: "MONTHLY BUDGET",
            value:
                budgetRange === "under-15k"
                    ? "Under ৳15k"
                    : budgetRange === "15k-35k"
                    ? "৳15k - ৳35k"
                    : budgetRange === "35k+"
                    ? "৳35k / mo+"
                    : "Any Budget",
        };
    };

    const seg3 = getSeg3Info();
    const seg4 = getSeg4Info();

    return (
        <section
            aria-label="FindBookStay Multi-Purpose Search"
            className="w-full relative z-30 mt-4 sm:-mt-12 md:-mt-16 mb-10 sm:mb-14 select-none"
        >
            <div className="container mx-auto px-4" ref={containerRef}>
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    {/* 1. FLOATING MODERN CAPSULE TABS */}
                    <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 dark:bg-card/95 backdrop-blur-xl border border-border shadow-lg mb-3 sm:mb-4 overflow-x-auto scrollbar-none max-w-full">
                        <button
                            type="button"
                            onClick={() => handleTabSwitch("rent")}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                                activeTab === "rent"
                                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80"
                            }`}
                        >
                            <Home className="size-4" />
                            <span>Rent</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleTabSwitch("book")}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                                activeTab === "book"
                                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80"
                            }`}
                        >
                            <Hotel className="size-4" />
                            <span>Book Stays</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleTabSwitch("sports")}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                                activeTab === "sports"
                                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80"
                            }`}
                        >
                            <Trophy className="size-4" />
                            <span>Sports</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleTabSwitch("buy")}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                                activeTab === "buy"
                                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80"
                            }`}
                        >
                            <Building2 className="size-4" />
                            <span>Buy Property</span>
                        </button>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1 cursor-pointer whitespace-nowrap"
                                title="Reset all search parameters"
                            >
                                <X className="size-3.5" />
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        )}
                    </div>

                    {/* 2. UNIFIED SEARCH BAR CAPSULE */}
                    <form
                        onSubmit={handleSearchSubmit}
                        className="w-full relative"
                        autoComplete="off"
                    >
                        {/* ======================================================= */}
                        {/* A. DESKTOP CAPSULE ROW (md:flex)                        */}
                        {/* ======================================================= */}
                        <div className="hidden md:flex items-center bg-white/95 dark:bg-card/95 backdrop-blur-2xl rounded-full border border-border shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-2 divide-x divide-border/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all duration-300">
                            {/* Segment 1: Location */}
                            <div className="relative flex-1 min-w-[210px]">
                                <div
                                    onClick={() => setOpenPopover(openPopover === "location" ? null : "location")}
                                    className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer flex flex-col justify-center ${
                                        openPopover === "location"
                                            ? "bg-surface-secondary ring-2 ring-primary/20"
                                            : "hover:bg-surface-secondary/70"
                                    }`}
                                >
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                        Where
                                    </span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <MapPin className="size-4 text-primary shrink-0" />
                                        <input
                                            name="fbs_search_location"
                                            type="text"
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
                                            className="w-full bg-transparent text-sm font-bold text-foreground placeholder:text-muted-foreground/60 focus:outline-none truncate"
                                        />
                                    </div>
                                </div>

                                {/* Popover 1: Popular Locations */}
                                {openPopover === "location" && (
                                    <div className="absolute left-0 top-full mt-3 w-80 p-3 bg-white dark:bg-card rounded-3xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <div className="flex items-center justify-between pb-2 border-b border-border/70 mb-2">
                                            <span className="text-xs font-bold text-foreground">
                                                Top Hubs & Destinations
                                            </span>
                                            <span className="text-[10px] text-muted-foreground font-mono uppercase">
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
                                                        <MapPin className="size-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                                                        <div className="truncate">
                                                            <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                                                {loc.area}
                                                            </div>
                                                            <div className="text-[11px] text-muted-foreground">
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

                            {/* Segment 2: Category / Type */}
                            <div className="relative w-[190px]">
                                <div
                                    onClick={() => setOpenPopover(openPopover === "type" ? null : "type")}
                                    className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer flex flex-col justify-center ${
                                        openPopover === "type"
                                            ? "bg-surface-secondary ring-2 ring-primary/20"
                                            : "hover:bg-surface-secondary/70"
                                    }`}
                                >
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                        Type
                                    </span>
                                    <div className="flex items-center justify-between gap-1.5 mt-0.5">
                                        <span className="text-sm font-bold text-foreground truncate">
                                            {selectedTypeLabel}
                                        </span>
                                        <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
                                    </div>
                                </div>

                                {/* Popover 2: Category Selector */}
                                {openPopover === "type" && (
                                    <div className="absolute left-0 top-full mt-3 w-80 p-3 bg-white dark:bg-card rounded-3xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <div className="flex items-center justify-between pb-2 border-b border-border/70 mb-2">
                                            <span className="text-xs font-bold text-foreground">
                                                Select Category
                                            </span>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedType("all");
                                                    setSelectedTypeLabel("All Categories");
                                                    setOpenPopover(null);
                                                }}
                                                className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                                                    selectedType === "all"
                                                        ? "bg-primary/10 text-primary font-bold"
                                                        : "hover:bg-surface-secondary text-foreground"
                                                }`}
                                            >
                                                <span className="text-xs font-bold">All Categories</span>
                                                {selectedType === "all" && <Check className="size-4 text-accent" />}
                                            </button>
                                            {currentTypes.map((t) => {
                                                const IconComp = t.icon;
                                                return (
                                                    <button
                                                        key={t.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedType(t.id);
                                                            setSelectedTypeLabel(t.label);
                                                            setOpenPopover(null);
                                                        }}
                                                        className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between group cursor-pointer ${
                                                            selectedType === t.id
                                                                ? "bg-primary/10 text-primary font-bold"
                                                                : "hover:bg-surface-secondary text-foreground"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                            <IconComp className="size-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                                                            <div className="truncate">
                                                                <div className="text-xs font-bold">{t.label}</div>
                                                                <div className="text-[11px] text-muted-foreground">{t.desc}</div>
                                                            </div>
                                                        </div>
                                                        {selectedType === t.id && (
                                                            <Check className="size-4 text-accent shrink-0" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Segment 3: Details (Bedrooms / Dates / Time Slot) */}
                            <div className="relative w-[200px]">
                                <div
                                    onClick={() => setOpenPopover(openPopover === "seg3" ? null : "seg3")}
                                    className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer flex flex-col justify-center ${
                                        openPopover === "seg3"
                                            ? "bg-surface-secondary ring-2 ring-primary/20"
                                            : "hover:bg-surface-secondary/70"
                                    }`}
                                >
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                        {seg3.label}
                                    </span>
                                    <div className="flex items-center justify-between gap-1.5 mt-0.5">
                                        <span className="text-sm font-bold text-foreground truncate">
                                            {seg3.value}
                                        </span>
                                        <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
                                    </div>
                                </div>

                                {/* Popover 3: Segment 3 Selector */}
                                {openPopover === "seg3" && (
                                    <div className="absolute left-0 top-full mt-3 w-84 p-4 bg-white dark:bg-card rounded-3xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95 duration-150">
                                        {activeTab === "book" ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="text-xs font-bold text-foreground block mb-2">Check-in & Check-out</span>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="text-[10px] text-muted-foreground block mb-1">Check-in</label>
                                                            <input
                                                                type="date"
                                                                value={checkInDate}
                                                                onChange={(e) => setCheckInDate(e.target.value)}
                                                                className="w-full p-2 rounded-xl border border-border bg-surface-secondary text-xs font-bold text-foreground focus:outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] text-muted-foreground block mb-1">Check-out</label>
                                                            <input
                                                                type="date"
                                                                value={checkOutDate}
                                                                onChange={(e) => setCheckOutDate(e.target.value)}
                                                                className="w-full p-2 rounded-xl border border-border bg-surface-secondary text-xs font-bold text-foreground focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-2 border-t border-border flex items-center justify-between">
                                                    <span className="text-xs font-bold text-foreground">Guests</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setAdults(Math.max(1, adults - 1))}
                                                            className="size-7 rounded-lg bg-surface-secondary text-foreground font-bold flex items-center justify-center hover:bg-border"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs font-bold w-5 text-center">{adults}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setAdults(adults + 1)}
                                                            className="size-7 rounded-lg bg-surface-secondary text-foreground font-bold flex items-center justify-center hover:bg-border"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : activeTab === "sports" ? (
                                            <div className="space-y-1">
                                                <div className="text-xs font-bold text-foreground mb-2">Select Match Slot</div>
                                                {[
                                                    { id: "any", label: "Any Time Slot" },
                                                    { id: "morning", label: "Morning (6:00 AM - 10:00 AM)" },
                                                    { id: "evening", label: "Evening (6:00 PM - 10:00 PM)" },
                                                    { id: "night", label: "Night Floodlit (10:00 PM - 1:00 AM)" },
                                                ].map((s) => (
                                                    <button
                                                        key={s.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSportSlot(s.id);
                                                            setOpenPopover(null);
                                                        }}
                                                        className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                                                            sportSlot === s.id
                                                                ? "bg-primary/10 text-primary"
                                                                : "hover:bg-surface-secondary text-foreground"
                                                        }`}
                                                    >
                                                        <span>{s.label}</span>
                                                        {sportSlot === s.id && <Check className="size-4 text-accent" />}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <div className="text-xs font-bold text-foreground mb-2">Select Bedroom Count</div>
                                                {[
                                                    { id: "any", label: "Any Bedroom Count" },
                                                    { id: "1", label: "1 Bedroom / Bachelor Seat" },
                                                    { id: "2", label: "2 Bedrooms Flat" },
                                                    { id: "3", label: "3 Bedrooms Flat" },
                                                    { id: "4+", label: "4+ Bedrooms / Duplex" },
                                                ].map((b) => (
                                                    <button
                                                        key={b.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setBedroomCount(b.id);
                                                            setOpenPopover(null);
                                                        }}
                                                        className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                                                            bedroomCount === b.id
                                                                ? "bg-primary/10 text-primary"
                                                                : "hover:bg-surface-secondary text-foreground"
                                                        }`}
                                                    >
                                                        <span>{b.label}</span>
                                                        {bedroomCount === b.id && <Check className="size-4 text-accent" />}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Segment 4: Budget Range */}
                            <div className="relative w-[180px]">
                                <div
                                    onClick={() => setOpenPopover(openPopover === "seg4" ? null : "seg4")}
                                    className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer flex flex-col justify-center ${
                                        openPopover === "seg4"
                                            ? "bg-surface-secondary ring-2 ring-primary/20"
                                            : "hover:bg-surface-secondary/70"
                                    }`}
                                >
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                        {seg4.label}
                                    </span>
                                    <div className="flex items-center justify-between gap-1.5 mt-0.5">
                                        <span className="text-sm font-bold text-foreground truncate">
                                            {seg4.value}
                                        </span>
                                        <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
                                    </div>
                                </div>

                                {/* Popover 4: Budget Selector */}
                                {openPopover === "seg4" && (
                                    <div className="absolute right-0 top-full mt-3 w-76 p-4 bg-white dark:bg-card rounded-3xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95 duration-150">
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
                                                            ? "border-primary bg-primary/10 text-primary"
                                                            : "border-border hover:bg-surface-secondary text-foreground"
                                                    }`}
                                                >
                                                    {b.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Segment 5: Search Button */}
                            <div className="p-1 shrink-0">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-hover active:scale-95 text-primary-foreground font-extrabold text-sm shadow-md transition-all cursor-pointer"
                                >
                                    <Search className="size-4" />
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>

                        {/* ======================================================= */}
                        {/* B. RESPONSIVE MOBILE FORM (md:hidden)                   */}
                        {/* ======================================================= */}
                        <div className="md:hidden bg-white dark:bg-card rounded-3xl border border-border shadow-xl p-4 space-y-3">
                            {/* Row 1: Location Input */}
                            <div className="p-3 rounded-2xl bg-surface-secondary/70 border border-border/70 flex items-center gap-2.5">
                                <MapPin className="size-4.5 text-primary shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground block">
                                        Where
                                    </label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder={
                                            activeTab === "sports"
                                                ? "City or Turf Area..."
                                                : "City or Area..."
                                        }
                                        className="w-full bg-transparent text-xs font-bold text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Category Selector */}
                            <div className="grid grid-cols-2 gap-2">
                                <div
                                    onClick={() => setOpenPopover(openPopover === "type" ? null : "type")}
                                    className="p-3 rounded-2xl bg-surface-secondary/70 border border-border/70 cursor-pointer"
                                >
                                    <span className="text-[10px] font-extrabold uppercase text-muted-foreground block">
                                        Type
                                    </span>
                                    <span className="text-xs font-bold text-foreground truncate block mt-0.5">
                                        {selectedTypeLabel}
                                    </span>
                                </div>

                                <div
                                    onClick={() => setOpenPopover(openPopover === "seg3" ? null : "seg3")}
                                    className="p-3 rounded-2xl bg-surface-secondary/70 border border-border/70 cursor-pointer"
                                >
                                    <span className="text-[10px] font-extrabold uppercase text-muted-foreground block">
                                        {seg3.label}
                                    </span>
                                    <span className="text-xs font-bold text-foreground truncate block mt-0.5">
                                        {seg3.value}
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Popovers */}
                            {openPopover === "type" && (
                                <div className="p-3 rounded-2xl bg-white dark:bg-card border border-border shadow-lg space-y-1">
                                    <div className="text-xs font-bold text-foreground mb-1">Select Category:</div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedType("all");
                                            setSelectedTypeLabel("All Categories");
                                            setOpenPopover(null);
                                        }}
                                        className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-surface-secondary flex items-center justify-between"
                                    >
                                        <span>All Categories</span>
                                        {selectedType === "all" && <Check className="size-4 text-accent" />}
                                    </button>
                                    {currentTypes.map((t) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedType(t.id);
                                                setSelectedTypeLabel(t.label);
                                                setOpenPopover(null);
                                            }}
                                            className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-surface-secondary flex items-center justify-between"
                                        >
                                            <span>{t.label}</span>
                                            {selectedType === t.id && <Check className="size-4 text-accent" />}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {openPopover === "seg3" && (
                                <div className="p-3 rounded-2xl bg-white dark:bg-card border border-border shadow-lg space-y-1">
                                    <div className="text-xs font-bold text-foreground mb-1">Select Option:</div>
                                    {activeTab === "sports" ? (
                                        [
                                            { id: "any", label: "Any Time Slot" },
                                            { id: "morning", label: "Morning (6AM - 10AM)" },
                                            { id: "evening", label: "Evening (6PM - 10PM)" },
                                            { id: "night", label: "Night (10PM - 1AM)" },
                                        ].map((s) => (
                                            <button
                                                key={s.id}
                                                type="button"
                                                onClick={() => {
                                                    setSportSlot(s.id);
                                                    setOpenPopover(null);
                                                }}
                                                className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-surface-secondary flex items-center justify-between"
                                            >
                                                <span>{s.label}</span>
                                                {sportSlot === s.id && <Check className="size-4 text-accent" />}
                                            </button>
                                        ))
                                    ) : (
                                        [
                                            { id: "any", label: "Any Bedroom Count" },
                                            { id: "1", label: "1 Bed" },
                                            { id: "2", label: "2 Beds" },
                                            { id: "3", label: "3 Beds" },
                                            { id: "4+", label: "4+ Beds" },
                                        ].map((b) => (
                                            <button
                                                key={b.id}
                                                type="button"
                                                onClick={() => {
                                                    setBedroomCount(b.id);
                                                    setOpenPopover(null);
                                                }}
                                                className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-surface-secondary flex items-center justify-between"
                                            >
                                                <span>{b.label}</span>
                                                {bedroomCount === b.id && <Check className="size-4 text-accent" />}
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Row 3: Budget Selector */}
                            <div
                                onClick={() => setOpenPopover(openPopover === "seg4" ? null : "seg4")}
                                className="p-3 rounded-2xl bg-surface-secondary/70 border border-border/70 cursor-pointer flex items-center justify-between"
                            >
                                <div>
                                    <span className="text-[10px] font-extrabold uppercase text-muted-foreground block">
                                        {seg4.label}
                                    </span>
                                    <span className="text-xs font-bold text-foreground mt-0.5 block">
                                        {seg4.value}
                                    </span>
                                </div>
                                <ChevronDown className="size-4 text-muted-foreground" />
                            </div>

                            {openPopover === "seg4" && (
                                <div className="p-3 rounded-2xl bg-white dark:bg-card border border-border shadow-lg">
                                    <div className="grid grid-cols-2 gap-1.5">
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
                                                className={`p-2 rounded-xl text-xs font-bold border ${
                                                    budgetRange === b.id
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border text-foreground hover:bg-surface-secondary"
                                                }`}
                                            >
                                                {b.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Row 4: Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-primary-foreground font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                            >
                                <Search className="size-4" />
                                <span>Search Listings</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HomeSearchBar;
