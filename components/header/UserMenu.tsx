"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronRight, User, Heart, Settings, LogOut, HelpCircle, CalendarDays, Building, ArrowRight, X, Globe } from "@/components/Icons";
import { getImageUrl } from "@/lib/utils";
import type { TUser } from "@/redux/features/auth/authSlice";
import { LanguageSwitch } from "./LanguageSwitch";

const TITLE_PREFIXES = new Set(["md", "mohammad", "mohammed", "muhammad", "muhammed", "mst", "most", "dr", "mr", "mrs", "ms", "prof", "adv", "sheikh", "syed"]);

/**
 * Extracts a friendly short display name for the header.
 * - If the name starts with a title/honorific (e.g. "Md.", "Mohammad", "Dr."),
 *   keeps both the title and the given name: "Md. Appon Islam" -> "Md. Appon"
 * - Otherwise returns the single given first name: "Appon Islam" -> "Appon"
 */
function getHeaderShortName(fullName?: string): string {
    if (!fullName) return "Account";
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "Account";
    if (parts.length === 1) return parts[0];

    const firstWordNormalized = parts[0].toLowerCase().replace(/\.+$/, "");
    if (TITLE_PREFIXES.has(firstWordNormalized) && parts.length > 1) {
        return `${parts[0]} ${parts[1]}`;
    }

    return parts[0];
}

interface UserMenuProps {
    isAuthenticated: boolean;
    user?: TUser | null;
    onLogout?: () => void;
    favoritesCount: number;
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

const UserMenu = ({ isAuthenticated, user, onLogout, favoritesCount, isOpen, onToggle, onClose }: UserMenuProps) => {
    const t = useTranslations("Header.userMenu");

    // Compute initials from user name or fallback
    const initials = user?.name
        ? user.name
              .split(" ")
              .filter(Boolean)
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
        : user?.email
          ? user.email[0].toUpperCase()
          : "U";

    const displayName = user?.name || "User";
    const displayEmail = user?.email || "";
    const shortName = getHeaderShortName(user?.name);

    // -------------------------------------------------------------
    // GUEST VIEW (Default Logged Out)
    // -------------------------------------------------------------
    if (!isAuthenticated) {
        return (
            <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* Modern Tactile Log In Button */}
                <Link
                    href="/auth/login"
                    className="group cursor-pointer inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-foreground hover:text-primary bg-background hover:bg-surface-secondary border border-border hover:border-accent/50 shadow-2xs hover:shadow-xs transition-all duration-200"
                >
                    <User className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>{t("logIn")}</span>
                </Link>

                {/* High-Impact Emerald Gradient Sign Up Button */}
                <Link
                    href="/auth/register"
                    className="group cursor-pointer relative inline-flex items-center gap-1.5 px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-linear-to-r from-accent to-accent-hover shadow-[0_4px_12px_rgba(16,185,129,0.28)] hover:shadow-[0_6px_18px_rgba(16,185,129,0.38)] transition-all duration-250 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <span>{t("signUp")}</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
            </div>
        );
    }

