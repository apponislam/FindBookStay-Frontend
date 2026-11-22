"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
    ChevronDown,
    X,
    Plus,
    Heart,
    PhoneCall,
    User,
    ArrowRight,
    Bell,
    CalendarDays,
    Building,
    Settings,
    LogOut,
    Globe,
    Check,
} from "@/components/Icons";
import { getImageUrl } from "@/lib/utils";
import type { CategoryMenu } from "@/constants/routes";
import type { TUser } from "@/redux/features/auth/authSlice";
import { useLocale } from "@/hooks/useLocale";
import { usePathname, useRouter } from "@/i18n/navigation";

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    categories: CategoryMenu[];
    expandedCategory: string | null;
    onToggleCategory: (catId: string) => void;
    isAuthenticated: boolean;
    user?: TUser | null;
    onLogout?: () => void;
    favoritesCount: number;
    unreadNotificationsCount?: number;
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
    favoritesCount,
    unreadNotificationsCount = 0,
}: MobileDrawerProps) => {
    const t = useTranslations("Header.mobile");
    const tUser = useTranslations("Header.userMenu");
    const tMega = useTranslations("Header.megaMenu");
    const { locale } = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    if (!isOpen) return null;

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

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Slide-over sheet */}
            <div
                className="fixed inset-y-0 right-0 w-[88vw] max-w-sm sm:max-w-md bg-white dark:bg-background shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 scrollbar-thin"
                role="dialog"
                aria-label="Navigation Menu"
            >
                {/* Scrollable Main Section */}
                <div className="flex-1 divide-y divide-border/70">
                    {/* 1. Header Bar */}
                    <div className="flex items-center justify-between p-4 bg-background sticky top-0 z-10 border-b border-border">
                        <Link href="/" onClick={onClose} className="cursor-pointer flex items-center gap-2">
                            <Image
                                src="/findbookstay-logo.png"
                                alt="FindBookStay"
                                width={150}
                                height={44}
                                className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
                                priority
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors"
                            aria-label="Close navigation"
                        >
                            <X className="size-5" />
                        </button>
                    </div>

                    {/* Collapsible Language Selection System (No Country Flags/Logos) */}
                    <div className="py-2 px-3 border-b border-border/70">
                        <div className="rounded-xl border border-border/60 bg-surface-secondary/30 overflow-hidden shadow-2xs">
                            <button
                                type="button"
                                onClick={() => setIsLanguageOpen((prev) => !prev)}
                                aria-expanded={isLanguageOpen}
                                className="cursor-pointer w-full flex items-center justify-between p-3 text-xs font-bold text-foreground hover:bg-surface-secondary transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <Globe className="size-4 text-primary shrink-0" />
                                    <span>{tUser("language")}</span>
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-primary/10 text-primary border border-primary/20">
                                        {locale === "bn" ? "বাংলা" : "English"}
                                    </span>
                                    <ChevronDown
                                        className={`size-3.5 text-muted-foreground transition-transform duration-200 ${
                                            isLanguageOpen ? "rotate-180 text-primary" : ""
                                        }`}
                                    />
                                </div>
                            </button>

                            {/* Collapsible Body */}
                            {isLanguageOpen && (
                                <div className="p-2 space-y-1 bg-surface-secondary/60 border-t border-border/60 animate-in slide-in-from-top-1 duration-150">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            router.replace(pathname, { locale: "bn" });
                                            onClose();
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer select-none text-left text-xs ${
                                            locale === "bn"
                                                ? "bg-white dark:bg-card border border-primary/30 text-primary shadow-xs font-bold"
                                                : "hover:bg-surface text-foreground border border-transparent font-medium"
                                        }`}
                                    >
                                        <span>বাংলা</span>
                                        {locale === "bn" && <Check className="size-3.5 text-primary stroke3" />}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            router.replace(pathname, { locale: "en" });
                                            onClose();
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer select-none text-left text-xs ${
                                            locale === "en"
                                                ? "bg-white dark:bg-card border border-primary/30 text-primary shadow-xs font-bold"
                                                : "hover:bg-surface text-foreground border border-transparent font-medium"
                                        }`}
                                    >
                                        <span>English</span>
                                        {locale === "en" && <Check className="size-3.5 text-primary stroke3" />}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. Top Profile (Logged In) OR Auth CTA (Logged Out) */}
                    <div className="p-4 bg-surface/50">
                        {isAuthenticated ? (
                            <div className="space-y-3">
                                {/* Profile Card */}
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-secondary border border-border/80">
                                    <div className="relative size-11 shrink-0">
                                        <div className="relative size-full rounded-full bg-linear-to-tr from-primary to-accent text-white flex items-center justify-center text-sm font-bold shadow-2xs overflow-hidden">
                                            {user?.profileImage ? (
                                                <Image
                                                    src={getImageUrl(user.profileImage)}
                                                    alt={displayName}
                                                    fill
                                                    sizes="44px"
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                initials
                                            )}
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-[13.5px] font-bold text-foreground truncate">{displayName}</h4>
                                        {displayEmail && (
                                            <p className="text-[11.5px] text-muted-foreground truncate mt-0.5">{displayEmail}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Quick Action Stat Pills */}
                                <div className="grid grid-cols-3 gap-2">
                                    <Link
                                        href="/saved"
                                        onClick={onClose}
                                        className="cursor-pointer flex flex-col items-center justify-center p-2 rounded-xl bg-background border border-border hover:border-accent/40 text-center transition-colors shadow-2xs"
                                    >
                                        <Heart className="size-4 text-accent mb-0.5" />
                                        <span className="text-[10.5px] font-semibold text-foreground">{t("saved")}</span>
                                        <span className="text-[9.5px] text-accent font-bold">{favoritesCount}</span>
                                    </Link>
                                    <Link
                                        href="/notifications"
                                        onClick={onClose}
                                        className="cursor-pointer flex flex-col items-center justify-center p-2 rounded-xl bg-background border border-border hover:border-accent/40 text-center transition-colors shadow-2xs"
                                    >
                                        <Bell className="size-4 text-primary mb-0.5" />
                                        <span className="text-[10.5px] font-semibold text-foreground">{t("alerts")}</span>
                                        <span className="text-[9.5px] text-primary font-bold">{unreadNotificationsCount} {t("newAlerts")}</span>
                                    </Link>
                                    <Link
                                        href="/my-bookings"
                                        onClick={onClose}
                                        className="cursor-pointer flex flex-col items-center justify-center p-2 rounded-xl bg-background border border-border hover:border-accent/40 text-center transition-colors shadow-2xs"
                                    >
                                        <CalendarDays className="size-4 text-accent mb-0.5" />
                                        <span className="text-[10.5px] font-semibold text-foreground">{t("trips")}</span>
                                        <span className="text-[9.5px] text-muted-foreground">{t("manage")}</span>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                <Link
                                    href="/auth/register"
                                    onClick={onClose}
                                    className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-linear-to-r from-accent to-accent-hover text-white text-xs font-bold shadow-[0_4px_12px_rgba(16,185,129,0.28)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.38)] transition-all"
                                >
                                    <span>{t("createAccount")}</span>
                                    <ArrowRight className="size-3.5" />
                                </Link>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        href="/auth/login"
                                        onClick={onClose}
                                        className="cursor-pointer flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-border bg-background text-foreground text-xs font-semibold hover:bg-surface-secondary hover:border-accent/40 transition-colors shadow-2xs"
                                    >
                                        <User className="size-3.5 text-muted-foreground" />
                                        <span>{t("logIn")}</span>
                                    </Link>
                                    <Link
                                        href="/saved"
                                        onClick={onClose}
                                        className="cursor-pointer flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-border bg-background text-foreground text-xs font-semibold hover:bg-surface-secondary hover:border-accent/40 transition-colors shadow-2xs"
                                    >
                                        <Heart className="size-3.5 text-accent" />
                                        <span>{t("saved")} ({favoritesCount})</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. Primary Marketplace Action */}
                    <div className="p-4">
                        <Link
                            href="/post-listing"
                            onClick={onClose}
                            className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-bold shadow-xs transition-colors"
                        >
                            <Plus className="size-4" />
                            <span>{t("postListingFree")}</span>
                        </Link>
                    </div>

                    {/* 4. Browse Marketplace Pillars Accordion */}
                    <div className="py-2 px-3 space-y-1">
                        <p className="px-3 pt-2 pb-1 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                            {t("browseCategories")}
                        </p>
                        {categories.map((cat) => {
                            const isExpanded = expandedCategory === cat.id;
                            return (
                                <div key={cat.id} className="rounded-xl border border-transparent overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => onToggleCategory(cat.id)}
                                        className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                                            isExpanded
                                                ? "bg-surface-secondary text-primary dark:text-accent font-bold"
                                                : "text-foreground hover:bg-surface-secondary"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">{cat.label}</span>
                                        <ChevronDown
                                            className={`size-4 transition-transform duration-200 ${
                                                isExpanded ? "rotate-180 text-primary dark:text-accent" : "text-muted-foreground"
                                            }`}
                                        />
                                    </button>

                                    {isExpanded && (
                                        <div className="pl-3 pr-2 py-2 space-y-1 bg-surface-secondary/50 rounded-xl animate-in slide-in-from-top-1 duration-150">
                                            {cat.items.map((item) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        onClick={onClose}
                                                        className="cursor-pointer flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-foreground hover:bg-surface-secondary hover:text-accent transition-colors"
                                                    >
                                                        <div className="size-6 rounded-md bg-surface-secondary text-primary flex items-center justify-center shrink-0">
                                                            <ItemIcon className="size-3.5" />
                                                        </div>
                                                        <span className="flex-1 truncate">{item.name}</span>
                                                        {item.badge && (
                                                            <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded-full bg-accent/15 text-accent border border-accent/20">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </Link>
                                                );
                                            })}
                                            <Link
                                                href={cat.href}
                                                onClick={onClose}
                                                className="cursor-pointer block p-2 text-xs font-bold text-accent hover:underline"
                                            >
                                                {tMega("exploreAll")} {cat.label} &rarr;
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* 5. Account Management & Support Links */}
                    <div className="px-4 py-3 space-y-1">
                        <p className="px-1 pt-1 pb-1 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                            {tUser("helpSupport")}
                        </p>
                        {isAuthenticated && (
                            <>
                                <Link
                                    href="/my-listings"
                                    onClick={onClose}
                                    className="cursor-pointer flex items-center gap-2.5 text-xs font-medium text-foreground p-2 rounded-lg hover:bg-surface-secondary transition-colors"
                                >
                                    <Building className="size-4 text-primary" />
                                    <span>{tUser("myListings")}</span>
                                </Link>
                                <Link
                                    href="/account/settings"
                                    onClick={onClose}
                                    className="cursor-pointer flex items-center gap-2.5 text-xs font-medium text-foreground p-2 rounded-lg hover:bg-surface-secondary transition-colors"
                                >
                                    <Settings className="size-4 text-primary" />
                                    <span>{tUser("accountSettings")}</span>
                                </Link>
                            </>
                        )}
                        <Link
                            href="/help"
                            onClick={onClose}
                            className="cursor-pointer flex items-center gap-2.5 text-xs font-medium text-foreground p-2 rounded-lg hover:bg-surface-secondary transition-colors"
                        >
                            <PhoneCall className="size-4 text-muted-foreground" />
                            <span>{t("supportHotline")}</span>
                        </Link>
                    </div>
                </div>

                {/* 6. Bottom Sticky Action Area */}
                {isAuthenticated && (
                    <div className="p-4 border-t border-border bg-surface shrink-0">
                        <button
                            type="button"
                            onClick={() => {
                                if (onLogout) {
                                    onLogout();
                                }
                                onClose();
                            }}
                            className="cursor-pointer w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-xs font-bold text-destructive hover:bg-destructive/20 transition-colors"
                        >
                            <LogOut className="size-4" />
                            <span>{tUser("signOut")}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileDrawer;
