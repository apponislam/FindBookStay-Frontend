"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight } from "@/components/Icons";

export const PropertyDeedGuarantee = () => {
    return (
        <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-emerald-950 via-emerald-900 to-[#062F2B] dark:from-[#0B1A17] dark:via-[#132B25] dark:to-[#0B1A17] text-white border border-emerald-800/40 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                    <div className="size-10 rounded-2xl bg-white/10 backdrop-blur-md text-emerald-300 flex items-center justify-center">
                        <ShieldCheck className="size-5" />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-white">
                            FindBookStay Title & Deed Guarantee
                        </h3>
                        <p className="text-xs text-emerald-200/80">
                            100% Legal Scrutiny Passed Prior to Listing
                        </p>
                    </div>
                </div>

                <Link
                    href="/trust"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                >
                    <span>Read Verification Policy</span>
                    <ArrowRight className="size-3.5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                        <CheckCircle2 className="size-4 shrink-0" />
                        <span>Mutation & Khatian Records Vetted</span>
                    </div>
                    <p className="text-white/70 text-[11px] pl-6 leading-relaxed">
                        Chain of ownership, RS/BS porcha, and latest land tax payment (Dakhila) receipts verified with local registry.
                    </p>
                </div>

                <div className="p-3 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                        <CheckCircle2 className="size-4 shrink-0" />
                        <span>RAJUK / CDA Plan Approval</span>
                    </div>
                    <p className="text-white/70 text-[11px] pl-6 leading-relaxed">
                        Structural building drawings and floor-area ratio (FAR) compliance validated against government municipal sanction.
                    </p>
                </div>

                <div className="p-3 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                        <CheckCircle2 className="size-4 shrink-0" />
                        <span>Physical Boundary Audit</span>
                    </div>
                    <p className="text-white/70 text-[11px] pl-6 leading-relaxed">
                        GPS mapped plot demarcation verified on-site by certified surveying officers to prevent encroachments.
                    </p>
                </div>

                <div className="p-3 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                        <CheckCircle2 className="size-4 shrink-0" />
                        <span>Zero Dispute & Encumbrance Certificate</span>
                    </div>
                    <p className="text-white/70 text-[11px] pl-6 leading-relaxed">
                        Confirmed free of any active bank mortgages, court litigations, or unauthorized power of attorney claims.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PropertyDeedGuarantee;