    // -------------------------------------------------------------
    // AUTHENTICATED VIEW (Logged In Profile & Dropdown)
    // -------------------------------------------------------------
    return (
        <div className="relative">
            {/* User Pill Trigger Button */}
            <button type="button" onClick={onToggle} className={`cursor-pointer flex items-center gap-1.5 sm:gap-2 p-0.5 sm:p-1 pl-1 sm:pl-1.5 pr-1.5 sm:pr-2.5 rounded-full border transition-all duration-200 ${isOpen ? "border-accent bg-surface-secondary shadow-xs" : "border-border hover:border-accent/40 hover:bg-surface"}`} aria-expanded={isOpen} aria-label="User profile menu">
                <div className="relative size-6.5 sm:size-7 shrink-0">
                    <div className="relative size-full rounded-full bg-linear-to-tr from-primary to-accent text-white flex items-center justify-center text-[10.5px] sm:text-xs font-bold uppercase shadow-2xs overflow-hidden">{user?.profileImage ? <Image src={getImageUrl(user.profileImage)} alt={displayName} fill sizes="28px" className="rounded-full object-cover" /> : initials}</div>
                </div>
                <span className="hidden xl:inline-block text-[13px] font-semibold text-foreground max-w-36 truncate">{shortName}</span>
                <ChevronDown className={`size-3 sm:size-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`} />
            </button>

            {/* Profile Dropdown with rotating glowing border beam */}
            {isOpen && (
                <>
                    {/* Mobile Backdrop to tap outside and dismiss cleanly */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 sm:hidden animate-in fade-in duration-200" onClick={onClose} aria-hidden="true" />

                    <div className="fixed inset-x-3 top-16 max-h-[85vh] z-50 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 sm:max-h-none rounded-2xl p-[1.5px] overflow-hidden shadow-2xl bg-border origin-top-right transition-all duration-300 ease-out animate-in fade-in zoom-in-95 slide-in-from-top-1">
                        {/* Inline keyframe definition to guarantee instant execution */}
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

                        {/* 1. Neon Bloom Layer */}
                        <div
                            className="pointer-events-none absolute left-1/2 top-1/2 blur-xs opacity-90"
                            style={{
                                width: 600,
                                height: 600,
                                marginLeft: -300,
                                marginTop: -300,
                                background: "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #073B35 280deg, #10B981 320deg, #34D399 350deg, transparent 360deg)",
                                animation: "border-beam-spin 3.5s linear infinite",
                                transformOrigin: "center center",
                                willChange: "transform",
                            }}
                        />

                        {/* 2. Sharp Light Beam Layer */}
                        <div
                            className="pointer-events-none absolute left-1/2 top-1/2"
                            style={{
                                width: 600,
                                height: 600,
                                marginLeft: -300,
                                marginTop: -300,
                                background: "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #073B35 280deg, #10B981 320deg, #34D399 350deg, transparent 360deg)",
                                animation: "border-beam-spin 3.5s linear infinite",
                                transformOrigin: "center center",
                                willChange: "transform",
                            }}
                        />

                        {/* 3. Card Inner Content */}
                        <div className="relative z-10 bg-white dark:bg-card rounded-[15px] p-3 ring-1 ring-black/5 dark:ring-white/10 max-h-[82vh] sm:max-h-none overflow-y-auto scrollbar-thin">
                            {/* Profile Header Card */}
                            <div className="p-3 mb-2 rounded-xl bg-surface-secondary border border-border/70 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="relative size-11 shrink-0">
                                        <div className="relative size-full rounded-full bg-linear-to-tr from-primary to-accent text-white flex items-center justify-center text-sm font-bold shadow-xs overflow-hidden">
                                            {user?.profileImage ? (
                                                <Image src={getImageUrl(user.profileImage)} alt={displayName} fill sizes="44px" className="rounded-full object-cover" />
                                            ) : (
                                                initials
                                            )}
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-[13.5px] font-bold text-foreground truncate">{displayName}</h4>
                                        {displayEmail && <p className="text-[11.5px] text-muted-foreground truncate mt-0.5">{displayEmail}</p>}
                                    </div>
                                </div>
                                {/* Mobile Close Button */}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-background/80 sm:hidden cursor-pointer shrink-0"
                                    aria-label="Close profile menu"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>

                            {/* Language Switch inside Menu */}
                            <div className="p-2 mb-2 rounded-xl bg-surface-secondary/70 border border-border/70 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                                    <Globe className="size-3.5 text-primary" />
                                    <span>{t("language")}</span>
                                </div>
                                <LanguageSwitch variant="pills" onLocaleChange={onClose} />
                            </div>

                            {/* Navigation Links Grid */}
                            <div className="space-y-0.5 py-1">
                                <Link href="/my-bookings" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-foreground hover:bg-surface-secondary hover:text-primary transition-all duration-150">
                                    <span className="flex items-center gap-2.5">
                                        <div className="size-8 rounded-lg bg-surface-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200 shadow-2xs">
                                            <CalendarDays className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-[12.5px] font-semibold text-foreground group-hover:text-primary">{t("myBookings")}</p>
                                            <p className="text-[10.5px] text-muted-foreground font-normal">{t("myBookingsDesc")}</p>
                                        </div>
                                    </span>
                                    <ChevronRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                                </Link>

                                <Link href="/my-listings" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-foreground hover:bg-surface-secondary hover:text-primary transition-all duration-150">
                                    <span className="flex items-center gap-2.5">
                                        <div className="size-8 rounded-lg bg-surface-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200 shadow-2xs">
                                            <Building className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-[12.5px] font-semibold text-foreground group-hover:text-primary">{t("myListings")}</p>
                                            <p className="text-[10.5px] text-muted-foreground font-normal">{t("myListingsDesc")}</p>
                                        </div>
                                    </span>
                                    <ChevronRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                                </Link>

                                <Link href="/saved" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-foreground hover:bg-surface-secondary hover:text-primary transition-all duration-150">
                                    <span className="flex items-center gap-2.5">
                                        <div className="size-8 rounded-lg bg-surface-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200 shadow-2xs">
                                            <Heart className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-[12.5px] font-semibold text-foreground group-hover:text-primary">{t("savedFavorites")}</p>
                                            <p className="text-[10.5px] text-muted-foreground font-normal">{t("savedFavoritesDesc")}</p>
                                        </div>
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-bold border border-accent/20">{favoritesCount}</span>
                                </Link>

                                <Link href="/account/settings" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-foreground hover:bg-surface-secondary hover:text-primary transition-all duration-150">
                                    <span className="flex items-center gap-2.5">
                                        <div className="size-8 rounded-lg bg-surface-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200 shadow-2xs">
                                            <Settings className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-[12.5px] font-semibold text-foreground group-hover:text-primary">{t("accountSettings")}</p>
                                            <p className="text-[10.5px] text-muted-foreground font-normal">{t("accountSettingsDesc")}</p>
                                        </div>
                                    </span>
                                    <ChevronRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                                </Link>

                                <Link href="/help" onClick={onClose} className="cursor-pointer group flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-foreground hover:bg-surface-secondary hover:text-primary transition-all duration-150">
                                    <span className="flex items-center gap-2.5">
                                        <div className="size-8 rounded-lg bg-surface-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200 shadow-2xs">
                                            <HelpCircle className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-[12.5px] font-semibold text-foreground group-hover:text-primary">{t("helpSupport")}</p>
                                            <p className="text-[10.5px] text-muted-foreground font-normal">{t("helpSupportDesc")}</p>
                                        </div>
                                    </span>
                                    <ChevronRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                                </Link>
                            </div>

                            {/* Actions Divider */}
                            <div className="pt-2 mt-1 border-t border-border/70 space-y-1">
                                {/* Sign Out Button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (onLogout) {
                                            onLogout();
                                        }
                                        onClose();
                                    }}
                                    className="cursor-pointer w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors group"
                                >
                                    <div className="size-7 rounded-lg bg-destructive/10 text-destructive group-hover:bg-destructive/20 flex items-center justify-center transition-colors">
                                        <LogOut className="size-3.5" />
                                    </div>
                                    <span>{t("signOut")}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserMenu;
