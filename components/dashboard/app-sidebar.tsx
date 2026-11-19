"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, Building, Calendar, DollarSign, Home, Hotel, LogOut, Settings, ShieldCheck, Sparkles, Star, Users } from "@/components/Icons";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";

interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
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
    },
    {
        title: "Stays & Resorts",
        url: "/dashboard/stays",
        icon: Hotel,
    },
    {
        title: "Sports Venues & Turfs",
        url: "/dashboard/sports",
        icon: Activity,
    },
    {
        title: "Properties for Sale",
        url: "/dashboard/properties",
        icon: Sparkles,
    },
];

const ADMIN_OPERATIONS: NavItem[] = [
    {
        title: "All Reservations",
        url: "/dashboard/bookings",
        icon: Calendar,
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
    },
];

const ADMIN_SYSTEM: NavItem[] = [
    {
        title: "Platform Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
    {
        title: "Roles & Permissions",
        url: "/dashboard/admins",
        icon: ShieldCheck,
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar className="w-64 border-r border-sidebar-border bg-sidebar" {...props}>
            {/* Header: Brand Identity */}
            <SidebarHeader className="border-b border-sidebar-border p-3.5">
                <Link href="/dashboard" className="flex items-center gap-2.5 group cursor-pointer">
                    <div className="relative size-10 rounded-2xl bg-linear-to-br from-primary/15 via-surface-secondary to-primary/5 p-1 border border-primary/20 shadow-xs shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                        <Image
                            src="/icon.png"
                            alt="FindBookStay"
                            width={32}
                            height={32}
                            className="size-7.5 rounded-xl object-contain drop-shadow-xs"
                            priority
                        />
                    </div>
                    <span className="font-extrabold text-base text-sidebar-foreground tracking-tight leading-tight truncate">
                        FindBook<span className="text-primary font-black">Stay</span>
                    </span>
                </Link>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent className="px-3 py-3 space-y-3 overflow-y-auto scrollbar-thin">
                {/* 1. Overview */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest px-2 mb-1">Executive Overview</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {ADMIN_MAIN.map((item) => {
                                const isActive = pathname === item.url;
                                const IconComp = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton isActive={isActive} render={<Link href={item.url} />} className={`px-3 py-2 text-xs font-medium w-full flex items-center gap-2.5 rounded-xl transition-all ${isActive ? "bg-primary text-white font-bold shadow-xs hover:bg-primary-hover" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}>
                                            <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-muted-foreground"}`} />
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
                    <SidebarGroupLabel className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest px-2 mb-1">Listings Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {ADMIN_INVENTORY.map((item) => {
                                const isActive = pathname === item.url;
                                const IconComp = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton isActive={isActive} render={<Link href={item.url} />} className={`px-3 py-2 text-xs font-medium w-full flex items-center gap-2.5 rounded-xl transition-all ${isActive ? "bg-primary text-white font-bold shadow-xs hover:bg-primary-hover" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}>
                                            <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-primary"}`} />
                                            <span className="flex-1 truncate">{item.title}</span>
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
                    <SidebarGroupLabel className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest px-2 mb-1">Operations & Finance</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {ADMIN_OPERATIONS.map((item) => {
                                const isActive = pathname === item.url;
                                const IconComp = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton isActive={isActive} render={<Link href={item.url} />} className={`px-3 py-2 text-xs font-medium w-full flex items-center gap-2.5 rounded-xl transition-all ${isActive ? "bg-primary text-white font-bold shadow-xs hover:bg-primary-hover" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}>
                                            <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                                            <span className="flex-1 truncate">{item.title}</span>
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
                    <SidebarGroupLabel className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest px-2 mb-1">System & Security</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {ADMIN_SYSTEM.map((item) => {
                                const isActive = pathname === item.url;
                                const IconComp = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton isActive={isActive} render={<Link href={item.url} />} className={`px-3 py-2 text-xs font-medium w-full flex items-center gap-2.5 rounded-xl transition-all ${isActive ? "bg-primary text-white font-bold shadow-xs hover:bg-primary-hover" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}>
                                            <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                                            <span className="flex-1 truncate">{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer: User Identity */}
            <SidebarFooter className="border-t border-sidebar-border p-3">
                <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-sidebar-accent/50 border border-sidebar-border/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative shrink-0">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs">FB</div>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 border-2 border-sidebar" />
                        </div>
                        <div className="min-w-0">
                            <div className="font-bold text-xs text-sidebar-foreground truncate">FindBookStay</div>
                            <div className="text-[10px] text-muted-foreground truncate">Signed in</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <Link href="/dashboard/settings" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors" title="Settings">
                            <Settings className="w-4 h-4" />
                        </Link>
                        <button type="button" className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-sidebar-accent transition-colors cursor-pointer" title="Sign Out">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;
