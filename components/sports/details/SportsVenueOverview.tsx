"use client";

import React, { useState } from "react";
import { Activity, CheckCircle2, ChevronDown, FileText } from "@/components/Icons";
import { SportsVenue } from "../types";

interface SportsVenueOverviewProps {
    venue: SportsVenue;
}

export const SportsVenueOverview = ({ venue }: SportsVenueOverviewProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const description =
        venue.description ||
        `Located conveniently at ${venue.location.address}, ${venue.name} provides premier sporting facilities for competitive tournaments, friendly team matches, and fitness training. Featuring world-class ${venue.surfaceType} surface quality, high-intensity LED floodlighting for late night matches, and dedicated players' lounges.\n\nWhether booking an after-work football scrimmage, weekend cricket clash, or structured coaching session, enjoy seamless slot reservation, chilled drinking water, secure gear storage, and vibrant spectator seating.`;

    const specs = [
        { label: "Arena Category", value: venue.categoryLabel },
        { label: "Supported Sports", value: venue.sports.join(", ") },
        { label: "Surface Type", value: venue.surfaceType },
        { label: "Field Size / Dimension", value: venue.pitchDimensions || "Regulation Tournament Standard" },
        { label: "Player Capacity", value: venue.capacity },
        { label: "Management / Operator", value: `${venue.host.name} (${venue.host.type})` },
    ];

    const rules =
        venue.rules && venue.rules.length > 0
            ? venue.rules
            : ["Only turf shoes or flat-soled sneakers permitted (metal studs strictly prohibited)", "Please arrive 10 minutes prior to your allocated slot for warm-up and check-in", "Smoking, alcohol, and open flame items are strictly prohibited inside the arena perimeter", "Teams are requested to clear the pitch promptly when their booked duration concludes"];

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-foreground">Arena Overview & Pitch Specifications</h2>
                    <p className="text-xs text-muted-foreground">Surface quality, lighting, and team guidelines</p>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
                <div className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-line transition-all ${!isExpanded ? "line-clamp-4" : ""}`}>{description}</div>
                <button onClick={() => setIsExpanded(!isExpanded)} type="button" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                    <span>{isExpanded ? "Show Less" : "Read Full Details"}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* Specifications Grid (Overflow-safe) */}
            <div className="pt-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    Key Pitch Specs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {specs.map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-surface-secondary/70 border border-border flex items-center justify-between gap-3 text-xs min-w-0">
                            <span className="text-muted-foreground font-medium shrink-0">{item.label}</span>
                            <span className="font-semibold text-foreground text-right break-words">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rules & Guidelines */}
            <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    Arena Footwear & Match Rules
                </h3>
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border space-y-2.5">
                    {rules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{rule}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
