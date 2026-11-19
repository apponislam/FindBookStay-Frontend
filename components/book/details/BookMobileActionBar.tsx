"use client";

import React from "react";
import { Calendar } from "@/components/Icons";
import { BookStay } from "../types";

interface BookMobileActionBarProps {
    stay: BookStay;
}

export const BookMobileActionBar = ({ stay }: BookMobileActionBarProps) => {
    const scrollToBooking = () => {
        window.scrollTo({
            top: 550,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface/95 backdrop-blur-md border-t border-border px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-[11px] text-muted-foreground font-medium truncate">Nightly Price</div>
                    <div className="text-base font-extrabold text-foreground truncate">
                        {stay.priceFormatted}
                        <span className="text-[11px] font-normal text-muted-foreground"> / night</span>
                    </div>
                </div>

                <button type="button" onClick={scrollToBooking} className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Check & Reserve</span>
                </button>
            </div>
        </div>
    );
};
