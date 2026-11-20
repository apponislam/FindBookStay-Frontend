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
} from "@/components/Icons";

export const MobileAppCTA = () => {
    return (
        <section
            aria-label="FindBookStay Mobile Apps"
            className="py-16 sm:py-24 bg-background border-t border-border overflow-hidden select-none relative"
        >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute top-1/4 -left-40 size-[450px] rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/4 -right-40 size-[400px] rounded-full bg-teal-500/10 blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* ============================================================== */}
                    {/* LEFT: 3 SMARTPHONE SCREENS IN 30-DEGREE ROTATION               */}
                    {/* ============================================================== */}
                    <div className="lg:col-span-7 flex items-center justify-center order-2 lg:order-1">
                        <div className="relative w-full max-w-[540px] sm:max-w-[620px] h-[480px] sm:h-[560px] md:h-[600px] flex items-center justify-center">
                            {/* Ambient Stage Glow Behind Phones */}
                            <div className="absolute inset-0 m-auto size-[320px] sm:size-[400px] rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-transparent blur-3xl pointer-events-none" />

                            {/* ---------------------------------------------------------- */}
                            {/* SCREEN 1: (LEFT / BACK) - Book Stays & Resorts             */}
                            {/* ---------------------------------------------------------- */}
                            <div className="absolute left-1/2 -translate-x-[92%] sm:-translate-x-[96%] top-1/2 -translate-y-[62%] sm:-translate-y-[60%] z-10 rotate-[-30deg] hover:rotate-[-27deg] hover:scale-105 hover:z-30 transition-all duration-500 origin-center cursor-pointer group">
                                <div className="w-[190px] sm:w-[220px] md:w-[240px] h-[380px] sm:h-[440px] md:h-[480px] rounded-[36px] sm:rounded-[42px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-zinc-700/80 ring-1 ring-white/15">
                                    {/* Screen Frame */}
                                    <div className="relative rounded-[28px] sm:rounded-[34px] bg-background border border-border/80 overflow-hidden flex flex-col justify-between h-full p-2.5 sm:p-3">
                                        {/* Phone Top Status */}
                                        <div className="flex items-center justify-between text-[9px] font-semibold text-muted-foreground pt-1 px-1">
                                            <span>9:41</span>
                                            <div className="size-1.5 rounded-full bg-emerald-400" />
                                        </div>

                                        {/* App Header */}
                                        <div className="flex items-center justify-between pt-1">
                                            <div className="flex items-center gap-1">
                                                <Hotel className="size-3 text-emerald-400" />
                                                <span className="text-[10px] font-bold text-foreground">Stays & Resorts</span>
                                            </div>
                                            <span className="text-[9px] font-mono font-bold text-emerald-400">Cox&apos;s Bazar</span>
                                        </div>

                                        {/* Visual Card */}
                                        <div className="rounded-2xl border border-border overflow-hidden bg-surface-secondary/50 space-y-1.5 flex-1 flex flex-col justify-between p-1.5 my-1">
                                            <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden bg-zinc-900">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80"
                                                    alt="Resort Stay"
                                                    fill
                                                    sizes="240px"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[8.5px] font-bold text-white flex items-center gap-0.5">
                                                    <Star className="size-2 text-amber-300 fill-amber-300" />
                                                    <span>4.9</span>
                                                </div>
                                            </div>

                                            <div className="px-1 space-y-0.5">
                                                <p className="text-[11px] font-bold text-foreground line-clamp-1">Grand Waterfront Resort</p>
                                                <p className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                                                    <MapPin className="size-2 text-primary" />
                                                    <span>Marine Drive, Beachfront</span>
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between px-1 pt-1 border-t border-border/60">
                                                <span className="text-[11px] font-black text-foreground">৳12,500<span className="text-[8.5px] font-normal text-muted-foreground">/nt</span></span>
                                                <span className="px-2 py-0.5 rounded-lg bg-primary text-primary-foreground text-[9px] font-bold">Book</span>
                                            </div>
                                        </div>

                                        {/* Bottom Nav */}
                                        <div className="flex items-center justify-around pt-1 text-muted-foreground text-[8px]">
                                            <span className="text-primary font-bold">Resorts</span>
                                            <span>Explore</span>
                                            <span>Saved</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ---------------------------------------------------------- */}
                            {/* SCREEN 2: (CENTER / HERO) - Verified Home Rentals           */}
                            {/* ---------------------------------------------------------- */}
                            <div className="relative z-20 rotate-[-30deg] hover:rotate-[-27deg] hover:scale-110 hover:z-30 transition-all duration-500 origin-center cursor-pointer group">
                                <div className="w-[200px] sm:w-[230px] md:w-[250px] h-[400px] sm:h-[460px] md:h-[500px] rounded-[38px] sm:rounded-[44px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 p-3 sm:p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.45)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.9)] border-2 border-zinc-700 ring-2 ring-emerald-500/30">
                                    {/* Dynamic Island */}
                                    <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-40 flex items-center justify-between px-2">
                                        <div className="size-1.5 rounded-full bg-zinc-800" />
                                        <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    </div>

                                    {/* Screen Frame */}
                                    <div className="relative rounded-[30px] sm:rounded-[36px] bg-background border border-border/80 overflow-hidden flex flex-col justify-between h-full p-2.5 sm:p-3">
                                        {/* Status */}
                                        <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground pt-1.5 px-1">
                                            <span>9:41</span>
                                            <div className="flex items-center gap-1 text-[8.5px]">
                                                <span>5G</span>
                                                <div className="w-3.5 h-1.5 border border-current rounded-xs p-0.5">
                                                    <div className="h-full w-2 bg-current" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* App Header */}
                                        <div className="flex items-center justify-between pt-1">
                                            <div className="flex items-center gap-1.5">
                                                <div className="size-5 rounded-md bg-primary text-primary-foreground font-black text-[10px] flex items-center justify-center">
                                                    F
                                                </div>
                                                <span className="text-[11px] font-black text-foreground">FindBook<span className="text-primary">Stay</span></span>
                                            </div>
                                            <div className="size-5 rounded-full bg-surface-secondary flex items-center justify-center relative">
                                                <Bell className="size-2.5 text-muted-foreground" />
                                                <span className="absolute top-0.5 right-0.5 size-1 rounded-full bg-accent animate-ping" />
                                            </div>
                                        </div>

                                        {/* Search Pill */}
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-surface-secondary text-[9.5px] text-muted-foreground border border-border/60">
                                            <Search className="size-2.5 text-primary" />
                                            <span className="truncate">Search Bashundhara Flats...</span>
                                        </div>

                                        {/* Main Listing Card */}
                                        <div className="rounded-2xl border border-border overflow-hidden bg-surface-secondary/40 space-y-1.5 flex-1 flex flex-col justify-between p-1.5">
                                            <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden bg-zinc-900">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
                                                    alt="Family Apartment"
                                                    fill
                                                    sizes="250px"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-emerald-600 text-[8.5px] font-bold text-white flex items-center gap-0.5 shadow-xs">
                                                    <ShieldCheck className="size-2.5" />
                                                    <span>Verified Flat</span>
                                                </div>
                                                <div className="absolute bottom-1.5 left-2 text-white">
                                                    <span className="text-xs font-black drop-shadow-md">৳32,000</span>
                                                    <span className="text-[9px] font-normal text-white/80 ml-0.5">/ mo</span>
                                                </div>
                                            </div>

                                            <div className="px-1 space-y-0.5">
                                                <p className="text-[11.5px] font-extrabold text-foreground line-clamp-1">Modern 3BHK Family Flat</p>
                                                <p className="text-[9.5px] text-muted-foreground flex items-center gap-0.5">
                                                    <MapPin className="size-2.5 text-primary" />
                                                    <span>Block D, Bashundhara R/A</span>
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between px-1 text-[8.5px] font-medium text-muted-foreground border-t border-border/50 pt-1">
                                                <span>3 Beds &bull; 3 Baths</span>
                                                <span className="text-emerald-500 font-bold">Zero Broker</span>
                                            </div>
                                        </div>

                                        {/* Bottom Nav */}
                                        <div className="flex items-center justify-around pt-1 text-[8.5px] text-muted-foreground">
                                            <div className="flex flex-col items-center text-primary font-bold">
                                                <Home className="size-3" />
                                                <span>Rent</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <Search className="size-3" />
                                                <span>Search</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <Heart className="size-3" />
                                                <span>Saved</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ---------------------------------------------------------- */}
                            {/* SCREEN 3: (RIGHT / FRONT) - Sports Turf & Arena Booking    */}
                            {/* ---------------------------------------------------------- */}
                            <div className="absolute left-1/2 translate-x-[4%] sm:translate-x-[6%] top-1/2 -translate-y-[38%] sm:-translate-y-[40%] z-15 rotate-[-30deg] hover:rotate-[-27deg] hover:scale-105 hover:z-30 transition-all duration-500 origin-center cursor-pointer group">
                                <div className="w-[190px] sm:w-[220px] md:w-[240px] h-[380px] sm:h-[440px] md:h-[480px] rounded-[36px] sm:rounded-[42px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-zinc-700/80 ring-1 ring-white/15">
                                    {/* Screen Frame */}
                                    <div className="relative rounded-[28px] sm:rounded-[34px] bg-background border border-border/80 overflow-hidden flex flex-col justify-between h-full p-2.5 sm:p-3">
                                        {/* Phone Top Status */}
                                        <div className="flex items-center justify-between text-[9px] font-semibold text-muted-foreground pt-1 px-1">
                                            <span>9:41</span>
                                            <div className="size-1.5 rounded-full bg-emerald-400" />
                                        </div>

                                        {/* App Header */}
                                        <div className="flex items-center justify-between pt-1">
                                            <div className="flex items-center gap-1">
                                                <Trophy className="size-3 text-amber-400" />
                                                <span className="text-[10px] font-bold text-foreground">Live Sports Turfs</span>
                                            </div>
                                            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[8px] font-bold uppercase">Open</span>
                                        </div>

                                        {/* Visual Card */}
                                        <div className="rounded-2xl border border-border overflow-hidden bg-surface-secondary/50 space-y-1.5 flex-1 flex flex-col justify-between p-1.5 my-1">
                                            <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden bg-zinc-900">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1529900241457-3f3659c25bb0?auto=format&fit=crop&w=600&q=80"
                                                    alt="Sports Turf"
                                                    fill
                                                    sizes="240px"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-emerald-500 text-[8.5px] font-bold text-white flex items-center gap-0.5">
                                                    <Zap className="size-2 text-white" />
                                                    <span>Instant Slot</span>
                                                </div>
                                            </div>

                                            <div className="px-1 space-y-0.5">
                                                <p className="text-[11px] font-bold text-foreground line-clamp-1">Champions Floodlit Turf</p>
                                                <p className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                                                    <MapPin className="size-2 text-primary" />
                                                    <span>Sector 4, Uttara</span>
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between px-1 pt-1 border-t border-border/60">
                                                <span className="text-[11px] font-black text-foreground">৳2,500<span className="text-[8.5px] font-normal text-muted-foreground">/hr</span></span>
                                                <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[9px] font-bold">Lock Slot</span>
                                            </div>
                                        </div>

                                        {/* Bottom Nav */}
                                        <div className="flex items-center justify-around pt-1 text-muted-foreground text-[8px]">
                                            <span className="text-primary font-bold">Turfs</span>
                                            <span>Slots</span>
                                            <span>Profile</span>
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
                                Carry verified flats, boutique vacation stays, floodlit sports turfs, and vetted real estate with you. Experience real-time slot confirmations, direct owner contact, and instant push alerts.
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
                                        <p className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-muted-foreground font-semibold">
                                            GET IT ON
                                        </p>
                                        <p className="text-sm font-extrabold text-white dark:text-foreground">
                                            Google Play
                                        </p>
                                    </div>
                                    <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider">
                                        Coming Soon
                                    </span>
                                </div>

                                {/* 2. Apple App Store (Second, Disabled) */}
                                <div
                                    className="relative inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-card dark:text-foreground border border-zinc-700/60 dark:border-border shadow-md opacity-85 select-none cursor-not-allowed group"
                                    title="Apple App Store app is currently in active development"
                                >
                                    <Apple className="size-6 shrink-0 fill-current text-white dark:text-foreground" />
                                    <div className="text-left leading-tight">
                                        <p className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-muted-foreground font-semibold">
                                            Download on the
                                        </p>
                                        <p className="text-sm font-extrabold text-white dark:text-foreground">
                                            App Store
                                        </p>
                                    </div>
                                    <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider">
                                        Coming Soon
                                    </span>
                                </div>
                            </div>

                            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
                                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>
                                    Native iOS & Android mobile apps are in private alpha testing. Public beta scheduled for 2026.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileAppCTA;
