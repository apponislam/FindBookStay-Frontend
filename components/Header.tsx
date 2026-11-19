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
import { currentUser, currentToken, logOut, updateUserState } from "@/redux/features/auth/authSlice";
import { useGetMeQuery, useLogoutMutation, authApi } from "@/redux/features/auth/authApi";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const token = useAppSelector(currentToken);

    // Keep profile fresh when token exists
    const { data: meData } = useGetMeQuery(undefined, { skip: !token });
    const [logoutMutation] = useLogoutMutation();

    useEffect(() => {
        if (meData?.data) {
            dispatch(updateUserState(meData.data));
        }
    }, [meData, dispatch]);

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
    const userMenuRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
        } catch {
            // silent catch
        } finally {
            dispatch(logOut());
            dispatch(authApi.util.resetApiState());
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
            const target = e.target as Node;
            if (navContainerRef.current && !navContainerRef.current.contains(target)) {
                setActiveMenu(null);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(target)) {
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
            <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 dark:bg-background/95 backdrop-blur-md shadow-xs py-2.5 border-b border-border" : "bg-white dark:bg-background py-3.5 border-b border-border"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        {/* 1. Brand Logo */}
                        <div className="shrink-0">
                            <Link href="/" className="cursor-pointer flex items-center gap-2 group">
                                <Image src="/findbookstay-logo.png" alt="FindBookStay - Real Estate, Stays & Turfs" width={180} height={50} className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-102 dark:brightness-0 dark:invert" priority />
                            </Link>
                        </div>

                        {/* 2. Desktop Navigation Menu */}
                        <div ref={navContainerRef} className="hidden lg:flex items-center gap-1 xl:gap-2">
                            <nav className="flex items-center gap-0.5 xl:gap-1">
                                {CATEGORIES.map((category) => (
                                    <NavItem key={category.id} category={category} isOpen={activeMenu === category.id} onToggle={() => setActiveMenu(activeMenu === category.id ? null : category.id)} onMouseEnter={() => handleMouseEnter(category.id)} onMouseLeave={handleMouseLeave} onClose={() => setActiveMenu(null)} />
                                ))}
                            </nav>
                        </div>

                        {/* 3. Action Buttons & Profile Menu */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Mode Toggle */}
                            <ModeToggle />

                            {/* Wishlist Link */}
                            <Link href="/saved" className="cursor-pointer relative hidden sm:flex items-center justify-center size-9 rounded-full text-foreground hover:text-accent hover:bg-surface-secondary transition-colors" aria-label="View Saved Favorites">
                                <Heart className="size-4.5" />
                                {favoritesCount > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-accent ring-2 ring-background" />}
                            </Link>

                            {/* Notifications Link (Authenticated) */}
                            {isAuthenticated && (
                                <Link href="/notifications" className="cursor-pointer relative hidden sm:flex items-center justify-center size-9 rounded-full text-foreground hover:text-accent hover:bg-surface-secondary transition-colors" aria-label="Notifications">
                                    <Bell className="size-4.5" />
                                    {notificationsCount > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-accent ring-2 ring-background" />}
                                </Link>
                            )}

                            {/* User Profile / Guest Menu */}
                            <div ref={userMenuRef} className="relative">
                                <UserMenu isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} onToggleAuth={setDemoAuth} favoritesCount={favoritesCount} isOpen={userDropdownOpen} onToggle={() => setUserDropdownOpen(!userDropdownOpen)} onClose={() => setUserDropdownOpen(false)} />
                            </div>

                            {/* Mobile Drawer Hamburger Trigger */}
                            <button type="button" onClick={() => setMobileDrawerOpen(true)} className="cursor-pointer lg:hidden p-2 rounded-xl text-foreground hover:bg-surface-secondary transition-colors focus:outline-none" aria-label="Open mobile navigation menu">
                                <Menu className="size-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* 4. Mobile Navigation Drawer */}
            <MobileDrawer isOpen={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)} categories={CATEGORIES} expandedCategory={mobileExpandedCat} onToggleCategory={toggleMobileCategory} isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} onToggleAuth={setDemoAuth} favoritesCount={favoritesCount} />
        </>
    );
};

export default Header;
