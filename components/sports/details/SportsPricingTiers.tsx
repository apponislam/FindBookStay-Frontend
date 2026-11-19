"use client";

import React from "react";
import { Clock, DollarSign, Sparkles } from "@/components/Icons";
import { SportsVenue } from "../types";

interface SportsPricingTiersProps {
    venue: SportsVenue;
}

export const SportsPricingTiers = ({ venue }: SportsPricingTiersProps) => {
    const tiers = venue.pricingTiers || [
        {
            name: "Morning & Daytime",
            hours: "06:00 AM – 04:00 PM",
            priceFormatted: `৳${Math.round(venue.hourlyPrice * 0.8).toLocaleString()} / hr`,
            description: "Ideal for student groups, coaching drills, and fitness conditioning.",
        },
        {
            name: "Prime Evening",
            hours: "04:00 PM – 09:00 PM",
            priceFormatted: `${venue.priceFormatted} ${venue.priceUnit}`,
            description: "Peak tournament and friendly match window. High-intensity LED lighting.",
            highlight: true,
        },
        {
            name: "Late Night Floodlit",
            hours: "09:00 PM – 02:00 AM",
            priceFormatted: `৳${Math.round(venue.hourlyPrice * 1.1).toLocaleString()} / hr`,
            description: "Cooler night air, professional stadium floodlights, and zero traffic.",
        },
    ];

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-border flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Hourly Slot Pricing & Packages</h2>
                        <p className="text-xs text-muted-foreground">Transparent slot pricing based on time of day</p>
                    </div>
                </div>

                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Zero Booking Fees
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tiers.map((tier, idx) => {
                    const isHighlight = !!tier.highlight;
                    return (
                        <div
                            key={idx}
                            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                                isHighlight
                                    ? "bg-primary/5 border-primary ring-2 ring-primary/20 shadow-xs"
                                    : "bg-surface-secondary/60 border-border"
                            }`}
                        >
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-sm text-foreground">{tier.name}</h3>
                                    {isHighlight && (
                                        <span className="px-2 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                                            <Sparkles className="w-3 h-3" />
                                            Popular
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                    <span>{tier.hours}</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                                    {tier.description}
                                </p>
                            </div>

                            <div className="pt-2 border-t border-border/80 flex items-baseline justify-between">
                                <span className="text-[11px] font-medium text-muted-foreground">Slot Rate:</span>
                                <span className="text-lg font-extrabold text-foreground">
                                    {tier.priceFormatted}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
