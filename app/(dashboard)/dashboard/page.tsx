import React from "react";
import Link from "next/link";
import { Activity, Building, Calendar, Clock, DollarSign, Hotel, MapPin, Shield, Sparkles, Users } from "@/components/Icons";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Admin Command Center Header */}
            <div className="p-6 rounded-3xl bg-linear-to-r from-primary to-primary-hover text-white relative overflow-hidden shadow-md">
                <div className="relative z-10 space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/15">
                        <Shield className="w-3.5 h-3.5 text-accent" />
                        <span>FindBookStay Master Control Panel</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Platform Operations & Overview</h1>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">Monitor live transactions, verify new rental & land deed submissions, oversee resort bookings, and manage sports arena operations across Bangladesh.</p>
                </div>
                <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
            </div>

            {/* Admin KPIs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-border space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Gross Platform Volume</span>
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <DollarSign className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-extrabold text-foreground">৳4.85 Crore</div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <span>↑ +14.2% from last month</span>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-border space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Active Reservations</span>
                        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Calendar className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-extrabold text-foreground">168 Bookings</div>
                    <div className="text-[11px] text-muted-foreground">Stays, sports & rent contracts</div>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-border space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Pending Approvals</span>
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                            <Clock className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-extrabold text-foreground">11 Listings</div>
                    <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">8 Rentals, 3 Land Deeds</div>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-border space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Verified Hosts & Owners</span>
                        <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                            <Users className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-extrabold text-foreground">1,280 Verified</div>
                    <div className="text-[11px] text-muted-foreground">NID & physical checks done</div>
                </div>
            </div>

            {/* Pillar Inventory Shortcuts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link href="/dashboard/rentals" className="p-4 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Building className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[10px] font-bold">8 Review</span>
                    </div>
                    <div>
                        <div className="font-bold text-sm text-foreground">Rentals Hub</div>
                        <div className="text-[11px] text-muted-foreground">Family flats & bachelor seats</div>
                    </div>
                </Link>

                <Link href="/dashboard/stays" className="p-4 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Hotel className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">142 Live</span>
                    </div>
                    <div>
                        <div className="font-bold text-sm text-foreground">Stays & Resorts</div>
                        <div className="text-[11px] text-muted-foreground">Resorts, suites & vacation homes</div>
                    </div>
                </Link>

                <Link href="/dashboard/sports" className="p-4 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">24 Venues</span>
                    </div>
                    <div>
                        <div className="font-bold text-sm text-foreground">Sports & Turfs</div>
                        <div className="text-[11px] text-muted-foreground">Football, cricket & arena slots</div>
                    </div>
                </Link>

                <Link href="/dashboard/properties" className="p-4 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-400 text-[10px] font-bold">3 Deeds</span>
                    </div>
                    <div>
                        <div className="font-bold text-sm text-foreground">Properties for Sale</div>
                        <div className="text-[11px] text-muted-foreground">Deed vetting & developer plots</div>
                    </div>
                </Link>
            </div>

            {/* Pending Approvals Table */}
            <div className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border flex-wrap gap-2">
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Action Required: Pending Approvals</h2>
                        <p className="text-xs text-muted-foreground">New listings requiring land deed and physical verification clearance</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-500/20">11 Pending Review</span>
                </div>

                <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-surface-secondary/60 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shrink-0">
                                <Building className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-sm text-foreground">Modern 3BHK Luxury Flat with Lake View</h3>
                                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200 dark:border-emerald-800">Rent Listing</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-primary" />
                                        Bashundhara R/A, Block D
                                    </span>
                                    <span>Submitted by: Engr. Mahmudul Hasan</span>
                                    <span>৳36,000 / mo</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                            <button type="button" className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-xs cursor-pointer">
                                Approve Listing
                            </button>
                            <Link href="/rent/modern-3bhk-luxury-flat-bashundhara" target="_blank" className="px-3 py-1.5 rounded-xl bg-surface border border-border text-xs font-bold text-foreground hover:bg-surface-secondary transition-colors">
                                Inspect
                            </Link>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-secondary/60 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shrink-0">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-sm text-foreground">South-Facing Corner 5 Katha Residential Plot</h3>
                                    <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 text-[10px] font-semibold border border-sky-200 dark:border-sky-800">Sale / Land</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-primary" />
                                        Purbachal Sector 17
                                    </span>
                                    <span>Deed: CS/SA/RS Verified</span>
                                    <span>৳1.25 Crore</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                            <button type="button" className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-xs cursor-pointer">
                                Clear Deed
                            </button>
                            <Link href="/buy/south-facing-corner-residential-plot-purbachal" target="_blank" className="px-3 py-1.5 rounded-xl bg-surface border border-border text-xs font-bold text-foreground hover:bg-surface-secondary transition-colors">
                                Inspect
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
