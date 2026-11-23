"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck } from "@/components/Icons";
import { ConversationItem } from "@/constants/messagesData";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

interface ConversationItemCardProps {
    conversation: ConversationItem;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

export const ConversationItemCard = ({ conversation, isSelected, onSelect }: ConversationItemCardProps) => {
    const { isBn } = useLocale();

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    return (
        <button type="button" onClick={() => onSelect(conversation.id)} className={`w-full text-left p-3 sm:p-3.5 flex items-center gap-3 transition-all cursor-pointer select-none border-l-4 ${isSelected ? "bg-surface-secondary/80 dark:bg-surface border-l-primary" : "hover:bg-surface-secondary/40 dark:hover:bg-surface/40 border-l-transparent"}`}>
            {/* Round Avatar with Online Indicator */}
            <div className="relative shrink-0">
                <div className="size-11 sm:size-12 rounded-full bg-linear-to-tr from-primary to-accent text-white flex items-center justify-center font-black text-sm shadow-xs overflow-hidden">
                    {conversation.participant.avatar ? (
                        <Image src={conversation.participant.avatar} alt={conversation.participant.name} fill className="object-cover" />
                    ) : (
                        <span>
                            {conversation.participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                        </span>
                    )}
                </div>
                {conversation.participant.online && <span className="absolute bottom-0 right-0 size-3 sm:size-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-card shadow-xs" title={isBn ? "অনলাইন" : "Online"} />}
            </div>

            {/* Conversation Details: Just Name & Last Message */}
            <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <h3 className="text-xs sm:text-sm font-black text-foreground truncate">{isBn ? conversation.participant.nameBn : conversation.participant.name}</h3>
                        {conversation.participant.verified && <ShieldCheck className="size-3.5 text-accent shrink-0" />}
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground shrink-0">{isBn ? conversation.lastMessageTimeBn : conversation.lastMessageTime}</span>
                </div>

                {/* Last Message Preview */}
                <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground truncate line-clamp-1">
                        {lastMessage?.sender === "me" && <span className="text-primary font-bold">{isBn ? "আপনি: " : "You: "}</span>}
                        {isBn ? lastMessage?.textBn || lastMessage?.text : lastMessage?.text}
                    </p>

                    {conversation.unreadCount > 0 && <span className="size-5 rounded-full bg-primary text-primary-foreground text-[10px] font-black flex items-center justify-center shrink-0 shadow-2xs">{isBn ? toBengaliDigits(conversation.unreadCount) : conversation.unreadCount}</span>}
                </div>
            </div>
        </button>
    );
};

export default ConversationItemCard;
