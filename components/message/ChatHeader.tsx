"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, PhoneCall, Info } from "@/components/Icons";
import { ChatParticipant } from "@/constants/messagesData";
import { useLocale } from "@/hooks/useLocale";

interface ChatHeaderProps {
    participant: ChatParticipant;
    onBack: () => void;
    onToggleInfo: () => void;
}

export const ChatHeader = ({ participant, onBack, onToggleInfo }: ChatHeaderProps) => {
    const { isBn } = useLocale();

    return (
        <header className="h-16 px-4 sm:px-6 border-b border-border bg-white dark:bg-card flex items-center justify-between gap-3 shrink-0 z-10 shadow-2xs select-none">
            <div className="flex items-center gap-3 min-w-0">
                {/* Mobile Back Button */}
                <button type="button" onClick={onBack} className="md:hidden p-2 -ml-2 rounded-xl text-foreground hover:bg-surface-secondary cursor-pointer" aria-label="Back to messages">
                    <ArrowLeft className="size-5" />
                </button>

                {/* Participant Identity Avatar */}
                <div className="relative shrink-0">
                    <div className="size-10 sm:size-11 rounded-full bg-linear-to-tr from-primary to-accent text-white flex items-center justify-center font-black text-sm shadow-xs overflow-hidden">{participant.avatar ? <Image src={participant.avatar} alt={participant.name} fill className="object-cover" /> : <span>{participant.name[0]}</span>}</div>
                    {participant.online && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 border-2 border-white dark:border-card shadow-xs" />}
                </div>

                {/* Name & Online Status */}
                <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                        <h3 className="text-sm sm:text-base font-black text-foreground truncate">{isBn ? participant.nameBn : participant.name}</h3>
                        {participant.verified && <ShieldCheck className="size-4 text-accent shrink-0" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1.5">
                        <span>{participant.online ? (isBn ? "অনলাইন" : "Online now") : isBn ? participant.lastActiveBn || "অফলাইন" : participant.lastActive || "Offline"}</span>
                        <span>•</span>
                        <span className="text-accent font-semibold">{isBn ? participant.responseTimeBn : participant.responseTime}</span>
                    </p>
                </div>
            </div>

            {/* Quick Actions Header: Call, WhatsApp, Toggle Info */}
            <div className="flex items-center gap-2 shrink-0">
                <a href={`tel:${participant.phone}`} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-foreground bg-surface-secondary dark:bg-surface hover:bg-surface-secondary/80 border border-border transition-colors cursor-pointer" title={isBn ? "সরাসরি কল করুন" : "Direct Phone Call"}>
                    <PhoneCall className="size-3.5 text-primary" />
                    <span className="hidden sm:inline">{isBn ? "কল করুন" : "Call"}</span>
                </a>

                <a href={`https://wa.me/${participant.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs" title="WhatsApp Chat">
                    <span className="font-mono font-black text-xs">WA</span>
                    <span className="hidden md:inline">WhatsApp</span>
                </a>

                <button type="button" onClick={onToggleInfo} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-secondary border border-border cursor-pointer transition-colors" title={isBn ? "বিজ্ঞাপনের তথ্য" : "Listing Details"}>
                    <Info className="size-4" />
                </button>
            </div>
        </header>
    );
};

export default ChatHeader;
