"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "@/components/Icons";
import siteData from "@/constants/siteData";

export interface TOCSection {
    id: string;
    number: string;
    title: string;
}

interface TableOfContentsProps {
    sections: TOCSection[];
    contactEmail?: string;
    contactLabel?: string;
}

const TableOfContents = ({
    sections,
    contactEmail = siteData.contacts.legalEmail,
    contactLabel = "Need legal clarification?",
}: TableOfContentsProps) => {
    const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 140; // Offset for sticky header
            const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

            if (isBottom && sections.length > 0) {
                setActiveId(sections[sections.length - 1].id);
                return;
            }

            for (let i = sections.length - 1; i >= 0; i--) {
                const sectionEl = document.getElementById(sections[i].id);
                if (sectionEl) {
                    const top = sectionEl.getBoundingClientRect().top + window.scrollY;
                    if (scrollPosition >= top) {
                        setActiveId(sections[i].id);
                        return;
                    }
                }
            }

            if (sections.length > 0) {
                setActiveId(sections[0].id);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 110;
            window.scrollTo({
                top,
                behavior: "smooth",
            });
            setActiveId(id);
            window.history.pushState(null, "", `#${id}`);
        }
    };

    const activeSection = sections.find((s) => s.id === activeId) || sections[0];

    return (
        <aside className="w-full lg:w-72 shrink-0">
            {/* ============================================================== */}
            {/* 1. MOBILE COLLAPSIBLE CONTENTS ACCORDION (< lg)                */}
            {/* ============================================================== */}
            <div className="lg:hidden mb-8 border border-border rounded-2xl bg-white dark:bg-card p-3 shadow-2xs">
                <button onClick={() => setIsMobileOpen((prev) => !prev)} className="cursor-pointer w-full flex items-center justify-between text-left">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">Contents:</span>
                        <span className="text-xs font-semibold text-accent truncate">{activeSection ? `${activeSection.number}. ${activeSection.title}` : "Select section"}</span>
                    </div>
                    <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${isMobileOpen ? "rotate-180" : ""}`} />
                </button>

                {isMobileOpen && (
                    <div className="mt-3 pt-3 border-t border-border space-y-1 text-xs max-h-64 overflow-y-auto">
                        {sections.map((sec) => {
                            const isActive = activeId === sec.id;
                            return (
                                <button
                                    key={sec.id}
                                    onClick={() => {
                                        scrollToSection(sec.id);
                                        setIsMobileOpen(false);
                                    }}
                                    className={`cursor-pointer w-full text-left py-1.5 px-2.5 rounded-lg flex items-center gap-2 transition-colors ${isActive ? "bg-accent/15 text-accent font-bold" : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary"}`}
                                >
                                    <span className="font-mono text-[10.5px] text-accent">{sec.number}</span>
                                    <span>{sec.title}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ============================================================== */}
            {/* 2. DESKTOP STICKY TABLE OF CONTENTS (lg+)                      */}
            {/* ============================================================== */}
            <div className="hidden lg:block lg:sticky lg:top-28 space-y-5">
                <div className="flex items-center justify-between pb-1 border-b border-border/60">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground">Contents</p>
                    <span className="text-[11px] font-mono font-medium text-accent">
                        {activeSection?.number || "01"} / {String(sections.length).padStart(2, "0")}
                    </span>
                </div>

                <nav className="relative border-l border-border text-xs space-y-0.5">
                    {sections.map((sec) => {
                        const isActive = activeId === sec.id;
                        return (
                            <a
                                key={sec.id}
                                href={`#${sec.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(sec.id);
                                }}
                                className={`cursor-pointer group flex items-center py-1.5 pl-3 -ml-px transition-all duration-200 border-l-2 ${
                                    isActive ? "border-accent text-accent font-bold bg-accent/10 rounded-r-md" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                }`}
                            >
                                <span
                                    className={`font-mono text-xs sm:text-[13px] font-bold mr-2 transition-colors ${
                                        isActive
                                            ? "text-accent"
                                            : "text-muted-foreground group-hover:text-accent"
                                    }`}
                                >
                                    {sec.number}
                                </span>
                                <span className="truncate">{sec.title}</span>
                            </a>
                        );
                    })}
                </nav>

                <div className="pt-4 border-t border-border text-xs text-muted-foreground space-y-1.5">
                    <p className="font-medium text-foreground">{contactLabel}</p>
                    <a href={`mailto:${contactEmail}`} className="cursor-pointer text-accent hover:underline block truncate">
                        {contactEmail}
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default TableOfContents;
