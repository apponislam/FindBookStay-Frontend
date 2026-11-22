import React from "react";
import type { Metadata } from "next";
import { getSportsVenueBySlug, SPORTS_VENUES } from "@/components/sports/sportsData";
import { SportsDetailsContainer } from "@/components/sports/details/SportsDetailsContainer";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const venue = getSportsVenueBySlug(slug);

    if (!venue) {
        return {
            title: "Sports Venue Not Found | FindBookStay",
            description: "The requested sports venue or turf listing is not available.",
        };
    }

    return {
        title: `${venue.name} | Book Sports Turf in ${venue.location.city} | FindBookStay`,
        description: `${venue.categoryLabel} in ${venue.location.address}. ${venue.priceFormatted} ${venue.priceUnit}. Surface: ${venue.surfaceType}, Capacity: ${venue.capacity}.`,
        openGraph: {
            title: venue.name,
            description: `${venue.priceFormatted} ${venue.priceUnit} - ${venue.location.address}`,
            images: venue.images && venue.images.length > 0 ? [venue.images[0]] : [],
        },
    };
}

export async function generateStaticParams() {
    return SPORTS_VENUES.map((venue) => ({
        slug: venue.slug,
    }));
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const venue = getSportsVenueBySlug(slug);

    return <SportsDetailsContainer venue={venue} />;
}
