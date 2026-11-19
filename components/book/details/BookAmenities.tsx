"use client";

import React from "react";
import { CheckCircle2, Coffee, Dumbbell, Sparkles, Wifi } from "@/components/Icons";
import { BookStay } from "../types";

interface BookAmenitiesProps {
    stay: BookStay;
}

export const BookAmenities = ({ stay }: BookAmenitiesProps) => {
    const amenities = stay.amenities || [];

    const isAvailable = (name: string) =>
        amenities.some((a) => a.toLowerCase().includes(name.toLowerCase()));

    const leisureList = ["Infinity Pool", "Swimming Pool", "Spa & Wellness", "Ocean View", "Beach Access", "Gym Access"];
    const foodList = ["Free Breakfast", "Restaurant & Cafe", "Room Service", "Coffee Maker", "Kitchenette"];
    const servicesList = ["High-speed WiFi", "Air Conditioning", "Free Parking", "Airport Shuttle", "Daily Housekeeping"];

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-foreground">Amenities & Guest Facilities</h2>
                    <p className="text-xs text-muted-foreground">Complimentary services and property features</p>
                </div>
            </div>

            {/* Direct Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {amenities.map((item, idx) => (
                    <div
                        key={idx}
                        className="px-3.5 py-3 rounded-2xl bg-surface-secondary/70 border border-border flex items-center gap-2.5 text-xs font-semibold text-foreground hover:border-primary/40 transition-colors"
                    >
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{item}</span>
                    </div>
                ))}
            </div>

            {/* 3 Facility Highlights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                        <Dumbbell className="w-4 h-4 text-primary" />
                        <span>Leisure & Wellness</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {leisureList.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        isAvailable(item) ? "bg-emerald-500" : "bg-muted-foreground/30"
                                    }`}
                                />
                                <span className={isAvailable(item) ? "text-foreground font-medium" : "line-through opacity-50"}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                        <Coffee className="w-4 h-4 text-amber-500" />
                        <span>Dining & Refreshments</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {foodList.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        isAvailable(item) ? "bg-emerald-500" : "bg-muted-foreground/30"
                                    }`}
                                />
                                <span className={isAvailable(item) ? "text-foreground font-medium" : "line-through opacity-50"}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                        <Wifi className="w-4 h-4 text-accent" />
                        <span>Essentials & Services</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {servicesList.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        isAvailable(item) ? "bg-emerald-500" : "bg-muted-foreground/30"
                                    }`}
                                />
                                <span className={isAvailable(item) ? "text-foreground font-medium" : "line-through opacity-50"}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
