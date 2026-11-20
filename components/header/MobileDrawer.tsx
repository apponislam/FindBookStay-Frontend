"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, X, Plus, Heart, PhoneCall, User, ArrowRight, Bell, CalendarDays } from "@/components/Icons";
import { getImageUrl } from "@/lib/utils";
import type { CategoryMenu } from "@/constants/routes";
import type { TUser } from "@/redux/features/auth/authSlice";

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    categories: CategoryMenu[];
    expandedCategory: string | null;
    onToggleCategory: (catId: string) => void;
    isAuthenticated: boolean;
    user?: TUser | null;
    onLogout?: () => void;
    onToggleAuth: (val: boolean) => void;
    favoritesCount: number;
}

const MobileDrawer = ({
    isOpen,
    onClose,
    categories,
    expandedCategory,
    onToggleCategory,
    isAuthenticated,
    user,
    onLogout,
    onToggleAuth,
    favoritesCount,
}: MobileDrawerProps) => {
    if (!isOpen) return null;

    const initials = user?.name
        ? user.name
              .split(" ")
              .filter(Boolean)
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
        : "AI";

    const displayName = user?.name || "User";
    const displayEmail = user?.email || "user@findbookstay.com";

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop overlay */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in" onClick={onClose} />

            {/* Drawer container */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-white dark:bg-background shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
                {/* Top Drawer Header */}
                <div>
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <Link href="/" onClick={onClose} className="cursor-pointer flex items-center gap-2">
                            <Image src="/findbookstay-logo.png" alt="FindBookStay" width={150} height={44} className="h-8 w-auto object-contain dark:brightness-0 dark:invert" />
                        </Link>
                        <button type="button" onClick={onClose} className="cursor-pointer p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors" aria-label="Close navigation">
                            <X className="size-5" />
                        </button>
                    </div>

                    {/* Mobile Primary Action Button */}
                    <div className="p-4 border-b border-border/70">
                        <Link href="/post-listing" onClick={onClose} className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-semibold shadow-xs transition-colors">
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
                                        className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${isExpanded ? "bg-surface-secondary text-accent" : "text-foreground hover:bg-surface-secondary"}`}
                                    >
                                        <span className="flex items-center gap-2">{cat.label}</span>
                                        <ChevronDown className={`size-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-accent" : "text-muted-foreground"}`} />
                                    </button>

                                    {isExpanded && (
                                        <div className="pl-3 pr-2 py-2 space-y-1 bg-white dark:bg-card rounded-xl animate-in slide-in-from-top-1 duration-150">
                                            {cat.items.map((item) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                    <Link key={item.name} href={item.href} onClick={onClose} className="cursor-pointer flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-foreground hover:bg-surface-secondary hover:text-accent transition-colors">
                                                        <div className="size-6 rounded-md bg-surface-secondary text-primary flex items-center justify-center shrink-0">
                                                            <ItemIcon className="size-3.5" />
                                                        </div>
                                                        <span className="flex-1 truncate">{item.name}</span>
                                                        {item.badge && <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded-full bg-surface-secondary text-accent">{item.badge}</span>}
                                                    </Link>
                                                );
                                            })}
                                            <Link href={cat.href} onClick={onClose} className="cursor-pointer block p-2 text-xs font-semibold text-accent hover:underline">
                                                Explore All {cat.label} &rarr;
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Quick links */}
                    <div className="px-4 py-3 border-t border-border/70 space-y-1.5">
                        <Link href="/saved" onClick={onClose} className="cursor-pointer flex items-center justify-between text-xs font-medium text-foreground p-2 rounded-lg hover:bg-surface-secondary transition-colors">
                            <span className="flex items-center gap-2">
                                <Heart className="size-4 text-accent" /> Saved Favorites
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-secondary text-accent text-[10px] font-bold">{favoritesCount}</span>
                        </Link>
                        <Link href="/notifications" onClick={onClose} className="cursor-pointer flex items-center justify-between text-xs font-medium text-foreground p-2 rounded-lg hover:bg-surface-secondary transition-colors">
                            <span className="flex items-center gap-2">
                                <Bell className="size-4 text-primary" /> Notifications
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">Alerts</span>
                        </Link>
                        <Link href="/my-bookings" onClick={onClose} className="cursor-pointer flex items-center justify-between text-xs font-medium text-foreground p-2 rounded-lg hover:bg-surface-secondary transition-colors">
                            <span className="flex items-center gap-2">
                                <CalendarDays className="size-4 text-accent" /> My Bookings
                            </span>
                        </Link>
                        <Link href="/help" onClick={onClose} className="cursor-pointer flex items-center gap-2 text-xs font-medium text-foreground p-2 rounded-lg hover:bg-surface-secondary transition-colors">
                            <PhoneCall className="size-4 text-muted-foreground" /> 24/7 Support Hotline
                        </Link>
                    </div>
                </div>

                {/* Bottom: Auth Actions in Drawer */}
                <div className="p-4 border-t border-border bg-surface">
                    {isAuthenticated ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="relative size-9 shrink-0">
                                    <div className="relative size-full rounded-full bg-linear-to-tr from-primary to-accent text-white flex items-center justify-center text-xs font-bold uppercase overflow-hidden shadow-2xs">
                                        {user?.profileImage ? (
                                            <Image
                                                src={getImageUrl(user.profileImage)}
                                                alt={displayName}
                                                fill
                                                sizes="36px"
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            initials
                                        )}
                                    </div>
                                    <span
                                        className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-background z-10 ${
                                            user?.isEmailVerified ? "bg-accent" : "bg-amber-400"
                                        }`}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-foreground truncate">{displayName}</p>
                                    <p className="text-[11px] text-muted-foreground truncate">{displayEmail}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <Link href="/account/settings" onClick={onClose} className="cursor-pointer py-1.5 px-3 text-center rounded-lg border border-border bg-background text-xs font-semibold text-foreground hover:bg-surface-secondary">
                                    Settings
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (onLogout) {
                                            onLogout();
                                        } else {
                                            onToggleAuth(false);
                                        }
                                        onClose();
                                    }}
                                    className="cursor-pointer py-1.5 px-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs font-semibold text-destructive hover:bg-destructive/20"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Link
                                href="/auth/register"
                                onClick={onClose}
                                className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-linear-to-r from-accent to-accent-hover text-white text-xs font-bold shadow-[0_4px_12px_rgba(16,185,129,0.25)] hover:shadow transition-all"
                            >
                                <span>Create Free Account</span>
                                <ArrowRight className="size-3.5" />
                            </Link>
                            <Link
                                href="/auth/login"
                                onClick={onClose}
                                className="cursor-pointer w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-border bg-background text-foreground text-xs font-semibold hover:bg-surface-secondary hover:border-accent/40 transition-colors shadow-2xs"
                            >
                                <User className="size-3.5 text-muted-foreground" />
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
