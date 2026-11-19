import React from "react";
import Link from "next/link";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { Bell, Search } from "@/components/Icons";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="bg-background min-h-screen flex-1 flex flex-col min-w-0">
                {/* Top Navigation Bar */}
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border px-4 transition-[width,height] ease-linear">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Link href="/dashboard" className="hover:text-foreground transition-colors font-medium">
                                Dashboard
                            </Link>
                            <span className="opacity-40">/</span>
                            <span className="text-foreground font-semibold">Overview</span>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden sm:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search listings, bookings..."
                                className="pl-9 pr-4 py-1.5 text-xs rounded-xl bg-surface-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-52 md:w-64"
                            />
                        </div>

                        <button
                            type="button"
                            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors relative cursor-pointer"
                            aria-label="Notifications"
                        >
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse" />
                        </button>

                        <ModeToggle />
                    </div>
                </header>

                {/* Dashboard Page Content */}
                <div className="flex-1 p-4 md:p-6 space-y-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

