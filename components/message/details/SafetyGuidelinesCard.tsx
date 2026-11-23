"use client";

import React from "react";
import { ShieldCheck } from "@/components/Icons";
import { useLocale } from "@/hooks/useLocale";

export const SafetyGuidelinesCard = () => {
    const { isBn } = useLocale();

    return (
        <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-2 shadow-2xs">
            <h5 className="text-xs font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="size-4 shrink-0" />
                <span>{isBn ? "নিরাপত্তা ও পরিদর্শন পরামর্শ" : "Safe Inspection Checklist"}</span>
            </h5>
            <ul className="text-[11px] text-muted-foreground space-y-1.5 list-disc pl-3.5 leading-relaxed">
                <li>
                    {isBn
                        ? "ফ্ল্যাট বা ভেন্যু সর্বদা দিনের আলোয় সশরীরে পরিদর্শন করুন।"
                        : "Always inspect the space in daylight before final agreement."}
                </li>
                <li>
                    {isBn
                        ? "০% ব্রোকার ফি নীতি—কোনো অননুমোদিত দালালকে ফি দেবেন না।"
                        : "Zero broker fee policy. Never pay cash to unauthorized third parties."}
                </li>
                <li>
                    {isBn
                        ? "ক্রয়-বিক্রয়ে মূল দলিল ও নামজারি পর্চা আইনজ্ঞ দ্বারা যাচাই করুন।"
                        : "Verify certified title deeds and municipal plans with bank or legal counsel."}
                </li>
            </ul>
        </div>
    );
};

export default SafetyGuidelinesCard;

