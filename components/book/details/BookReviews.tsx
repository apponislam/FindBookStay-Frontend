"use client";

import React from "react";
import { CheckCircle2, Star, User } from "@/components/Icons";
import { BookStay } from "../types";

interface BookReviewsProps {
    stay: BookStay;
}

export const BookReviews = ({ stay }: BookReviewsProps) => {
    const reviews = stay.reviews || [
        {
            author: "Sadia Rahman",
            rating: 5,
            date: "2 weeks ago",
            comment: "Absolutely breathtaking experience! The staff was incredibly welcoming, the room was spotless, and the breakfast buffet was top-notch.",
        },
        {
            author: "Dr. Farhan Chowdhury",
            rating: 4.9,
            date: "1 month ago",
            comment: "Prime location with stunning views. Fast WiFi allowed me to work remotely without any hiccups. Highly recommended for couples and families.",
        },
        {
            author: "Nabila Karim",
            rating: 4.8,
            date: "Last month",
            comment: "Seamless check-in, very comfortable bed, and the sunset from the balcony was unforgettable. We will definitely book again!",
        },
    ];

    const subScores = [
        { label: "Cleanliness", score: "4.9" },
        { label: "Accuracy", score: "4.8" },
        { label: "Communication", score: "5.0" },
        { label: "Location", score: "4.9" },
        { label: "Check-In", score: "4.9" },
        { label: "Value", score: "4.8" },
    ];

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-border flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Star className="w-4 h-4 fill-amber-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Guest Ratings & Reviews</h2>
                        <p className="text-xs text-muted-foreground">Verified guest feedback from previous stays</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-sm font-extrabold">{stay.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground font-normal">/ 5.0</span>
                    <span className="text-muted-foreground font-medium">({stay.reviewsCount} reviews)</span>
                </div>
            </div>

            {/* Sub-Score Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {subScores.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-surface-secondary/60 border border-border flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">{item.label}</span>
                        <div className="flex items-center gap-1 font-bold text-foreground">
                            <span>{item.score}</span>
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Reviews Cards List */}
            <div className="space-y-4 pt-2">
                {reviews.map((rev, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-surface-secondary/40 border border-border space-y-2.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                                    <User className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                        <span>{rev.author}</span>
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    </div>
                                    <div className="text-[10px] text-muted-foreground">{rev.date}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span>{rev.rating.toFixed(1)}</span>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">{rev.comment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
