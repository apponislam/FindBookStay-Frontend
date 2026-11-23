"use client";

import React from "react";
import { ThemePreset, ThemeConfig, THEME_CONFIGS } from "../toletData";
import { Check } from "lucide-react";

interface ToletThemeSelectorProps {
    currentTheme: ThemePreset;
    onSelectTheme: (theme: ThemePreset) => void;
    isBn: boolean;
}

export const ToletThemeSelector = ({
    currentTheme,
    onSelectTheme,
    isBn,
}: ToletThemeSelectorProps) => {
    const themeList: ThemeConfig[] = Object.values(THEME_CONFIGS);

    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                <span>{isBn ? "নোটিস ডিজাইন থিম নির্বাচন করুন" : "Select Poster Theme"}</span>
                <span className="text-[11px] font-normal text-muted-foreground">
                    {isBn ? "৪টি প্রিন্ট রেডি স্টাইল" : "4 Print-Ready Styles"}
                </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {themeList.map((t) => {
                    const isSelected = currentTheme === t.id;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => onSelectTheme(t.id)}
                            className={`group relative p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-20 ${
                                isSelected
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                                    : "border-border hover:border-primary/50 bg-card hover:bg-muted/40"
                            }`}
                        >
                            <div className="flex items-center justify-between w-full">
                                <span className="text-xs font-bold text-foreground">
                                    {isBn ? t.nameBn : t.nameEn}
                                </span>
                                {isSelected ? (
                                    <span className="size-4.5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                                        <Check className="size-3 stroke-[3]" />
                                    </span>
                                ) : (
                                    <span className="size-4 rounded-full border border-border group-hover:border-primary/60 shrink-0" />
                                )}
                            </div>

                            {/* Color Bar Swatch Preview */}
                            <div className="w-full flex items-center gap-1.5 mt-2">
                                <div
                                    className="h-2 flex-1 rounded-sm shadow-2xs"
                                    style={{
                                        backgroundColor:
                                            t.id === "classic_a4"
                                                ? "#dc2626"
                                                : t.id === "modern_emerald"
                                                ? "#0d9488"
                                                : t.id === "royal_navy"
                                                ? "#1e3a8a"
                                                : "#18181b",
                                    }}
                                />
                                <div
                                    className="h-2 w-4 rounded-sm border border-border/60"
                                    style={{
                                        backgroundColor:
                                            t.id === "modern_emerald"
                                                ? "#ccfbf1"
                                                : t.id === "royal_navy"
                                                ? "#dbeafe"
                                                : "#f4f4f5",
                                    }}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
