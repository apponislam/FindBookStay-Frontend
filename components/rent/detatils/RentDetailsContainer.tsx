"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Building } from "@/components/Icons";
import { RentProperty } from "../types";
import { RentGallery } from "./RentGallery";
import { RentPropertyHeader } from "./RentPropertyHeader";
import { RentPropertyOverview } from "./RentPropertyOverview";
import { RentAmenities } from "./RentAmenities";
import { RentTermsAndFinancials } from "./RentTermsAndFinancials";
import { RentLocationAndNeighborhood } from "./RentLocationAndNeighborhood";
import { RentContactSidebar } from "./RentContactSidebar";
import { RentSimilarListings } from "./RentSimilarListings";
import { RentMobileActionBar } from "./RentMobileActionBar";

interface RentDetailsContainerProps {
    property?: RentProperty;
}

export const RentDetailsContainer = ({ property }: RentDetailsContainerProps) => {
    if (!property) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-16 h-16 rounded-3xl bg-surface-secondary border border-border flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                    <Building className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Property Not Found</h1>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">The rental property you are looking for may have been leased out or the link might be incorrect.</p>
                <Link href="/rent" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-sm">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Browse All Available Rentals</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-24 lg:pb-16">
            <div className="container mx-auto px-4 py-6 sm:py-8 space-y-8">
                {/* Visual Gallery */}
                <RentGallery property={property} />

                {/* Main 2-Column Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (8 cols on desktop) */}
                    <div className="lg:col-span-8 space-y-8">
                        <RentPropertyHeader property={property} />
                        <RentPropertyOverview property={property} />
                        <RentAmenities property={property} />
                        <RentTermsAndFinancials property={property} />
                        <RentLocationAndNeighborhood property={property} />
                    </div>

                    {/* Right Column: Sticky Contact & Booking Sidebar (4 cols on desktop) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <RentContactSidebar property={property} />
                    </div>
                </div>

                {/* Similar Properties Section */}
                <RentSimilarListings property={property} />
            </div>

            {/* Mobile Bottom Fixed Bar */}
            <RentMobileActionBar property={property} />
        </div>
    );
};
