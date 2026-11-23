"use client";

import React from "react";
import { ChatMessage, ChatParticipant } from "@/constants/messagesData";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { useLocale } from "@/hooks/useLocale";

interface ChatMessageListProps {
    messages: ChatMessage[];
    participant: ChatParticipant;
    bottomRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatMessageList = ({
    messages,
    participant,
    bottomRef,
}: ChatMessageListProps) => {
    const { isBn } = useLocale();

    return (
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4 scrollbar-thin">
            {/* Date Marker */}
            <div className="flex items-center justify-center my-3 select-none">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-card border border-border text-muted-foreground shadow-2xs">
                    {isBn ? "আজকের কথোপকথন" : "Conversation Today"}
                </span>
            </div>

            {messages.map((msg) => (
                <ChatMessageBubble key={msg.id} message={msg} participant={participant} />
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatMessageList;

