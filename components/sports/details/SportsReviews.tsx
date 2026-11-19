"use client";

import React from "react";
import { CheckCircle2, Star, User } from "@/components/Icons";
import { SportsVenue } from "../types";

interface SportsReviewsProps {
    venue: SportsVenue;
}

export const SportsReviews = ({ venue }: SportsReviewsProps) => {
    const reviews = venue.reviews || [
        {
            author: "Sabbir Ahmed (Team Captain, Dhaka Strikers)",
            rating: 5,
            date: "3 days ago",
            comment: "The grass quality and floodlight intensity are top-class. No blind spots at night, and the turf has great shock absorption. Our team's go-to turf!",
        },
        {
            author: "Rashedul Haque",
            rating: 4.8,
            date: "2 weeks ago",
            comment: "Very well maintained. Clean changing rooms and cold mineral water was readily provided. Super easy booking confirmation.",
        },
        {
            author: "Imran Hossain",
            rating: 4.9,
            date: "Last month",
            comment: "Great parking space and hassle-free match check-in. The ball and bibs provided were in brand-new condition.",
        },
    ];

    const subScores = [
        { label: "Turf Quality", score: "4.9" },
        { label: "Floodlight Visibility", score: "5.0" },
        { label: "Changing Rooms", score: "4.8" },
        { label: "Parking & Access", score: "4.9" },
        { label: "Staff Support", score: "4.9" },
        { label: "Value For Money", score: "4.8" },
    ];

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-border flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Star className="w-4 h-4 fill-amber-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Player & Team Reviews</h2>
                        <p className="text-xs text-muted-foreground">Verified feedback from competitive match bookings</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-sm font-extrabold">{venue.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground font-normal">/ 5.0</span>
                    <span className="text-muted-foreground font-medium">({venue.reviewsCount} reviews)</span>
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

            {/* Reviews List */}
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
