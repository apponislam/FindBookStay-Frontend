"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import siteData from "@/constants/siteData";
import {
    MapPin,
    Mail,
    PhoneCall,
    ArrowRight,
    ArrowUp,
    Facebook,
    TwitterX,
    Instagram,
    LinkedIn,
    Apple,
    GooglePlay,
} from "@/components/Icons";

const Footer = () => {
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer className="w-full bg-[#07241E] text-white relative select-none overflow-hidden">
            {/* Top Accent Gradient Line */}
            <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-teal-400 to-emerald-600" />

            {/* Ambient Background Glow Effects */}
            <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute top-1/2 -right-40 size-96 rounded-full bg-teal-500/10 blur-3xl" />

            {/* ============================================================== */}
            {/* MAIN 5-COLUMN FOOTER NAVIGATION (LINKS SECTION)                */}
            {/* ============================================================== */}
            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Column 1: Brand Info & Direct Contacts (col-span-4) */}
                    <div className="lg:col-span-4 space-y-5">
                        <Link
                            href="/"
                            className="cursor-pointer inline-flex items-center gap-2 group transition-transform duration-200"
                        >
                            <Image
                                src="/findbookstay-logo.png"
                                alt="FindBookStay Logo"
                                width={180}
                                height={52}
                                className="h-9 sm:h-10 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed max-w-sm">
                            {siteData.description}
                        </p>

                        {/* Direct Contacts List */}
                        <div className="space-y-2.5 pt-1 text-xs text-white/80">
                            <div className="flex items-center gap-2.5">
                                <div className="size-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                                    <MapPin className="size-3.5" />
                                </div>
                                <span className="truncate">{siteData.address.headquartersDisplay}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="size-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                                    <Mail className="size-3.5" />
                                </div>
                                <a
                                    href={`mailto:${siteData.contacts.supportEmail}`}
                                    className="cursor-pointer hover:text-emerald-400 transition-colors"
                                >
                                    {siteData.contacts.supportEmail}
                                </a>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="size-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                                    <PhoneCall className="size-3.5" />
                                </div>
                                <a
                                    href={`tel:${siteData.contacts.phoneClean}`}
                                    className="cursor-pointer hover:text-emerald-400 transition-colors"
                                >
                                    {siteData.contacts.phoneDisplay}
                                </a>
                            </div>
                        </div>

                        {/* Social Icons with Interactive Hover Lift */}
                        <div className="flex items-center gap-2.5 pt-2">
                            {[
                                { href: siteData.socialLinks.facebook, label: "Facebook", icon: Facebook },
                                { href: siteData.socialLinks.twitter, label: "Twitter / X", icon: TwitterX },
                                { href: siteData.socialLinks.instagram, label: "Instagram", icon: Instagram },
                                { href: siteData.socialLinks.linkedin, label: "LinkedIn", icon: LinkedIn },
                            ].map((social, idx) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="size-9 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-emerald-500/60 hover:bg-emerald-500/20 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-200 cursor-pointer"
                                    >
                                        <IconComponent className="size-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 2: Rent & Buy (col-span-2) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-2">
                            <span>Rent & Buy</span>
                            <span className="w-4 h-0.5 bg-emerald-500/40 rounded-full" />
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/70">
                            {[
                                { href: "/rent/family-apartments", label: "Family Rental Flats" },
                                { href: "/rent/bachelor-seats", label: "Bachelor Seats" },
                                { href: "/rent/sublets", label: "Monthly Sublets" },
                                { href: "/buy/residential", label: "Residential Homes" },
                                { href: "/buy/apartments", label: "Luxury Apartments" },
                                { href: "/buy/land", label: "Verified Land & Plots" },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <span className="size-1 rounded-full bg-white/30 group-hover:bg-emerald-400 group-hover:scale-150 transition-all" />
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-1">
                                <Link
                                    href="/post-listing"
                                    className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
                                >
                                    <span>Post a Listing</span>
                                    <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Book Stays (col-span-2) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-2">
                            <span>Book Stays</span>
                            <span className="w-4 h-0.5 bg-emerald-500/40 rounded-full" />
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/70">
                            {[
                                { href: "/book/hotels", label: "Boutique & City Hotels" },
                                { href: "/book/resorts", label: "Scenic Resorts" },
                                { href: "/book/guest-houses", label: "Guest Houses & B&Bs" },
                                { href: "/book/holiday-homes", label: "Holiday Homes" },
                                { href: "/book/short-stay", label: "Serviced Short Stays" },
                                { href: "/explore/popular-destinations", label: "Popular Getaways" },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <span className="size-1 rounded-full bg-white/30 group-hover:bg-emerald-400 group-hover:scale-150 transition-all" />
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Sports & Turfs (col-span-2) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-2">
                            <span>Sports & Turfs</span>
                            <span className="w-4 h-0.5 bg-emerald-500/40 rounded-full" />
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/70">
                            {[
                                { href: "/sports/turf-booking", label: "Artificial Grass Turfs" },
                                { href: "/sports/football", label: "Football Grounds" },
                                { href: "/sports/indoor", label: "Indoor Badminton Courts" },
                                { href: "/sports/cricket", label: "Cricket Practice Nets" },
                                { href: "/sports/activities", label: "Swimming & Clubs" },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <span className="size-1 rounded-full bg-white/30 group-hover:bg-emerald-400 group-hover:scale-150 transition-all" />
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Company & Mobile Apps (col-span-2) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-2">
                            <span>Company</span>
                            <span className="w-4 h-0.5 bg-emerald-500/40 rounded-full" />
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/70">
                            {[
                                { href: "/about", label: "About FindBookStay" },
                                { href: "/contact", label: "Contact Us" },
                                { href: "/trust", label: "Verification Guarantee" },
                                { href: "/help", label: "Help & FAQs" },
                                { href: "/terms", label: "Terms of Service" },
                                { href: "/privacy", label: "Privacy Policy" },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <span className="size-1 rounded-full bg-white/30 group-hover:bg-emerald-400 group-hover:scale-150 transition-all" />
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Apps Section */}
                        <div className="pt-2 space-y-2">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/80">
                                <span>Mobile Apps</span>
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                    Coming Soon
                                </span>
                            </div>

                            <div className="flex flex-col gap-2">
                                {/* App Store */}
                                <div className="group relative rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 px-3 py-2 flex items-center gap-2.5 transition-all duration-200 cursor-pointer">
                                    <Apple className="size-4.5 fill-white shrink-0 group-hover:scale-110 transition-transform" />
                                    <div className="text-left leading-tight">
                                        <p className="text-[8px] uppercase tracking-wider text-white/50">Download on</p>
                                        <p className="text-[11px] font-bold text-white">App Store</p>
                                    </div>
                                </div>

                                {/* Google Play */}
                                <div className="group relative rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 px-3 py-2 flex items-center gap-2.5 transition-all duration-200 cursor-pointer">
                                    <GooglePlay className="size-4.5 fill-white shrink-0 group-hover:scale-110 transition-transform" />
                                    <div className="text-left leading-tight">
                                        <p className="text-[8px] uppercase tracking-wider text-white/50">GET IT ON</p>
                                        <p className="text-[11px] font-bold text-white">Google Play</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* SUB-FOOTER BOTTOM BAR & BACK-TO-TOP                            */}
            {/* ============================================================== */}
            <div className="border-t border-white/10 bg-black/40 py-6 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
                        {/* Copyright */}
                        <p className="text-center sm:text-left">
                            &copy; {siteData.copyrightYear}{" "}
                            <span className="font-semibold text-white">{siteData.name}</span>. All rights reserved.
                        </p>

                        {/* Legal and Back to Top Button */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 text-[11.5px]">
                                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                                    Privacy
                                </Link>
                                <span>&middot;</span>
                                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                                    Terms
                                </Link>
                                <span>&middot;</span>
                                <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">
                                    Sitemap
                                </Link>
                            </div>

                            {/* Back to top button */}
                            <button
                                type="button"
                                onClick={scrollToTop}
                                aria-label="Scroll back to top"
                                className="size-9 rounded-xl border border-white/15 bg-white/5 hover:bg-emerald-500 hover:text-zinc-950 text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 group shadow-sm"
                            >
                                <ArrowUp className="size-4 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
