"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Plus, Heart, Bell } from "@/components/Icons";
import { CATEGORIES } from "@/constants/routes";
import NavItem from "@/components/header/NavItem";
import UserMenu from "@/components/header/UserMenu";
import MobileDrawer from "@/components/header/MobileDrawer";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // default true for preview
    const [favoritesCount] = useState(3);
    const [notificationsCount] = useState(2);

    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const navContainerRef = useRef<HTMLDivElement>(null);

    // Handle sticky navbar scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        if (mobileDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileDrawerOpen]);

    // Close menus on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveMenu(null);
                setUserDropdownOpen(false);
                setMobileDrawerOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Close menus on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
                setActiveMenu(null);
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMouseEnter = (catId: string) => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
        }
        setActiveMenu(catId);
    };

    const handleMouseLeave = () => {
        hoverTimerRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 180);
    };

    const toggleMobileCategory = (catId: string) => {
        setMobileExpandedCat((prev) => (prev === catId ? null : catId));
    };

    return (
        <>
            <header
                ref={navContainerRef}
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E5EAE8] py-2.5"
                        : "bg-white border-b border-[#E5EAE8]/70 py-4"
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* 1. Brand Logo */}
                        <div className="flex items-center shrink-0">
                            <Link
                                href="/"
                                className="group flex items-center gap-2.5 transition-transform duration-200 hover:opacity-95 cursor-pointer"
                                aria-label="FindBookStay Homepage"
                            >
                                <div className="relative h-9 sm:h-10 w-auto flex items-center">
                                    <Image
                                        src="/findbookstay-logo.png"
                                        alt="FindBookStay Logo"
                                        width={180}
                                        height={52}
                                        priority
                                        className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* 2. Desktop Navigation Mega Menus */}
                        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
                            {CATEGORIES.map((cat) => (
                                <NavItem
                                    key={cat.id}
                                    category={cat}
                                    isOpen={activeMenu === cat.id}
                                    onToggle={() => setActiveMenu(activeMenu === cat.id ? null : cat.id)}
                                    onMouseEnter={() => handleMouseEnter(cat.id)}
                                    onMouseLeave={handleMouseLeave}
                                    onClose={() => setActiveMenu(null)}
                                />
                            ))}
                        </nav>

                        {/* 3. Action CTAs & User Menu */}
                        <div className="flex items-center gap-2 sm:gap-2.5">
                            {/* Post a Listing CTA */}
                            <Link
                                href="/post-listing"
                                className="cursor-pointer relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#073B35] hover:bg-[#052F2A] text-white text-xs sm:text-[13px] font-semibold shadow-xs hover:shadow transition-all duration-200 group"
                            >
                                <Plus className="size-3.5 transition-transform duration-200 group-hover:rotate-90" />
                                <span className="whitespace-nowrap">Post Listing</span>
                            </Link>

                            {/* Saved Favorites Icon */}
                            <Link
                                href="/saved"
                                className="cursor-pointer relative hidden sm:flex items-center justify-center size-9 rounded-full text-[#172B2A] hover:text-[#10B981] hover:bg-[#F8FAF9] transition-colors"
                                aria-label="Saved Listings"
                            >
                                <Heart className="size-4.5" />
                                {favoritesCount > 0 && (
                                    <span className="absolute top-1 right-1 flex items-center justify-center size-4 rounded-full bg-[#10B981] text-[10px] font-bold text-white shadow-2xs">
                                        {favoritesCount}
                                    </span>
                                )}
                            </Link>

                            {/* Notifications Icon (when authenticated) */}
                            {isAuthenticated && (
                                <Link
                                    href="/notifications"
                                    className="cursor-pointer relative hidden sm:flex items-center justify-center size-9 rounded-full text-[#172B2A] hover:text-[#10B981] hover:bg-[#F8FAF9] transition-colors"
                                    aria-label="Notifications"
                                >
                                    <Bell className="size-4.5" />
                                    {notificationsCount > 0 && (
                                        <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#10B981] ring-2 ring-white" />
                                    )}
                                </Link>
                            )}

                            {/* User Profile / Guest Menu */}
                            <UserMenu
                                isAuthenticated={isAuthenticated}
                                onToggleAuth={setIsAuthenticated}
                                favoritesCount={favoritesCount}
                                isOpen={userDropdownOpen}
                                onToggle={() => setUserDropdownOpen(!userDropdownOpen)}
                                onClose={() => setUserDropdownOpen(false)}
                            />

                            {/* Mobile Drawer Hamburger Trigger */}
                            <button
                                type="button"
                                onClick={() => setMobileDrawerOpen(true)}
                                className="cursor-pointer lg:hidden p-2 rounded-xl text-[#172B2A] hover:bg-[#F8FAF9] transition-colors focus:outline-none"
                                aria-label="Open mobile navigation menu"
                            >
                                <Menu className="size-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* 4. Mobile Navigation Drawer */}
            <MobileDrawer
                isOpen={mobileDrawerOpen}
                onClose={() => setMobileDrawerOpen(false)}
                categories={CATEGORIES}
                expandedCategory={mobileExpandedCat}
                onToggleCategory={toggleMobileCategory}
                isAuthenticated={isAuthenticated}
                onToggleAuth={setIsAuthenticated}
                favoritesCount={favoritesCount}
            />
        </>
    );
};

export default Header;
