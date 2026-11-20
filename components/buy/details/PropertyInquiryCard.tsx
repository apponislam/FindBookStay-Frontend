"use client";

import React, { useState } from "react";
import {
    PhoneCall,
    CheckCircle2,
    ShieldCheck,
    Send,
    Building2,
    Sparkles,
} from "@/components/Icons";
import { BuyProperty } from "../types";

interface PropertyInquiryCardProps {
    property: BuyProperty;
}

export const PropertyInquiryCard = ({ property }: PropertyInquiryCardProps) => {
    const [inquiryType, setInquiryType] = useState<"tour" | "contact">("tour");
    const [tourMode, setTourMode] = useState<"in-person" | "video">("in-person");
    const [tourDate, setTourDate] = useState("");
    const [tourTime, setTourTime] = useState("afternoon");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(
        `I am interested in ${property.title}. Please provide more details and arrange a viewing.`
    );
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="rounded-3xl bg-white dark:bg-card border border-border shadow-xl p-5 sm:p-6 space-y-5 sticky top-28">
            {/* Top Pricing Card Header */}
            <div className="pb-4 border-b border-border flex items-center justify-between">
                <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block">
                        Listing Price
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-foreground">
                        {property.priceFormatted}
                    </p>
                    {property.pricePerSqft && (
                        <p className="text-[11px] text-muted-foreground font-medium">
                            {property.pricePerSqft}
                        </p>
                    )}
                </div>

                <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-accent/15 text-accent uppercase tracking-wider">
                        {property.completionStatus}
                    </span>
                </div>
            </div>

            {/* Inquiry Selector Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-surface-secondary border border-border">
                <button
                    type="button"
                    onClick={() => {
                        setInquiryType("tour");
                        setSubmitted(false);
                    }}
                    className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        inquiryType === "tour"
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Schedule Tour
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setInquiryType("contact");
                        setSubmitted(false);
                    }}
                    className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        inquiryType === "contact"
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Contact Agent
                </button>
            </div>

            {submitted ? (
                <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30 text-center space-y-2 animate-in fade-in duration-200">
                    <div className="size-10 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto">
                        <CheckCircle2 className="size-6" />
                    </div>
                    <h4 className="text-sm font-extrabold text-foreground">
                        Inquiry Received!
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Our verified property manager will contact you at{" "}
                        <strong className="text-foreground">{phone || "your number"}</strong> within 2 hours.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-xs font-bold text-primary hover:underline pt-2 cursor-pointer"
                    >
                        Send another inquiry
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                    {inquiryType === "tour" && (
                        <>
                            {/* Tour Mode Pill Selector */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-extrabold uppercase text-muted-foreground block">
                                    Tour Type
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setTourMode("in-person")}
                                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                                            tourMode === "in-person"
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-border text-foreground hover:bg-surface-secondary"
                                        }`}
                                    >
                                        In-Person Viewing
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTourMode("video")}
                                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                                            tourMode === "video"
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-border text-foreground hover:bg-surface-secondary"
                                        }`}
                                    >
                                        Live Video Tour
                                    </button>
                                </div>
                            </div>

                            {/* Preferred Date & Time */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-1">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={tourDate}
                                        onChange={(e) => setTourDate(e.target.value)}
                                        className="w-full p-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-bold text-foreground focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-1">
                                        Time Slot
                                    </label>
                                    <select
                                        value={tourTime}
                                        onChange={(e) => setTourTime(e.target.value)}
                                        className="w-full p-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-bold text-foreground focus:outline-none"
                                    >
                                        <option value="morning">Morning (10 AM - 12 PM)</option>
                                        <option value="afternoon">Afternoon (2 PM - 4 PM)</option>
                                        <option value="evening">Evening (4 PM - 6 PM)</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Contact Inputs */}
                    <div className="space-y-2">
                        <input
                            type="text"
                            required
                            placeholder="Your Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                        />
                        <input
                            type="tel"
                            required
                            placeholder="Mobile Number (e.g. 017...)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                        />
                        <input
                            type="email"
                            placeholder="Email Address (Optional)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                        />

                        {inquiryType === "contact" && (
                            <textarea
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-semibold text-foreground focus:outline-none focus:border-primary resize-none"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-primary-foreground font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Send className="size-3.5" />
                        <span>
                            {inquiryType === "tour" ? "Request Private Tour" : "Send Direct Inquiry"}
                        </span>
                    </button>
                </form>
            )}

            {/* Developer / Owner Contact Footer */}
            <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">
                        <Building2 className="size-5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">
                            {property.developer.name}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-accent font-semibold">
                            <ShieldCheck className="size-3" />
                            <span>{property.developer.type}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                        href={`tel:${property.developer.phone || "+8801700000000"}`}
                        className="p-2.5 rounded-xl border border-border bg-surface-secondary/70 hover:bg-border text-foreground text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                        <PhoneCall className="size-3.5 text-accent" />
                        <span>Call Now</span>
                    </a>

                    <a
                        href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                            `Hello, I want to inquire about: ${property.title}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                        <Sparkles className="size-3.5 text-emerald-200" />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PropertyInquiryCard;
