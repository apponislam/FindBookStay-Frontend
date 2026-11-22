"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, MapPin, Home, Hotel, Trophy, Building2, Calendar, Users, Check, X, ChevronDown } from "@/components/Icons";

type SearchCategory = "rent" | "book" | "sports" | "buy";

interface LocationSuggestion {
    city: string;
    area: string;
    tag: string;
}

export const HomeSearchBar = () => {
    const t = useTranslations("Home.searchBar");
    const tTabs = useTranslations("Home.searchBar.tabs");
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const popularLocations: LocationSuggestion[] = [
        { city: t.has("locations.gulshan.city") ? t("locations.gulshan.city") : "Dhaka", area: t.has("locations.gulshan.area") ? t("locations.gulshan.area") : "Gulshan & Banani", tag: t.has("locations.gulshan.tag") ? t("locations.gulshan.tag") : "Diplomatic & Luxury" },
        { city: t.has("locations.bashundhara.city") ? t("locations.bashundhara.city") : "Dhaka", area: t.has("locations.bashundhara.area") ? t("locations.bashundhara.area") : "Bashundhara R/A", tag: t.has("locations.bashundhara.tag") ? t("locations.bashundhara.tag") : "Family & Campus" },
        { city: t.has("locations.dhanmondi.city") ? t("locations.dhanmondi.city") : "Dhaka", area: t.has("locations.dhanmondi.area") ? t("locations.dhanmondi.area") : "Dhanmondi", tag: t.has("locations.dhanmondi.tag") ? t("locations.dhanmondi.tag") : "Cultural Hub" },
        { city: t.has("locations.uttara.city") ? t("locations.uttara.city") : "Dhaka", area: t.has("locations.uttara.area") ? t("locations.uttara.area") : "Uttara", tag: t.has("locations.uttara.tag") ? t("locations.uttara.tag") : "Metro & Airport" },
        { city: t.has("locations.mirpur.city") ? t("locations.mirpur.city") : "Dhaka", area: t.has("locations.mirpur.area") ? t("locations.mirpur.area") : "Mirpur", tag: t.has("locations.mirpur.tag") ? t("locations.mirpur.tag") : "Affordable Living" },
        { city: t.has("locations.chittagong.city") ? t("locations.chittagong.city") : "Chittagong", area: t.has("locations.chittagong.area") ? t("locations.chittagong.area") : "GEC Circle", tag: t.has("locations.chittagong.tag") ? t("locations.chittagong.tag") : "Commercial Port" },
        { city: t.has("locations.coxsBazar.city") ? t("locations.coxsBazar.city") : "Cox's Bazar", area: t.has("locations.coxsBazar.area") ? t("locations.coxsBazar.area") : "Marine Drive", tag: t.has("locations.coxsBazar.tag") ? t("locations.coxsBazar.tag") : "Beachfront Stays" },
        { city: t.has("locations.sylhet.city") ? t("locations.sylhet.city") : "Sylhet", area: t.has("locations.sylhet.area") ? t("locations.sylhet.area") : "Sreemangal", tag: t.has("locations.sylhet.tag") ? t("locations.sylhet.tag") : "Nature & Tea Estates" },
    ];

    const rentalTypes = [
        { id: "family-apartments", label: t.has("types.rent.familyApartments.label") ? t("types.rent.familyApartments.label") : "Family Apartments", desc: t.has("types.rent.familyApartments.desc") ? t("types.rent.familyApartments.desc") : "2 to 4 BHK rental flats", icon: Home },
        { id: "bachelor-seats", label: t.has("types.rent.bachelorSeats.label") ? t("types.rent.bachelorSeats.label") : "Bachelor Seats", desc: t.has("types.rent.bachelorSeats.desc") ? t("types.rent.bachelorSeats.desc") : "Single & shared with utilities", icon: Users },
        { id: "family-houses", label: t.has("types.rent.familyHouses.label") ? t("types.rent.familyHouses.label") : "Houses & Duplexes", desc: t.has("types.rent.familyHouses.desc") ? t("types.rent.familyHouses.desc") : "Independent villas & homes", icon: Building2 },
        { id: "sublets", label: t.has("types.rent.sublets.label") ? t("types.rent.sublets.label") : "Monthly Sublets", desc: t.has("types.rent.sublets.desc") ? t("types.rent.sublets.desc") : "Furnished short/medium term", icon: Calendar },
        { id: "commercial", label: t.has("types.rent.commercial.label") ? t("types.rent.commercial.label") : "Commercial Space", desc: t.has("types.rent.commercial.desc") ? t("types.rent.commercial.desc") : "Offices, stores & showrooms", icon: Building2 },
    ];

    const stayTypes = [
        { id: "resorts", label: t.has("types.stay.resorts.label") ? t("types.stay.resorts.label") : "Nature Resorts", desc: t.has("types.stay.resorts.desc") ? t("types.stay.resorts.desc") : "Beachfront, lake & hills", icon: Hotel },
        { id: "hotels", label: t.has("types.stay.hotels.label") ? t("types.stay.hotels.label") : "Boutique Hotels", desc: t.has("types.stay.hotels.desc") ? t("types.stay.hotels.desc") : "City center & 5-star stays", icon: Hotel },
        { id: "holiday-homes", label: t.has("types.stay.holidayHomes.label") ? t("types.stay.holidayHomes.label") : "Holiday Homes", desc: t.has("types.stay.holidayHomes.desc") ? t("types.stay.holidayHomes.desc") : "Private vacation villas", icon: Home },
        { id: "guest-houses", label: t.has("types.stay.guestHouses.label") ? t("types.stay.guestHouses.label") : "Guest Houses", desc: t.has("types.stay.guestHouses.desc") ? t("types.stay.guestHouses.desc") : "Cozy bed & breakfast", icon: Home },
        { id: "short-stay", label: t.has("types.stay.shortStay.label") ? t("types.stay.shortStay.label") : "Serviced Suites", desc: t.has("types.stay.shortStay.desc") ? t("types.stay.shortStay.desc") : "Executive serviced flats", icon: Building2 },
    ];

    const sportTypes = [
        { id: "turf-booking", label: t.has("types.sports.turfBooking.label") ? t("types.sports.turfBooking.label") : "Soccer & Cricket Turf", desc: t.has("types.sports.turfBooking.desc") ? t("types.sports.turfBooking.desc") : "Floodlit artificial grass", icon: Trophy },
        { id: "indoor-sports", label: t.has("types.sports.indoorSports.label") ? t("types.sports.indoorSports.label") : "Indoor Arenas", desc: t.has("types.sports.indoorSports.desc") ? t("types.sports.indoorSports.desc") : "Badminton, basketball & futsal", icon: Trophy },
        { id: "football-grounds", label: t.has("types.sports.footballGrounds.label") ? t("types.sports.footballGrounds.label") : "Football Grounds", desc: t.has("types.sports.footballGrounds.desc") ? t("types.sports.footballGrounds.desc") : "Standard 11v11 grass grounds", icon: Trophy },
        { id: "swimming", label: t.has("types.sports.swimming.label") ? t("types.sports.swimming.label") : "Swimming & Wellness", desc: t.has("types.sports.swimming.desc") ? t("types.sports.swimming.desc") : "Olympic pools & fitness clubs", icon: Trophy },
    ];

    const buyTypes = [
        { id: "apartments", label: t.has("types.buy.apartments.label") ? t("types.buy.apartments.label") : "Apartments & Flats", desc: t.has("types.buy.apartments.desc") ? t("types.buy.apartments.desc") : "Luxury residential high-rise", icon: Building2 },
        { id: "houses", label: t.has("types.buy.houses.label") ? t("types.buy.houses.label") : "Houses & Villas", desc: t.has("types.buy.houses.desc") ? t("types.buy.houses.desc") : "Standalone homes & duplexes", icon: Home },
        { id: "land", label: t.has("types.buy.land.label") ? t("types.buy.land.label") : "Land & Plots", desc: t.has("types.buy.land.desc") ? t("types.buy.land.desc") : "Verified freehold plots", icon: MapPin },
        { id: "commercial", label: t.has("types.buy.commercial.label") ? t("types.buy.commercial.label") : "Commercial Plazas", desc: t.has("types.buy.commercial.desc") ? t("types.buy.commercial.desc") : "Retail spaces & office floors", icon: Building2 },
    ];
    const [activeTab, setActiveTab] = useState<SearchCategory>("rent");

    // Active Dropdown Popover
    const [openPopover, setOpenPopover] = useState<"location" | "type" | "seg3" | "seg4" | null>(null);

    // Form Filter States
    const [location, setLocation] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedTypeLabel, setSelectedTypeLabel] = useState<string>("");

    const displayTypeLabel = selectedType === "all" ? t("allCategories") : selectedTypeLabel;

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
        setSelectedTypeLabel("");
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

    const hasActiveFilters = Boolean(location || selectedType !== "all" || checkInDate || checkOutDate || bedroomCount !== "any" || budgetRange !== "any" || sportSlot !== "any" || adults !== 2 || childrenCount !== 0 || rooms !== 1);

    const handleClearFilters = () => {
        setLocation("");
        setSelectedType("all");
        setSelectedTypeLabel("");
        setCheckInDate("");
        setCheckOutDate("");
        setAdults(2);
        setChildrenCount(0);
        setRooms(1);
        setBedroomCount("any");
        setBudgetRange("any");
        setSportSlot("any");
    };

    const currentTypes = activeTab === "rent" ? rentalTypes : activeTab === "book" ? stayTypes : activeTab === "sports" ? sportTypes : buyTypes;

    // Segment 3 Label & Value Helper
    const getSeg3Info = () => {
        if (activeTab === "book") {
            const dateStr = checkInDate ? checkInDate.slice(5) : t("datesAndGuests");
            const guestStr = `${adults + childrenCount} ${t("guests")}`;
            return {
                label: t("whenWho"),
                value: checkInDate ? `${dateStr} · ${guestStr}` : t("datesAndGuests"),
            };
        }
        if (activeTab === "sports") {
            return {
                label: t("timeSlot"),
                value: sportSlot === "evening" ? t("eveningSlot") : sportSlot === "night" ? t("nightSlot") : sportSlot === "morning" ? t("morningSlot") : t("anyTimeSlot"),
            };
        }
        return {
            label: t("bedrooms"),
            value: bedroomCount === "1" ? (t.has("bedOne") ? t("bedOne") : "1 Bed") : bedroomCount === "2" ? (t.has("bedTwo") ? t("bedTwo") : "2 Beds") : bedroomCount === "3" ? (t.has("bedThree") ? t("bedThree") : "3 Beds") : bedroomCount === "4+" ? (t.has("bedFourPlus") ? t("bedFourPlus") : "4+ Beds") : t("anyBeds"),
        };
    };

    // Segment 4 Budget Label & Value Helper
    const getSeg4Info = () => {
        if (activeTab === "buy") {
            return {
                label: t("priceRange"),
                value: budgetRange === "under-50l" ? (t.has("budgetLabels.buy.under50l") ? t("budgetLabels.buy.under50l") : "Under ৳50L") : budgetRange === "50l-1cr" ? (t.has("budgetLabels.buy.50l1cr") ? t("budgetLabels.buy.50l1cr") : "৳50L - ৳1Cr") : budgetRange === "1cr+" ? (t.has("budgetLabels.buy.1crPlus") ? t("budgetLabels.buy.1crPlus") : "৳1 Crore+") : t("anyBudget"),
            };
        }
        if (activeTab === "sports") {
            return {
                label: t("hourlyRate"),
                value: budgetRange === "under-2k" ? (t.has("budgetLabels.sports.under2k") ? t("budgetLabels.sports.under2k") : "Under ৳2k/hr") : budgetRange === "2k-4k" ? (t.has("budgetLabels.sports.2k4k") ? t("budgetLabels.sports.2k4k") : "৳2k - ৳4k/hr") : budgetRange === "4k+" ? (t.has("budgetLabels.sports.4kPlus") ? t("budgetLabels.sports.4kPlus") : "৳4k+/hr") : t("anyRate"),
            };
        }
        return {
            label: t("monthlyBudget"),
            value: budgetRange === "under-15k" ? (t.has("budgetLabels.rent.under15k") ? t("budgetLabels.rent.under15k") : "Under ৳15k") : budgetRange === "15k-35k" ? (t.has("budgetLabels.rent.15k35k") ? t("budgetLabels.rent.15k35k") : "৳15k - ৳35k") : budgetRange === "35k+" ? (t.has("budgetLabels.rent.35kPlus") ? t("budgetLabels.rent.35kPlus") : "৳35k / mo+") : t("anyBudget"),
        };
    };

    const seg3 = getSeg3Info();
    const seg4 = getSeg4Info();

    return (
        <section aria-label="FindBookStay Multi-Purpose Search" className="w-full relative z-30 mt-4 sm:-mt-12 md:-mt-16 mb-10 sm:mb-14 select-none">
            <div className="container mx-auto px-4" ref={containerRef}>
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    {/* 1. FLOATING MODERN CAPSULE TABS */}
                    <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 dark:bg-card/95 backdrop-blur-xl border border-border shadow-lg mb-3 sm:mb-4 overflow-x-auto scrollbar-none max-w-full">
                        <button
                            type="button"
                            onClick={() => handleTabSwitch("rent")}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${activeTab === "rent" ? "bg-primary text-primary-foreground shadow-sm scale-102" : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80"}`}
                        >
                            <Home className="size-4" />
                            <span>{tTabs("rent")}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleTabSwitch("book")}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${activeTab === "book" ? "bg-primary text-primary-foreground shadow-sm scale-102" : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80"}`}
                        >
                            <Hotel className="size-4" />
                            <span>{tTabs("book")}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleTabSwitch("sports")}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${activeTab === "sports" ? "bg-primary text-primary-foreground shadow-sm scale-102" : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80"}`}
                        >
                            <Trophy className="size-4" />
                            <span>{tTabs("sports")}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleTabSwitch("buy")}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${activeTab === "buy" ? "bg-primary text-primary-foreground shadow-sm scale-102" : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80"}`}
                        >
                            <Building2 className="size-4" />
                            <span>{tTabs("buy")}</span>
                        </button>

                        {hasActiveFilters && (
                            <button type="button" onClick={handleClearFilters} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1 cursor-pointer whitespace-nowrap" title="Reset all search parameters">
                                <X className="size-3.5" />
                                <span className="hidden sm:inline">{tTabs("reset")}</span>
                            </button>
                        )}
                    </div>

                    {/* 2. UNIFIED SEARCH BAR CAPSULE */}
                    <form onSubmit={handleSearchSubmit} className="w-full relative" autoComplete="off">
                        {/* ======================================================= */}
                        {/* A. DESKTOP CAPSULE ROW (md:flex)                        */}
                        {/* ======================================================= */}
                        <div className="hidden md:flex items-center bg-white/95 dark:bg-card/95 backdrop-blur-2xl rounded-full border border-border shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-2 divide-x divide-border/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all duration-300">
                            {/* Segment 1: Location */}
                            <div className="relative flex-1 min-w-52.5">
                                <div onClick={() => setOpenPopover(openPopover === "location" ? null : "location")} className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer flex flex-col justify-center ${openPopover === "location" ? "bg-surface-secondary ring-2 ring-primary/20" : "hover:bg-surface-secondary/70"}`}>
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{t("where")}</span>
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
                                            placeholder={t("wherePlaceholder")}
                                            className="w-full bg-transparent text-sm font-bold text-foreground placeholder:text-muted-foreground/60 focus:outline-none truncate"
                                        />
                                    </div>
                                </div>

                                {/* Popover 1: Popular Locations */}
                                {openPopover === "location" && (
                                    <div className="absolute left-0 top-full mt-3 w-80 p-3 bg-white dark:bg-card rounded-3xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <div className="flex items-center justify-between pb-2 border-b border-border/70 mb-2">
                                            <span className="text-xs font-bold text-foreground">{t("popularLocations")}</span>
                                            <span className="text-[10px] text-muted-foreground font-mono uppercase">Quick Pick</span>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin">
                                            {popularLocations.map((loc, idx) => (
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
                                                            <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{loc.area}</div>
                                                            <div className="text-[11px] text-muted-foreground">
                                                                {loc.city} &middot; {loc.tag}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {location.includes(loc.area) && <Check className="size-4 text-accent shrink-0" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Segment 2: Category / Type */}
                            <div className="relative w-47.5">
                                <div onClick={() => setOpenPopover(openPopover === "type" ? null : "type")} className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer flex flex-col justify-center ${openPopover === "type" ? "bg-surface-secondary ring-2 ring-primary/20" : "hover:bg-surface-secondary/70"}`}>
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{t("propertyType")}</span>
                                    <div className="flex items-center justify-between gap-1.5 mt-0.5">
                                        <span className="text-sm font-bold text-foreground truncate">{displayTypeLabel}</span>
                                        <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
                                    </div>
                                </div>

                                {/* Popover 2: Category Selector */}
                                {openPopover === "type" && (
                                    <div className="absolute left-0 top-full mt-3 w-80 p-3 bg-white dark:bg-card rounded-3xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <div className="flex items-center justify-between pb-2 border-b border-border/70 mb-2">
                                            <span className="text-xs font-bold text-foreground">{t("selectCategory")}</span>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedType("all");
                                                    setSelectedTypeLabel(t("allCategories"));
                                                    setOpenPopover(null);
                                                }}
                                                className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${selectedType === "all" ? "bg-primary/10 text-primary font-bold" : "hover:bg-surface-secondary text-foreground"}`}
                                            >
                                                <span className="text-xs font-bold">{t("allCategories")}</span>
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
                                                        className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between group cursor-pointer ${selectedType === t.id ? "bg-primary/10 text-primary font-bold" : "hover:bg-surface-secondary text-foreground"}`}
                                                    >
                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                            <IconComp className="size-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                                                            <div className="truncate">
                                                                <div className="text-xs font-bold">{t.label}</div>
                                                                <div className="text-[11px] text-muted-foreground">{t.desc}</div>
                                                            </div>
                                                        </div>
                                                        {selectedType === t.id && <Check className="size-4 text-accent shrink-0" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Segment 3: Details (Bedrooms / Dates / Time Slot) */}
                            <div className="relative w-50">
                                <div onClick={() => setOpenPopover(openPopover === "seg3" ? null : "seg3")} className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer flex flex-col justify-center ${openPopover === "seg3" ? "bg-surface-secondary ring-2 ring-primary/20" : "hover:bg-surface-secondary/70"}`}>
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{seg3.label}</span>
                                    <div className="flex items-center justify-between gap-1.5 mt-0.5">
                                        <span className="text-sm font-bold text-foreground truncate">{seg3.value}</span>
                                        <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
                                    </div>
                                </div>

                                {/* Popover 3: Segment 3 Selector */}
                                {openPopover === "seg3" && (
                                    <div className="absolute left-0 top-full mt-3 w-84 p-4 bg-white dark:bg-card rounded-3xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95 duration-150">
                                        {activeTab === "book" ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="text-xs font-bold text-foreground block mb-2">{t("checkInAndOut")}</span>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="text-[10px] text-muted-foreground block mb-1">{t("checkIn")}</label>
                                                            <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="w-full p-2 rounded-xl border border-border bg-surface-secondary text-xs font-bold text-foreground focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] text-muted-foreground block mb-1">{t("checkOut")}</label>
                                                            <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="w-full p-2 rounded-xl border border-border bg-surface-secondary text-xs font-bold text-foreground focus:outline-none" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-2 border-t border-border flex items-center justify-between">
                                                    <span className="text-xs font-bold text-foreground">{t("guests")}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="size-7 rounded-lg bg-surface-secondary text-foreground font-bold flex items-center justify-center hover:bg-border">
                                                            -
                                                        </button>
                                                        <span className="text-xs font-bold w-5 text-center">{adults}</span>
                                                        <button type="button" onClick={() => setAdults(adults + 1)} className="size-7 rounded-lg bg-surface-secondary text-foreground font-bold flex items-center justify-center hover:bg-border">
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : activeTab === "sports" ? (
                                            <div className="space-y-1">
                                                <div className="text-xs font-bold text-foreground mb-2">{t("selectMatchSlot")}</div>
                                                {[
                                                    { id: "any", label: t.has("slotLabels.any") ? t("slotLabels.any") : "Any Time Slot" },
                                                    { id: "morning", label: t.has("slotLabels.morning") ? t("slotLabels.morning") : "Morning (6:00 AM - 10:00 AM)" },
                                                    { id: "evening", label: t.has("slotLabels.evening") ? t("slotLabels.evening") : "Evening (6:00 PM - 10:00 PM)" },
                                                    { id: "night", label: t.has("slotLabels.night") ? t("slotLabels.night") : "Night Floodlit (10:00 PM - 1:00 AM)" },
                                                ].map((s) => (
                                                    <button
                                                        key={s.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSportSlot(s.id);
                                                            setOpenPopover(null);
                                                        }}
                                                        className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${sportSlot === s.id ? "bg-primary/10 text-primary" : "hover:bg-surface-secondary text-foreground"}`}
                                                    >
                                                        <span>{s.label}</span>
                                                        {sportSlot === s.id && <Check className="size-4 text-accent" />}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <div className="text-xs font-bold text-foreground mb-2">{t("selectBedrooms")}</div>
                                                {[
                                                    { id: "any", label: t.has("bedroomLabels.any") ? t("bedroomLabels.any") : "Any Bedroom Count" },
                                                    { id: "1", label: t.has("bedroomLabels.1") ? t("bedroomLabels.1") : "1 Bedroom / Bachelor Seat" },
                                                    { id: "2", label: t.has("bedroomLabels.2") ? t("bedroomLabels.2") : "2 Bedrooms Flat" },
                                                    { id: "3", label: t.has("bedroomLabels.3") ? t("bedroomLabels.3") : "3 Bedrooms Flat" },
                                                    { id: "4+", label: t.has("bedroomLabels.4+") ? t("bedroomLabels.4+") : "4+ Bedrooms / Duplex" },
                                                ].map((b) => (
                                                    <button
                                                        key={b.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setBedroomCount(b.id);
                                                            setOpenPopover(null);
                                                        }}
                                                        className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${bedroomCount === b.id ? "bg-primary/10 text-primary" : "hover:bg-surface-secondary text-foreground"}`}
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
                            <div className="relative w-45">
                                <div onClick={() => setOpenPopover(openPopover === "seg4" ? null : "seg4")} className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer flex flex-col justify-center ${openPopover === "seg4" ? "bg-surface-secondary ring-2 ring-primary/20" : "hover:bg-surface-secondary/70"}`}>
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{seg4.label}</span>
                                    <div className="flex items-center justify-between gap-1.5 mt-0.5">
                                        <span className="text-sm font-bold text-foreground truncate">{seg4.value}</span>
                                        <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
                                    </div>
                                </div>

                                {/* Popover 4: Budget Selector */}
                                {openPopover === "seg4" && (
                                    <div className="absolute right-0 top-full mt-3 w-76 p-4 bg-white dark:bg-card rounded-3xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <div className="text-xs font-bold text-foreground mb-2">{t("budgetTarget")}</div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {(activeTab === "buy"
                                                ? [
                                                      { id: "any", label: t.has("budgetLabels.buy.any") ? t("budgetLabels.buy.any") : "Any Price" },
                                                      { id: "under-50l", label: t.has("budgetLabels.buy.under50l") ? t("budgetLabels.buy.under50l") : "Under ৳50L" },
                                                      { id: "50l-1cr", label: t.has("budgetLabels.buy.50l1cr") ? t("budgetLabels.buy.50l1cr") : "৳50L - ৳1Cr" },
                                                      { id: "1cr+", label: t.has("budgetLabels.buy.1crPlus") ? t("budgetLabels.buy.1crPlus") : "৳1 Crore+" },
                                                  ]
                                                : activeTab === "sports"
                                                  ? [
                                                        { id: "any", label: t.has("budgetLabels.sports.any") ? t("budgetLabels.sports.any") : "Any Rate" },
                                                        { id: "under-2k", label: t.has("budgetLabels.sports.under2k") ? t("budgetLabels.sports.under2k") : "Under ৳2k/hr" },
                                                        { id: "2k-4k", label: t.has("budgetLabels.sports.2k4k") ? t("budgetLabels.sports.2k4k") : "৳2k - ৳4k/hr" },
                                                        { id: "4k+", label: t.has("budgetLabels.sports.4kPlus") ? t("budgetLabels.sports.4kPlus") : "৳4k+/hr" },
                                                    ]
                                                  : [
                                                        { id: "any", label: t.has("budgetLabels.rent.any") ? t("budgetLabels.rent.any") : "Any Rent" },
                                                        { id: "under-15k", label: t.has("budgetLabels.rent.under15k") ? t("budgetLabels.rent.under15k") : "Under ৳15k" },
                                                        { id: "15k-35k", label: t.has("budgetLabels.rent.15k35k") ? t("budgetLabels.rent.15k35k") : "৳15k - ৳35k" },
                                                        { id: "35k+", label: t.has("budgetLabels.rent.35kPlus") ? t("budgetLabels.rent.35kPlus") : "৳35k / mo+" },
                                                    ]
                                            ).map((b) => (
                                                <button
                                                    key={b.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setBudgetRange(b.id);
                                                        setOpenPopover(null);
                                                    }}
                                                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${budgetRange === b.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-surface-secondary text-foreground"}`}
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
                                <button type="submit" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-hover active:scale-95 text-primary-foreground font-extrabold text-sm shadow-md transition-all cursor-pointer">
                                    <Search className="size-4" />
                                    <span>{t("search")}</span>
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
                                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground block">{t("where")}</label>
                                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t("wherePlaceholder")} className="w-full bg-transparent text-xs font-bold text-foreground placeholder:text-muted-foreground/60 focus:outline-none" />
                                </div>
                            </div>

                            {/* Row 2: Category Selector */}
                            <div className="grid grid-cols-2 gap-2">
                                <div onClick={() => setOpenPopover(openPopover === "type" ? null : "type")} className="p-3 rounded-2xl bg-surface-secondary/70 border border-border/70 cursor-pointer">
                                    <span className="text-[10px] font-extrabold uppercase text-muted-foreground block">{t("propertyType")}</span>
                                    <span className="text-xs font-bold text-foreground truncate block mt-0.5">{displayTypeLabel}</span>
                                </div>

                                <div onClick={() => setOpenPopover(openPopover === "seg3" ? null : "seg3")} className="p-3 rounded-2xl bg-surface-secondary/70 border border-border/70 cursor-pointer">
                                    <span className="text-[10px] font-extrabold uppercase text-muted-foreground block">{seg3.label}</span>
                                    <span className="text-xs font-bold text-foreground truncate block mt-0.5">{seg3.value}</span>
                                </div>
                            </div>

                            {/* Mobile Popovers */}
                            {openPopover === "type" && (
                                <div className="p-3 rounded-2xl bg-white dark:bg-card border border-border shadow-lg space-y-1">
                                    <div className="text-xs font-bold text-foreground mb-1">{t("selectCategory")}:</div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedType("all");
                                            setSelectedTypeLabel(t("allCategories"));
                                            setOpenPopover(null);
                                        }}
                                        className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-surface-secondary flex items-center justify-between"
                                    >
                                        <span>{t("allCategories")}</span>
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
                                    <div className="text-xs font-bold text-foreground mb-1">{t("selectOption")}:</div>
                                    {activeTab === "sports"
                                        ? [
                                              { id: "any", label: t.has("slotLabels.any") ? t("slotLabels.any") : "Any Time Slot" },
                                              { id: "morning", label: t.has("slotLabels.morning") ? t("slotLabels.morning") : "Morning (6AM - 10AM)" },
                                              { id: "evening", label: t.has("slotLabels.evening") ? t("slotLabels.evening") : "Evening (6PM - 10PM)" },
                                              { id: "night", label: t.has("slotLabels.night") ? t("slotLabels.night") : "Night (10PM - 1AM)" },
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
                                        : [
                                              { id: "any", label: t.has("bedroomLabels.any") ? t("bedroomLabels.any") : "Any Bedroom Count" },
                                              { id: "1", label: t.has("bedOne") ? t("bedOne") : "1 Bed" },
                                              { id: "2", label: t.has("bedTwo") ? t("bedTwo") : "2 Beds" },
                                              { id: "3", label: t.has("bedThree") ? t("bedThree") : "3 Beds" },
                                              { id: "4+", label: t.has("bedFourPlus") ? t("bedFourPlus") : "4+ Beds" },
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
                                          ))}
                                </div>
                            )}

                            {/* Row 3: Budget Selector */}
                            <div onClick={() => setOpenPopover(openPopover === "seg4" ? null : "seg4")} className="p-3 rounded-2xl bg-surface-secondary/70 border border-border/70 cursor-pointer flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-extrabold uppercase text-muted-foreground block">{seg4.label}</span>
                                    <span className="text-xs font-bold text-foreground mt-0.5 block">{seg4.value}</span>
                                </div>
                                <ChevronDown className="size-4 text-muted-foreground" />
                            </div>

                            {openPopover === "seg4" && (
                                <div className="p-3 rounded-2xl bg-white dark:bg-card border border-border shadow-lg">
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {(activeTab === "buy"
                                            ? [
                                                  { id: "any", label: t.has("budgetLabels.buy.any") ? t("budgetLabels.buy.any") : "Any Price" },
                                                  { id: "under-50l", label: t.has("budgetLabels.buy.under50l") ? t("budgetLabels.buy.under50l") : "Under ৳50L" },
                                                  { id: "50l-1cr", label: t.has("budgetLabels.buy.50l1cr") ? t("budgetLabels.buy.50l1cr") : "৳50L - ৳1Cr" },
                                                  { id: "1cr+", label: t.has("budgetLabels.buy.1crPlus") ? t("budgetLabels.buy.1crPlus") : "৳1 Crore+" },
                                              ]
                                            : activeTab === "sports"
                                              ? [
                                                    { id: "any", label: t.has("budgetLabels.sports.any") ? t("budgetLabels.sports.any") : "Any Rate" },
                                                    { id: "under-2k", label: t.has("budgetLabels.sports.under2k") ? t("budgetLabels.sports.under2k") : "Under ৳2k/hr" },
                                                    { id: "2k-4k", label: t.has("budgetLabels.sports.2k4k") ? t("budgetLabels.sports.2k4k") : "৳2k - ৳4k/hr" },
                                                    { id: "4k+", label: t.has("budgetLabels.sports.4kPlus") ? t("budgetLabels.sports.4kPlus") : "৳4k+/hr" },
                                                ]
                                              : [
                                                    { id: "any", label: t.has("budgetLabels.rent.any") ? t("budgetLabels.rent.any") : "Any Rent" },
                                                    { id: "under-15k", label: t.has("budgetLabels.rent.under15k") ? t("budgetLabels.rent.under15k") : "Under ৳15k" },
                                                    { id: "15k-35k", label: t.has("budgetLabels.rent.15k35k") ? t("budgetLabels.rent.15k35k") : "৳15k - ৳35k" },
                                                    { id: "35k+", label: t.has("budgetLabels.rent.35kPlus") ? t("budgetLabels.rent.35kPlus") : "৳35k / mo+" },
                                                ]
                                        ).map((b) => (
                                            <button
                                                key={b.id}
                                                type="button"
                                                onClick={() => {
                                                    setBudgetRange(b.id);
                                                    setOpenPopover(null);
                                                }}
                                                className={`p-2 rounded-xl text-xs font-bold border ${budgetRange === b.id ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:bg-surface-secondary"}`}
                                            >
                                                {b.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Row 4: Submit Button */}
                            <button type="submit" className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-primary-foreground font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer">
                                <Search className="size-4" />
                                <span>{t("search")}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HomeSearchBar;
