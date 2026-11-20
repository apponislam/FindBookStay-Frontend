"use client";

import React from "react";
import { CheckCircle2 } from "@/components/Icons";
import { BuyProperty } from "../types";

interface PropertyAmenitiesProps {
    property: BuyProperty;
}

const DEFAULT_AMENITIES = [
    "Rooftop Community Garden",
    "Dual High-Speed Passenger Elevators",
    "100% Full Load Auto Generator Backup",
    "Deep Tube-well with Central Water Filtration",
    "24/7 Security Guards & CCTV Surveillance",
    "Intercom & Video Door Phone Access",
    "Fire Suppression System & Smoke Detectors",
    "Dedicated Substation & Lightning Arrester",
    "Separate Servant Quarters & Washroom",
    "Wide Driveway with Automated Boom Gate",
];

export const PropertyAmenities = ({ property }: PropertyAmenitiesProps) => {
    // Combine property.amenities with defaults, deduplicating
    const allAmenities = Array.from(
        new Set([...(property.amenities || []), ...DEFAULT_AMENITIES])
    );

    return (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent" />
                    <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                        Amenities & Facilities
                    </h2>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                    {allAmenities.length} Features Included
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allAmenities.map((amenity, idx) => (
                    <div
                        key={idx}
                        className="p-3 rounded-2xl bg-surface-secondary/50 border border-border/70 flex items-center gap-2.5 hover:border-accent/40 transition-colors"
                    >
                        <div className="size-6 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                            <CheckCircle2 className="size-3.5" />
                        </div>
                        <span className="text-xs font-bold text-foreground">
                            {amenity}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyAmenities;
