"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Plus, ShieldCheck } from "@/components/Icons";

interface PublishSuccessProps {
    title: string;
    summary: string;
    price: string;
    referenceId: string;
    pillar: string;
    onReset: () => void;
}

export const PublishSuccess = ({
    title,
    summary,
    price,
    referenceId,
    pillar,
    onReset,
}: PublishSuccessProps) => {
    return (
        <div className="py-12 sm:py-16 max-w-2xl mx-auto text-center space-y-8 animate-fadeIn">
            {/* Celebration Icon */}
            <div className="inline-flex items-center justify-center">
                <div className="size-20 sm:size-24 rounded-3xl bg-accent/15 border-2 border-accent text-accent flex items-center justify-center shadow-lg shadow-accent/20">
                    <CheckCircle2 className="size-10 sm:size-12" />
                </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/15 text-accent border border-accent/30">
                    <ShieldCheck className="size-3.5" />
                    <span>Listing Live & Verified</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                    Congratulations! Your {pillar} Listing is Published
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                    Your listing is now searchable by thousands of verified users across Bangladesh. Inquiries will be sent directly to your phone and WhatsApp.
                </p>
            </div>

            {/* Listing Summary Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-card border border-border shadow-md text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border text-xs text-muted-foreground">
                    <span className="font-semibold">Listing Reference ID:</span>
                    <span className="font-mono font-bold text-foreground bg-surface-secondary dark:bg-surface px-2.5 py-1 rounded-md">
                        {referenceId}
                    </span>
                </div>

                <div className="space-y-1">
                    <h3 className="text-lg font-black text-foreground">{title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{summary}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs font-semibold text-muted-foreground">Direct Pricing:</span>
                    <span className="text-lg font-black text-primary">{price}</span>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                    href={`/${pillar === "sports" ? "sports" : pillar === "book" ? "book" : pillar === "buy" ? "buy" : "rent"}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground font-extrabold text-sm shadow-md transition-all duration-200"
                >
                    <span>Browse Search Directory</span>
                    <ArrowRight className="size-4" />
                </Link>

                <button
                    type="button"
                    onClick={onReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-surface-secondary dark:bg-surface hover:bg-surface-secondary/80 border border-border text-foreground font-bold text-sm transition-all duration-200"
                >
                    <Plus className="size-4" />
                    <span>Publish Another Listing</span>
                </button>
            </div>
        </div>
    );
};

export default PublishSuccess;

