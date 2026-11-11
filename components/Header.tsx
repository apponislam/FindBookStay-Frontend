"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Home,
    Building2,
    Building,
    Warehouse,
    MapPin,
    Sparkles,
    BedDouble,
    Users,
    CalendarDays,
    Briefcase,
    Hotel,
    Palmtree,
    Coffee,
    Tent,
    Compass,
    Crown,
    Trophy,
    Shield,
    Dumbbell,
    Activity,
    Award,
    Star,
    Heart,
    Clock,
    Info,
    Bell,
    Plus,
    ChevronDown,
    Menu,
    X,
    User,
    Settings,
    LogOut,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
    HelpCircle,
    PhoneCall,
    SlidersHorizontal,
} from "lucide-react";

interface SubItem {
    name: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    badge?: string;
}

interface CategoryMenu {
    id: string;
    label: string;
    href: string;
    items: SubItem[];
}

const CATEGORIES: CategoryMenu[] = [
    {
        id: "buy",
        label: "Buy",
        href: "/buy",
        items: [
            {
                name: "Residential Properties",
                desc: "Flats, townhouses & homes in prime neighborhoods",
                icon: Home,
                href: "/buy/residential",
            },
            {
                name: "Commercial Properties",
                desc: "Offices, retail spaces, plazas & commercial plots",
                icon: Building2,
                href: "/buy/commercial",
            },
            {
                name: "Apartments & Flats",
                desc: "Modern luxury high-rise units & cozy apartments",
                icon: Building,
                href: "/buy/apartments",
            },
            {
                name: "Houses & Villas",
                desc: "Independent duplexes, standalone homes & villas",
                icon: Warehouse,
                href: "/buy/houses",
            },
            {
                name: "Land & Plots",
                desc: "Verified residential, commercial & farmland plots",
                icon: MapPin,
                href: "/buy/land",
            },
            {
                name: "New Developments",
                desc: "Pre-launch gated communities & off-plan deals",
                icon: Sparkles,
                href: "/buy/new-developments",
                badge: "New",
            },
        ],
    },
    {
        id: "rent",
        label: "Rent",
        href: "/rent",
        items: [
            {
                name: "Family Apartments",
                desc: "2 to 4-bedroom rental flats in secure areas",
                icon: Home,
                href: "/rent/family-apartments",
            },
            {
                name: "Family Houses",
                desc: "Full independent duplexes, villas & standalone homes",
                icon: Building2,
                href: "/rent/family-houses",
            },
            {
                name: "Bachelor Seats",
                desc: "Single & shared seats with WiFi, food & utilities",
                icon: BedDouble,
                href: "/rent/bachelor-seats",
                badge: "Popular",
            },
            {
                name: "Shared Rooms",
                desc: "Budget-friendly shared spaces with verified flatmates",
                icon: Users,
                href: "/rent/shared-rooms",
            },
            {
                name: "Monthly Sublets",
                desc: "Furnished short and medium term monthly leases",
                icon: CalendarDays,
                href: "/rent/sublets",
            },
            {
                name: "Commercial Rentals",
                desc: "Corporate office spaces, showrooms & storefronts",
                icon: Briefcase,
                href: "/rent/commercial",
            },
        ],
    },
    {
        id: "book",
        label: "Book",
        href: "/book",
        items: [
            {
                name: "Hotels",
                desc: "Handpicked 5-star, boutique & budget city hotels",
                icon: Hotel,
                href: "/book/hotels",
            },
            {
                name: "Resorts",
                desc: "Scenic lakeside, beach & mountain nature getaways",
                icon: Palmtree,
                href: "/book/resorts",
                badge: "Hot",
            },
            {
                name: "Guest Houses",
                desc: "Cozy home-style bed & breakfast stays with warm hosts",
                icon: Coffee,
                href: "/book/guest-houses",
            },
            {
                name: "Holiday Homes",
                desc: "Private seaside villas, cabins & vacation cottages",
                icon: Tent,
                href: "/book/holiday-homes",
            },
            {
                name: "Short-Stay Apartments",
                desc: "Serviced executive suites with kitchens & workspaces",
                icon: Compass,
                href: "/book/short-stay",
            },
            {
                name: "Luxury VIP Suites",
                desc: "Exclusive penthouses & premium weekend stays",
                icon: Crown,
                href: "/book/luxury",
            },
        ],
    },
    {
        id: "sports",
        label: "Sports & Activities",
        href: "/sports",
        items: [
            {
                name: "Turf Booking",
                desc: "Artificial grass soccer & cricket turfs with floodlights",
                icon: Trophy,
                href: "/sports/turf-booking",
                badge: "Trending",
            },
            {
                name: "Football Grounds",
                desc: "Full standard size grass grounds for club matches",
                icon: Shield,
                href: "/sports/football-grounds",
            },
            {
                name: "Indoor Sports Courts",
                desc: "Badminton, basketball, table tennis & futsal arenas",
                icon: Dumbbell,
                href: "/sports/indoor-sports",
            },
            {
                name: "Swimming & Wellness",
                desc: "Olympic training pools, health clubs & leisure hubs",
                icon: Activity,
                href: "/sports/swimming",
            },
            {
                name: "Tournament Venues",
                desc: "Book complete tournament complexes & corporate leagues",
                icon: Award,
                href: "/sports/tournaments",
            },
            {
                name: "Other Activities",
                desc: "Paintball, bowling alleys, go-karting & arcades",
                icon: Compass,
                href: "/sports/other-activities",
            },
        ],
    },
    {
        id: "explore",
        label: "Explore",
        href: "/explore",
        items: [
            {
                name: "Popular Locations",
                desc: "Explore top cities, metropolitan hubs & scenic regions",
                icon: Compass,
                href: "/explore/locations",
            },
            {
                name: "Featured Properties",
                desc: "Curated premium listings with top ratings & reviews",
                icon: Star,
                href: "/explore/featured",
            },
            {
                name: "Popular Hotels",
                desc: "Traveler favorite stays across premier tourist destinations",
                icon: Heart,
                href: "/explore/popular-hotels",
            },
            {
                name: "Recently Added",
                desc: "Latest verified listings updated daily across all categories",
                icon: Clock,
                href: "/explore/recently-added",
                badge: "Live",
            },
            {
                name: "Verified Guarantee",
                desc: "How we inspect 100% of properties to eliminate scams",
                icon: ShieldCheck,
                href: "/explore/guarantee",
            },
            {
                name: "About FindBookStay",
                desc: "Our story, vision, partner program & support team",
                icon: Info,
                href: "/explore/about",
            },
        ],
    },
];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // default true for preview
    const [favoritesCount] = useState(3);
    const [notificationsCount] = useState(2);

    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const navContainerRef = useRef<HTMLDivElement>(null);

    // Handle sticky navbar scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        if (mobileDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileDrawerOpen]);

    // Close menus on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveMenu(null);
                setUserDropdownOpen(false);
                setMobileDrawerOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Close menus on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
                setActiveMenu(null);
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMouseEnter = (catId: string) => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
        }
        setActiveMenu(catId);
    };

    const handleMouseLeave = () => {
        hoverTimerRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 180);
    };

    const toggleMobileCategory = (catId: string) => {
        setMobileExpandedCat((prev) => (prev === catId ? null : catId));
    };

    return (
        <>
            <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E5EAE8] py-2.5" : "bg-white border-b border-[#E5EAE8]/70 py-4"}`} ref={navContainerRef}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* 1. LEFT: Brand Logo */}
                        <div className="flex items-center shrink-0">
                            <Link href="/" className="group flex items-center gap-2.5 transition-transform duration-200 hover:opacity-95 cursor-pointer" aria-label="FindBookStay Homepage">
                                <div className="relative h-9 sm:h-10 w-auto flex items-center">
                                    <Image src="/findbookstay-logo.png" alt="FindBookStay Logo" width={180} height={52} priority className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
                                </div>
                            </Link>
                        </div>

                        {/* 2. CENTER: Desktop Navigation Mega Menus */}
                        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
                            {CATEGORIES.map((cat) => {
                                const isOpen = activeMenu === cat.id;
                                return (
                                    <div key={cat.id} className="relative" onMouseEnter={() => handleMouseEnter(cat.id)} onMouseLeave={handleMouseLeave}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveMenu(isOpen ? null : cat.id)}
                                            className={`cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-[14px] font-medium rounded-full transition-all duration-200 ${isOpen ? "text-[#10B981] bg-[#F0F5F3] shadow-xs" : "text-[#172B2A] hover:text-[#10B981] hover:bg-[#F8FAF9]"}`}
                                            aria-expanded={isOpen}
                                        >
                                            <span>{cat.label}</span>
                                            <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#10B981]" : "text-[#64748B]"}`} />
                                        </button>

                                        {/* Mega Menu Dropdown with smooth small-to-big zoom-in animation */}
                                        {isOpen && (
                                            <div
                                                className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-screen max-w-3xl z-50 px-4 origin-top transition-all duration-300 ease-out animate-in fade-in zoom-in-95 slide-in-from-top-1"
                                                onMouseEnter={() => handleMouseEnter(cat.id)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div className="bg-white rounded-2xl shadow-2xl border border-[#E2EAE6] overflow-hidden p-6 ring-1 ring-black/5">
                                                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2EAE6]/60">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">{cat.label} Categories</span>
                                                        <Link href={cat.href} onClick={() => setActiveMenu(null)} className="cursor-pointer text-xs font-medium text-[#10B981] hover:underline inline-flex items-center gap-1">
                                                            View all {cat.label}
                                                            <ArrowRight className="size-3" />
                                                        </Link>
                                                    </div>

                                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {cat.items.map((item) => {
                                                            const IconComponent = item.icon;
                                                            return (
                                                                <Link
                                                                    key={item.name}
                                                                    href={item.href}
                                                                    onClick={() => setActiveMenu(null)}
                                                                    className="cursor-pointer group/item flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-[#F8FAF9] hover:shadow-xs border border-transparent hover:border-[#E2EAE6]/60"
                                                                >
                                                                    <div className="shrink-0 size-9 rounded-lg bg-[#F0F5F3] text-[#073B35] flex items-center justify-center transition-colors duration-200 group-hover/item:bg-[#10B981] group-hover/item:text-white">
                                                                        <IconComponent className="size-4.5" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-center gap-1.5">
                                                                            <p className="text-[13px] font-semibold text-[#172B2A] group-hover/item:text-[#10B981] transition-colors truncate">{item.name}</p>
                                                                            {item.badge && <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-[#F0F5F3] text-[#10B981]">{item.badge}</span>}
                                                                        </div>
                                                                        <p className="text-[11px] text-[#64748B] line-clamp-1 leading-snug mt-0.5">{item.desc}</p>
                                                                    </div>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>

                        {/* 3. RIGHT: Actions & Account */}
                        <div className="flex items-center gap-2 sm:gap-2.5">
                            {/* Post a Listing CTA Button */}
                            <Link href="/post-listing" className="cursor-pointer relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#073B35] hover:bg-[#052F2A] text-white text-xs sm:text-[13px] font-semibold shadow-xs hover:shadow transition-all duration-200 group">
                                <Plus className="size-3.5 transition-transform duration-200 group-hover:rotate-90" />
                                <span className="whitespace-nowrap">Post Listing</span>
                            </Link>

                            {/* Favorites Icon */}
                            <Link href="/saved" className="cursor-pointer relative hidden sm:flex items-center justify-center size-9 rounded-full text-[#172B2A] hover:text-[#10B981] hover:bg-[#F8FAF9] transition-colors" aria-label="Saved Listings">
                                <Heart className="size-4.5" />
                                {favoritesCount > 0 && <span className="absolute top-1 right-1 flex items-center justify-center size-4 rounded-full bg-[#10B981] text-[10px] font-bold text-white shadow-2xs">{favoritesCount}</span>}
                            </Link>

                            {/* Notifications Icon (if authenticated) */}
                            {isAuthenticated && (
                                <Link href="/notifications" className="cursor-pointer relative hidden sm:flex items-center justify-center size-9 rounded-full text-[#172B2A] hover:text-[#10B981] hover:bg-[#F8FAF9] transition-colors" aria-label="Notifications">
                                    <Bell className="size-4.5" />
                                    {notificationsCount > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#10B981] ring-2 ring-white" />}
                                </Link>
                            )}

                            {/* User Profile or Guest Login */}
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        className="cursor-pointer flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-[#E2EAE6] hover:border-[#10B981]/40 hover:bg-[#F8FAF9] transition-all duration-200"
                                        aria-expanded={userDropdownOpen}
                                        aria-label="User profile menu"
                                    >
                                        <div className="size-7 rounded-full bg-linear-to-tr from-[#073B35] to-[#10B981] text-white flex items-center justify-center text-xs font-semibold uppercase shadow-2xs">AI</div>
                                        <span className="hidden xl:inline-block text-[13px] font-medium text-[#172B2A]">Appon</span>
                                        <ChevronDown className="size-3.5 text-[#64748B]" />
                                    </button>

                                    {/* Profile Dropdown with smooth zoom-in animation */}
                                    {userDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-[#E2EAE6] py-2 z-50 origin-top-right transition-all duration-250 ease-out animate-in fade-in zoom-in-95">
                                            <div className="px-4 py-2.5 border-b border-[#E2EAE6]/70">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-semibold text-[#172B2A]">Appon Islam</p>
                                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F0F5F3] text-[#10B981]">
                                                        <CheckCircle2 className="size-2.5" /> Verified
                                                    </span>
                                                </div>
                                                <p className="text-xs text-[#64748B] truncate mt-0.5">appon@findbookstay.com</p>
                                            </div>

                                            <div className="py-1">
                                                <Link href="/my-bookings" onClick={() => setUserDropdownOpen(false)} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                                    <CalendarDays className="size-4 text-[#64748B]" />
                                                    My Bookings & Stays
                                                </Link>
                                                <Link href="/my-listings" onClick={() => setUserDropdownOpen(false)} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                                    <Building className="size-4 text-[#64748B]" />
                                                    My Posted Listings
                                                </Link>
                                                <Link href="/saved" onClick={() => setUserDropdownOpen(false)} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                                    <Heart className="size-4 text-[#64748B]" />
                                                    Saved Favorites ({favoritesCount})
                                                </Link>
                                                <Link href="/account/settings" onClick={() => setUserDropdownOpen(false)} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                                    <Settings className="size-4 text-[#64748B]" />
                                                    Account Settings
                                                </Link>
                                                <Link href="/help" onClick={() => setUserDropdownOpen(false)} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                                    <HelpCircle className="size-4 text-[#64748B]" />
                                                    Help & Support
                                                </Link>
                                            </div>

                                            <div className="pt-1 mt-1 border-t border-[#E2EAE6]/70">
                                                {/* Demo switcher button */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAuthenticated(false);
                                                        setUserDropdownOpen(false);
                                                    }}
                                                    className="cursor-pointer w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#64748B] hover:bg-[#F8FAF9] transition-colors text-left"
                                                >
                                                    <SlidersHorizontal className="size-3.5 text-[#64748B]" />
                                                    Switch to Guest View (Demo)
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAuthenticated(false);
                                                        setUserDropdownOpen(false);
                                                    }}
                                                    className="cursor-pointer w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                                                >
                                                    <LogOut className="size-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5">
                                    <Link href="/login" className="cursor-pointer px-3 py-1.5 rounded-full text-xs font-semibold text-[#172B2A] hover:text-[#10B981] hover:bg-[#F8FAF9] transition-colors">
                                        Log In
                                    </Link>
                                    <Link href="/signup" className="cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#10B981] hover:bg-[#059669] text-white shadow-xs transition-colors">
                                        Sign Up
                                    </Link>
                                    {/* Demo switch back to authenticated */}
                                    <button type="button" onClick={() => setIsAuthenticated(true)} title="Switch to Authenticated View (Demo)" className="cursor-pointer p-1.5 text-[11px] text-[#64748B] hover:text-[#10B981]">
                                        <User className="size-4" />
                                    </button>
                                </div>
                            )}

                            {/* Mobile Hamburger Button */}
                            <button type="button" onClick={() => setMobileDrawerOpen(true)} className="cursor-pointer lg:hidden p-2 rounded-xl text-[#172B2A] hover:bg-[#F8FAF9] transition-colors focus:outline-none" aria-label="Open mobile navigation menu">
                                <Menu className="size-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ============================================================== */}
            {/* 4. MOBILE SLIDE-IN NAVIGATION DRAWER                           */}
            {/* ============================================================== */}
            {mobileDrawerOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop overlay */}
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in" onClick={() => setMobileDrawerOpen(false)} />

                    {/* Drawer container */}
                    <div className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
                        {/* Top Drawer Header */}
                        <div>
                            <div className="flex items-center justify-between p-4 border-b border-[#E2EAE6]">
                                <Link href="/" onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer flex items-center gap-2">
                                    <Image src="/findbookstay-logo.png" alt="FindBookStay" width={150} height={44} className="h-8 w-auto object-contain" />
                                </Link>
                                <button type="button" onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer p-2 rounded-full text-[#64748B] hover:text-[#172B2A] hover:bg-[#F8FAF9] transition-colors" aria-label="Close navigation">
                                    <X className="size-5" />
                                </button>
                            </div>

                            {/* Mobile Primary Action Button */}
                            <div className="p-4 border-b border-[#E2EAE6]/70">
                                <Link href="/post-listing" onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#073B35] hover:bg-[#052F2A] text-white text-xs font-semibold shadow-xs transition-colors">
                                    <Plus className="size-4" />
                                    Post Your Listing For Free
                                </Link>
                            </div>

                            {/* Mobile Category Accordions */}
                            <div className="py-2 px-3 space-y-1">
                                {CATEGORIES.map((cat) => {
                                    const isExpanded = mobileExpandedCat === cat.id;
                                    return (
                                        <div key={cat.id} className="rounded-xl border border-transparent overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => toggleMobileCategory(cat.id)}
                                                className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${isExpanded ? "bg-[#F0F5F3] text-[#10B981]" : "text-[#172B2A] hover:bg-[#F8FAF9]"}`}
                                            >
                                                <span className="flex items-center gap-2">{cat.label}</span>
                                                <ChevronDown className={`size-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#10B981]" : "text-[#64748B]"}`} />
                                            </button>

                                            {isExpanded && (
                                                <div className="pl-3 pr-2 py-2 space-y-1 bg-white animate-in slide-in-from-top-1 duration-150">
                                                    {cat.items.map((item) => {
                                                        const ItemIcon = item.icon;
                                                        return (
                                                            <Link key={item.name} href={item.href} onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                                                <div className="size-6 rounded-md bg-[#F0F5F3] text-[#073B35] flex items-center justify-center shrink-0">
                                                                    <ItemIcon className="size-3.5" />
                                                                </div>
                                                                <span className="flex-1 truncate">{item.name}</span>
                                                                {item.badge && <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded-full bg-[#F0F5F3] text-[#10B981]">{item.badge}</span>}
                                                            </Link>
                                                        );
                                                    })}
                                                    <Link href={cat.href} onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer block p-2 text-xs font-semibold text-[#10B981] hover:underline">
                                                        Explore All {cat.label} &rarr;
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Quick links */}
                            <div className="px-4 py-3 border-t border-[#E2EAE6]/70 space-y-2">
                                <Link href="/saved" onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer flex items-center justify-between text-xs font-medium text-[#172B2A] p-2 rounded-lg hover:bg-[#F8FAF9]">
                                    <span className="flex items-center gap-2">
                                        <Heart className="size-4 text-[#10B981]" /> Saved Favorites
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-[#F0F5F3] text-[#10B981] text-[10px] font-bold">{favoritesCount}</span>
                                </Link>
                                <Link href="/help" onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer flex items-center gap-2 text-xs font-medium text-[#172B2A] p-2 rounded-lg hover:bg-[#F8FAF9]">
                                    <PhoneCall className="size-4 text-[#10B981]" /> 24/7 Support Hotline
                                </Link>
                            </div>
                        </div>

                        {/* Bottom: Auth Actions in Drawer */}
                        <div className="p-4 border-t border-[#E2EAE6] bg-[#F8FAF9]">
                            {isAuthenticated ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="size-9 rounded-full bg-linear-to-tr from-[#073B35] to-[#10B981] text-white flex items-center justify-center text-xs font-bold uppercase">AI</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-[#172B2A] truncate">Appon Islam</p>
                                            <p className="text-[11px] text-[#64748B] truncate">appon@findbookstay.com</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <Link href="/account/settings" onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer py-1.5 px-3 text-center rounded-lg border border-[#E2EAE6] bg-white text-xs font-semibold text-[#172B2A] hover:bg-slate-50">
                                            Settings
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsAuthenticated(false);
                                                setMobileDrawerOpen(false);
                                            }}
                                            className="cursor-pointer py-1.5 px-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link href="/login" onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer w-full flex items-center justify-center py-2 px-4 rounded-xl border border-[#073B35] text-[#073B35] text-xs font-semibold hover:bg-white">
                                        Log In
                                    </Link>
                                    <Link href="/signup" onClick={() => setMobileDrawerOpen(false)} className="cursor-pointer w-full flex items-center justify-center py-2 px-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold shadow-xs">
                                        Create Free Account
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
