"use client";

import React from "react";
import Link from "next/link";
import { Activity, ArrowRight } from "@/components/Icons";
import { SportsCard } from "../SportsCard";
import { getSimilarSportsVenues } from "../sportsData";
import { SportsVenue } from "../types";

interface SportsSimilarVenuesProps {
    venue: SportsVenue;
}

export const SportsSimilarVenues = ({ venue }: SportsSimilarVenuesProps) => {
    const similarVenues = getSimilarSportsVenues(venue.id, venue.category, 3);

    if (similarVenues.length === 0) return null;

    return (
        <section className="space-y-6 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Activity className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Similar Arenas You May Like</h2>
                        <p className="text-xs text-muted-foreground">Other verified sports pitches available in {venue.location.city}</p>
                    </div>
                </div>

                <Link href={`/sports?category=${venue.category}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors">
                    <span>View all {venue.categoryLabel} venues</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarVenues.map((item) => (
                    <SportsCard key={item.id} venue={item} viewMode="grid" />
                ))}
            </div>
        </section>
    );
};
