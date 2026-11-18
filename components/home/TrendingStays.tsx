"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Star,
    MapPin,
    ArrowRight,
} from "@/components/Icons";

interface StayItem {
    id: string;
    title: string;
    type: string;
    location: string;
    rating: number;
    reviewsCount: number;
    price: string;
    image: string;
    badge: string;
    amenities: string[];
    href: string;
}

const TRENDING_STAYS: StayItem[] = [
    {
        id: "1",
        title: "The Grand Waterfront Luxury Resort & Spa",
        type: "Luxury Resort",
        location: "Cox's Bazar Beachfront",
        rating: 4.9,
        reviewsCount: 312,
        price: "৳12,500",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        badge: "Top Rated",
        amenities: ["Infinity Pool", "Ocean View", "Free Breakfast"],
        href: "/book/resorts",
    },
    {
        id: "2",
        title: "Hilltop Cloud Forest Villa & Tea Garden Retreat",
        type: "Holiday Home",
        location: "Sreemangal, Sylhet",
        rating: 4.8,
        reviewsCount: 184,
        price: "৳8,900",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        badge: "Scenic View",
        amenities: ["Nature Trail", "Balcony", "Organic Dining"],
        href: "/book/holiday-homes",
    },
    {
        id: "3",
        title: "Skyline Diplomatic Executive Suites",
        type: "Short-Stay Suite",
        location: "Gulshan 2, Dhaka",
        rating: 4.9,
        reviewsCount: 96,
        price: "৳9,500",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
        badge: "Business Hub",
        amenities: ["High-speed WiFi", "Kitchenette", "Gym Access"],
        href: "/book/short-stay",
    },
    {
        id: "4",
        title: "Sundarbans Eco Wilderness Boutique Camp",
        type: "Guest House",
        location: "Mongla, Khulna",
        rating: 4.7,
        reviewsCount: 142,
        price: "৳5,200",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
        badge: "Eco Stay",
        amenities: ["Boat Safari", "Local Meals", "Guided Tours"],
        href: "/book/guest-houses",
    },
];

export const TrendingStays = () => {
    return (
        <section className="py-16 bg-surface/50 border-y border-border">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                            <span className="w-3.5 h-0.5 bg-accent" />
                            <span className="text-[11px] font-bold tracking-widest text-primary uppercase font-mono">
                                TRAVEL & GETAWAYS
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            Trending Vacation Stays & Resorts
                        </h2>
                        <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
                            Handpicked boutique hotels, lakeside nature getaways, and private beach villas with instant confirmation.
                        </p>
                    </div>

                    <Link
                        href="/book"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary-hover transition-colors group cursor-pointer"
                    >
                        <span>Explore All Stays</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Stays Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TRENDING_STAYS.map((stay) => (
                        <div
                            key={stay.id}
                            className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Image Header */}
                            <div className="relative w-full h-48 overflow-hidden bg-surface-secondary">
                                <Image
                                    src={stay.image}
                                    alt={stay.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-md text-foreground shadow-xs">
                                        {stay.badge}
                                    </span>
                                </div>

                                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-amber-300 shadow-xs">
                                    <Star className="size-3 fill-amber-300 text-amber-300" />
                                    <span>{stay.rating}</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-1.5">
                                    <div className="text-[11px] font-bold text-accent uppercase tracking-wider">
                                        {stay.type}
                                    </div>
                                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {stay.title}
                                    </h3>
                                    <p className="text-xs text-text-secondary flex items-center gap-1 line-clamp-1">
                                        <MapPin className="size-3.5 text-text-secondary/70 shrink-0" />
                                        <span>{stay.location}</span>
                                    </p>
                                </div>

                                {/* Amenities list */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {stay.amenities.map((amenity, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 rounded-md bg-surface text-[10px] text-text-secondary font-medium border border-border"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>

                                {/* Price and Action */}
                                <div className="flex items-center justify-between pt-2 border-t border-border/70">
                                    <div>
                                        <span className="text-base sm:text-lg font-extrabold text-foreground">
                                            {stay.price}
                                        </span>
                                        <span className="text-xs text-text-secondary ml-1 font-medium">
                                            / night
                                        </span>
                                    </div>

                                    <Link
                                        href={stay.href}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-white px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover transition-colors shadow-xs cursor-pointer"
                                    >
                                        <span>Book Now</span>
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

export default TrendingStays;
