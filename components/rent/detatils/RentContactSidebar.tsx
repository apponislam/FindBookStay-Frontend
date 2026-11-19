"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle2, Clock, MessageSquare, PhoneCall, ShieldCheck, Sparkles, User } from "@/components/Icons";
import { RentProperty } from "../types";

interface RentContactSidebarProps {
    property: RentProperty;
}

export const RentContactSidebar = ({ property }: RentContactSidebarProps) => {
    const [showPhone, setShowPhone] = useState(false);
    const [tourType, setTourType] = useState<"in-person" | "video">("in-person");
    const [selectedSlot, setSelectedSlot] = useState("11:00 AM - 12:00 PM");
    const [selectedDay, setSelectedDay] = useState(0); // 0 = Tomorrow, 1 = Day after, etc.
    const [visitorName, setVisitorName] = useState("");
    const [visitorPhone, setVisitorPhone] = useState("");
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hostPhone = property.host.phone || "+880 1711-234567";

    // Generate upcoming 3 days
    const upcomingDays = [
        { label: "Tomorrow", date: "Nov 20" },
        { label: "Friday", date: "Nov 21" },
        { label: "Saturday", date: "Nov 22" },
    ];

    const timeSlots = ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "03:00 PM - 04:00 PM", "05:00 PM - 06:00 PM"];

    const handleTourSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setBookingSuccess(true);
        }, 600);
    };

    const handleWhatsApp = () => {
        const text = encodeURIComponent(`Hello ${property.host.name}, I am interested in renting your property: "${property.title}" (${property.location.area}). Is it currently available for viewing?`);
        const cleanPhone = hostPhone.replace(/[^0-9]/g, "");
        window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
    };

    return (
        <aside className="space-y-4">
            {/* Main Sticky Card */}
            <div className="rounded-3xl bg-surface border border-border shadow-lg p-6 space-y-6">
                {/* Price Display */}
                <div className="pb-4 border-b border-border space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Monthly Rental Price</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-foreground">{property.priceFormatted}</span>
                        <span className="text-sm font-semibold text-muted-foreground">{property.pricePeriod}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ready for {property.availableFrom.toLowerCase()} move-in</span>
                    </div>
                </div>

                {/* Host Profile Card */}
                <div className="p-4 rounded-2xl bg-surface-secondary/70 border border-border space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                            <User className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                                <h3 className="font-bold text-sm text-foreground truncate">{property.host.name}</h3>
                                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                            </div>
                            <p className="text-xs text-muted-foreground">{property.host.type} • Fast Responder</p>
                        </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                        {showPhone ? (
                            <a href={`tel:${hostPhone}`} className="col-span-2 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold text-center flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors shadow-sm">
                                <PhoneCall className="w-4 h-4" />
                                <span>{hostPhone}</span>
                            </a>
                        ) : (
                            <button onClick={() => setShowPhone(true)} type="button" className="py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary-hover transition-all cursor-pointer shadow-sm">
                                <PhoneCall className="w-3.5 h-3.5" />
                                <span>Call Landlord</span>
                            </button>
                        )}

                        <button onClick={handleWhatsApp} type="button" className={`${showPhone ? "col-span-2" : ""} py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm`}>
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                        </button>
                    </div>
                </div>

                {/* Schedule a Tour Form */}
                <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <h3 className="font-bold text-sm text-foreground">Schedule a Viewing</h3>
                        </div>
                        <span className="text-[11px] text-muted-foreground font-medium">Free of charge</span>
                    </div>

                    {bookingSuccess ? (
                        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2 text-center animate-in fade-in">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-sm text-foreground">Tour Request Confirmed!</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">The landlord has been notified. You will receive a call or SMS within 30 minutes to confirm the exact entry gate pass.</p>
                            <button onClick={() => setBookingSuccess(false)} type="button" className="text-xs font-semibold text-primary underline pt-1 cursor-pointer">
                                Book another slot
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleTourSubmit} className="space-y-3.5">
                            {/* Tour Type Selector */}
                            <div className="grid grid-cols-2 p-1 rounded-xl bg-surface-secondary border border-border text-xs font-semibold">
                                <button type="button" onClick={() => setTourType("in-person")} className={`py-1.5 rounded-lg transition-all cursor-pointer ${tourType === "in-person" ? "bg-surface text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                                    In-Person Visit
                                </button>
                                <button type="button" onClick={() => setTourType("video")} className={`py-1.5 rounded-lg transition-all cursor-pointer ${tourType === "video" ? "bg-surface text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                                    Video Walkthrough
                                </button>
                            </div>

                            {/* Select Day */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Select Date</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {upcomingDays.map((day, idx) => (
                                        <button key={idx} type="button" onClick={() => setSelectedDay(idx)} className={`p-2 rounded-xl text-center border text-xs transition-all cursor-pointer ${selectedDay === idx ? "bg-primary/10 border-primary text-primary font-bold shadow-xs" : "bg-surface-secondary/60 border-border text-muted-foreground hover:border-primary/40"}`}>
                                            <div className="font-semibold">{day.label}</div>
                                            <div className="text-[10px] opacity-75">{day.date}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Select Time Slot */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-primary" />
                                    <span>Time Slot</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {timeSlots.map((slot, idx) => (
                                        <button key={idx} type="button" onClick={() => setSelectedSlot(slot)} className={`p-2 rounded-xl text-center border text-[11px] font-medium transition-all cursor-pointer ${selectedSlot === slot ? "bg-primary text-white border-primary font-bold shadow-xs" : "bg-surface-secondary/60 border-border text-foreground hover:border-primary/40"}`}>
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Visitor Contact Inputs */}
                            <div className="space-y-2 pt-1">
                                <input type="text" required placeholder="Your Full Name" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                                <input type="tel" required placeholder="Phone Number (01XXXXXXXXX)" value={visitorPhone} onChange={(e) => setVisitorPhone(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70">
                                <Calendar className="w-4 h-4" />
                                <span>{isSubmitting ? "Confirming..." : "Confirm Schedule Request"}</span>
                            </button>
                        </form>
                    )}
                </div>

                {/* Verified Guarantee Badge */}
                <div className="p-3.5 rounded-2xl bg-surface-secondary/40 border border-border flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-muted-foreground leading-relaxed">
                        <span className="font-bold text-foreground">FindBookStay Guarantee:</span> No advance payment needed before physical inspection. All listings are verified on-ground.
                    </div>
                </div>
            </div>
        </aside>
    );
};
