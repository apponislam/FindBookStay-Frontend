import React from "react";
import type { Metadata } from "next";
import { getRentPropertyBySlug, RENT_PROPERTIES } from "@/components/rent/rentData";
import { RentDetailsContainer } from "@/components/rent/detatils/RentDetailsContainer";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const property = getRentPropertyBySlug(slug);

    if (!property) {
        return {
            title: "Rental Property Not Found | FindBookStay",
            description: "The requested rental property listing is not available.",
        };
    }

    return {
        title: `${property.title} | Rent in ${property.location.city} | FindBookStay`,
        description: `${property.categoryLabel} in ${property.location.address}. ${property.priceFormatted} ${property.pricePeriod}. ${property.beds} Beds, ${property.baths} Baths, ${property.sqft} sqft.`,
        openGraph: {
            title: property.title,
            description: `${property.priceFormatted} ${property.pricePeriod} - ${property.location.address}`,
            images: property.images && property.images.length > 0 ? [property.images[0]] : [],
        },
    };
}

export async function generateStaticParams() {
    return RENT_PROPERTIES.map((property) => ({
        slug: property.slug,
    }));
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const property = getRentPropertyBySlug(slug);

    return <RentDetailsContainer property={property} />;
}
