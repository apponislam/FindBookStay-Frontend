"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck } from "@/components/Icons";
import { ChatParticipant } from "@/constants/messagesData";
import { useLocale } from "@/hooks/useLocale";

interface HostDetailCardProps {
    participant: ChatParticipant;
}

export const HostDetailCard = ({ participant }: HostDetailCardProps) => {
    const { isBn } = useLocale();

    return (
        <div className="p-4 rounded-2xl border border-border bg-surface-secondary/40 dark:bg-surface/40 space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-linear-to-tr from-primary to-accent text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0 overflow-hidden">{participant.avatar ? <Image src={participant.avatar} alt={participant.name} fill className="object-cover" /> : <span>{participant.name[0]}</span>}</div>
                <div className="min-w-0">
                    <h4 className="text-sm font-black text-foreground truncate">{isBn ? participant.nameBn : participant.name}</h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent">
                        <ShieldCheck className="size-3.5" />
                        <span>{isBn ? participant.roleBn : participant.role}</span>
                    </span>
                </div>
            </div>

            <div className="pt-2 border-t border-border space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                    <span>{isBn ? "মোবাইল নম্বর:" : "Phone:"}</span>
                    <a href={`tel:${participant.phone}`} className="font-mono font-bold text-foreground hover:text-primary transition-colors">
                        {participant.phone}
                    </a>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span>{isBn ? "হোয়াটসঅ্যাপ:" : "WhatsApp:"}</span>
                    <a href={`https://wa.me/${participant.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                        {isBn ? "চ্যাট করুন" : "Open WhatsApp"}
                    </a>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span>{isBn ? "রেসপন্স রেট:" : "Response Rate:"}</span>
                    <span className="font-bold text-foreground">100%</span>
                </div>
            </div>
        </div>
    );
};

export default HostDetailCard;
