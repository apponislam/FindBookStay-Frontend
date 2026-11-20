"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Building } from "@/components/Icons";
import PropertyGallery from "./PropertyGallery";
import PropertyHeader from "./PropertyHeader";
import PropertyOverview from "./PropertyOverview";
import PropertyDescription from "./PropertyDescription";
import PropertyAmenities from "./PropertyAmenities";
import PropertyDeedGuarantee from "./PropertyDeedGuarantee";
import MortgageCalculator from "./MortgageCalculator";
import PropertyInquiryCard from "./PropertyInquiryCard";
import SimilarProperties from "./SimilarProperties";
import { BuyProperty } from "../types";

interface BuyDetailsViewProps {
    property?: BuyProperty;
}

export const BuyDetailsView = ({ property }: BuyDetailsViewProps) => {
    if (!property) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-16 h-16 rounded-3xl bg-surface-secondary border border-border flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                    <Building className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Property Not Found</h1>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    The property listing you are looking for may have been sold or the link might be incorrect.
                </p>
                <Link
                    href="/buy"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Browse All Available Properties</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-8 sm:py-12 select-none">
            <div className="container mx-auto px-4 space-y-8 sm:space-y-10">
                {/* 1. Header & Breadcrumbs */}
                <PropertyHeader property={property} />

                {/* 2. Interactive Photo Gallery */}
                <PropertyGallery property={property} />

                {/* 3. Main Split View: Left Content & Right Sticky Inquiry Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Left Column (8 Cols): Specifications, Description, Amenities, Deed, Calculator */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Specifications & Overview */}
                        <PropertyOverview property={property} />

                        {/* Full Description & Architecture */}
                        <PropertyDescription property={property} />

                        {/* Amenities & Building Facilities */}
                        <PropertyAmenities property={property} />

                        {/* 4-Pillar Title & Deed Guarantee Banner */}
                        <PropertyDeedGuarantee />

                        {/* Interactive Mortgage & EMI Calculator */}
                        <MortgageCalculator propertyPrice={property.price} />
                    </div>

                    {/* Right Column (4 Cols): Sticky Booking / Viewing & Contact Widget */}
                    <div className="lg:col-span-4 w-full">
                        <PropertyInquiryCard property={property} />
                    </div>
                </div>

                {/* 4. Similar Properties Grid */}
                <SimilarProperties
                    currentId={property.id}
                    category={property.category}
                />
            </div>
        </div>
    );
};

export default BuyDetailsView;
