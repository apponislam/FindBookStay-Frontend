"use client";

import React from "react";
import {
    Building2,
    Bed,
    Bath,
    Maximize2,
    CheckCircle2,
    ShieldCheck,
    Car,
    Clock,
    FileText,
} from "@/components/Icons";
import { BuyProperty } from "../types";

interface PropertyOverviewProps {
    property: BuyProperty;
}

export const PropertyOverview = ({ property }: PropertyOverviewProps) => {
    const specs = [
        { label: "Property ID", value: property.id.toUpperCase(), icon: FileText },
        { label: "Property Type", value: property.categoryLabel, icon: Building2 },
        { label: "Bedrooms", value: property.beds > 0 ? `${property.beds} Rooms` : "Open Layout", icon: Bed },
        { label: "Bathrooms", value: property.baths > 0 ? `${property.baths} Fitted` : "Commercial", icon: Bath },
        { label: "Super Built-up Area", value: `${property.sqft.toLocaleString()} Sq Ft`, icon: Maximize2 },
        { label: "Price / Sq Ft", value: property.pricePerSqft || "Market Standard", icon: Building2 },
        { label: "Completion Status", value: property.completionStatus, icon: Clock },
        { label: "Car Parking", value: "Dedicated Double Bay", icon: Car },
        { label: "Building Facing", value: "South - East Facing", icon: CheckCircle2 },
        { label: "Ownership Type", value: "100% Freehold Mutation", icon: ShieldCheck },
    ];

    return (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
                <span className="size-2 rounded-full bg-accent" />
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                    Property Overview & Specifications
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                {specs.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={idx} className="space-y-1 p-3 rounded-2xl bg-surface-secondary/40 border border-border/60">
                            <div className="flex items-center gap-1.5 text-muted-foreground text-[10.5px] font-bold uppercase tracking-wider">
                                <IconComponent className="size-3 text-primary shrink-0" />
                                <span className="truncate">{item.label}</span>
                            </div>
                            <p className="text-xs sm:text-sm font-extrabold text-foreground truncate">
                                {item.value}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PropertyOverview;
