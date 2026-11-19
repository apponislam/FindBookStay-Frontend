"use client";

import React, { useState } from "react";
import { Building, ChevronDown, Compass } from "@/components/Icons";
import { RentProperty } from "../types";

interface RentPropertyOverviewProps {
    property: RentProperty;
}

export const RentPropertyOverview = ({ property }: RentPropertyOverviewProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const description =
        property.description ||
        `Experience comfortable modern living in this ${property.categoryLabel.toLowerCase()} located in ${property.location.area}, ${property.location.city}. This residence features ${property.beds} bedrooms, ${property.baths} bathrooms, and ${property.sqft} sq ft of carefully planned living space.\n\nEnjoy high ceilings, natural ventilation, premium finishes, and convenient proximity to primary transit links, shopping facilities, and recreation spots.`;

    const specs = [
        { label: "Property Type", value: property.categoryLabel },
        { label: "Floor Level", value: property.floor || "4th Floor (Front Facing)" },
        { label: "Total Building Floors", value: `${property.totalFloors || 8} Storied Building` },
        { label: "Facing Direction", value: property.facing || "South-East (Great natural ventilation)" },
        { label: "Balconies", value: `${property.balconies ?? (property.beds >= 2 ? 2 : 1)} Attached Balconies` },
        { label: "Furnishing Status", value: property.furnishing },
        { label: "Preferred Tenant", value: property.preferredTenant || "Family / Executive Professionals" },
        { label: "Available From", value: property.availableFrom },
    ];

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Building className="w-4 h-4" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-foreground">Property Overview & Specifications</h2>
                    <p className="text-xs text-muted-foreground">Comprehensive details and architectural specifications</p>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
                <div className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-line transition-all ${!isExpanded ? "line-clamp-4" : ""}`}>{description}</div>
                <button onClick={() => setIsExpanded(!isExpanded)} type="button" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                    <span>{isExpanded ? "Show Less" : "Read Full Description"}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* Detailed Spec Grid */}
            <div className="pt-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-primary" />
                    Key Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {specs.map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-surface-secondary/70 border border-border flex items-center justify-between text-xs">
                            <span className="text-muted-foreground font-medium">{item.label}</span>
                            <span className="font-semibold text-foreground text-right">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
