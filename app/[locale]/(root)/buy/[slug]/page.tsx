import React from "react";
import type { Metadata } from "next";
import BuyDetailsView from "@/components/buy/details/BuyDetailsView";
import { BUY_PROPERTIES } from "@/components/buy/buyData";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return BUY_PROPERTIES.map((property) => ({
        slug: property.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const property = BUY_PROPERTIES.find(
        (p) => p.slug === slug || p.id === slug
    );

    if (!property) {
        return {
            title: "Property Not Found | FindBookStay",
            description: "The requested property listing could not be found.",
        };
    }

    return {
        title: `${property.title} - ${property.priceFormatted} | FindBookStay`,
        description: `${property.categoryLabel} in ${property.location.address}. ${property.beds > 0 ? `${property.beds} Beds, ` : ""}${property.sqft.toLocaleString()} sqft, ${property.completionStatus}. 100% verified title deed.`,
        openGraph: {
            title: property.title,
            description: `${property.priceFormatted} · ${property.location.address}`,
            images: property.images.length > 0 ? [property.images[0]] : [],
        },
    };
}

const BuyPropertyDetailsPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const property = BUY_PROPERTIES.find(
        (p) => p.slug === slug || p.id === slug
    );

    return <BuyDetailsView property={property} />;
};

export default BuyPropertyDetailsPage;
