"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    ArrowRight,
    Zap,
} from "@/components/Icons";

interface VenueItem {
    id: string;
    name: string;
    sport: string;
    location: string;
    price: string;
    priceUnit: string;
    image: string;
    features: string[];
    availability: string;
    href: string;
}

const SPORTS_VENUES: VenueItem[] = [
    {
        id: "1",
        name: "Champions Floodlit Football & Cricket Turf",
        sport: "Football & Cricket",
        location: "Bashundhara Sports Zone, Dhaka",
        price: "৳2,500",
        priceUnit: "/ hour",
        image: "https://images.unsplash.com/photo-1529900241457-3f3659c25bb0?auto=format&fit=crop&w=800&q=80",
        features: ["Floodlights", "FIFA Grass", "Changing Rooms"],
        availability: "Slots Open Today",
        href: "/sports/turf-booking",
    },
    {
        id: "2",
        name: "Elite Indoor Badminton & Futsal Complex",
        sport: "Badminton & Futsal",
        location: "Uttara Sector 4, Dhaka",
        price: "৳1,800",
        priceUnit: "/ hour",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
        features: ["Wooden Court", "Air Conditioned", "Showers"],
        availability: "Evening Slots Available",
        href: "/sports/indoor-sports",
    },
    {
        id: "3",
        name: "Green Horizon Standard Football Stadium Ground",
        sport: "Full Football Ground",
        location: "Dhanmondi, Dhaka",
        price: "৳4,000",
        priceUnit: "/ hour",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
        features: ["Natural Turf", "Referee Support", "Full 11v11"],
        availability: "Weekend Leagues Ready",
        href: "/sports/football-grounds",
    },
];

export const SportsVenues = () => {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                            <span className="w-3.5 h-0.5 bg-accent" />
                            <span className="text-[11px] font-bold tracking-widest text-primary uppercase font-mono">
                                INSTANT ARENA BOOKING
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            Live Turf & Arena Booking
                        </h2>
                        <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
                            Reserve artificial grass soccer turfs, cricket pitches, and indoor badminton courts with instant hourly confirmation.
                        </p>
                    </div>

                    <Link
                        href="/sports"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary-hover transition-colors group cursor-pointer"
                    >
                        <span>View All Venues</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Venues Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SPORTS_VENUES.map((venue) => (
                        <div
                            key={venue.id}
                            className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Image Header */}
                            <div className="relative w-full h-52 overflow-hidden bg-surface-secondary">
                                <Image
                                    src={venue.image}
                                    alt={venue.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-xs flex items-center gap-1">
                                        <Zap className="size-3 fill-white" />
                                        <span>{venue.availability}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-1.5">
                                    <div className="text-[11px] font-bold text-accent uppercase tracking-wider">
                                        {venue.sport}
                                    </div>
                                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                        {venue.name}
                                    </h3>
                                    <p className="text-xs text-text-secondary flex items-center gap-1 line-clamp-1">
                                        <MapPin className="size-3.5 text-text-secondary/70 shrink-0" />
                                        <span>{venue.location}</span>
                                    </p>
                                </div>

                                {/* Features badges */}
                                <div className="flex flex-wrap gap-1.5">
                                    {venue.features.map((feat, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 rounded-lg bg-surface text-xs text-text-secondary font-medium border border-border"
                                        >
                                            {feat}
                                        </span>
                                    ))}
                                </div>

                                {/* Price and Action */}
                                <div className="flex items-center justify-between pt-3 border-t border-border/70">
                                    <div>
                                        <span className="text-lg font-extrabold text-foreground">
                                            {venue.price}
                                        </span>
                                        <span className="text-xs text-text-secondary ml-1 font-medium">
                                            {venue.priceUnit}
                                        </span>
                                    </div>

                                    <Link
                                        href={venue.href}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition-colors shadow-xs cursor-pointer"
                                    >
                                        <span>Reserve Slot</span>
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SportsVenues;
