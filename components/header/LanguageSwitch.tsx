"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import { Globe, Check, ChevronDown } from "@/components/Icons";
import { usePathname, useRouter, type Locale } from "@/i18n/navigation";
import { useLocale } from "@/hooks/useLocale";

interface LanguageSwitchProps {
    className?: string;
    variant?: "dropdown" | "pills";
    onLocaleChange?: () => void;
}

interface LanguageOption {
    code: Locale;
    name: string;
}

const LANGUAGES: LanguageOption[] = [
    { code: "bn", name: "বাংলা" },
    { code: "en", name: "English" },
];

export const LanguageSwitch = ({
    className = "",
    variant = "dropdown",
    onLocaleChange,
}: LanguageSwitchProps) => {
    const { locale } = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const activeLanguage = LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

    const handleSelectLocale = (nextLocale: Locale) => {
        if (nextLocale === locale) {
            setIsOpen(false);
            return;
        }

        setIsOpen(false);
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });

        if (onLocaleChange) {
            onLocaleChange();
        }
    };

    // Close on outside click and Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    // Segmented Pills variant (for Mobile Drawer and User Menu)
    if (variant === "pills") {
        return (
            <div className={`p-1 bg-surface-secondary dark:bg-surface rounded-xl border border-border flex items-center gap-1 ${className}`}>
                {LANGUAGES.map((lang) => {
                    const isSelected = lang.code === locale;
                    return (
                        <button
                            key={lang.code}
                            type="button"
                            disabled={isPending}
                            onClick={() => handleSelectLocale(lang.code)}
                            className={`flex-1 flex items-center justify-center py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer select-none outline-none focus:outline-none ${
                                isSelected
                                    ? "bg-white dark:bg-card text-foreground shadow-xs border border-border/80 font-black"
                                    : "text-muted-foreground hover:text-foreground"
                            } ${isPending ? "opacity-60 cursor-wait" : ""}`}
                        >
                            <span>{lang.name}</span>
                        </button>
                    );
                })}
            </div>
        );
    }

    // Modern Refined Dropdown variant (for Navbar Header)
    return (
        <div ref={dropdownRef} className={`relative shrink-0 ${className || "inline-block"}`}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                disabled={isPending}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={`Select language. Current language is ${activeLanguage.name}`}
                className={`cursor-pointer group relative flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 px-2.5 sm:px-3 rounded-full border transition-all duration-200 select-none outline-none focus:outline-none shrink-0 ${
                    isOpen
                        ? "bg-surface-secondary dark:bg-surface border-accent ring-2 ring-accent/20 shadow-xs"
                        : "bg-background hover:bg-surface-secondary border-border hover:border-accent/40 shadow-2xs"
                } ${isPending ? "opacity-60 cursor-wait" : ""}`}
            >
                <Globe className="size-3.5 sm:size-4 text-primary shrink-0 transition-transform duration-200 group-hover:rotate-12" />
                <span className="text-xs font-black tracking-wide text-foreground">
                    {activeLanguage.name}
                </span>

                <ChevronDown
                    className={`size-3 text-muted-foreground transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-primary" : "group-hover:text-foreground"
                    }`}
                />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div
                    role="listbox"
                    aria-label="Language selection options"
                    className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white/95 dark:bg-card/95 backdrop-blur-md border border-border shadow-xl shadow-black/10 p-1.5 z-50 origin-top-right transition-all duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-top-1"
                >
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 mb-1">
                        Language / ভাষা
                    </div>

                    <div className="space-y-0.5">
                        {LANGUAGES.map((lang) => {
                            const isSelected = lang.code === locale;
                            return (
                                <button
                                    key={lang.code}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => handleSelectLocale(lang.code)}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer select-none text-left outline-none ${
                                        isSelected
                                            ? "bg-primary/10 text-primary font-bold"
                                            : "text-foreground hover:bg-surface-secondary"
                                    }`}
                                >
                                    <span>{lang.name}</span>
                                    {isSelected && <Check className="size-3.5 text-primary stroke3" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitch;
