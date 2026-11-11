"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, User, Heart, Settings, LogOut, CheckCircle2, HelpCircle, SlidersHorizontal, CalendarDays, Building, ArrowRight } from "@/components/Icons";

interface UserMenuProps {
    isAuthenticated: boolean;
    onToggleAuth: (val: boolean) => void;
    favoritesCount: number;
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

const UserMenu = ({ isAuthenticated, onToggleAuth, favoritesCount, isOpen, onToggle, onClose }: UserMenuProps) => {
    // -------------------------------------------------------------
    // GUEST VIEW (Default Logged Out)
    // -------------------------------------------------------------
    if (!isAuthenticated) {
        return (
            <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Modern Tactile Log In Button */}
                <Link
                    href="/auth/login"
                    className="group cursor-pointer inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-[#172B2A] hover:text-[#073B35] bg-white hover:bg-[#F0F5F3] border border-[#E2EAE6] hover:border-[#10B981]/50 shadow-2xs hover:shadow-xs transition-all duration-200"
                >
                    <User className="size-3.5 text-[#64748B] group-hover:text-[#073B35] transition-colors" />
                    <span>Log In</span>
                </Link>

                {/* High-Impact Emerald Gradient Sign Up Button */}
                <Link
                    href="/auth/register"
                    className="group cursor-pointer relative inline-flex items-center gap-1.5 px-4 sm:px-4.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-linear-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#10B981] shadow-[0_4px_12px_rgba(16,185,129,0.28)] hover:shadow-[0_6px_18px_rgba(16,185,129,0.38)] transition-all duration-250 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <span>Sign Up</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>

                {/* Interactive Demo Switcher */}
                <button
                    type="button"
                    onClick={() => onToggleAuth(true)}
                    title="Preview Logged-in Profile Menu (Demo)"
                    className="cursor-pointer group relative flex items-center justify-center size-8.5 sm:size-9 rounded-xl border border-[#E2EAE6] bg-white hover:bg-[#F0F5F3] hover:border-[#10B981]/40 text-[#64748B] hover:text-[#073B35] shadow-2xs transition-all duration-200"
                    aria-label="Switch to Authenticated View (Demo)"
                >
                    <SlidersHorizontal className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    <span className="absolute -top-1 -right-1 flex size-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                        <span className="relative inline-flex rounded-full size-2 bg-[#10B981]" />
                    </span>
                </button>
            </div>
        );
    }

    // -------------------------------------------------------------
    // AUTHENTICATED VIEW (Logged In Profile & Dropdown)
    // -------------------------------------------------------------
    return (
        <div className="relative">
            {/* User Pill Trigger Button */}
            <button
                type="button"
                onClick={onToggle}
                className={`cursor-pointer flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border transition-all duration-200 ${isOpen ? "border-[#10B981] bg-[#F0F5F3] shadow-xs" : "border-[#E2EAE6] hover:border-[#10B981]/40 hover:bg-[#F8FAF9]"}`}
                aria-expanded={isOpen}
                aria-label="User profile menu"
            >
                <div className="relative size-7 rounded-full bg-linear-to-tr from-[#073B35] to-[#10B981] text-white flex items-center justify-center text-xs font-bold uppercase shadow-2xs">
                    AI
                    <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-[#10B981] ring-2 ring-white" />
                </div>
                <span className="hidden xl:inline-block text-[13px] font-semibold text-[#172B2A]">Appon</span>
                <ChevronDown className={`size-3.5 text-[#64748B] transition-transform duration-200 ${isOpen ? "rotate-180 text-[#073B35]" : ""}`} />
            </button>

            {/* Profile Dropdown with infinite rotating glowing border beam */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl p-[1.5px] overflow-hidden shadow-2xl bg-[#E2EAE6] z-50 origin-top-right transition-all duration-300 ease-out animate-in fade-in zoom-in-95 slide-in-from-top-1">
                    {/* 1. Neon Bloom Layer */}
                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 blur-xs opacity-90 animate-border-beam-spin"
                        style={{
                            width: 600,
                            height: 600,
                            marginLeft: -300,
                            marginTop: -300,
                            background: "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #073B35 280deg, #10B981 320deg, #34D399 350deg, transparent 360deg)",
                            transformOrigin: "center center",
                            willChange: "transform",
                        }}
                    />

                    {/* 2. Sharp Light Beam Layer */}
                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 animate-border-beam-spin"
                        style={{
                            width: 600,
                            height: 600,
                            marginLeft: -300,
                            marginTop: -300,
                            background: "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #073B35 280deg, #10B981 320deg, #34D399 350deg, transparent 360deg)",
                            transformOrigin: "center center",
                            willChange: "transform",
                        }}
                    />

                    {/* 3. Card Inner Content */}
                    <div className="relative z-10 bg-white rounded-[15px] p-3 ring-1 ring-black/5">
                        {/* Profile Header Card */}
                        <div className="p-3 mb-2 rounded-xl bg-linear-to-br from-[#F0F5F3] to-[#F8FAF9] border border-[#E2EAE6]/70">
                            <div className="flex items-center gap-3">
                                <div className="relative size-11 rounded-full bg-linear-to-tr from-[#073B35] to-[#10B981] text-white flex items-center justify-center text-sm font-bold shadow-xs shrink-0">
                                    AI
                                    <div className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-[#10B981] text-white flex items-center justify-center ring-2 ring-white">
                                        <CheckCircle2 className="size-2.5" />
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="text-[13.5px] font-bold text-[#172B2A] truncate">Appon Islam</h4>
                                        <span className="shrink-0 px-1.5 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider bg-[#10B981]/15 text-[#059669] border border-[#10B981]/20">Verified</span>
                                    </div>
                                    <p className="text-[11.5px] text-[#64748B] truncate mt-0.5">appon@findbookstay.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links Grid */}
                        <div className="space-y-0.5 py-1">
                            <Link href="/my-bookings" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#172B2A] hover:bg-[#F0F5F3] hover:text-[#073B35] transition-all duration-150">
                                <span className="flex items-center gap-2.5">
                                    <div className="size-8 rounded-lg bg-[#F0F5F3] text-[#073B35] group-hover:bg-[#073B35] group-hover:text-[#10B981] flex items-center justify-center transition-all duration-200 shadow-2xs">
                                        <CalendarDays className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[12.5px] font-semibold text-[#172B2A] group-hover:text-[#073B35]">My Bookings & Stays</p>
                                        <p className="text-[10.5px] text-[#64748B] font-normal">Manage trips & reservations</p>
                                    </div>
                                </span>
                                <ChevronRight className="size-3.5 text-[#64748B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                            </Link>

                            <Link href="/my-listings" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#172B2A] hover:bg-[#F0F5F3] hover:text-[#073B35] transition-all duration-150">
                                <span className="flex items-center gap-2.5">
                                    <div className="size-8 rounded-lg bg-[#F0F5F3] text-[#073B35] group-hover:bg-[#073B35] group-hover:text-[#10B981] flex items-center justify-center transition-all duration-200 shadow-2xs">
                                        <Building className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[12.5px] font-semibold text-[#172B2A] group-hover:text-[#073B35]">My Posted Listings</p>
                                        <p className="text-[10.5px] text-[#64748B] font-normal">Properties, spaces & stats</p>
                                    </div>
                                </span>
                                <ChevronRight className="size-3.5 text-[#64748B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                            </Link>

                            <Link href="/saved" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#172B2A] hover:bg-[#F0F5F3] hover:text-[#073B35] transition-all duration-150">
                                <span className="flex items-center gap-2.5">
                                    <div className="size-8 rounded-lg bg-[#F0F5F3] text-[#073B35] group-hover:bg-[#073B35] group-hover:text-[#10B981] flex items-center justify-center transition-all duration-200 shadow-2xs">
                                        <Heart className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[12.5px] font-semibold text-[#172B2A] group-hover:text-[#073B35]">Saved Favorites</p>
                                        <p className="text-[10.5px] text-[#64748B] font-normal">Your wishlist collection</p>
                                    </div>
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] text-[10px] font-bold border border-[#10B981]/20">{favoritesCount}</span>
                            </Link>

                            <Link href="/account/settings" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#172B2A] hover:bg-[#F0F5F3] hover:text-[#073B35] transition-all duration-150">
                                <span className="flex items-center gap-2.5">
                                    <div className="size-8 rounded-lg bg-[#F0F5F3] text-[#073B35] group-hover:bg-[#073B35] group-hover:text-[#10B981] flex items-center justify-center transition-all duration-200 shadow-2xs">
                                        <Settings className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[12.5px] font-semibold text-[#172B2A] group-hover:text-[#073B35]">Account Settings</p>
                                        <p className="text-[10.5px] text-[#64748B] font-normal">Security & preferences</p>
                                    </div>
                                </span>
                                <ChevronRight className="size-3.5 text-[#64748B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                            </Link>

                            <Link href="/help" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#172B2A] hover:bg-[#F0F5F3] hover:text-[#073B35] transition-all duration-150">
                                <span className="flex items-center gap-2.5">
                                    <div className="size-8 rounded-lg bg-[#F0F5F3] text-[#073B35] group-hover:bg-[#073B35] group-hover:text-[#10B981] flex items-center justify-center transition-all duration-200 shadow-2xs">
                                        <HelpCircle className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[12.5px] font-semibold text-[#172B2A] group-hover:text-[#073B35]">Help & Support</p>
                                        <p className="text-[10.5px] text-[#64748B] font-normal">24/7 dedicated support</p>
                                    </div>
                                </span>
                                <ChevronRight className="size-3.5 text-[#64748B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                            </Link>
                        </div>

                        {/* Actions Divider */}
                        <div className="pt-2 mt-1 border-t border-[#E2EAE6]/70 space-y-1">
                            {/* Switch to Guest View (Demo Toggle) */}
                            <button
                                type="button"
                                onClick={() => {
                                    onToggleAuth(false);
                                    onClose();
                                }}
                                className="cursor-pointer w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#073B35] hover:bg-[#F0F5F3] transition-colors group"
                            >
                                <span className="flex items-center gap-2.5">
                                    <div className="size-7 rounded-lg bg-[#F0F5F3] text-[#64748B] group-hover:text-[#073B35] flex items-center justify-center transition-colors">
                                        <SlidersHorizontal className="size-3.5" />
                                    </div>
                                    <span>Switch to Guest View</span>
                                </span>
                                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">Demo</span>
                            </button>

                            {/* Sign Out Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    onToggleAuth(false);
                                    onClose();
                                }}
                                className="cursor-pointer w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-[#DC2626] hover:bg-rose-50 transition-colors group"
                            >
                                <div className="size-7 rounded-lg bg-rose-50 text-[#DC2626] group-hover:bg-rose-100 flex items-center justify-center transition-colors">
                                    <LogOut className="size-3.5" />
                                </div>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
