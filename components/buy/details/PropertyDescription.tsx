"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown } from "@/components/Icons";
import { BuyProperty } from "../types";

interface PropertyDescriptionProps {
    property: BuyProperty;
}

export const PropertyDescription = ({ property }: PropertyDescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
                <span className="size-2 rounded-full bg-accent" />
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                    About this Residence
                </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <p>
                    Nestled in the prestigious diplomatic & high-value neighborhood of{" "}
                    <strong className="text-foreground">{property.location.area}</strong>, this exquisite{" "}
                    <strong className="text-foreground">{property.title}</strong> blends modern contemporary architecture with thoughtful functional living spaces. Engineered with earthquake-resistant RCC frame structure and premium European fittings, this property stands as a certified benchmark in residential luxury.
                </p>

                <p>
                    The unit boasts expansive floor-to-ceiling double-glazed soundproof glass walls that invite abundant natural sunlight while isolating city noise. Featuring wide private balconies with unobstructed scenic vistas, imported Spanish porcelain tiles, modern modular wet and dry kitchens, and high-spec en-suite bathrooms equipped with Grohe fixtures.
                </p>

                {isExpanded && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                        <p>
                            Residents enjoy access to high-tier lifestyle amenities including dual high-speed passenger and stretcher elevators, 100% full electricity generator backup with individual metering, underground water reservoir with filtration, dedicated reception lobby, and professional round-the-clock physical security accompanied by smart access control.
                        </p>
                        <p>
                            Strategically positioned within minutes of international schools, specialized medical centers, diplomatic missions, and premier fine-dining avenues, making it an unrivaled property for either family living or prime rental yields.
                        </p>
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:text-primary-hover transition-colors pt-1 cursor-pointer"
            >
                <span>{isExpanded ? "Show Less" : "Read Full Architectural Description"}</span>
                <ChevronDown
                    className={`size-3.5 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Quick Feature Highlights */}
            <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                    "RAJUK / CDA approved building layout & structural clearance",
                    "Dedicated covered basement parking bay with wide access ramp",
                    "Full load generator backup supporting ACs and all appliances",
                    "Clear mutation record with zero legal disputes guaranteed",
                ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                        <span>{feat}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyDescription;
