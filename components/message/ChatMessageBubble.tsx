"use client";

import React from "react";
import Image from "next/image";
import { CheckCheck } from "@/components/Icons";
import { ChatMessage, ChatParticipant } from "@/constants/messagesData";
import { useLocale } from "@/hooks/useLocale";

interface ChatMessageBubbleProps {
    message: ChatMessage;
    participant: ChatParticipant;
}

export const ChatMessageBubble = ({ message, participant }: ChatMessageBubbleProps) => {
    const { isBn } = useLocale();
    const isMe = message.sender === "me";

    return (
        <div className={`flex items-end gap-2.5 ${isMe ? "justify-end" : "justify-start"}`}>
            {!isMe && <div className="size-8 rounded-full bg-linear-to-tr from-primary to-accent text-white flex items-center justify-center text-xs font-black shrink-0 overflow-hidden shadow-xs mb-1">{participant.avatar ? <Image src={participant.avatar} alt="" fill className="object-cover" /> : participant.name[0]}</div>}

            <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3.5 sm:p-4 space-y-1.5 shadow-xs ${isMe ? "bg-emerald-600 text-white rounded-br-xs" : "bg-white dark:bg-card text-foreground border border-border rounded-bl-xs"}`}>
                <p className="text-xs sm:text-[13.5px] font-medium leading-relaxed wrap-break-word">{isBn ? message.textBn || message.text : message.text}</p>
                <div className={`flex items-center justify-end gap-1 text-[10px] font-semibold ${isMe ? "text-emerald-100" : "text-muted-foreground"}`}>
                    <span>{isBn ? message.timestampBn || message.timestamp : message.timestamp}</span>
                    {isMe && <CheckCheck className="size-3.5 stroke-2" />}
                </div>
            </div>
        </div>
    );
};

export default ChatMessageBubble;
