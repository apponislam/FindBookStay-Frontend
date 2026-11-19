"use client";

import React from "react";
import { CheckCircle2, DollarSign, FileText, Info } from "@/components/Icons";
import { RentProperty } from "../types";

interface RentTermsAndFinancialsProps {
    property: RentProperty;
}

export const RentTermsAndFinancials = ({ property }: RentTermsAndFinancialsProps) => {
    const utilityBills = property.utilityBills || {
        electricity: "Prepaid meter (as per usage)",
        gas: "Government Line Gas (Included in bill)",
        water: "Deep tubewell connection (Included in service charge)",
        waste: "৳150 / month door-to-door collection",
    };

    const rules = property.rules || ["Valid NID / Passport copy required for police verification form submission", "Smoking strictly restricted to designated balconies", "Late night visitor policy in accordance with building committee rules", "Prompt rent payment within the 1st to 7th of every calendar month"];

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-foreground">Rental Terms & Financial Breakdown</h2>
                    <p className="text-xs text-muted-foreground">Clear, transparent pricing with zero hidden fees</p>
                </div>
            </div>

            {/* Financial Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                    <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Monthly Rent</div>
                    <div className="text-2xl font-extrabold text-foreground">{property.priceFormatted}</div>
                    <div className="text-[11px] text-muted-foreground">Billed on the 1st of every month</div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-secondary/70 border border-border space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground">Security Deposit</div>
                    <div className="text-lg font-bold text-foreground">{property.deposit || "2 Months Advance"}</div>
                    <div className="text-[11px] text-muted-foreground">100% Refundable upon lease completion</div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-secondary/70 border border-border space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground">Service Charge</div>
                    <div className="text-lg font-bold text-foreground">{property.serviceCharge || "৳4,500 / month"}</div>
                    <div className="text-[11px] text-muted-foreground">Lift, Generator, Guards & Cleaning</div>
                </div>
            </div>

            {/* Utility Breakdown */}
            <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-primary" />
                    Utility Bills Status
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-surface-secondary/50 border border-border flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">Electricity</span>
                        <span className="font-semibold text-foreground">{utilityBills.electricity}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-secondary/50 border border-border flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">Gas Connection</span>
                        <span className="font-semibold text-foreground">{utilityBills.gas}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-secondary/50 border border-border flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">Water Supply</span>
                        <span className="font-semibold text-foreground">{utilityBills.water}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-secondary/50 border border-border flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">Waste Collection</span>
                        <span className="font-semibold text-foreground">{utilityBills.waste}</span>
                    </div>
                </div>
            </div>

            {/* House Rules & Tenancy Policy */}
            <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    Tenancy Agreement & House Guidelines
                </h3>
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border space-y-2.5">
                    {rules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{rule}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
