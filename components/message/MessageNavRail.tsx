"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Mail, ArrowLeft } from "@/components/Icons";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";
import LanguageSwitch from "@/components/header/LanguageSwitch";
import { ModeToggle } from "@/components/mode-toggle";

export type FilterTab = "all" | "unread";

interface MessageNavRailProps {
    activeFilter: FilterTab;
    onSelectFilter: (tab: FilterTab) => void;
    totalUnreadCount: number;
}

export const MessageNavRail = ({
    activeFilter,
    onSelectFilter,
    totalUnreadCount,
}: MessageNavRailProps) => {
    const { isBn, locale } = useLocale();

    return (
        <aside className="w-16 sm:w-18 shrink-0 bg-white dark:bg-card border-r border-border flex flex-col items-center justify-between py-4 z-20 select-none">
            {/* Top Brand Logo & Filters */}
            <div className="flex flex-col items-center gap-6 w-full">
                {/* Official Brand Logo */}
                <Link
                    href={`/${locale}`}
                    className="group relative size-10.5 sm:size-11 rounded-2xl bg-white dark:bg-card border border-border shadow-xs hover:border-primary/50 hover:shadow-md hover:scale-105 transition-all duration-200 flex items-center justify-center p-1.5 cursor-pointer"
                    title={isBn ? "হোমপেজে ফিরে যান" : "FindBookStay Home"}
                >
                    <Image
                        src="/icon.png"
                        alt="FindBookStay"
                        width={36}
                        height={36}
                        className="size-7.5 sm:size-8 object-contain transition-transform duration-200 group-hover:scale-110"
                        priority
                    />
                </Link>

                {/* Filter Icons (All & Unread) */}
                <div className="flex flex-col items-center gap-3 w-full">
                    {/* All Messages */}
                    <div className="relative flex items-center justify-center">
                        {activeFilter === "all" && (
                            <span className="absolute -left-3 sm:-left-3.5 w-1 h-5 rounded-r-full bg-primary" />
                        )}
                        <button
                            type="button"
                            onClick={() => onSelectFilter("all")}
                            className={`relative size-10.5 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                                activeFilter === "all"
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-102 font-bold"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80 border border-transparent hover:border-border/60"
                            }`}
                            title={isBn ? "সব মেসেজ" : "All Messages"}
                        >
                            <MessageSquare className="size-5" />
                            {totalUnreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs ring-2 ring-white dark:ring-card">
                                    {isBn ? toBengaliDigits(totalUnreadCount) : totalUnreadCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Unread Messages */}
                    <div className="relative flex items-center justify-center">
                        {activeFilter === "unread" && (
                            <span className="absolute -left-3 sm:-left-3.5 w-1 h-5 rounded-r-full bg-primary" />
                        )}
                        <button
                            type="button"
                            onClick={() => onSelectFilter("unread")}
                            className={`relative size-10.5 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                                activeFilter === "unread"
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-102 font-bold"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80 border border-transparent hover:border-border/60"
                            }`}
                            title={isBn ? "অপঠিত মেসেজ" : "Unread Messages"}
                        >
                            <Mail className="size-5" />
                            {totalUnreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs ring-2 ring-white dark:ring-card">
                                    {isBn ? toBengaliDigits(totalUnreadCount) : totalUnreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Controls: Language, Mode Toggle, Home Link */}
            <div className="flex flex-col items-center gap-2.5">
                <LanguageSwitch variant="compact" align="side" />
                <ModeToggle className="size-10 sm:size-10.5 rounded-2xl" />
                <Link
                    href={`/${locale}`}
                    className="size-10 sm:size-10.5 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-secondary/80 border border-transparent hover:border-border/60 transition-all duration-200"
                    title={isBn ? "মূল প্ল্যাটফর্মে ফিরুন" : "Exit to Platform"}
                >
                    <ArrowLeft className="size-4.5" />
                </Link>
            </div>
        </aside>
    );
};

export default MessageNavRail;
