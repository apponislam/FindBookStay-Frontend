"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, X } from "@/components/Icons";
import { SERVICES } from "@/constants/services";

const FloatingPostButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div
            ref={menuRef}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none pointer-events-none"
        >
            {/* 4 Floating Service Buttons (Only rendered when open to prevent taking any layout space or blocking clicks) */}
            {isOpen && (
                <div
                    className="flex flex-col items-end gap-2.5 pointer-events-auto animate-in fade-in slide-in-from-bottom-3 duration-200"
                    role="menu"
                    aria-label="Listing options"
                >
                    {SERVICES.map((service, index) => {
                        const ServiceIcon = service.icon;
                        return (
                            <Link
                                key={service.id}
                                href={service.href}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    animationDelay: `${index * 40}ms`,
                                }}
                                className="cursor-pointer group relative flex items-center gap-3 pl-4.5 pr-2.5 py-2.5 rounded-full bg-white dark:bg-card border border-border text-foreground shadow-lg hover:shadow-xl hover:border-accent hover:bg-surface-secondary hover:scale-105 active:scale-95 transition-all duration-200"
                            >
                                {/* Floating Hover Info Pill (Appears to the left on hover) */}
                                <div className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#073B35] dark:bg-card dark:border dark:border-border text-white text-xs shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                                    <span className="font-bold text-accent uppercase tracking-wider text-[10px]">
                                        {service.tagline}
                                    </span>
                                    <span className="text-white/40">&middot;</span>
                                    <span className="text-white/95 font-medium">
                                        {service.info}
                                    </span>
                                    {/* Small right arrow pointer towards the button */}
                                    <span className="absolute top-1/2 -translate-y-1/2 left-full border-4 border-transparent border-l-[#073B35] dark:border-l-card" />
                                </div>

                                <span className="text-xs sm:text-[13px] font-bold tracking-wide whitespace-nowrap">
                                    {service.label}
                                </span>
                                <div className="size-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 group-hover:bg-accent group-hover:text-white text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-colors shrink-0">
                                    <ServiceIcon className="size-4" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Main Floating Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`cursor-pointer group relative flex items-center gap-2 px-4.5 py-3 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 pointer-events-auto ${
                    isOpen ? "ring-4 ring-accent/30 bg-[#052F2A] dark:bg-emerald-950 text-white" : ""
                }`}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Post listing"}
            >
                {/* Glow ring */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full bg-accent/25 blur-md -z-10 animate-pulse"
                />

                {isOpen ? (
                    <X className="size-5 transition-transform duration-200" />
                ) : (
                    <Plus className="size-5 transition-transform duration-300 group-hover:rotate-90" />
                )}

                <span className="text-xs sm:text-sm font-bold tracking-wide">
                    {isOpen ? "Close" : "Post Listing"}
                </span>
            </button>
        </div>
    );
};

export default FloatingPostButton;
