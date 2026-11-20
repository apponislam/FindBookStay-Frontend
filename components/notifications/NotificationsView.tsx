"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Bell,
    Check,
    Home,
    Hotel,
    Trophy,
    Building2,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    X,
} from "@/components/Icons";
import { INITIAL_NOTIFICATIONS, NotificationItem } from "@/constants/notificationsData";

type NotifFilter = "all" | "unread" | "sports" | "rent" | "book" | "buy" | "system";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    sports: Trophy,
    rent: Home,
    book: Hotel,
    buy: Building2,
    system: Sparkles,
};

export const NotificationsView = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
    const [activeFilter, setActiveFilter] = useState<NotifFilter>("all");

    const unreadCount = notifications.filter((n) => n.unread).length;

    const handleMarkAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const handleToggleRead = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
        );
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const filteredNotifications = notifications.filter((item) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "unread") return item.unread;
        return item.category === activeFilter;
    });

    return (
        <div className="min-h-screen bg-background text-foreground py-10 sm:py-14">
            <div className="container mx-auto px-4">
                {/* 1. Header & Navigation */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors mb-3 group cursor-pointer"
                    >
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2.5">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                                    Notifications
                                </h1>
                                {unreadCount > 0 && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-accent/15 text-accent">
                                        {unreadCount} unread
                                    </span>
                                )}
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Real-time booking alerts, lease approvals, price drops, and verified listing updates.
                            </p>
                        </div>

                        {notifications.length > 0 && (
                            <div className="flex items-center gap-2 self-start sm:self-auto">
                                {unreadCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleMarkAllAsRead}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-secondary hover:bg-border text-foreground text-xs font-bold transition-colors cursor-pointer"
                                    >
                                        <Check className="size-3.5 text-accent" />
                                        <span>Mark all read</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleClearAll}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-bold transition-colors cursor-pointer"
                                >
                                    <X className="size-3.5" />
                                    <span>Clear all</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                    {[
                        { id: "all", label: `All (${notifications.length})` },
                        { id: "unread", label: `Unread (${unreadCount})` },
                        { id: "sports", label: "Sports & Turfs" },
                        { id: "rent", label: "Rentals" },
                        { id: "book", label: "Hotels & Stays" },
                        { id: "buy", label: "Property Sales" },
                        { id: "system", label: "System" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveFilter(tab.id as NotifFilter)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                activeFilter === tab.id
                                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                                    : "bg-white dark:bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 3. Notifications Feed List */}
                <div className="space-y-3 max-w-4xl">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-12 sm:p-16 rounded-3xl border border-border bg-white dark:bg-card text-center space-y-3">
                            <div className="size-14 rounded-2xl bg-surface-secondary text-muted-foreground flex items-center justify-center mx-auto">
                                <Bell className="size-7" />
                            </div>
                            <h3 className="text-base font-bold text-foreground">
                                {activeFilter === "unread"
                                    ? "All caught up!"
                                    : "No notifications found"}
                            </h3>
                            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                                {activeFilter === "unread"
                                    ? "You have zero unread notifications right now. Check back later for new updates."
                                    : "There are no notifications in this category. We will alert you whenever activities happen."}
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:bg-primary-hover transition-colors mt-2 cursor-pointer"
                            >
                                <span>Explore Marketplace</span>
                                <ArrowRight className="size-3.5" />
                            </Link>
                        </div>
                    ) : (
                        filteredNotifications.map((notif) => {
                            const IconComponent = CATEGORY_ICONS[notif.category] || Bell;
                            return (
                                <div
                                    key={notif.id}
                                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                                        notif.unread
                                            ? "bg-white dark:bg-card border-accent/40 shadow-xs"
                                            : "bg-white/80 dark:bg-card/70 border-border hover:border-border/80"
                                    }`}
                                >
                                    <div className="flex items-start gap-3.5 min-w-0">
                                        <div
                                            className={`size-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                                                notif.category === "sports"
                                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                    : notif.category === "rent"
                                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                    : notif.category === "book"
                                                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                                                    : "bg-primary/10 text-primary"
                                            }`}
                                        >
                                            <IconComponent className="size-5" />
                                        </div>

                                        <div className="space-y-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h2 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {notif.title}
                                                </h2>
                                                {notif.unread && (
                                                    <span className="size-2 rounded-full bg-accent ring-2 ring-background shrink-0" />
                                                )}
                                                <span className="text-[10px] text-muted-foreground font-medium">
                                                    &bull; {notif.timestamp}
                                                </span>
                                            </div>

                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {notif.message}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action buttons on right */}
                                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                        {notif.actionText && (
                                            <Link
                                                href={notif.href}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-bold transition-all shadow-xs cursor-pointer"
                                            >
                                                <span>{notif.actionText}</span>
                                                <ArrowRight className="size-3" />
                                            </Link>
                                        )}

                                        <button
                                            type="button"
                                            onClick={(e) => handleToggleRead(notif.id, e)}
                                            className="px-2.5 py-1.5 rounded-xl border border-border text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors cursor-pointer"
                                            title={notif.unread ? "Mark as read" : "Mark as unread"}
                                        >
                                            {notif.unread ? "Mark Read" : "Unread"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(e) => handleDelete(notif.id, e)}
                                            className="size-8 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors cursor-pointer"
                                            title="Delete notification"
                                        >
                                            <X className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsView;
