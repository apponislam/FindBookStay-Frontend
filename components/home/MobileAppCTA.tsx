"use client";

import React from "react";
import Image from "next/image";
import {
    Apple,
    GooglePlay,
    Sparkles,
    ShieldCheck,
    Bell,
    MapPin,
    Home,
    Search,
    Trophy,
    Heart,
    Star,
    Hotel,
    Zap,
    CheckCircle2,
    Wifi,
    User,
    SlidersHorizontal,
    PhoneCall,
} from "@/components/Icons";

export const MobileAppCTA = () => {
    return (
        <section
            aria-label="FindBookStay Mobile Apps"
            className="py-16 sm:py-24 bg-background border-t border-border overflow-hidden select-none relative"
        >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute top-1/4 -left-40 size-112.5 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/4 -right-40 size-100 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* ============================================================== */}
                    {/* LEFT: 3 REALISTIC 3D IPHONES IN HARMONIOUS 3D ROTATION          */}
                    {/* ============================================================== */}
                    <div className="lg:col-span-7 flex items-center justify-center order-2 lg:order-1">
                        <div className="relative w-full max-w-155 lg:max-w-170 h-110 sm:h-135 md:h-150 flex items-center justify-center">
                            {/* Ambient Stage Glow Behind Mockups */}
                            <div className="absolute inset-0 m-auto size-72 sm:size-96 rounded-full bg-linear-to-tr from-emerald-500/20 via-teal-500/15 to-transparent blur-3xl pointer-events-none" />

                            {/* Diffused Floor Shadows */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-72 sm:w-96 md:w-120 h-10 sm:h-14 bg-black/35 dark:bg-black/75 blur-2xl rounded-full pointer-events-none" />

                            {/* ---------------------------------------------------------- */}
                            {/* PHONE 1 (LEFT): Stays & Luxury Resorts (Tilted -22°)       */}
                            {/* ---------------------------------------------------------- */}
                            <div className="absolute left-1/2 translate-x-[-108%] sm:translate-x-[-102%] md:translate-x-[-98%] top-1/2 translate-y-[-48%] rotate-[-20deg] sm:rotate-[-22deg] z-10 hover:rotate-[-16deg] hover:z-40 transition-all duration-500 origin-center cursor-pointer group">
                                <div className="relative w-38.75 sm:w-51.25 md:w-58.75 lg:w-61.25 h-82.5 sm:h-108.75 md:h-123.75 lg:h-128.75 rounded-[32px] sm:rounded-[42px] md:rounded-[46px] bg-linear-to-b from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-500 dark:via-zinc-600 dark:to-zinc-800 p-[2.5px] sm:p-1 shadow-[-16px_22px_45px_rgba(0,0,0,0.35)] dark:shadow-[-20px_28px_60px_rgba(0,0,0,0.85)] ring-1 ring-black/10 dark:ring-white/15">
                                    {/* Black Bezel */}
                                    <div className="relative rounded-[29px] sm:rounded-[38px] md:rounded-[42px] bg-black p-1 sm:p-1.5 h-full flex flex-col">
                                        {/* Dynamic Island */}
                                        <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-14 sm:w-20 md:w-22 h-2.5 sm:h-3.5 bg-black rounded-full z-40 flex items-center justify-between px-1.5 border border-white/10">
                                            <div className="size-1 sm:size-1.5 rounded-full bg-zinc-800" />
                                            <div className="size-1 rounded-full bg-emerald-400" />
                                        </div>

                                        {/* OLED Screen Content */}
                                        <div className="relative rounded-[25px] sm:rounded-[33px] md:rounded-[37px] bg-background border border-border/80 overflow-hidden flex flex-col justify-between h-full p-2 sm:p-2.5">
                                            {/* Status Bar */}
                                            <div className="flex items-center justify-between text-[7px] sm:text-[8.5px] font-bold text-muted-foreground pt-0.5 px-0.5">
                                                <span>9:41</span>
                                                <div className="flex items-center gap-1">
                                                    <Wifi className="size-1.5 sm:size-2" />
                                                    <span className="text-[6.5px] sm:text-[7.5px]">5G</span>
                                                    <div className="w-3 h-1.5 border border-current rounded-2xs p-0.5 flex items-center">
                                                        <div className="h-full w-1.5 bg-current rounded-3xs" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* App Header */}
                                            <div className="flex items-center justify-between pt-0.5">
                                                <div className="flex items-center gap-1">
                                                    <Hotel className="size-2.5 sm:size-3 text-primary" />
                                                    <span className="text-[8.5px] sm:text-[10.5px] font-extrabold text-foreground tracking-tight">Stays & Resorts</span>
                                                </div>
                                                <span className="text-[6.5px] sm:text-[8px] font-bold text-accent px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">Cox&apos;s Bazar</span>
                                            </div>

                                            {/* Search Bar */}
                                            <div className="flex items-center gap-1 px-1.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-surface-secondary text-[7px] sm:text-[8.5px] text-muted-foreground border border-border/60">
                                                <Search className="size-2 sm:size-2.5 text-primary shrink-0" />
                                                <span className="truncate">Beachfront villas, suites...</span>
                                            </div>

                                            {/* Category Chips */}
                                            <div className="flex items-center gap-1 text-[6.5px] sm:text-[8px] font-bold">
                                                <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">Resorts</span>
                                                <span className="px-1.5 py-0.5 rounded-full bg-surface-secondary text-muted-foreground border border-border/60">Villas</span>
                                                <span className="px-1.5 py-0.5 rounded-full bg-surface-secondary text-muted-foreground border border-border/60">Suites</span>
                                            </div>

                                            {/* Primary Featured Card */}
                                            <div className="rounded-lg sm:rounded-xl border border-border overflow-hidden bg-surface-secondary/40 p-1 sm:p-1.5 space-y-1">
                                                <div className="relative h-18 sm:h-24 md:h-28 w-full rounded-md sm:rounded-lg overflow-hidden bg-zinc-900">
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
                                                        alt="Grand Ocean Resort"
                                                        fill
                                                        sizes="245px"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[6.5px] sm:text-[8px] font-bold text-white flex items-center gap-0.5">
                                                        <Star className="size-1.5 sm:size-2 text-amber-400 fill-amber-400" />
                                                        <span>4.98</span>
                                                    </div>
                                                    <div className="absolute top-1 right-1 size-4 sm:size-5 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
                                                        <Heart className="size-2 sm:size-2.5 text-rose-400 fill-rose-400" />
                                                    </div>
                                                </div>

                                                <div className="px-0.5 space-y-0.5">
                                                    <p className="text-[8.5px] sm:text-[10.5px] font-bold text-foreground line-clamp-1">Grand Ocean Luxury Resort</p>
                                                    <p className="text-[7px] sm:text-[8px] text-muted-foreground flex items-center gap-0.5">
                                                        <MapPin className="size-1.5 sm:size-2 text-accent shrink-0" />
                                                        <span className="truncate">Marine Drive, Beachfront</span>
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between px-0.5 pt-0.5 border-t border-border/60">
                                                    <div>
                                                        <span className="text-[9px] sm:text-[11px] font-black text-foreground">৳12,500</span>
                                                        <span className="text-[6.5px] sm:text-[7.5px] text-muted-foreground ml-0.5">/nt</span>
                                                    </div>
                                                    <span className="px-1.5 py-0.5 rounded sm:rounded-md bg-primary text-primary-foreground text-[7px] sm:text-[8px] font-bold">
                                                        Reserve
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Secondary Mini Card (No dead whitespace!) */}
                                            <div className="rounded-md sm:rounded-lg border border-border/80 bg-surface/80 p-1 flex items-center gap-1.5">
                                                <div className="relative size-7 sm:size-9 rounded shrink-0 overflow-hidden bg-zinc-900">
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
                                                        alt="Coral Bay Villa"
                                                        fill
                                                        sizes="36px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[7.5px] sm:text-[9px] font-bold text-foreground truncate">Coral Bay Sunset Villa</p>
                                                    <p className="text-[6.5px] sm:text-[7.5px] text-muted-foreground truncate">Inani Beach • ৳8,900/nt</p>
                                                </div>
                                                <span className="text-[6.5px] sm:text-[8px] font-bold text-accent shrink-0">★ 4.9</span>
                                            </div>

                                            {/* Tab Bar */}
                                            <div className="flex items-center justify-around pt-0.5 text-muted-foreground text-[6.5px] sm:text-[8px] border-t border-border/50">
                                                <span className="text-primary font-bold">Stays</span>
                                                <span>Explore</span>
                                                <span>Saved</span>
                                                <span>Profile</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ---------------------------------------------------------- */}
                            {/* PHONE 2 (CENTER / HERO): Verified Housing & Rentals         */}
                            {/* Upright / slight -2° tilt, elevated scale & prominent z-30 */}
                            {/* ---------------------------------------------------------- */}
                            <div className="relative z-30 -rotate-2 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 origin-center cursor-pointer group">
                                <div className="relative w-42.5 sm:w-55 md:w-63.75 lg:w-66.25 h-88.75 sm:h-116.25 md:h-132.5 lg:h-137.5 rounded-[34px] sm:rounded-[44px] md:rounded-[48px] bg-linear-to-b from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-400 dark:via-zinc-500 dark:to-zinc-800 p-0.75 sm:p-1 md:p-1.25 shadow-[0_25px_65px_rgba(0,0,0,0.45)] dark:shadow-[0_30px_75px_rgba(0,0,0,0.95)] ring-2 ring-primary/40">
                                    {/* Black Bezel */}
                                    <div className="relative rounded-[31px] sm:rounded-[40px] md:rounded-[44px] bg-black p-1 sm:p-1.5 h-full flex flex-col">
                                        {/* Dynamic Island with Live Activity */}
                                        <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-18 sm:w-24 md:w-26 h-3 sm:h-4 bg-black rounded-full z-40 flex items-center justify-between px-2 border border-white/10 shadow-xs">
                                            <div className="flex items-center gap-1">
                                                <span className="size-1 sm:size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[6px] sm:text-[7.5px] text-emerald-400 font-bold">Verified</span>
                                            </div>
                                            <span className="text-[6px] sm:text-[7.5px] text-zinc-400">Zero Broker</span>
                                        </div>

                                        {/* OLED Screen Content */}
                                        <div className="relative rounded-[27px] sm:rounded-[35px] md:rounded-[39px] bg-background border border-border/80 overflow-hidden flex flex-col justify-between h-full p-2.5 sm:p-3">
                                            {/* Status Bar */}
                                            <div className="flex items-center justify-between text-[7.5px] sm:text-[9px] font-bold text-muted-foreground pt-0.5 px-0.5">
                                                <span>9:41</span>
                                                <div className="flex items-center gap-1">
                                                    <Wifi className="size-2 sm:size-2.5" />
                                                    <span className="text-[7px] sm:text-[8px]">5G</span>
                                                    <div className="w-3.5 h-1.5 border border-current rounded-2xs p-0.5 flex items-center">
                                                        <div className="h-full w-2 bg-current rounded-3xs" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* App Header */}
                                            <div className="flex items-center justify-between pt-0.5">
                                                <div className="flex items-center gap-1">
                                                    <div className="size-4.5 sm:size-5 rounded-md bg-primary text-primary-foreground font-black text-[9px] sm:text-[10px] flex items-center justify-center shadow-2xs">F</div>
                                                    <span className="text-[9.5px] sm:text-[11.5px] font-extrabold text-foreground tracking-tight">
                                                        FindBook<span className="text-primary">Stay</span>
                                                    </span>
                                                </div>
                                                <div className="size-5 rounded-full bg-surface-secondary flex items-center justify-center relative">
                                                    <Bell className="size-2.5 text-muted-foreground" />
                                                    <span className="absolute top-0.5 right-0.5 size-1 rounded-full bg-accent animate-ping" />
                                                </div>
                                            </div>

                                            {/* Search Bar */}
                                            <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-surface-secondary text-[7.5px] sm:text-[9px] text-muted-foreground border border-border/60">
                                                <div className="flex items-center gap-1.5 truncate">
                                                    <Search className="size-2.5 text-primary shrink-0" />
                                                    <span className="truncate">Bashundhara R/A, 3BHK...</span>
                                                </div>
                                                <SlidersHorizontal className="size-2.5 text-muted-foreground shrink-0" />
                                            </div>

                                            {/* Category Filter Pills */}
                                            <div className="flex items-center gap-1 text-[7px] sm:text-[8.5px] font-bold">
                                                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground">Family Flats</span>
                                                <span className="px-2 py-0.5 rounded-full bg-surface-secondary text-muted-foreground border border-border/60">Sublets</span>
                                                <span className="px-2 py-0.5 rounded-full bg-surface-secondary text-muted-foreground border border-border/60">Bachelor</span>
                                            </div>

                                            {/* Featured Apartment Card */}
                                            <div className="rounded-xl border border-border overflow-hidden bg-surface-secondary/40 p-1.5 space-y-1">
                                                <div className="relative h-20 sm:h-28 md:h-32 w-full rounded-lg overflow-hidden bg-zinc-900">
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80"
                                                        alt="Modern Family Flat"
                                                        fill
                                                        sizes="265px"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-emerald-600 text-[7px] sm:text-[8px] font-bold text-white flex items-center gap-0.5 shadow-2xs">
                                                        <ShieldCheck className="size-2.5" />
                                                        <span>Verified Landlord</span>
                                                    </div>
                                                    <div className="absolute bottom-1 left-1.5 text-white">
                                                        <span className="text-[10px] sm:text-[12px] font-black drop-shadow-md">৳32,000</span>
                                                        <span className="text-[7.5px] sm:text-[8.5px] font-normal text-white/80 ml-0.5">/ mo</span>
                                                    </div>
                                                </div>

                                                <div className="px-0.5 space-y-0.5">
                                                    <p className="text-[9px] sm:text-[11px] font-bold text-foreground line-clamp-1">Modern 3BHK Family Flat</p>
                                                    <p className="text-[7.5px] sm:text-[8.5px] text-muted-foreground flex items-center gap-0.5">
                                                        <MapPin className="size-2 text-primary shrink-0" />
                                                        <span className="truncate">Block D, Bashundhara R/A, Dhaka</span>
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between px-0.5 pt-0.5 border-t border-border/60">
                                                    <span className="text-[7px] sm:text-[8px] text-muted-foreground">3 Beds &bull; 3 Baths &bull; 1,850 sqft</span>
                                                    <span className="px-2 py-0.5 rounded bg-accent text-white text-[7px] sm:text-[8px] font-bold flex items-center gap-0.5">
                                                        <PhoneCall className="size-1.5" /> Call Owner
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Secondary Mini Card (No dead whitespace!) */}
                                            <div className="rounded-lg border border-border/80 bg-surface/80 p-1 sm:p-1.5 flex items-center gap-2">
                                                <div className="relative size-8 sm:size-10 rounded shrink-0 overflow-hidden bg-zinc-900">
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
                                                        alt="Gulshan Penthouse"
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[8px] sm:text-[9.5px] font-bold text-foreground truncate">Executive Duplex Suite</p>
                                                    <p className="text-[7px] sm:text-[8px] text-muted-foreground truncate">Gulshan 2 • ৳48,000/mo</p>
                                                </div>
                                                <span className="text-[7px] sm:text-[8px] font-bold text-accent shrink-0">Zero Fee</span>
                                            </div>

                                            {/* Bottom Navigation */}
                                            <div className="flex items-center justify-around pt-0.5 text-[7px] sm:text-[8.5px] text-muted-foreground border-t border-border/50">
                                                <div className="flex flex-col items-center text-primary font-bold">
                                                    <Home className="size-2.5 sm:size-3" />
                                                    <span>Rent</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <Search className="size-2.5 sm:size-3" />
                                                    <span>Search</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <Heart className="size-2.5 sm:size-3" />
                                                    <span>Saved</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <User className="size-2.5 sm:size-3" />
                                                    <span>Profile</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ---------------------------------------------------------- */}
                            {/* PHONE 3 (RIGHT): Sports Turfs & Arenas (Tilted +22°)       */}
                            {/* ---------------------------------------------------------- */}
                            <div className="absolute left-1/2 translate-x-[8%] sm:translate-x-[2%] md:translate-x-[-2%] top-1/2 translate-y-[-48%] rotate-20 sm:rotate-22 z-20 hover:rotate-16 hover:z-40 transition-all duration-500 origin-center cursor-pointer group">
                                <div className="relative w-38.75 sm:w-51.25 md:w-58.75 lg:w-61.25 h-82.5 sm:h-108.75 md:h-123.75 lg:h-128.75 rounded-[32px] sm:rounded-[42px] md:rounded-[46px] bg-linear-to-b from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-500 dark:via-zinc-600 dark:to-zinc-800 p-[2.5px] sm:p-1 shadow-[16px_22px_45px_rgba(0,0,0,0.35)] dark:shadow-[20px_28px_60px_rgba(0,0,0,0.85)] ring-1 ring-black/10 dark:ring-white/15">
                                    {/* Black Bezel */}
                                    <div className="relative rounded-[29px] sm:rounded-[38px] md:rounded-[42px] bg-black p-1 sm:p-1.5 h-full flex flex-col">
                                        {/* Dynamic Island with Live Activity */}
                                        <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-16 sm:w-22 md:w-24 h-2.5 sm:h-3.5 bg-black rounded-full z-40 flex items-center justify-between px-1.5 border border-white/10">
                                            <div className="flex items-center gap-1">
                                                <span className="size-1 rounded-full bg-accent animate-pulse" />
                                                <span className="text-[5.5px] sm:text-[7px] text-accent font-bold">Turf Locked</span>
                                            </div>
                                            <span className="text-[5.5px] sm:text-[7px] text-zinc-400 font-mono">8:00 PM</span>
                                        </div>

                                        {/* OLED Screen Content */}
                                        <div className="relative rounded-[25px] sm:rounded-[33px] md:rounded-[37px] bg-background border border-border/80 overflow-hidden flex flex-col justify-between h-full p-2 sm:p-2.5">
                                            {/* Status Bar */}
                                            <div className="flex items-center justify-between text-[7px] sm:text-[8.5px] font-bold text-muted-foreground pt-0.5 px-0.5">
                                                <span>9:41</span>
                                                <div className="flex items-center gap-1">
                                                    <Wifi className="size-1.5 sm:size-2" />
                                                    <span className="text-[6.5px] sm:text-[7.5px]">5G</span>
                                                    <div className="w-3 h-1.5 border border-current rounded-2xs p-0.5 flex items-center">
                                                        <div className="h-full w-1.5 bg-current rounded-3xs" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* App Header */}
                                            <div className="flex items-center justify-between pt-0.5">
                                                <div className="flex items-center gap-1">
                                                    <Trophy className="size-2.5 sm:size-3 text-amber-500" />
                                                    <span className="text-[8.5px] sm:text-[10.5px] font-extrabold text-foreground tracking-tight">Sports Turfs</span>
                                                </div>
                                                <span className="text-[6.5px] sm:text-[7.5px] font-bold text-emerald-500 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Uttara, Dhaka</span>
                                            </div>

                                            {/* Live Match Confirmation Pass */}
                                            <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-between gap-1">
                                                <div className="space-y-0.2 shrink-0">
                                                    <span className="text-[6px] sm:text-[7px] font-bold uppercase tracking-wider text-accent flex items-center gap-0.5">
                                                        <Zap className="size-1.5 fill-current" /> Instant Pass Confirmed
                                                    </span>
                                                    <p className="text-[7.5px] sm:text-[9px] font-extrabold text-foreground">7v7 Champions Turf</p>
                                                </div>
                                                <span className="px-1.5 py-0.5 rounded bg-accent text-white text-[6px] sm:text-[7px] font-bold">
                                                    QR Pass
                                                </span>
                                            </div>

                                            {/* Primary Featured Arena Card */}
                                            <div className="rounded-lg sm:rounded-xl border border-border overflow-hidden bg-surface-secondary/40 p-1 sm:p-1.5 space-y-1">
                                                <div className="relative h-18 sm:h-24 md:h-28 w-full rounded-md sm:rounded-lg overflow-hidden bg-zinc-900">
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80"
                                                        alt="Green Horizon Premier Turf"
                                                        fill
                                                        sizes="245px"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-emerald-600 text-[6.5px] sm:text-[7.5px] font-bold text-white flex items-center gap-0.5 shadow-2xs">
                                                        <CheckCircle2 className="size-1.5 sm:size-2 text-white" />
                                                        <span>FIFA Standard Turf</span>
                                                    </div>
                                                </div>

                                                <div className="px-0.5 space-y-0.5">
                                                    <p className="text-[8.5px] sm:text-[10.5px] font-bold text-foreground line-clamp-1">Green Horizon Football Arena</p>
                                                    <p className="text-[7px] sm:text-[8px] text-muted-foreground flex items-center gap-0.5">
                                                        <MapPin className="size-1.5 sm:size-2 text-primary shrink-0" />
                                                        <span className="truncate">Sector 4, Uttara, Dhaka</span>
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between px-0.5 pt-0.5 border-t border-border/60">
                                                    <div>
                                                        <span className="text-[9px] sm:text-[11px] font-black text-foreground">৳2,200</span>
                                                        <span className="text-[6.5px] sm:text-[7.5px] text-muted-foreground ml-0.5">/hr</span>
                                                    </div>
                                                    <span className="px-1.5 py-0.5 rounded sm:rounded-md bg-emerald-600 text-white text-[7px] sm:text-[8px] font-bold">
                                                        Book Slot
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Secondary Mini Turf Card */}
                                            <div className="rounded-md sm:rounded-lg border border-border/80 bg-surface/80 p-1 flex items-center gap-1.5">
                                                <div className="relative size-7 sm:size-9 rounded shrink-0 overflow-hidden bg-zinc-900">
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1000&q=80"
                                                        alt="Banani Sports Arena"
                                                        fill
                                                        sizes="36px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[7.5px] sm:text-[9px] font-bold text-foreground truncate">Metro Badminton Arena</p>
                                                    <p className="text-[6.5px] sm:text-[7.5px] text-muted-foreground truncate">Banani • ৳1,500/hr</p>
                                                </div>
                                                <span className="text-[6.5px] sm:text-[7.5px] font-bold text-emerald-500 shrink-0">Open</span>
                                            </div>

                                            {/* Bottom Navigation */}
                                            <div className="flex items-center justify-around pt-0.5 text-muted-foreground text-[6.5px] sm:text-[8px] border-t border-border/50">
                                                <span>Home</span>
                                                <span className="text-primary font-bold">Turfs</span>
                                                <span>Bookings</span>
                                                <span>Profile</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ============================================================== */}
                    {/* RIGHT: HEADLINE, HIGHLIGHTS & STORE DOWNLOAD BUTTONS           */}
                    {/* ============================================================== */}
                    <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
                        {/* Eyebrow Chip */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide">
                            <Sparkles className="size-3.5 text-accent" />
                            <span>FINDBOOKSTAY MOBILE APPS</span>
                        </div>

                        {/* Section Headline */}
                        <div className="space-y-3">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                                Everything You Need — <br className="hidden sm:inline" />
                                <span className="text-primary">Right in Your Pocket</span>
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Carry verified rental flats, boutique vacation stays, floodlit sports turfs, and vetted real estate properties with you. Experience real-time slot confirmations, direct owner contact, and instant push alerts.
                            </p>
                        </div>

                        {/* 3 Core Highlights */}
                        <div className="space-y-3 pt-1">
                            <div className="flex items-start gap-3">
                                <div className="size-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                                    <ShieldCheck className="size-4.5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">100% Verified Housing & Deeds</p>
                                    <p className="text-xs text-muted-foreground">Direct landlord connections with zero broker fees and vetted title documentation.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="size-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                    <Zap className="size-4.5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Instant Booking & Live Slot Lock</p>
                                    <p className="text-xs text-muted-foreground">Reserve floodlit football turfs, badminton courts, and resort stays in under 30 seconds.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="size-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 className="size-4.5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Real-Time Mobile Push Alerts</p>
                                    <p className="text-xs text-muted-foreground">Get notified the second new bachelor seats or high-demand weekend turf slots unlock.</p>
                                </div>
                            </div>
                        </div>

                        {/* Store Download Buttons (First Play Store, Then Apple Store - Disabled) */}
                        <div className="pt-2 space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                                {/* 1. Google Play Store (First, Disabled) */}
                                <div
                                    className="relative inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-card dark:text-foreground border border-zinc-700/60 dark:border-border shadow-md opacity-85 select-none cursor-not-allowed group"
                                    title="Google Play Store app is currently in active development"
                                >
                                    <GooglePlay className="size-6 shrink-0 fill-current text-white dark:text-foreground" />
                                    <div className="text-left leading-tight">
                                        <p className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-muted-foreground font-semibold">GET IT ON</p>
                                        <p className="text-sm font-extrabold text-white dark:text-foreground">Google Play</p>
                                    </div>
                                    <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider">Coming Soon</span>
                                </div>

                                {/* 2. Apple App Store (Second, Disabled) */}
                                <div
                                    className="relative inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-card dark:text-foreground border border-zinc-700/60 dark:border-border shadow-md opacity-85 select-none cursor-not-allowed group"
                                    title="Apple App Store app is currently in active development"
                                >
                                    <Apple className="size-6 shrink-0 fill-current text-white dark:text-foreground" />
                                    <div className="text-left leading-tight">
                                        <p className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-muted-foreground font-semibold">Download on the</p>
                                        <p className="text-sm font-extrabold text-white dark:text-foreground">App Store</p>
                                    </div>
                                    <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider">Coming Soon</span>
                                </div>
                            </div>

                            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
                                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>Native iOS & Android mobile apps are in private alpha testing. Public beta scheduled for 2026.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileAppCTA;
