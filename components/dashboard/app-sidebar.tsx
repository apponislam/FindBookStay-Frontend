"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Activity,
    BarChart3,
    Building,
    Calendar,
    DollarSign,
    ExternalLink,
    Home,
    Hotel,
    LogOut,
    Settings,
    ShieldCheck,
    Sparkles,
    Star,
    Users,
} from "@/components/Icons";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";

interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeVariant?: "default" | "success" | "warning" | "alert" | "info";
}

const ADMIN_MAIN: NavItem[] = [
    {
        title: "Overview & KPIs",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Analytics & Trends",
        url: "/dashboard/analytics",
        icon: BarChart3,
    },
];

const ADMIN_INVENTORY: NavItem[] = [
    {
        title: "Rental Properties",
        url: "/dashboard/rentals",
        icon: Building,
        badge: "8 Review",
        badgeVariant: "warning",
    },
    {
        title: "Stays & Resorts",
        url: "/dashboard/stays",
        icon: Hotel,
        badge: "142 Live",
        badgeVariant: "success",
    },
    {
        title: "Sports Venues & Turfs",
        url: "/dashboard/sports",
        icon: Activity,
        badge: "24 Venues",
        badgeVariant: "default",
    },
    {
        title: "Properties for Sale",
        url: "/dashboard/properties",
        icon: Sparkles,
        badge: "3 New Deeds",
        badgeVariant: "info",
    },
];

const ADMIN_OPERATIONS: NavItem[] = [
    {
        title: "All Reservations",
        url: "/dashboard/bookings",
        icon: Calendar,
        badge: "5 Today",
        badgeVariant: "success",
    },
    {
        title: "Revenue & Escrow",
        url: "/dashboard/finance",
        icon: DollarSign,
    },
    {
        title: "Users & Host Accounts",
        url: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Ratings & Moderation",
        url: "/dashboard/reviews",
        icon: Star,
        badge: "1 Dispute",
        badgeVariant: "alert",
    },
];

