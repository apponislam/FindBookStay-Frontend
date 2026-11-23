"use client";

import React from "react";
import { useLocale } from "@/hooks/useLocale";

interface QuickReply {
    en: string;
    bn: string;
}

interface ChatQuickRepliesProps {
    quickReplies?: QuickReply[];
    onSelectReply: (text: string) => void;
}

export const ChatQuickReplies = ({
    quickReplies,
    onSelectReply,
}: ChatQuickRepliesProps) => {
    const { isBn } = useLocale();

    if (!quickReplies || quickReplies.length === 0) return null;

    return (
        <div className="px-4 sm:px-6 py-2 bg-white/70 dark:bg-card/70 border-t border-border/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 select-none">
            <span className="text-[11px] font-bold text-muted-foreground shrink-0 hidden sm:inline">
                {isBn ? "দ্রুত প্রশ্ন:" : "Suggestions:"}
            </span>
            {quickReplies.map((qr, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => onSelectReply(isBn ? qr.bn : qr.en)}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-surface border border-border hover:border-accent text-foreground hover:bg-surface-secondary transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-2xs"
                >
                    {isBn ? qr.bn : qr.en}
                </button>
            ))}
        </div>
    );
};

export default ChatQuickReplies;

