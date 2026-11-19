"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Hotel } from "@/components/Icons";
import { BookStay } from "../types";
import { BookGallery } from "./BookGallery";
import { BookStayHeader } from "./BookStayHeader";
import { BookStayOverview } from "./BookStayOverview";
import { BookRoomsList } from "./BookRoomsList";
import { BookAmenities } from "./BookAmenities";
import { BookLocationAndArea } from "./BookLocationAndArea";
import { BookReviews } from "./BookReviews";
import { BookReservationSidebar } from "./BookReservationSidebar";
import { BookSimilarStays } from "./BookSimilarStays";
import { BookMobileActionBar } from "./BookMobileActionBar";

interface BookDetailsContainerProps {
    stay?: BookStay;
}

export const BookDetailsContainer = ({ stay }: BookDetailsContainerProps) => {
    if (!stay) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-16 h-16 rounded-3xl bg-surface-secondary border border-border flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                    <Hotel className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Stay Not Found</h1>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">The accommodation listing you are looking for may have been removed or the link might be incorrect.</p>
                <Link href="/book" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-sm">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Browse All Available Stays</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-24 lg:pb-16">
            <div className="container mx-auto px-4 py-6 sm:py-8 space-y-8">
                {/* Visual Gallery */}
                <BookGallery stay={stay} />

                {/* Main 2-Column Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (8 cols on desktop) */}
                    <div className="lg:col-span-8 space-y-8">
                        <BookStayHeader stay={stay} />
                        <BookStayOverview stay={stay} />
                        <BookRoomsList stay={stay} />
                        <BookAmenities stay={stay} />
                        <BookLocationAndArea stay={stay} />
                        <BookReviews stay={stay} />
                    </div>

                    {/* Right Column: Sticky Reservation Sidebar (4 cols on desktop) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <BookReservationSidebar stay={stay} />
                    </div>
                </div>

                {/* Similar Stays Section */}
                <BookSimilarStays stay={stay} />
            </div>

            {/* Mobile Bottom Fixed Bar */}
            <BookMobileActionBar stay={stay} />
        </div>
    );
};
