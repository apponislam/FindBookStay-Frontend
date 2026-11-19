"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle2, Clock, MessageSquare, ShieldCheck, Sparkles, User, Users } from "@/components/Icons";
import { BookStay } from "../types";

interface BookReservationSidebarProps {
    stay: BookStay;
}

export const BookReservationSidebar = ({ stay }: BookReservationSidebarProps) => {
    const [checkIn, setCheckIn] = useState("2026-11-20");
    const [checkOut, setCheckOut] = useState("2026-11-22");
    const [guests, setGuests] = useState(2);
    const [rooms, setRooms] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    // Calculate nights
    const calculateNights = () => {
        try {
            const inDate = new Date(checkIn);
            const outDate = new Date(checkOut);
            const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 1;
        } catch {
            return 2;
        }
    };

    const nights = calculateNights();
    const baseTotal = stay.price * nights * rooms;
    const serviceFee = Math.round(baseTotal * 0.05);
    const totalAmount = baseTotal + serviceFee;

    const handleReserve = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setBookingConfirmed(true);
        }, 700);
    };

    const handleWhatsApp = () => {
        const text = encodeURIComponent(`Hello ${stay.host.name}, I would like to inquire about booking "${stay.title}" from ${checkIn} to ${checkOut} for ${guests} guests.`);
        window.open(`https://wa.me/8801711000000?text=${text}`, "_blank");
    };

    return (
        <aside className="space-y-4">
            <div className="rounded-3xl bg-surface border border-border shadow-lg p-6 space-y-6">
                {/* Price Display */}
                <div className="pb-4 border-b border-border space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nightly Price</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-foreground">{stay.priceFormatted}</span>
                        <span className="text-sm font-semibold text-muted-foreground">{stay.pricePeriod}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{stay.cancellationPolicy}</span>
                    </div>
                </div>

                {/* Host Preview Card */}
                <div className="p-3.5 rounded-2xl bg-surface-secondary/70 border border-border flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-xs">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-xs text-foreground truncate">{stay.host.name}</h3>
                            <p className="text-[11px] text-muted-foreground truncate">
                                {stay.host.type} • Responds {stay.host.responseTime}
                            </p>
                        </div>
                    </div>

                    <button type="button" onClick={handleWhatsApp} className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs shrink-0">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Inquire</span>
                    </button>
                </div>

                {/* Booking Form */}
                {bookingConfirmed ? (
                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3 text-center animate-in fade-in">
                        <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                            <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h4 className="font-bold text-base text-foreground">Reservation Confirmed!</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Your reservation for {nights} night{nights > 1 ? "s" : ""} at {stay.title} is registered. A confirmation voucher has been sent to your contact details.
                        </p>
                        <button type="button" onClick={() => setBookingConfirmed(false)} className="text-xs font-semibold text-primary underline pt-1 cursor-pointer">
                            Modify reservation details
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleReserve} className="space-y-4">
                        {/* Dates Selector */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-primary" />
                                    <span>Check-In</span>
                                </label>
                                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-border text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-primary" />
                                    <span>Check-Out</span>
                                </label>
                                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-border text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                            </div>
                        </div>

                        {/* Guests & Rooms */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <Users className="w-3 h-3 text-primary" />
                                    <span>Guests</span>
                                </label>
                                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-border text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer">
                                    {Array.from({ length: stay.maxGuests }, (_, i) => i + 1).map((num) => (
                                        <option key={num} value={num}>
                                            {num} {num === 1 ? "Guest" : "Guests"}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Rooms</label>
                                <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-border text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer">
                                    <option value={1}>1 Room</option>
                                    <option value={2}>2 Rooms</option>
                                    <option value={3}>3 Rooms</option>
                                </select>
                            </div>
                        </div>

                        {/* Financial Breakdown */}
                        <div className="p-3.5 rounded-2xl bg-surface-secondary/50 border border-border space-y-2 text-xs">
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span>
                                    {stay.priceFormatted} × {nights} {nights === 1 ? "night" : "nights"}
                                    {rooms > 1 ? ` (${rooms} rooms)` : ""}
                                </span>
                                <span className="font-semibold text-foreground">৳{baseTotal.toLocaleString()}</span>
                            </div>

                            <div className="flex items-center justify-between text-muted-foreground">
                                <span>Service & cleaning fee (5%)</span>
                                <span className="font-semibold text-foreground">৳{serviceFee.toLocaleString()}</span>
                            </div>

                            <div className="pt-2 border-t border-border flex items-center justify-between font-bold text-sm text-foreground">
                                <span>Total Estimated Amount</span>
                                <span className="text-base text-primary">৳{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Submit Action */}
                        <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70">
                            <Calendar className="w-4 h-4" />
                            <span>{isSubmitting ? "Processing Reservation..." : "Instant Reserve & Lock Rate"}</span>
                        </button>
                    </form>
                )}

                {/* Safety Guarantee */}
                <div className="p-3.5 rounded-2xl bg-surface-secondary/40 border border-border flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-muted-foreground leading-relaxed">
                        <span className="font-bold text-foreground">FindBookStay Guarantee:</span> Your booking is 100% protected. Pay online or choose pay-at-property when available.
                    </div>
                </div>
            </div>
        </aside>
    );
};
