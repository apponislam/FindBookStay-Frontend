"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Plus, Sparkles } from "@/components/Icons";

export const HostBannerCTA = () => {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-emerald-950 via-primary to-[#062F2B] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-emerald-800/40">
                    {/* Background glow effects */}
                    <div className="absolute top-0 right-0 size-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 size-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-300 text-xs font-semibold">
                            <Sparkles className="size-3.5 animate-pulse" />
                            <span>PARTNER WITH FINDBOOKSTAY</span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">Own a Flat, Hotel Resort, or Sports Turf?</h2>

                        <p className="text-sm sm:text-base md:text-lg text-emerald-100/80 leading-relaxed max-w-2xl">List your space on Bangladesh&apos;s fastest-growing verified marketplace. Reach verified tenants, travelers, and sports clubs with zero hidden commission.</p>

                        {/* Value points */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                                <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">✓</span>
                                <span>Zero Upfront Listing Fee</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                                <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">✓</span>
                                <span>Direct Verified Inquiries</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                                <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">✓</span>
                                <span>Instant Payout Support</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <Link href="/auth/register" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer">
                                <Plus className="size-4" />
                                <span>List Your Space Now</span>
                            </Link>

                            <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer">
                                <span>Learn How It Works</span>
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HostBannerCTA;
