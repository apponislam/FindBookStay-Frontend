"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle2, Clock, MessageSquare, PhoneCall, ShieldCheck, Sparkles, User } from "@/components/Icons";
import { SportsVenue } from "../types";

interface SportsBookingSidebarProps {
    venue: SportsVenue;
}

export const SportsBookingSidebar = ({ venue }: SportsBookingSidebarProps) => {
    const [selectedDay, setSelectedDay] = useState(0); // 0 = Today, 1 = Tomorrow, 2 = Friday
    const [selectedSlot, setSelectedSlot] = useState("06:00 PM - 07:00 PM");
    const [durationHours, setDurationHours] = useState(1);
    const [teamName, setTeamName] = useState("");
    const [captainPhone, setCaptainPhone] = useState("");
    const [showPhone, setShowPhone] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const hostPhone = venue.host.phone || "+880 1711-889900";

    const days = [
        { label: "Today", date: "Nov 19" },
        { label: "Tomorrow", date: "Nov 20" },
        { label: "Friday", date: "Nov 21" },
    ];

    const slots = venue.slotTimes || [
        { time: "06:00 PM - 07:00 PM", period: "evening", available: true, price: venue.priceFormatted },
        { time: "07:00 PM - 08:00 PM", period: "evening", available: true, price: venue.priceFormatted },
        { time: "08:00 PM - 09:00 PM", period: "evening", available: false, price: venue.priceFormatted },
        { time: "09:00 PM - 10:00 PM", period: "night", available: true, price: `৳${Math.round(venue.hourlyPrice * 1.1).toLocaleString()}` },
        { time: "10:00 PM - 11:00 PM", period: "night", available: true, price: `৳${Math.round(venue.hourlyPrice * 1.1).toLocaleString()}` },
        { time: "11:00 PM - 12:00 AM", period: "night", available: true, price: `৳${Math.round(venue.hourlyPrice * 1.1).toLocaleString()}` },
    ];

    const baseAmount = venue.hourlyPrice * durationHours;

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setBookingSuccess(true);
        }, 650);
    };

    const handleWhatsApp = () => {
        const text = encodeURIComponent(`Hello ${venue.host.name}, I would like to book a match slot at "${venue.name}" on ${days[selectedDay].label} at ${selectedSlot} for ${durationHours} hour(s).`);
        const cleanPhone = hostPhone.replace(/[^0-9]/g, "");
        window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
    };

    return (
        <aside className="space-y-4">
            <div className="rounded-3xl bg-surface border border-border shadow-lg p-6 space-y-6">
                {/* Hourly Price Display */}
                <div className="pb-4 border-b border-border space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Slot Price</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-foreground">{venue.priceFormatted}</span>
                        <span className="text-sm font-semibold text-muted-foreground">{venue.priceUnit}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Includes floodlights, ball & changing room</span>
                    </div>
                </div>

                {/* Operator Profile Card */}
                <div className="p-3.5 rounded-2xl bg-surface-secondary/70 border border-border space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-xs">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-xs text-foreground truncate">{venue.host.name}</h3>
                                <p className="text-[11px] text-muted-foreground truncate">{venue.host.type} • Arena Management</p>
                            </div>
                        </div>

                        <button type="button" onClick={handleWhatsApp} className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs shrink-0">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                        </button>
                    </div>

                    {showPhone ? (
                        <a href={`tel:${hostPhone}`} className="w-full py-2 px-3 rounded-xl bg-primary text-white text-xs font-bold text-center flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors shadow-xs">
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>{hostPhone}</span>
                        </a>
                    ) : (
                        <button onClick={() => setShowPhone(true)} type="button" className="w-full py-2 px-3 rounded-xl bg-surface text-foreground border border-border text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-surface-secondary transition-all cursor-pointer shadow-xs">
                            <PhoneCall className="w-3.5 h-3.5 text-primary" />
                            <span>Call Arena Coordinator</span>
                        </button>
                    )}
                </div>

                {/* Slot Booking Form */}
                {bookingSuccess ? (
                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3 text-center animate-in fade-in">
                        <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                            <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h4 className="font-bold text-base text-foreground">Turf Slot Reserved!</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Your match booking at {venue.name} for {days[selectedDay].label} ({selectedSlot}) is confirmed. Match coordinator will send entry details via SMS.
                        </p>
                        <button type="button" onClick={() => setBookingSuccess(false)} className="text-xs font-semibold text-primary underline pt-1 cursor-pointer">
                            Book another match slot
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleBooking} className="space-y-4">
                        {/* Day Selector */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-primary" />
                                <span>Select Match Day</span>
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {days.map((day, idx) => (
                                    <button key={idx} type="button" onClick={() => setSelectedDay(idx)} className={`p-2 rounded-xl text-center border text-xs transition-all cursor-pointer ${selectedDay === idx ? "bg-primary/10 border-primary text-primary font-bold shadow-xs" : "bg-surface-secondary/60 border-border text-muted-foreground hover:border-primary/40"}`}>
                                        <div className="font-semibold">{day.label}</div>
                                        <div className="text-[10px] opacity-75">{day.date}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Slot Selector */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                <Clock className="w-3 h-3 text-primary" />
                                <span>Select Match Slot</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {slots.map((slot, idx) => {
                                    const isSelected = selectedSlot === slot.time;
                                    const isAvailable = slot.available;
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            disabled={!isAvailable}
                                            onClick={() => isAvailable && setSelectedSlot(slot.time)}
                                            className={`p-2 rounded-xl text-center border text-[11px] font-medium transition-all cursor-pointer ${!isAvailable ? "opacity-40 bg-surface-secondary border-border line-through cursor-not-allowed" : isSelected ? "bg-primary text-white border-primary font-bold shadow-xs" : "bg-surface-secondary/60 border-border text-foreground hover:border-primary/40"}`}
                                        >
                                            <div>{slot.time}</div>
                                            <div className="text-[10px] opacity-80">{slot.price}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Duration Selector */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Match Duration</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3].map((hr) => (
                                    <button key={hr} type="button" onClick={() => setDurationHours(hr)} className={`py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${durationHours === hr ? "bg-primary text-white border-primary shadow-xs" : "bg-surface-secondary border-border text-foreground hover:border-primary/40"}`}>
                                        {hr} {hr === 1 ? "Hour" : "Hours"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Team & Captain Inputs */}
                        <div className="space-y-2 pt-1">
                            <input type="text" required placeholder="Team Name / Captain Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                            <input type="tel" required placeholder="Contact Phone Number" value={captainPhone} onChange={(e) => setCaptainPhone(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                        </div>

                        {/* Pricing Summary */}
                        <div className="p-3.5 rounded-2xl bg-surface-secondary/50 border border-border space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span>
                                    {venue.priceFormatted} × {durationHours} {durationHours === 1 ? "hr" : "hrs"}
                                </span>
                                <span className="font-semibold text-foreground">৳{baseAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span>Floodlights & equipment</span>
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Free / Included</span>
                            </div>
                            <div className="pt-2 border-t border-border flex items-center justify-between font-bold text-sm text-foreground">
                                <span>Total Payable</span>
                                <span className="text-base text-primary">৳{baseAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70">
                            <Calendar className="w-4 h-4" />
                            <span>{isSubmitting ? "Locking Pitch Slot..." : "Instant Slot Reservation"}</span>
                        </button>
                    </form>
                )}

                {/* Safety Shield */}
                <div className="p-3.5 rounded-2xl bg-surface-secondary/40 border border-border flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-muted-foreground leading-relaxed">
                        <span className="font-bold text-foreground">Verified Turf Guarantee:</span> Zero double-booking. Guaranteed slot reservation with immediate SMS confirmation.
                    </div>
                </div>
            </div>
        </aside>
    );
};
