"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import {
    INITIAL_TOLET_DATA,
    ToletNoticeData,
    ThemePreset,
} from "../toletData";
import { ToletFormEditor } from "./ToletFormEditor";
import { ToletNoticePreview } from "./ToletNoticePreview";
import { ToletThemeSelector } from "./ToletThemeSelector";
import {
    Printer,
    Sparkles,
    ArrowLeft,
    RotateCcw,
    Eye,
    Edit3,
    PlusCircle,
    Share2,
    Check,
} from "lucide-react";

export const ToletBuilderContainer = () => {
    const { isBn, locale } = useLocale();
    const [noticeData, setNoticeData] = useState<ToletNoticeData>(INITIAL_TOLET_DATA);
    const [activeMobileTab, setActiveMobileTab] = useState<"edit" | "preview">("edit");
    const [copiedShare, setCopiedShare] = useState(false);

    // Update field helper
    const handleUpdateField = <K extends keyof ToletNoticeData>(
        key: K,
        value: ToletNoticeData[K]
    ) => {
        setNoticeData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Quick Presets
    const applyFamilyPreset = () => {
        setNoticeData((prev) => ({
            ...prev,
            tenantType: "family",
            propertyType: "apartment",
            bedrooms: 3,
            bathrooms: 3,
            balconies: 2,
            hasDrawingDining: true,
            hasLift: true,
            hasGenerator: true,
            hasParking: true,
            gasType: "pipeline",
            titleEn: "TO-LET (FAMILY FLAT)",
            titleBn: "টু-লেট (ফ্যামিলি বাসা)",
            customNoteEn: "Luxurious, well-lit apartment with continuous water & high security.",
            customNoteBn: "পর্যাপ্ত আলো-বাতাসপূর্ণ মনোরম পরিবেশ, সার্বক্ষণিক পানি ও নিজস্ব দারোয়ান।",
        }));
    };

    const applyBachelorPreset = () => {
        setNoticeData((prev) => ({
            ...prev,
            tenantType: "bachelor",
            propertyType: "bachelor_seat",
            bedrooms: 1,
            bathrooms: 1,
            balconies: 1,
            hasDrawingDining: false,
            hasLift: false,
            hasGenerator: true,
            hasParking: false,
            gasType: "cylinder",
            rentAmount: "4,500",
            rentAmountBn: "৪,৫০০",
            serviceCharge: "500 (Including wifi & maid)",
            serviceChargeBn: "৫০০ (ওয়াইফাই ও কাজের খালা সহ)",
            titleEn: "TO-LET (BACHELOR SEAT/ROOM)",
            titleBn: "টু-লেট (ব্যাচেলর সিট/রুম)",
            customNoteEn: "Calm study environment with high-speed WiFi, meal facility available.",
            customNoteBn: "পড়াশোনার নিরিবিলি শান্ত পরিবেশ, হাই-স্পিড ওয়াইফাই ও মিল সিস্টেম বিদ্যমান।",
        }));
    };

    const applySubletPreset = () => {
        setNoticeData((prev) => ({
            ...prev,
            tenantType: "sublet",
            propertyType: "sublet_room",
            bedrooms: 1,
            bathrooms: 1,
            balconies: 1,
            hasDrawingDining: false,
            hasLift: true,
            hasGenerator: true,
            hasParking: false,
            gasType: "pipeline",
            rentAmount: "9,000",
            rentAmountBn: "৯,০০০",
            serviceCharge: "1,000 (All utility included)",
            serviceChargeBn: "১,০০০ (সব ইউটিলিটি বিল সহ)",
            titleEn: "TO-LET (SUBLET MASTER BED)",
            titleBn: "টু-লেট (সাবলেট মাস্টার বেড)",
            customNoteEn: "Attached bath & private balcony with kitchen sharing for small family/female.",
            customNoteBn: "সংযুক্ত বাথরুম ও বারান্দাসহ রান্নাঘর শেয়ারিং, ছোট ফ্যামিলি বা কর্মজীবী নারীর উপযোগী।",
        }));
    };

    // Print handler
    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    };

    // Share link handler
    const handleShare = async () => {
        if (typeof window !== "undefined") {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopiedShare(true);
                setTimeout(() => setCopiedShare(false), 2500);
            } catch {
                // Ignore clipboard failures
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-muted/20 dark:bg-background/80 pb-16">
            {/* Top Sticky Toolbar */}
            <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-xs print:hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
                    {/* Back / Title */}
                    <div className="flex items-center gap-3 min-w-0">
                        <Link
                            href={`/${locale}/tolet`}
                            className="size-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
                            title={isBn ? "টু-লেট হাবে ফিরুন" : "Back to Tolet Hub"}
                        >
                            <ArrowLeft className="size-4.5" />
                        </Link>
                        <div className="truncate">
                            <h1 className="text-sm sm:text-base font-extrabold text-foreground truncate flex items-center gap-2">
                                <span>{isBn ? "টু-লেট নোটিস বিল্ডার" : "To-Let Notice Builder"}</span>
                                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                                    {isBn ? "প্রিন্ট রেডি A4" : "Print Ready A4"}
                                </span>
                            </h1>
                            <p className="text-[11px] text-muted-foreground truncate hidden sm:block">
                                {isBn
                                    ? "সহজেই বাসা ভাড়ার নোটিস তৈরি ও প্রিন্ট করুন — ১০০% ফ্রি"
                                    : "Create, customize, and print rental notices in minutes — 100% Free"}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Notice Language Switcher */}
                        <div className="flex items-center bg-muted/70 p-0.5 rounded-xl border border-border/80">
                            <button
                                type="button"
                                onClick={() => handleUpdateField("language", "bn")}
                                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                    noticeData.language === "bn"
                                        ? "bg-background text-foreground shadow-2xs"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                বাংলা
                            </button>
                            <button
                                type="button"
                                onClick={() => handleUpdateField("language", "en")}
                                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                    noticeData.language === "en"
                                        ? "bg-background text-foreground shadow-2xs"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                English
                            </button>
                        </div>

                        {/* Reset Button */}
                        <button
                            type="button"
                            onClick={() => setNoticeData(INITIAL_TOLET_DATA)}
                            className="size-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                            title={isBn ? "তথ্য রিসেট করুন" : "Reset Form"}
                        >
                            <RotateCcw className="size-4" />
                        </button>

                        {/* Share Link Button */}
                        <button
                            type="button"
                            onClick={handleShare}
                            className="size-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                            title={isBn ? "বিল্ডার লিঙ্ক কপি করুন" : "Share Builder Link"}
                        >
                            {copiedShare ? (
                                <Check className="size-4 text-emerald-500" />
                            ) : (
                                <Share2 className="size-4" />
                            )}
                        </button>

                        {/* Direct Print A4 Poster Button */}
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/95 hover:scale-102 active:scale-98 transition-all cursor-pointer"
                        >
                            <Printer className="size-4" />
                            <span>{isBn ? "A4 প্রিন্ট করুন" : "Print A4 Poster"}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Tab Switcher (Visible strictly on mobile screens < lg) */}
                <div className="lg:hidden flex border-t border-border bg-background px-4 py-1.5 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveMobileTab("edit")}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                            activeMobileTab === "edit"
                                ? "bg-primary text-primary-foreground shadow-xs"
                                : "text-muted-foreground hover:bg-muted"
                        }`}
                    >
                        <Edit3 className="size-3.5" />
                        <span>{isBn ? "তথ্য পূরণ (এডিটর)" : "Fill Details"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveMobileTab("preview")}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                            activeMobileTab === "preview"
                                ? "bg-primary text-primary-foreground shadow-xs"
                                : "text-muted-foreground hover:bg-muted"
                        }`}
                    >
                        <Eye className="size-3.5" />
                        <span>{isBn ? "লাইভ নোটিস প্রিভিউ" : "Live Preview"}</span>
                    </button>
                </div>
            </header>

            {/* Quick Template Presets Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 print:hidden">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 mr-1">
                        <Sparkles className="size-3.5 text-amber-500" />
                        {isBn ? "দ্রুত প্রিসেট:" : "Quick Presets:"}
                    </span>
                    <button
                        type="button"
                        onClick={applyFamilyPreset}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-card hover:bg-primary/5 hover:border-primary/40 border border-border transition-all cursor-pointer"
                    >
                        🏠 {isBn ? "ফ্যামিলি ফ্ল্যাট" : "Family Flat"}
                    </button>
                    <button
                        type="button"
                        onClick={applyBachelorPreset}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-card hover:bg-primary/5 hover:border-primary/40 border border-border transition-all cursor-pointer"
                    >
                        🎓 {isBn ? "ব্যাচেলর সিট/রুম" : "Bachelor Seat"}
                    </button>
                    <button
                        type="button"
                        onClick={applySubletPreset}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-card hover:bg-primary/5 hover:border-primary/40 border border-border transition-all cursor-pointer"
                    >
                        🔑 {isBn ? "সাবলেট মাস্টার বেড" : "Sublet Room"}
                    </button>

                    <div className="ml-auto hidden sm:flex items-center gap-2">
                        <Link
                            href={`/${locale}/post-listing`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                        >
                            <PlusCircle className="size-3.5" />
                            {isBn
                                ? "FindBookStay-তে ডিজিটাল লিস্টিং পোস্ট করুন"
                                : "Also publish listing on FindBookStay"}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Builder Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Form Editor & Controls */}
                    <div
                        className={`lg:col-span-6 xl:col-span-7 flex flex-col gap-6 print:hidden ${
                            activeMobileTab === "preview" ? "hidden lg:flex" : "flex"
                        }`}
                    >
                        {/* 1. Theme Selector Swatches */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs">
                            <ToletThemeSelector
                                currentTheme={noticeData.theme}
                                onSelectTheme={(theme: ThemePreset) =>
                                    handleUpdateField("theme", theme)
                                }
                                isBn={isBn}
                            />
                        </div>

                        {/* 2. Comprehensive Form Editor */}
                        <ToletFormEditor
                            data={noticeData}
                            onChange={setNoticeData}
                        />
                    </div>

                    {/* Right Column: Sticky Live A4 Preview */}
                    <div
                        className={`lg:col-span-6 xl:col-span-5 lg:sticky lg:top-24 flex flex-col items-center gap-4 ${
                            activeMobileTab === "edit" ? "hidden lg:flex" : "flex"
                        }`}
                    >
                        {/* Live Preview Container */}
                        <div className="w-full flex flex-col items-center">
                            <div className="w-full flex items-center justify-between px-1 mb-2 text-xs font-bold text-muted-foreground print:hidden">
                                <span className="flex items-center gap-1.5">
                                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                    {isBn ? "লাইভ রিয়েলটাইম প্রিভিউ" : "Live Real-Time Preview"}
                                </span>
                                <span>{isBn ? "স্ট্যান্ডার্ড A4 অনুপাত" : "Standard A4 Ratio"}</span>
                            </div>

                            {/* The Real Printable Poster */}
                            <ToletNoticePreview data={noticeData} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
