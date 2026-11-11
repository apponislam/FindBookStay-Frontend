"use client";

import React from "react";
import { ChevronDown } from "@/components/Icons";
import type { CategoryMenu } from "@/constants/routes";
import MegaMenu from "./MegaMenu";

interface NavItemProps {
    category: CategoryMenu;
    isOpen: boolean;
    onToggle: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClose: () => void;
}

const NavItem = ({ category, isOpen, onToggle, onMouseEnter, onMouseLeave, onClose }: NavItemProps) => {
    return (
        <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <button
                type="button"
                onClick={onToggle}
                className={`group relative cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-semibold tracking-[-0.01em] rounded-xl transition-all duration-200 ${
                    isOpen ? "text-[#073B35] bg-[#F0F5F3] shadow-2xs ring-1 ring-[#E2EAE6]" : "text-[#172B2A] hover:text-[#073B35] hover:bg-[#F0F5F3]/80"
                }`}
                aria-expanded={isOpen}
            >
                <span className="relative z-10">{category.label}</span>
                <ChevronDown className={`size-3.5 transition-all duration-300 ${isOpen ? "rotate-180 text-[#10B981]" : "text-[#64748B] group-hover:text-[#073B35] group-hover:translate-y-0.5"}`} />
                {/* Modern Animated Gradient Indicator Line */}
                <span
                    className={`absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full bg-linear-to-r from-[#073B35] via-[#10B981] to-[#073B35] transition-all duration-300 ease-out origin-center ${
                        isOpen ? "scale-x-100 opacity-100 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-75"
                    }`}
                />
            </button>

            {/* Mega Menu Dropdown */}
            {isOpen && <MegaMenu category={category} onClose={onClose} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />}
        </div>
    );
};

export default NavItem;
