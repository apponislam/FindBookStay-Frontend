"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useLocale } from "@/hooks/useLocale";
import LanguageSwitch from "@/components/header/LanguageSwitch";

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
    imageSrc = "/auth-hero.jpg",
    imageAlt = "Modern luxury architectural residence - FindBookStay",
    sectionTag,
    headline,
    subheadline,
}: AuthLayoutProps) => {
    const { isBn } = useLocale();

    const resolvedSectionTag = sectionTag || (isBn ? "০১ / যাচাইকৃত আবাসন" : "01 / VERIFIED LIVING");
    const resolvedHeadline = headline || (isBn ? "বসবাস, ভ্রমণ ও খেলাধুলার আধুনিক মার্কেটপ্লেস।" : "Spaces crafted for how you live, travel, and play.");
    const resolvedSubheadline = subheadline || (isBn ? "বাড়িওয়ালা ও ভেন্যু পরিচালকদের সাথে সরাসরি যোগাযোগ। শতভাগ দালালমুক্ত স্বচ্ছ সেবা।" : "Direct connections with verified owners and turf managers. Seamless discovery, zero broker commission.");

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background">
            {/* ------------------------------------------------------------------ */}
            {/* LEFT 50%: ARCHITECTURAL IMAGE & BRAND CURATION */}
            {/* ------------------------------------------------------------------ */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#073B35] dark:bg-[#0B1210] text-white flex-col justify-between p-12 xl:p-16 overflow-hidden select-none min-h-screen border-r border-transparent dark:border-border">
                {/* Visual Imagery with Deep Contrast Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center brightness-75 contrast-105 dark:brightness-55 dark:contrast-120"
                    />
                    {/* Deep Forest Gradient in Light Mode, Deep Obsidian Midnight in Dark Mode */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#073B35] via-[#073B35]/75 to-[#073B35]/35 dark:from-[#0B1210] dark:via-[#0B1210]/85 dark:to-[#0B1210]/45" />
                    {/* Subtle Radial Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_45%,rgba(7,59,53,0.85)_100%)] dark:bg-[radial-gradient(ellipse_at_top,transparent_35%,rgba(11,18,16,0.95)_100%)]" />
                </div>

                {/* Top Navigation */}
                <div className="relative z-10 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer" aria-label="FindBookStay Homepage">
                        <div className="relative h-9 w-auto flex items-center">
                            <Image src="/findbookstay-logo.png" alt="FindBookStay Logo" width={160} height={46} priority className="h-8.5 w-auto object-contain brightness-0 invert" />
                        </div>
                    </Link>

                    <div className="flex items-center gap-2.5">
                        <LanguageSwitch />
                        <ModeToggle className="size-8.5 rounded-lg text-white bg-black/25 dark:bg-white/10 hover:bg-black/40 dark:hover:bg-white/20 border-white/15 cursor-pointer" />
                        <Link href="/" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:text-white bg-black/25 dark:bg-white/10 hover:bg-black/40 dark:hover:bg-white/20 backdrop-blur-md border border-white/15 transition-colors cursor-pointer">
                            <ArrowLeft className="size-3.5" />
                            <span>{isBn ? "ওয়েবসাইটে ফিরে যান" : "Back to site"}</span>
                        </Link>
                    </div>
                </div>

                {/* Middle: Editorial Typographic Statement */}
                <div className="relative z-10 my-auto py-10 max-w-lg space-y-6">
                    <div className="flex items-center gap-2.5">
                        <span className="w-6 h-0.5 bg-accent" />
                        <span className="text-[11px] font-mono tracking-widest text-emerald-400 dark:text-emerald-300 uppercase font-bold">{resolvedSectionTag}</span>
                    </div>

                    <h2 className="text-3xl xl:text-4xl 2xl:text-[44px] font-bold text-white tracking-tight leading-tight">{resolvedHeadline}</h2>

                    <p className="text-sm xl:text-base text-white/80 dark:text-white/70 leading-relaxed max-w-md font-light">{resolvedSubheadline}</p>

                    {/* Minimalist Key Metric Grid */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15 dark:border-white/10">
                        <div>
                            <div className="text-xl xl:text-2xl font-bold text-white tracking-tight font-mono">{isBn ? "৪৫,০০০+" : "45K+"}</div>
                            <div className="text-[11px] uppercase tracking-wider text-white/60 dark:text-white/50 font-medium pt-1">{isBn ? "যাচাইকৃত স্পেস" : "Verified Units"}</div>
                        </div>
                        <div>
                            <div className="text-xl xl:text-2xl font-bold text-emerald-400 dark:text-emerald-300 tracking-tight font-mono">{isBn ? "০%" : "0%"}</div>
                            <div className="text-[11px] uppercase tracking-wider text-white/60 dark:text-white/50 font-medium pt-1">{isBn ? "দালাল ফি" : "Broker Fees"}</div>
                        </div>
                        <div>
                            <div className="text-xl xl:text-2xl font-bold text-white tracking-tight font-mono">{isBn ? "১০০%" : "100%"}</div>
                            <div className="text-[11px] uppercase tracking-wider text-white/60 dark:text-white/50 font-medium pt-1">{isBn ? "সরাসরি যোগাযোগ" : "Direct Contact"}</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Architectural Stamp */}
                <div className="relative z-10 pt-6 border-t border-white/10 dark:border-white/10 flex items-center justify-between text-[11px] tracking-wider uppercase font-mono text-white/60 dark:text-white/50">
                    <span>{isBn ? "FINDBOOKSTAY মার্কেটপ্লেস" : "FINDBOOKSTAY MARKETPLACE"}</span>
                    <span>{isBn ? "বাসা • হোটেল • টার্ফ" : "RESIDENTIAL • HOTELS • TURFS"}</span>
                </div>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* RIGHT 50%: AUTHENTICATION FORM (Centered, No Card Box, No Border) */}
            {/* ------------------------------------------------------------------ */}
            <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20 bg-background text-foreground">
                {/* Mobile Header Bar */}
                <div className="flex lg:hidden items-center justify-between pb-8 w-full max-w-100 mx-auto">
                    <Link href="/" className="inline-block" aria-label="FindBookStay Homepage">
                        <Image src="/findbookstay-logo.png" alt="FindBookStay Logo" width={130} height={38} priority className="h-7.5 w-auto object-contain dark:brightness-0 dark:invert" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <LanguageSwitch />
                        <ModeToggle className="size-8 rounded-lg" />
                        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="size-3" />
                            <span>{isBn ? "হোম" : "Home"}</span>
                        </Link>
                    </div>
                </div>

                {/* Central Form Container (Strictly No Borders, No Cards) */}
                <div className="my-auto w-full max-w-100 mx-auto py-2">{children}</div>

                {/* Subtle Legal Notice */}
                <div className="pt-8 w-full max-w-100 mx-auto text-center">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {isBn ? (
                            <>
                                FindBookStay ভেরিফিকেশন প্রোটোকল দ্বারা সুরক্ষিত। এগিয়ে যাওয়ার মাধ্যমে আপনি আমাদের{" "}
                                <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline underline-offset-2 transition-colors">
                                    ব্যবহারের শর্তাবলী
                                </Link>{" "}
                                এবং{" "}
                                <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline underline-offset-2 transition-colors">
                                    গোপনীয়তা নীতি
                                </Link>{" "}
                                মেনে নিচ্ছেন।
                            </>
                        ) : (
                            <>
                                Protected by FindBookStay verification protocols. By proceeding you agree to our{" "}
                                <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline underline-offset-2 transition-colors">
                                    Terms
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline underline-offset-2 transition-colors">
                                    Privacy Policy
                                </Link>
                                .
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;