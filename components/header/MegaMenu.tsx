"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import type { CategoryMenu } from "@/constants/routes";

interface MegaMenuProps {
    category: CategoryMenu;
    onClose: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const MegaMenu = ({ category, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) => {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-screen max-w-3xl z-50 px-4 origin-top transition-all duration-300 ease-out animate-in fade-in zoom-in-95 slide-in-from-top-1" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {/* Inline keyframe definition to guarantee instant GPU execution */}
            <style>{`
                @keyframes border-beam-spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>

            {/* Outer container creating the 1.5px border channel */}
            <div className="relative rounded-2xl p-[1.5px] overflow-hidden shadow-2xl bg-[#E2EAE6]">
                {/* 1. Glowing Neon Bloom Layer (Blurred light beam) */}
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -ml-137.5 -mt-137.5 w-275 h-275 blur-xs opacity-90"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #073B35 280deg, #10B981 320deg, #34D399 350deg, transparent 360deg)",
                        animation: "border-beam-spin 3.5s linear infinite",
                        transformOrigin: "center center",
                        willChange: "transform",
                    }}
                />

                {/* 2. Sharp Light Beam Layer */}
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -ml-137.5 -mt-137.5-[1100px] h-275"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #073B35 280deg, #10B981 320deg, #34D399 350deg, transparent 360deg)",
                        animation: "border-beam-spin 3.5s linear infinite",
                        transformOrigin: "center center",
                        willChange: "transform",
                    }}
                />

                {/* 3. Inner Card Content */}
                <div className="relative z-10 bg-white rounded-[15px] p-6 ring-1 ring-black/5">
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E2EAE6]/70">
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-[#F0F5F3] text-[#073B35] text-[11px] font-bold uppercase tracking-wider">{category.label}</span>
                            <span className="text-xs text-[#64748B]">Browse top verified listings</span>
                        </div>
                        <Link href={category.href} onClick={onClose} className="group/view cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-[#10B981] hover:text-[#059669] transition-colors">
                            <span>Explore All {category.label}</span>
                            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/view:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {category.items.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link key={item.name} href={item.href} onClick={onClose} className="cursor-pointer group/item flex items-start gap-3.5 p-3 rounded-xl transition-all duration-200 hover:bg-[#F0F5F3] hover:shadow-xs border border-transparent hover:border-[#E2EAE6]">
                                    <div className="shrink-0 size-10 rounded-xl bg-[#F0F5F3] text-[#073B35] flex items-center justify-center transition-all duration-200 group-hover/item:bg-[#073B35] group-hover/item:text-[#10B981] group-hover/item:scale-105 shadow-2xs">
                                        <IconComponent className="size-4.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <p className="text-[13.5px] font-bold text-[#172B2A] group-hover/item:text-[#073B35] transition-colors truncate">{item.name}</p>
                                            {item.badge && <span className="shrink-0 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide rounded-md bg-[#10B981]/15 text-[#059669] border border-[#10B981]/20">{item.badge}</span>}
                                        </div>
                                        <p className="text-[11.5px] text-[#64748B] group-hover/item:text-[#475569] line-clamp-1 leading-snug mt-0.5">{item.desc}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
