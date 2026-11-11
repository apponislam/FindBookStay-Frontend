"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, User, Heart, Settings, LogOut, CheckCircle2, HelpCircle, SlidersHorizontal, CalendarDays, Building } from "@/components/Icons";

interface UserMenuProps {
    isAuthenticated: boolean;
    onToggleAuth: (val: boolean) => void;
    favoritesCount: number;
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

const UserMenu = ({ isAuthenticated, onToggleAuth, favoritesCount, isOpen, onToggle, onClose }: UserMenuProps) => {
    if (!isAuthenticated) {
        return (
            <div className="flex items-center gap-1.5">
                <Link href="/login" className="cursor-pointer px-3 py-1.5 rounded-full text-xs font-semibold text-[#172B2A] hover:text-[#10B981] hover:bg-[#F8FAF9] transition-colors">
                    Log In
                </Link>
                <Link href="/signup" className="cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#10B981] hover:bg-[#059669] text-white shadow-xs transition-colors">
                    Sign Up
                </Link>
                {/* Demo switch back to authenticated */}
                <button type="button" onClick={() => onToggleAuth(true)} title="Switch to Authenticated View (Demo)" className="cursor-pointer p-1.5 text-[11px] text-[#64748B] hover:text-[#10B981]">
                    <User className="size-4" />
                </button>
            </div>
        );
    }

    return (
        <div className="relative">
            <button type="button" onClick={onToggle} className="cursor-pointer flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-[#E2EAE6] hover:border-[#10B981]/40 hover:bg-[#F8FAF9] transition-all duration-200" aria-expanded={isOpen} aria-label="User profile menu">
                <div className="size-7 rounded-full bg-linear-to-tr from-[#073B35] to-[#10B981] text-white flex items-center justify-center text-xs font-semibold uppercase shadow-2xs">AI</div>
                <span className="hidden xl:inline-block text-[13px] font-medium text-[#172B2A]">Appon</span>
                <ChevronDown className="size-3.5 text-[#64748B]" />
            </button>

            {/* Profile Dropdown with smooth zoom-in animation and infinite glowing border */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl p-[1.5px] overflow-hidden shadow-2xl bg-[#E2EAE6] z-50 origin-top-right transition-all duration-250 ease-out animate-in fade-in zoom-in-95">
                    {/* Inline keyframe definition */}
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

                    {/* 1. Glowing Neon Bloom Layer */}
                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 -ml-62.5 -mt-mt-62.5[500px] h-125 blur-xs opacity-90"
                        style={{
                            background: "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #073B35 280deg, #10B981 320deg, #34D399 350deg, transparent 360deg)",
                            animation: "border-beam-spin 3.5s linear infinite",
                            transformOrigin: "center center",
                            willChange: "transform",
                        }}
                    />

                    {/* 2. Sharp Light Beam Layer */}
                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 -ml-62.5 -mt-62.5 w-125 h-125"
                        style={{
                            background: "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #073B35 280deg, #10B981 320deg, #34D399 350deg, transparent 360deg)",
                            animation: "border-beam-spin 3.5s linear infinite",
                            transformOrigin: "center center",
                            willChange: "transform",
                        }}
                    />

                    {/* 3. Card Content */}
                    <div className="relative z-10 bg-white rounded-[15px] py-2 ring-1 ring-black/5">
                        <div className="px-4 py-2.5 border-b border-[#E2EAE6]/70">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-[#172B2A]">Appon Islam</p>
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F0F5F3] text-[#10B981]">
                                    <CheckCircle2 className="size-2.5" /> Verified
                                </span>
                            </div>
                            <p className="text-xs text-[#64748B] truncate mt-0.5">appon@findbookstay.com</p>
                        </div>

                        <div className="py-1">
                            <Link href="/my-bookings" onClick={onClose} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                <CalendarDays className="size-4 text-[#64748B]" />
                                My Bookings & Stays
                            </Link>
                            <Link href="/my-listings" onClick={onClose} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                <Building className="size-4 text-[#64748B]" />
                                My Posted Listings
                            </Link>
                            <Link href="/saved" onClick={onClose} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                <Heart className="size-4 text-[#64748B]" />
                                Saved Favorites ({favoritesCount})
                            </Link>
                            <Link href="/account/settings" onClick={onClose} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                <Settings className="size-4 text-[#64748B]" />
                                Account Settings
                            </Link>
                            <Link href="/help" onClick={onClose} className="cursor-pointer flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                <HelpCircle className="size-4 text-[#64748B]" />
                                Help & Support
                            </Link>
                        </div>

                        <div className="pt-1 mt-1 border-t border-[#E2EAE6]/70">
                            {/* Demo switcher button */}
                            <button
                                type="button"
                                onClick={() => {
                                    onToggleAuth(false);
                                    onClose();
                                }}
                                className="cursor-pointer w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#64748B] hover:bg-[#F8FAF9] transition-colors text-left"
                            >
                                <SlidersHorizontal className="size-3.5 text-[#64748B]" />
                                Switch to Guest View (Demo)
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onToggleAuth(false);
                                    onClose();
                                }}
                                className="cursor-pointer w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                            >
                                <LogOut className="size-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