const ADMIN_SYSTEM: NavItem[] = [
    {
        title: "Platform Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
    {
        title: "Admin Permissions",
        url: "/dashboard/admins",
        icon: ShieldCheck,
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    const getBadgeClass = (variant?: string) => {
        switch (variant) {
            case "warning":
                return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30";
            case "success":
                return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30";
            case "alert":
                return "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30";
            case "info":
                return "bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/30";
            default:
                return "bg-surface-secondary text-muted-foreground border border-border";
        }
    };

    return (
        <Sidebar className="w-64 border-r border-sidebar-border bg-sidebar" {...props}>
            {/* Header: Admin Brand Identity & Live Site Button */}
            <SidebarHeader className="border-b border-sidebar-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold text-lg shadow-sm shrink-0">
                            F
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-sm text-sidebar-foreground tracking-tight leading-tight truncate">
                                FindBookStay
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                                Admin Console
                            </span>
                        </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20 shrink-0">
                        Superadmin
                    </span>
                </div>

                {/* Quick Link to Public Web Portal */}
                <Link
                    href="/"
                    target="_blank"
                    className="w-full px-3 py-1.5 rounded-xl bg-sidebar-accent/60 hover:bg-sidebar-accent text-sidebar-foreground text-xs font-semibold flex items-center justify-between border border-sidebar-border/60 transition-colors group cursor-pointer"
                >
                    <span className="flex items-center gap-2 text-[11px] text-muted-foreground group-hover:text-sidebar-foreground">
                        <span>Live Public Site</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent className="px-3 py-3 space-y-3 overflow-y-auto scrollbar-thin">
                {/* 1. Overview */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest px-2 mb-1">
                        Executive Overview
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {ADMIN_MAIN.map((item) => {
                                const isActive = pathname === item.url;
                                const IconComp = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            render={<Link href={item.url} />}
                                            className={`px-3 py-2 text-xs font-medium w-full flex items-center gap-2.5 rounded-xl transition-all ${
                                                isActive
                                                    ? "bg-primary text-white font-bold shadow-xs hover:bg-primary-hover"
                                                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                            }`}
                                        >
                                            <IconComp
                                                className={`w-4 h-4 shrink-0 ${
                                                    isActive ? "text-white" : "text-muted-foreground"
                                                }`}
                                            />
                                            <span className="flex-1 truncate">{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* 2. Listings & Pillars Inventory */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest px-2 mb-1">
                        Listings Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {ADMIN_INVENTORY.map((item) => {
                                const isActive = pathname === item.url;
                                const IconComp = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            render={<Link href={item.url} />}
                                            className={`px-3 py-2 text-xs font-medium w-full flex items-center gap-2.5 rounded-xl transition-all ${
                                                isActive
                                                    ? "bg-primary text-white font-bold shadow-xs hover:bg-primary-hover"
                                                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                            }`}
                                        >
                                            <IconComp
                                                className={`w-4 h-4 shrink-0 ${
                                                    isActive ? "text-white" : "text-primary"
                                                }`}
                                            />
                                            <span className="flex-1 truncate">{item.title}</span>
                                            {item.badge && (
                                                <span
                                                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                                                        isActive
                                                            ? "bg-white/20 text-white"
                                                            : getBadgeClass(item.badgeVariant)
                                                    }`}
                                                >
                                                    {item.badge}
                                                </span>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* 3. Operations & Financials */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest px-2 mb-1">
                        Operations & Finance
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {ADMIN_OPERATIONS.map((item) => {
                                const isActive = pathname === item.url;
                                const IconComp = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            render={<Link href={item.url} />}
                                            className={`px-3 py-2 text-xs font-medium w-full flex items-center gap-2.5 rounded-xl transition-all ${
                                                isActive
                                                    ? "bg-primary text-white font-bold shadow-xs hover:bg-primary-hover"
                                                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                            }`}
                                        >
                                            <IconComp
                                                className={`w-4 h-4 shrink-0 ${
                                                    isActive ? "text-white" : "text-muted-foreground"
                                                }`}
                                            />
                                            <span className="flex-1 truncate">{item.title}</span>
                                            {item.badge && (
                                                <span
                                                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                                                        isActive
                                                            ? "bg-white/20 text-white"
                                                            : getBadgeClass(item.badgeVariant)
                                                    }`}
                                                >
                                                    {item.badge}
                                                </span>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* 4. Administration Controls */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest px-2 mb-1">
                        System & Security
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {ADMIN_SYSTEM.map((item) => {
                                const isActive = pathname === item.url;
                                const IconComp = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            render={<Link href={item.url} />}
                                            className={`px-3 py-2 text-xs font-medium w-full flex items-center gap-2.5 rounded-xl transition-all ${
                                                isActive
                                                    ? "bg-primary text-white font-bold shadow-xs hover:bg-primary-hover"
                                                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                            }`}
                                        >
                                            <IconComp
                                                className={`w-4 h-4 shrink-0 ${
                                                    isActive ? "text-white" : "text-muted-foreground"
                                                }`}
                                            />
                                            <span className="flex-1 truncate">{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer: Admin Operator Identity */}
            <SidebarFooter className="border-t border-sidebar-border p-3">
                <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-sidebar-accent/50 border border-sidebar-border/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative shrink-0">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs">
                                AD
                            </div>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 border-2 border-sidebar" />
                        </div>
                        <div className="min-w-0">
                            <div className="font-bold text-xs text-sidebar-foreground truncate">
                                Admin Console
                            </div>
                            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                                Super Administrator
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <Link
                            href="/dashboard/settings"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                            title="Admin Settings"
                        >
                            <Settings className="w-4 h-4" />
                        </Link>
                        <button
                            type="button"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-sidebar-accent transition-colors cursor-pointer"
                            title="Sign Out Admin"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;
