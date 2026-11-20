"use client";

import React from "react";
import Link from "next/link";
import {
    Bell,
    Check,
    Home,
    Hotel,
    Trophy,
    Building2,
    ArrowRight,
    Sparkles,
} from "@/components/Icons";
import { NotificationItem } from "@/constants/notificationsData";

interface NotificationsDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: NotificationItem[];
    onMarkAllAsRead: () => void;
    onNotificationClick: (id: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    sports: Trophy,
    rent: Home,
    book: Hotel,
    buy: Building2,
    system: Sparkles,
};

export const NotificationsDropdown = ({
    isOpen,
    onClose,
    notifications,
    onMarkAllAsRead,
    onNotificationClick,
}: NotificationsDropdownProps) => {
    if (!isOpen) return null;

    const unreadCount = notifications.filter((n) => n.unread).length;

    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 sm:hidden"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className="absolute right-0 top-full mt-2 w-[calc(100vw-24px)] max-w-[360px] sm:w-[380px] sm:max-w-none rounded-3xl bg-white dark:bg-card border border-border shadow-2xl z-50 overflow-hidden origin-top-right animate-in fade-in zoom-in-95 duration-150"
                role="dialog"
                aria-label="Notifications Dropdown"
            >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-surface/50">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-foreground">Notifications</span>
                    {unreadCount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-accent/15 text-accent">
                            {unreadCount} new
                        </span>
                    ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-surface-secondary text-muted-foreground">
                            All read
                        </span>
                    )}
                </div>

                {unreadCount > 0 && (
                    <button
                        type="button"
                        onClick={onMarkAllAsRead}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer"
                    >
                        <Check className="size-3" />
                        <span>Mark all read</span>
                    </button>
                )}
            </div>

            {/* Notifications Feed */}
            <div className="max-h-[380px] overflow-y-auto divide-y divide-border/60 scrollbar-thin">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center space-y-2">
                        <div className="size-10 rounded-full bg-surface-secondary text-muted-foreground flex items-center justify-center mx-auto">
                            <Bell className="size-5" />
                        </div>
                        <p className="text-xs font-bold text-foreground">No notifications yet</p>
                        <p className="text-[11px] text-muted-foreground">
                            When verified bookings or lease updates occur, they will show up here.
                        </p>
                    </div>
                ) : (
                    notifications.slice(0, 4).map((notif) => {
                        const IconComponent = CATEGORY_ICONS[notif.category] || Bell;
                        return (
                            <Link
                                key={notif.id}
                                href={notif.href}
                                onClick={() => {
                                    onNotificationClick(notif.id);
                                    onClose();
                                }}
                                className={`p-3.5 flex items-start gap-3 transition-colors hover:bg-surface-secondary/70 group cursor-pointer ${
                                    notif.unread ? "bg-accent/5 dark:bg-accent/10" : ""
                                }`}
                            >
                                <div
                                    className={`size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                                        notif.category === "sports"
                                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                            : notif.category === "rent"
                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                            : notif.category === "book"
                                            ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                                            : "bg-primary/10 text-primary"
                                    }`}
                                >
                                    <IconComponent className="size-4" />
                                </div>

                                <div className="min-w-0 flex-1 space-y-0.5">
                                    <div className="flex items-center justify-between gap-1">
                                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                            {notif.title}
                                        </p>
                                        <span className="text-[10px] text-muted-foreground shrink-0 font-medium">
                                            {notif.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                                        {notif.message}
                                    </p>
                                </div>

                                {notif.unread && (
                                    <span className="size-2 rounded-full bg-accent shrink-0 mt-1.5 ring-2 ring-background" />
                                )}
                            </Link>
                        );
                    })
                )}
            </div>

            {/* Bottom Footer */}
            <div className="p-3 border-t border-border bg-surface/50 text-center">
                <Link
                    href="/notifications"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-primary hover:text-primary-hover transition-colors w-full py-1 cursor-pointer"
                >
                    <span>View all notifications</span>
                    <ArrowRight className="size-3.5" />
                </Link>
            </div>
        </div>
        </>
    );
};

export default NotificationsDropdown;
