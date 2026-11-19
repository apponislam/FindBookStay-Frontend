"use client";

import React, { useState } from "react";
import { Calendar, PhoneCall } from "@/components/Icons";
import { RentProperty } from "../types";

interface RentMobileActionBarProps {
    property: RentProperty;
}

export const RentMobileActionBar = ({ property }: RentMobileActionBarProps) => {
    const [revealed, setRevealed] = useState(false);
    const hostPhone = property.host.phone || "+880 1711-234567";

    const scrollToBooking = () => {
        window.scrollTo({
            top: 600,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface/95 backdrop-blur-md border-t border-border px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-[11px] text-muted-foreground font-medium truncate">Monthly Rent</div>
                    <div className="text-base font-extrabold text-foreground truncate">
                        {property.priceFormatted}
                        <span className="text-[11px] font-normal text-muted-foreground"> /mo</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {revealed ? (
                        <a href={`tel:${hostPhone}`} className="px-3.5 py-2.5 rounded-xl bg-surface-secondary text-foreground text-xs font-bold border border-border flex items-center gap-1.5 shadow-xs">
                            <PhoneCall className="w-3.5 h-3.5 text-primary" />
                            <span>Call</span>
                        </a>
                    ) : (
                        <button type="button" onClick={() => setRevealed(true)} className="px-3.5 py-2.5 rounded-xl bg-surface-secondary text-foreground text-xs font-bold border border-border flex items-center gap-1.5 shadow-xs cursor-pointer">
                            <PhoneCall className="w-3.5 h-3.5 text-primary" />
                            <span>Contact</span>
                        </button>
                    )}

                    <button type="button" onClick={scrollToBooking} className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Tour</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
