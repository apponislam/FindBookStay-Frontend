"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, X, Plus, Heart, PhoneCall, User, ArrowRight } from "@/components/Icons";
import type { CategoryMenu } from "@/constants/routes";

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    categories: CategoryMenu[];
    expandedCategory: string | null;
    onToggleCategory: (catId: string) => void;
    isAuthenticated: boolean;
    onToggleAuth: (val: boolean) => void;
    favoritesCount: number;
}

const MobileDrawer = ({ isOpen, onClose, categories, expandedCategory, onToggleCategory, isAuthenticated, onToggleAuth, favoritesCount }: MobileDrawerProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop overlay */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in" onClick={onClose} />

            {/* Drawer container */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
                {/* Top Drawer Header */}
                <div>
                    <div className="flex items-center justify-between p-4 border-b border-[#E2EAE6]">
                        <Link href="/" onClick={onClose} className="cursor-pointer flex items-center gap-2">
                            <Image src="/findbookstay-logo.png" alt="FindBookStay" width={150} height={44} className="h-8 w-auto object-contain" />
                        </Link>
                        <button type="button" onClick={onClose} className="cursor-pointer p-2 rounded-full text-[#64748B] hover:text-[#172B2A] hover:bg-[#F8FAF9] transition-colors" aria-label="Close navigation">
                            <X className="size-5" />
                        </button>
                    </div>

                    {/* Mobile Primary Action Button */}
                    <div className="p-4 border-b border-[#E2EAE6]/70">
                        <Link href="/post-listing" onClick={onClose} className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#073B35] hover:bg-[#052F2A] text-white text-xs font-semibold shadow-xs transition-colors">
                            <Plus className="size-4" />
                            Post Your Listing For Free
                        </Link>
                    </div>

                    {/* Mobile Category Accordions */}
                    <div className="py-2 px-3 space-y-1">
                        {categories.map((cat) => {
                            const isExpanded = expandedCategory === cat.id;
                            return (
                                <div key={cat.id} className="rounded-xl border border-transparent overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => onToggleCategory(cat.id)}
                                        className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${isExpanded ? "bg-[#F0F5F3] text-[#10B981]" : "text-[#172B2A] hover:bg-[#F8FAF9]"}`}
                                    >
                                        <span className="flex items-center gap-2">{cat.label}</span>
                                        <ChevronDown className={`size-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#10B981]" : "text-[#64748B]"}`} />
                                    </button>

                                    {isExpanded && (
                                        <div className="pl-3 pr-2 py-2 space-y-1 bg-white animate-in slide-in-from-top-1 duration-150">
                                            {cat.items.map((item) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                    <Link key={item.name} href={item.href} onClick={onClose} className="cursor-pointer flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-[#172B2A] hover:bg-[#F8FAF9] hover:text-[#10B981] transition-colors">
                                                        <div className="size-6 rounded-md bg-[#F0F5F3] text-[#073B35] flex items-center justify-center shrink-0">
                                                            <ItemIcon className="size-3.5" />
                                                        </div>
                                                        <span className="flex-1 truncate">{item.name}</span>
                                                        {item.badge && <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded-full bg-[#F0F5F3] text-[#10B981]">{item.badge}</span>}
                                                    </Link>
                                                );
                                            })}
                                            <Link href={cat.href} onClick={onClose} className="cursor-pointer block p-2 text-xs font-semibold text-[#10B981] hover:underline">
                                                Explore All {cat.label} &rarr;
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Quick links */}
                    <div className="px-4 py-3 border-t border-[#E2EAE6]/70 space-y-2">
                        <Link href="/saved" onClick={onClose} className="cursor-pointer flex items-center justify-between text-xs font-medium text-[#172B2A] p-2 rounded-lg hover:bg-[#F8FAF9]">
                            <span className="flex items-center gap-2">
                                <Heart className="size-4 text-[#10B981]" /> Saved Favorites
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#F0F5F3] text-[#10B981] text-[10px] font-bold">{favoritesCount}</span>
                        </Link>
                        <Link href="/help" onClick={onClose} className="cursor-pointer flex items-center gap-2 text-xs font-medium text-[#172B2A] p-2 rounded-lg hover:bg-[#F8FAF9]">
                            <PhoneCall className="size-4 text-[#10B981]" /> 24/7 Support Hotline
                        </Link>
                    </div>
                </div>

                {/* Bottom: Auth Actions in Drawer */}
                <div className="p-4 border-t border-[#E2EAE6] bg-[#F8FAF9]">
                    {isAuthenticated ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-linear-to-tr from-[#073B35] to-[#10B981] text-white flex items-center justify-center text-xs font-bold uppercase">AI</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-[#172B2A] truncate">Appon Islam</p>
                                    <p className="text-[11px] text-[#64748B] truncate">appon@findbookstay.com</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <Link href="/account/settings" onClick={onClose} className="cursor-pointer py-1.5 px-3 text-center rounded-lg border border-[#E2EAE6] bg-white text-xs font-semibold text-[#172B2A] hover:bg-slate-50">
                                    Settings
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onToggleAuth(false);
                                        onClose();
                                    }}
                                    className="cursor-pointer py-1.5 px-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Link
                                href="/signup"
                                onClick={onClose}
                                className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-linear-to-r from-[#10B981] to-[#059669] text-white text-xs font-bold shadow-[0_4px_12px_rgba(16,185,129,0.25)] hover:shadow transition-all"
                            >
                                <span>Create Free Account</span>
                                <ArrowRight className="size-3.5" />
                            </Link>
                            <Link
                                href="/login"
                                onClick={onClose}
                                className="cursor-pointer w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-[#E2EAE6] bg-white text-[#172B2A] text-xs font-semibold hover:bg-[#F0F5F3] hover:border-[#10B981]/40 transition-colors shadow-2xs"
                            >
                                <User className="size-3.5 text-[#64748B]" />
                                <span>Log In</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileDrawer;
