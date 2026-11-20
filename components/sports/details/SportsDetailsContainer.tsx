"use client";

import React from "react";
import Link from "next/link";
import { Activity, ArrowLeft } from "@/components/Icons";
import { SportsVenue } from "../types";
import { SportsGallery } from "./SportsGallery";
import { SportsVenueHeader } from "./SportsVenueHeader";
import { SportsVenueOverview } from "./SportsVenueOverview";
import { SportsPricingTiers } from "./SportsPricingTiers";
import { SportsAmenities } from "./SportsAmenities";
import { SportsLocationAndAccess } from "./SportsLocationAndAccess";
import { SportsReviews } from "./SportsReviews";
import { SportsBookingSidebar } from "./SportsBookingSidebar";
import { SportsSimilarVenues } from "./SportsSimilarVenues";
import { SportsMobileActionBar } from "./SportsMobileActionBar";

interface SportsDetailsContainerProps {
    venue?: SportsVenue;
}

export const SportsDetailsContainer = ({ venue }: SportsDetailsContainerProps) => {
    if (!venue) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-16 h-16 rounded-3xl bg-surface-secondary border border-border flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                    <Activity className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Sports Venue Not Found</h1>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">The sports turf or arena listing you are looking for may have been removed or the link might be incorrect.</p>
                <Link href="/sports" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all shadow-sm">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Browse All Sports Venues</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-24 lg:pb-16">
            <div className="container mx-auto px-4 py-6 sm:py-8 space-y-8">
                {/* Visual Gallery */}
                <SportsGallery venue={venue} />

                {/* Main 2-Column Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (8 cols on desktop) */}
                    <div className="lg:col-span-8 space-y-8">
                        <SportsVenueHeader venue={venue} />
                        <SportsVenueOverview venue={venue} />
                        <SportsPricingTiers venue={venue} />
                        <SportsAmenities venue={venue} />
                        <SportsLocationAndAccess venue={venue} />
                        <SportsReviews venue={venue} />
                    </div>

                    {/* Right Column: Sticky Slot Booking Sidebar (4 cols on desktop) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <SportsBookingSidebar venue={venue} />
                    </div>
                </div>

                {/* Similar Arenas Section */}
                <SportsSimilarVenues venue={venue} />
            </div>

            {/* Mobile Bottom Fixed Bar */}
            <SportsMobileActionBar venue={venue} />
        </div>
    );
};
