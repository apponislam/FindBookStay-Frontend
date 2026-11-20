"use client";

import React from "react";
import Link from "next/link";
import {
    MapPin,
    Bed,
    Maximize2,
    ShieldCheck,
    Building2,
} from "@/components/Icons";
import { BuyProperty } from "../types";

interface PropertyHeaderProps {
    property: BuyProperty;
}

export const PropertyHeader = ({ property }: PropertyHeaderProps) => {
    return (
        <div className="space-y-4">
            {/* Breadcrumb Navigation */}
            <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap"
            >
                <Link href="/" className="hover:text-primary transition-colors cursor-pointer">
                    Home
                </Link>
                <span>/</span>
                <Link href="/buy" className="hover:text-primary transition-colors cursor-pointer">
                    Buy Properties
                </Link>
                <span>/</span>
                <Link
                    href={`/buy?category=${property.category}`}
                    className="hover:text-primary transition-colors cursor-pointer"
                >
                    {property.categoryLabel}
                </Link>
                <span>/</span>
                <span className="text-foreground font-semibold truncate max-w-xs sm:max-w-md">
                    {property.title}
                </span>
            </nav>

            {/* Title & Badge Row */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary border border-primary/20">
                        {property.categoryLabel}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-surface-secondary text-foreground border border-border">
                        {property.completionStatus}
                    </span>
                    {property.verified && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-accent/15 text-accent">
                            <ShieldCheck className="size-3.5" />
                            <span>Verified Vetted Title</span>
                        </span>
                    )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                    {property.title}
                </h1>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary shrink-0" />
                    <span>{property.location.address}</span>
                </div>
            </div>

            {/* Key Specs Card Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-surface-secondary/60 dark:bg-card border border-border shadow-xs">
                {/* Price */}
                <div className="space-y-0.5">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground">
                        Total Price
                    </span>
                    <p className="text-lg sm:text-xl font-black text-foreground">
                        {property.priceFormatted}
                    </p>
                    {property.pricePerSqft && (
                        <p className="text-[11px] text-muted-foreground font-medium">
                            {property.pricePerSqft}
                        </p>
                    )}
                </div>

                {/* Bedrooms */}
                <div className="space-y-0.5 border-l border-border/80 pl-3 sm:pl-4">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        <Bed className="size-3.5 text-primary" />
                        Bedrooms
                    </span>
                    <p className="text-lg sm:text-xl font-black text-foreground">
                        {property.beds > 0 ? `${property.beds} BHK` : "Commercial / Plot"}
                    </p>
                    <p className="text-[11px] text-muted-foreground font-medium">
                        {property.beds > 0 ? `${property.baths} Bathrooms` : "Clean Boundary"}
                    </p>
                </div>

                {/* Size */}
                <div className="space-y-0.5 border-l border-border/80 pl-3 sm:pl-4">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        <Maximize2 className="size-3.5 text-primary" />
                        Floor Area
                    </span>
                    <p className="text-lg sm:text-xl font-black text-foreground">
                        {property.sqft.toLocaleString()}{" "}
                        <span className="text-xs font-normal text-muted-foreground">sqft</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground font-medium">
                        {(property.sqft / 720).toFixed(2)} Katha approx.
                    </p>
                </div>

                {/* Developer */}
                <div className="space-y-0.5 border-l border-border/80 pl-3 sm:pl-4">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        <Building2 className="size-3.5 text-primary" />
                        Listed By
                    </span>
                    <p className="text-sm sm:text-base font-extrabold text-foreground truncate">
                        {property.developer.name}
                    </p>
                    <p className="text-[11px] text-accent font-bold truncate">
                        {property.developer.type}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PropertyHeader;
