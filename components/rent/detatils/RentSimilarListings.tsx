"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building } from "@/components/Icons";
import { RentCard } from "../RentCard";
import { getSimilarRentProperties } from "../rentData";
import { RentProperty } from "../types";

interface RentSimilarListingsProps {
    property: RentProperty;
}

export const RentSimilarListings = ({ property }: RentSimilarListingsProps) => {
    const similarListings = getSimilarRentProperties(property.id, property.category, 3);

    if (similarListings.length === 0) return null;

    return (
        <section className="space-y-6 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Building className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Similar Properties You May Like</h2>
                        <p className="text-xs text-muted-foreground">Other verified rental units available in {property.location.city}</p>
                    </div>
                </div>

                <Link href={`/rent?category=${property.category}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors">
                    <span>View all {property.categoryLabel} listings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarListings.map((item) => (
                    <RentCard key={item.id} property={item} viewMode="grid" />
                ))}
            </div>
        </section>
    );
};
