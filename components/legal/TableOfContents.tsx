"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "@/components/Icons";

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

const TableOfContents = ({ sections, contactEmail = "legal@findbookstay.com", contactLabel = "Need legal clarification?" }: TableOfContentsProps) => {
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
            <div className="lg:hidden mb-8 border border-[#E2EAE6] rounded-2xl bg-[#F8FAF9] p-3 shadow-2xs">
                <button onClick={() => setIsMobileOpen((prev) => !prev)} className="cursor-pointer w-full flex items-center justify-between text-left">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#073B35]">Contents:</span>
                        <span className="text-xs font-semibold text-[#10B981] truncate">{activeSection ? `${activeSection.number}. ${activeSection.title}` : "Select section"}</span>
                    </div>
                    <ChevronDown className={`size-4 text-[#64748B] transition-transform duration-200 ${isMobileOpen ? "rotate-180" : ""}`} />
                </button>

                {isMobileOpen && (
                    <div className="mt-3 pt-3 border-t border-[#E2EAE6] space-y-1 text-xs max-h-64 overflow-y-auto">
                        {sections.map((sec) => {
                            const isActive = activeId === sec.id;
                            return (
                                <button
                                    key={sec.id}
                                    onClick={() => {
                                        scrollToSection(sec.id);
                                        setIsMobileOpen(false);
                                    }}
                                    className={`cursor-pointer w-full text-left py-1.5 px-2.5 rounded-lg flex items-center gap-2 transition-colors ${isActive ? "bg-[#10B981]/15 text-[#073B35] font-bold" : "text-[#64748B] hover:text-[#073B35] hover:bg-white"}`}
                                >
                                    <span className="font-mono text-[10.5px] text-[#10B981]">{sec.number}</span>
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
                <div className="flex items-center justify-between pb-1 border-b border-[#E2EAE6]/60">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#073B35]">Contents</p>
                    <span className="text-[11px] font-mono font-medium text-[#10B981]">
                        {activeSection?.number || "01"} / {String(sections.length).padStart(2, "0")}
                    </span>
                </div>

                <nav className="relative border-l border-[#E2EAE6] text-xs space-y-0.5">
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
                                    isActive ? "border-[#10B981] text-[#073B35] font-bold bg-[#10B981]/10 rounded-r-md" : "border-transparent text-[#64748B] hover:text-[#073B35] hover:border-[#A3B5AE]"
                                }`}
                            >
                                <span
                                    className={`font-mono text-xs sm:text-[13px] font-bold mr-2 transition-colors ${
                                        isActive
                                            ? "text-[#10B981]"
                                            : "text-[#64748B] group-hover:text-[#10B981]"
                                    }`}
                                >
                                    {sec.number}
                                </span>
                                <span className="truncate">{sec.title}</span>
                            </a>
                        );
                    })}
                </nav>

                <div className="pt-4 border-t border-[#E2EAE6] text-xs text-[#64748B] space-y-1.5">
                    <p className="font-medium text-[#172B2A]">{contactLabel}</p>
                    <a href={`mailto:${contactEmail}`} className="cursor-pointer text-[#10B981] hover:underline block truncate">
                        {contactEmail}
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default TableOfContents;
