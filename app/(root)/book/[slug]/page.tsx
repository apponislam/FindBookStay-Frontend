import React from "react";
import type { Metadata } from "next";
import { getBookStayBySlug, BOOK_STAYS } from "@/components/book/bookData";
import { BookDetailsContainer } from "@/components/book/details/BookDetailsContainer";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const stay = getBookStayBySlug(slug);

    if (!stay) {
        return {
            title: "Stay Not Found | FindBookStay",
            description: "The requested accommodation listing is not available.",
        };
    }

    return {
        title: `${stay.title} | Book in ${stay.location.city} | FindBookStay`,
        description: `${stay.categoryLabel} in ${stay.location.address}. ${stay.priceFormatted} ${stay.pricePeriod}. Accommodates up to ${stay.maxGuests} guests with ${stay.bedrooms} rooms and ${stay.baths} baths.`,
        openGraph: {
            title: stay.title,
            description: `${stay.priceFormatted} ${stay.pricePeriod} - ${stay.location.address}`,
            images: stay.images && stay.images.length > 0 ? [stay.images[0]] : [],
        },
    };
}

export async function generateStaticParams() {
    return BOOK_STAYS.map((stay) => ({
        slug: stay.slug,
    }));
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const stay = getBookStayBySlug(slug);

    return <BookDetailsContainer stay={stay} />;
}
