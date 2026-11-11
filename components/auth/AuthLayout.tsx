"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export interface AuthLayoutProps {
    children: React.ReactNode;
    imageSrc?: string;
    imageAlt?: string;
    sectionTag?: string;
    headline?: string;
    subheadline?: string;
}

export const AuthLayout = ({
    children,
    imageSrc = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    imageAlt = "Modern architectural residence - FindBookStay",
    sectionTag = "01 / VERIFIED LIVING",
    headline = "Spaces crafted for how you live, travel, and play.",
    subheadline = "Direct connections with verified owners and turf managers. Seamless discovery, zero broker commission.",
}: AuthLayoutProps) => {
    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAFCFB] dark:bg-[#0B1210]">
            {/* ------------------------------------------------------------------ */}
            {/* LEFT 50%: ARCHITECTURAL IMAGE & BRAND CURATION */}
            {/* ------------------------------------------------------------------ */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#073B35] text-white flex-col justify-between p-12 xl:p-16 overflow-hidden select-none min-h-screen">
                {/* Visual Imagery with Deep Contrast Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center brightness-[0.75] contrast-[1.05]"
                    />
                    {/* Deep Forest Gradient Treatment */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#073B35] via-[#073B35]/65 to-[#073B35]/30" />
                    {/* Subtle Fine Grain Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_50%,_rgba(7,59,53,0.85)_100%)]" />
                </div>

                {/* Top Navigation */}
                <div className="relative z-10 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group cursor-pointer"
                        aria-label="FindBookStay Homepage"
                    >
                        <div className="relative h-9 w-auto flex items-center">
                            <Image
                                src="/findbookstay-logo.png"
                                alt="FindBookStay Logo"
                                width={160}
                                height={46}
                                priority
                                className="h-8.5 w-auto object-contain brightness-0 invert"
                            />
                        </div>
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white/80 hover:text-white bg-black/20 hover:bg-black/35 backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Back to site</span>
                    </Link>
                </div>

                {/* Middle: Editorial Typographic Statement */}
                <div className="relative z-10 my-auto py-10 max-w-lg space-y-6">
                    <div className="flex items-center gap-2.5">
                        <span className="w-6 h-[2px] bg-[#10B981]" />
                        <span className="text-[11px] font-mono tracking-[0.25em] text-[#34D399] uppercase font-bold">
                            {sectionTag}
                        </span>
                    </div>

                    <h2 className="text-3xl xl:text-4xl 2xl:text-[44px] font-bold text-white tracking-tight leading-[1.18]">
                        {headline}
                    </h2>

                    <p className="text-sm xl:text-base text-white/75 leading-relaxed max-w-md font-light">
                        {subheadline}
                    </p>

                    {/* Minimalist Key Metric Grid */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15">
                        <div>
                            <div className="text-xl xl:text-2xl font-bold text-white tracking-tight font-mono">
                                45K+
                            </div>
                            <div className="text-[11px] uppercase tracking-wider text-white/60 font-medium pt-1">
                                Verified Units
                            </div>
                        </div>
                        <div>
                            <div className="text-xl xl:text-2xl font-bold text-[#34D399] tracking-tight font-mono">
                                0%
                            </div>
                            <div className="text-[11px] uppercase tracking-wider text-white/60 font-medium pt-1">
                                Broker Fees
                            </div>
                        </div>
                        <div>
                            <div className="text-xl xl:text-2xl font-bold text-white tracking-tight font-mono">
                                100%
                            </div>
                            <div className="text-[11px] uppercase tracking-wider text-white/60 font-medium pt-1">
                                Direct Contact
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Architectural Stamp */}
                <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] tracking-wider uppercase font-mono text-white/60">
                    <span>FINDBOOKSTAY MARKETPLACE</span>
                    <span>RESIDENTIAL • HOTELS • TURFS</span>
                </div>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* RIGHT 50%: AUTHENTICATION FORM (Centered, No Card Box, No Border) */}
            {/* ------------------------------------------------------------------ */}
            <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20 bg-white dark:bg-[#0B1210]">
                {/* Mobile Header Bar */}
                <div className="flex lg:hidden items-center justify-between pb-8 w-full max-w-[420px] mx-auto">
                    <Link href="/" className="inline-block" aria-label="FindBookStay Homepage">
                        <Image
                            src="/findbookstay-logo.png"
                            alt="FindBookStay Logo"
                            width={130}
                            height={38}
                            priority
                            className="h-7.5 w-auto object-contain"
                        />
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#073B35] transition-colors"
                    >
                        <ArrowLeft className="size-3" />
                        <span>Home</span>
                    </Link>
                </div>

                {/* Central Form Container (Strictly No Borders, No Cards) */}
                <div className="my-auto w-full max-w-[400px] mx-auto py-2">
                    {children}
                </div>

                {/* Subtle Legal Notice */}
                <div className="pt-8 w-full max-w-[400px] mx-auto text-center">
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                        Protected by FindBookStay verification protocols. By proceeding you agree to our{" "}
                        <Link
                            href="/terms"
                            className="text-[#64748B] hover:text-[#172B2A] underline underline-offset-2 transition-colors"
                        >
                            Terms
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="text-[#64748B] hover:text-[#172B2A] underline underline-offset-2 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
