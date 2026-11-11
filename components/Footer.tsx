import React from "react";
import Image from "next/image";
import Link from "next/link";
import siteData from "@/constants/siteData";
import { MapPin, Mail, PhoneCall, ArrowRight, Facebook, TwitterX, Instagram, LinkedIn, Apple, GooglePlay } from "@/components/Icons";

const Footer = () => {
    return (
        <footer className="w-full bg-[#F8FAF9] border-t border-[#E2EAE6] text-[#172B2A] relative select-none">
            {/* ============================================================== */}
            {/* 1. MAIN 5-COLUMN FOOTER NAVIGATION (LINKS SECTION)             */}
            {/* ============================================================== */}
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
                    {/* Column 1: Brand Info & Direct Contacts (col-span-3) */}
                    <div className="lg:col-span-3 space-y-4">
                        <Link href="/" className="cursor-pointer inline-block transition-transform duration-200 hover:opacity-95">
                            <Image src="/findbookstay-logo.png" alt="FindBookStay Logo" width={180} height={52} className="h-9 sm:h-10 w-auto object-contain" />
                        </Link>
                        <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed max-w-sm">
                            {siteData.description}
                        </p>

                        {/* Direct Contacts List */}
                        <div className="space-y-2 pt-1 text-xs text-[#172B2A]">
                            <div className="flex items-center gap-2.5 text-[#64748B]">
                                <MapPin className="size-4 text-[#10B981] shrink-0" />
                                <span>{siteData.address.headquartersDisplay}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-[#64748B]">
                                <Mail className="size-4 text-[#10B981] shrink-0" />
                                <a
                                    href={`mailto:${siteData.contacts.supportEmail}`}
                                    className="cursor-pointer hover:text-[#073B35] transition-colors"
                                >
                                    {siteData.contacts.supportEmail}
                                </a>
                            </div>
                            <div className="flex items-center gap-2.5 text-[#64748B]">
                                <PhoneCall className="size-4 text-[#10B981] shrink-0" />
                                <a
                                    href={`tel:${siteData.contacts.phoneClean}`}
                                    className="cursor-pointer hover:text-[#073B35] transition-colors"
                                >
                                    {siteData.contacts.phoneDisplay}
                                </a>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2 pt-1">
                            <a
                                href={siteData.socialLinks.facebook}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="cursor-pointer size-8.5 rounded-xl border border-[#E2EAE6] bg-white text-[#64748B] hover:text-[#073B35] hover:border-[#10B981]/50 hover:bg-[#F0F5F3] flex items-center justify-center shadow-2xs transition-all duration-200"
                            >
                                <Facebook className="size-4" />
                            </a>

                            <a
                                href={siteData.socialLinks.twitter}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X Twitter"
                                className="cursor-pointer size-8.5 rounded-xl border border-[#E2EAE6] bg-white text-[#64748B] hover:text-[#073B35] hover:border-[#10B981]/50 hover:bg-[#F0F5F3] flex items-center justify-center shadow-2xs transition-all duration-200"
                            >
                                <TwitterX className="size-3.5" />
                            </a>

                            <a
                                href={siteData.socialLinks.instagram}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="cursor-pointer size-8.5 rounded-xl border border-[#E2EAE6] bg-white text-[#64748B] hover:text-[#073B35] hover:border-[#10B981]/50 hover:bg-[#F0F5F3] flex items-center justify-center shadow-2xs transition-all duration-200"
                            >
                                <Instagram className="size-4" />
                            </a>

                            <a
                                href={siteData.socialLinks.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="cursor-pointer size-8.5 rounded-xl border border-[#E2EAE6] bg-white text-[#64748B] hover:text-[#073B35] hover:border-[#10B981]/50 hover:bg-[#F0F5F3] flex items-center justify-center shadow-2xs transition-all duration-200"
                            >
                                <LinkedIn className="size-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Rent & Buy Properties (col-span-2) */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-[#073B35]">Rent & Buy</h4>
                        <ul className="space-y-2 text-xs sm:text-[13px] text-[#64748B]">
                            <li>
                                <Link href="/rent/family-apartments" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Family Rental Flats
                                </Link>
                            </li>
                            <li>
                                <Link href="/rent/bachelor-seats" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Bachelor Seats
                                </Link>
                            </li>
                            <li>
                                <Link href="/rent/sublets" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Monthly Sublets
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy/residential" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Residential Homes
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy/apartments" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Luxury Apartments
                                </Link>
                            </li>
                            <li>
                                <Link href="/buy/land" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Verified Land & Plots
                                </Link>
                            </li>
                            <li>
                                <Link href="/post-listing" className="cursor-pointer font-semibold text-[#10B981] hover:text-[#059669] transition-colors flex items-center gap-1">
                                    <span>Post a Listing</span>
                                    <ArrowRight className="size-3" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Book Stays & Hotels (col-span-2) */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-[#073B35]">Book Stays</h4>
                        <ul className="space-y-2 text-xs sm:text-[13px] text-[#64748B]">
                            <li>
                                <Link href="/book/hotels" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Boutique & City Hotels
                                </Link>
                            </li>
                            <li>
                                <Link href="/book/resorts" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Scenic Resorts
                                </Link>
                            </li>
                            <li>
                                <Link href="/book/guest-houses" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Guest Houses & B&Bs
                                </Link>
                            </li>
                            <li>
                                <Link href="/book/holiday-homes" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Holiday Homes
                                </Link>
                            </li>
                            <li>
                                <Link href="/book/short-stay" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Serviced Short Stays
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore/popular-destinations" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Popular Getaways
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Sports & Activities (col-span-2) */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-[#073B35]">Sports & Turfs</h4>
                        <ul className="space-y-2 text-xs sm:text-[13px] text-[#64748B]">
                            <li>
                                <Link href="/sports/turf-booking" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Artificial Grass Turfs
                                </Link>
                            </li>
                            <li>
                                <Link href="/sports/football" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Football Grounds
                                </Link>
                            </li>
                            <li>
                                <Link href="/sports/indoor" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Indoor Badminton Courts
                                </Link>
                            </li>
                            <li>
                                <Link href="/sports/cricket" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Cricket Practice Nets
                                </Link>
                            </li>
                            <li>
                                <Link href="/sports/activities" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                    Swimming & Clubs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 5: Company & Mobile Apps (RIGHT SIDE in Links Section - col-span-3, NO HR, GLOWING BUTTONS) */}
                    <div className="lg:col-span-3 space-y-5">
                        {/* Company Links */}
                        <div className="space-y-3">
                            <h4 className="text-xs uppercase font-bold tracking-wider text-[#073B35]">Company</h4>
                            <ul className="space-y-2 text-xs sm:text-[13px] text-[#64748B]">
                                <li>
                                    <Link href="/about" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                        About FindBookStay
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/trust" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                        Verification Guarantee
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/help" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                        Help & Support
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/feedback" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                        Share Feedback
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Mobile Apps Section - NO HR / TOP BORDER, RIGHT-ALIGNED, GLOWING */}
                        <div className="space-y-2.5 pt-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#073B35]">Mobile Apps</span>
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                                    <span className="relative flex size-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full size-1.5 bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
                                    </span>
                                    <span>{siteData.appStatus.ios}</span>
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2.5">
                                {/* Apple App Store */}
                                <div className="relative group cursor-pointer">
                                    {/* Ambient Emerald Glow Halo */}
                                    <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-[#10B981] via-[#34D399] to-[#059669] opacity-35 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300 shadow-[0_0_14px_rgba(16,185,129,0.35)]" />

                                    {/* Tactile Button Surface */}
                                    <div className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#073B35] text-white border border-[#10B981]/50 group-hover:border-[#34D399] transition-all duration-200">
                                        <Apple className="size-4.5 fill-white shrink-0 group-hover:scale-105 transition-transform duration-200" />
                                        <div className="text-left leading-tight">
                                            <p className="text-[8.5px] uppercase tracking-wider text-[#A3B5AE]">Download on</p>
                                            <p className="text-[11.5px] font-bold text-white tracking-tight">App Store</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Google Play Store */}
                                <div className="relative group cursor-pointer">
                                    {/* Ambient Emerald Glow Halo */}
                                    <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-[#10B981] via-[#34D399] to-[#059669] opacity-35 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300 shadow-[0_0_14px_rgba(16,185,129,0.35)]" />

                                    {/* Tactile Button Surface */}
                                    <div className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#073B35] text-white border border-[#10B981]/50 group-hover:border-[#34D399] transition-all duration-200">
                                        <GooglePlay className="size-4.5 fill-white shrink-0 group-hover:scale-105 transition-transform duration-200" />
                                        <div className="text-left leading-tight">
                                            <p className="text-[8.5px] uppercase tracking-wider text-[#A3B5AE]">GET IT ON</p>
                                            <p className="text-[11.5px] font-bold text-white tracking-tight">Google Play</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* 2. SUB-FOOTER BOTTOM BAR (COPYRIGHT & PRIVACY POLICY ONLY)     */}
            {/* ============================================================== */}
            <div className="border-t border-[#E2EAE6] bg-white py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
                        {/* Copyright */}
                        <p className="text-center sm:text-left">
                            &copy; {siteData.copyrightYear} <span className="font-semibold text-[#172B2A]">{siteData.domain}</span>. All rights reserved.
                        </p>

                        {/* Legal Links */}
                        <div className="flex items-center gap-4 text-[11.5px]">
                            <Link href="/privacy" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                Privacy Policy
                            </Link>
                            <span>&middot;</span>
                            <Link href="/terms" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                Terms of Service
                            </Link>
                            <span>&middot;</span>
                            <Link href="/sitemap" className="cursor-pointer hover:text-[#073B35] transition-colors">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
