"use client";

import React, { useEffect } from "react";
import { X } from "@/components/Icons";
import { ConversationItem } from "@/constants/messagesData";
import { useLocale } from "@/hooks/useLocale";
import { ListingDetailCard } from "./ListingDetailCard";
import { HostDetailCard } from "./HostDetailCard";
import { SafetyGuidelinesCard } from "./SafetyGuidelinesCard";

interface ChatDetailsSidebarProps {
    conversation: ConversationItem;
    onClose: () => void;
    desktopOpen?: boolean;
    mobileOpen?: boolean;
}

export const ChatDetailsSidebar = ({
    conversation,
    onClose,
    desktopOpen = true,
    mobileOpen = false,
}: ChatDetailsSidebarProps) => {
    const { isBn } = useLocale();

    // Close on Escape key press when mobile drawer is open
    useEffect(() => {
        if (!mobileOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mobileOpen, onClose]);

    const renderContent = () => (
        <>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border shrink-0">
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    {isBn ? "লিস্টিং ও হোস্টের তথ্য" : "Listing & Host Details"}
                </h4>
                <button
                    type="button"
                    onClick={onClose}
                    className="size-8 rounded-xl hover:bg-surface-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    title={isBn ? "তথ্য প্যানেল বন্ধ করুন" : "Close details panel"}
                    aria-label="Close details"
                >
                    <X className="size-4.5" />
                </button>
            </div>

            {/* Listing Preview Card */}
            <ListingDetailCard
                listing={conversation.listing}
                category={conversation.category}
            />

            {/* Host Identity Card */}
            <HostDetailCard participant={conversation.participant} />

            {/* Safe Inspection Checklist */}
            <SafetyGuidelinesCard />
        </>
    );

    return (
        <>
            {/* 1. Desktop In-flow Sidebar (xl and above) */}
            {desktopOpen && (
                <aside className="w-80 lg:w-96 shrink-0 bg-white dark:bg-card border-l border-border hidden xl:flex flex-col h-full overflow-y-auto p-5 space-y-5 scrollbar-thin z-10 select-none">
                    {renderContent()}
                </aside>
            )}

            {/* 2. Mobile & Tablet Slide-Over Drawer with Backdrop (below xl) */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 xl:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Drawer Container */}
                    <aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="Listing & Host Details"
                        className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-white dark:bg-card border-l border-border shadow-2xl flex flex-col h-full overflow-y-auto p-5 space-y-5 scrollbar-thin z-50 animate-in slide-in-from-right duration-250 select-none"
                    >
                        {renderContent()}
                    </aside>
                </div>
            )}
        </>
    );
};

export default ChatDetailsSidebar;
