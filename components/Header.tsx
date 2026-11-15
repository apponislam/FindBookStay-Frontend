"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Heart, Bell } from "@/components/Icons";
import { CATEGORIES } from "@/constants/routes";
import NavItem from "@/components/header/NavItem";
import UserMenu from "@/components/header/UserMenu";
import MobileDrawer from "@/components/header/MobileDrawer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser, currentToken, logOut } from "@/redux/features/auth/authSlice";
import { useGetMeQuery, useLogoutMutation } from "@/redux/features/auth/authApi";

const Header = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const token = useAppSelector(currentToken);

    // Keep profile fresh when token exists
    useGetMeQuery(undefined, { skip: !token });
    const [logoutMutation] = useLogoutMutation();

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [demoAuth, setDemoAuth] = useState(false);

    const isAuthenticated = Boolean(user && token) || demoAuth;

    const [favoritesCount] = useState(3);
    const [notificationsCount] = useState(2);

    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const navContainerRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
        } catch {
            // silent catch
        } finally {
            dispatch(logOut());
            setDemoAuth(false);
            setUserDropdownOpen(false);
        }
    };

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
        }, 150);
    };

    const toggleMobileCategory = (catId: string) => {
        setMobileExpandedCat(mobileExpandedCat === catId ? null : catId);
    };

    return (
        <>
            <header
                className={`sticky top-0 z-40 w-full transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-xs py-2.5 border-b border-[#E2EAE6]"
                        : "bg-white py-3.5 border-b border-[#E2EAE6]"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        {/* 1. Brand Logo */}
                        <div className="shrink-0">
                            <Link href="/" className="cursor-pointer flex items-center gap-2 group">
                                <Image
                                    src="/findbookstay-logo.png"
                                    alt="FindBookStay - Real Estate, Stays & Turfs"
                                    width={180}
                                    height={50}
                                    className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* 2. Desktop Navigation Menu */}
                        <div ref={navContainerRef} className="hidden lg:flex items-center gap-1 xl:gap-2">
                            <nav className="flex items-center gap-0.5 xl:gap-1">
                                {CATEGORIES.map((category) => (
                                    <NavItem
                                        key={category.id}
                                        category={category}
                                        isOpen={activeMenu === category.id}
                                        onToggle={() => setActiveMenu(activeMenu === category.id ? null : category.id)}
                                        onMouseEnter={() => handleMouseEnter(category.id)}
                                        onMouseLeave={handleMouseLeave}
                                        onClose={() => setActiveMenu(null)}
                                    />
                                ))}
                            </nav>
                        </div>

                        {/* 3. Action Buttons & Profile Menu */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Wishlist Link */}
                            <Link
                                href="/saved"
                                className="cursor-pointer relative hidden sm:flex items-center justify-center size-9 rounded-full text-[#172B2A] hover:text-[#10B981] hover:bg-[#F8FAF9] transition-colors"
                                aria-label="View Saved Favorites"
                            >
                                <Heart className="size-4.5" />
                                {favoritesCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#10B981] ring-2 ring-white" />
                                )}
                            </Link>

                            {/* Notifications Link (Authenticated) */}
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
                                user={user}
                                onLogout={handleLogout}
                                onToggleAuth={setDemoAuth}
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
                user={user}
                onLogout={handleLogout}
                onToggleAuth={setDemoAuth}
                favoritesCount={favoritesCount}
            />
        </>
    );
};

export default Header;
