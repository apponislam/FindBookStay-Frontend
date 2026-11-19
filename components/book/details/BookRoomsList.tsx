"use client";

import React, { useState } from "react";
import { BedDouble, Check, CheckCircle2, Users } from "@/components/Icons";
import { BookStay } from "../types";

interface BookRoomsListProps {
    stay: BookStay;
}

export const BookRoomsList = ({ stay }: BookRoomsListProps) => {
    const roomTypes = stay.roomTypes || [
        {
            name: "Deluxe King Room with Balcony",
            beds: "1 Extra-Large King Bed",
            price: stay.price,
            priceFormatted: stay.priceFormatted,
            capacity: `${stay.maxGuests} Guests`,
            features: ["Free Buffet Breakfast", "Private Balcony", "Attached Luxury Bath", "High-speed WiFi", "Smart TV"],
        },
        {
            name: "Executive Ocean/Garden View Suite",
            beds: "2 Queen Beds + Living Lounge",
            price: Math.round(stay.price * 1.25),
            priceFormatted: `৳${Math.round(stay.price * 1.25).toLocaleString()}`,
            capacity: `${stay.maxGuests + 1} Guests`,
            features: ["Free Buffet Breakfast", "Mini Bar & Coffee Machine", "Bathtub & Rain Shower", "Welcome Drink", "Late Checkout (Subject to availability)"],
        },
    ];

    const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-border flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <BedDouble className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Available Room Types & Packages</h2>
                        <p className="text-xs text-muted-foreground">Select the preferred room for your reservation</p>
                    </div>
                </div>

                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Instant Confirmation
                </span>
            </div>

            <div className="space-y-4">
                {roomTypes.map((room, idx) => {
                    const isSelected = selectedRoomIdx === idx;
                    return (
                        <div
                            key={idx}
                            onClick={() => setSelectedRoomIdx(idx)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                                isSelected
                                    ? "bg-primary/5 border-primary ring-2 ring-primary/20 shadow-sm"
                                    : "bg-surface-secondary/50 border-border hover:border-primary/40 hover:bg-surface-secondary"
                            }`}
                        >
                            {isSelected && (
                                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                                    <Check className="w-3 h-3" />
                                    Selected
                                </span>
                            )}

                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="space-y-2 flex-1 min-w-0 pr-8 sm:pr-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-bold text-base text-foreground">
                                            {room.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <BedDouble className="w-4 h-4 text-primary shrink-0" />
                                            <span>{room.beds}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <Users className="w-4 h-4 text-primary shrink-0" />
                                            <span>{room.capacity}</span>
                                        </div>
                                    </div>

                                    {/* Features Badges */}
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {room.features.map((feat, fIdx) => (
                                            <span
                                                key={fIdx}
                                                className="px-2.5 py-1 rounded-lg bg-surface text-foreground text-[11px] font-medium border border-border flex items-center gap-1"
                                            >
                                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                                <span>{feat}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                                    <div className="text-[11px] text-muted-foreground font-medium">
                                        Starting from
                                    </div>
                                    <div className="text-xl font-extrabold text-foreground">
                                        {room.priceFormatted}
                                        <span className="text-xs font-normal text-muted-foreground"> / night</span>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground mt-0.5">
                                        Includes taxes & fees
                                    </div>
                                    <button
                                        type="button"
                                        className={`mt-2.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            isSelected
                                                ? "bg-primary text-white shadow-xs"
                                                : "bg-surface text-foreground border border-border hover:bg-surface-secondary"
                                        }`}
                                    >
                                        {isSelected ? "Selected Room" : "Choose Room"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
