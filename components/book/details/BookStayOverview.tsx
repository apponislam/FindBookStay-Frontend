"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, FileText, Hotel } from "@/components/Icons";
import { BookStay } from "../types";

interface BookStayOverviewProps {
    stay: BookStay;
}

export const BookStayOverview = ({ stay }: BookStayOverviewProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const description =
        stay.description ||
        `Nestled in the prime surroundings of ${stay.location.area}, ${stay.location.city}, ${stay.title} provides an exceptional hospitality escape. Designed with thoughtful comfort and premium aesthetic touches, each space offers panoramic views, deluxe linens, and modern amenities tailored for relaxation and seamless leisure.\n\nWhether you are arriving for a scenic weekend retreat, remote work vacation, or family holiday, experience first-class hospitality, sparkling clean living quarters, and direct proximity to iconic local landmarks and natural wonders.`;

    const specs = [
        { label: "Property Category", value: stay.categoryLabel },
        { label: "Host / Management", value: `${stay.host.name} (${stay.host.type})` },
        { label: "Host Response Time", value: stay.host.responseTime || "within an hour" },
        { label: "Cancellation Policy", value: stay.cancellationPolicy },
        { label: "Maximum Occupancy", value: `Up to ${stay.maxGuests} Guests Allowed` },
        { label: "Bed Configuration", value: `${stay.bedrooms} Bedrooms, ${stay.beds} Beds` },
    ];

    const rules = stay.houseRules || ["Valid Government ID (NID / Passport) required for all adult guests at check-in", "Smoking strictly prohibited in indoor air-conditioned rooms", "Quiet hours observed from 11:00 PM to 07:00 AM", "Pet policy subject to advance management approval"];

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Hotel className="w-4 h-4" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-foreground">About This Stay</h2>
                    <p className="text-xs text-muted-foreground">Property atmosphere, hospitality, and house rules</p>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
                <div className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-line transition-all ${!isExpanded ? "line-clamp-4" : ""}`}>{description}</div>
                <button onClick={() => setIsExpanded(!isExpanded)} type="button" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                    <span>{isExpanded ? "Show Less" : "Read Full Story"}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* Stay Specifications Grid (Overflow-safe) */}
            <div className="pt-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    Reservation Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {specs.map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-surface-secondary/70 border border-border flex items-center justify-between gap-3 text-xs min-w-0">
                            <span className="text-muted-foreground font-medium shrink-0">{item.label}</span>
                            <span className="font-semibold text-foreground text-right wrap-break-word">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* House Rules */}
            <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    Guest Stay Guidelines
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
