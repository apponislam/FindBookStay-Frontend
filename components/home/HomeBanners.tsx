"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, Hotel, Trophy, Building2, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "@/components/Icons";

export interface BannerSlide {
    id: string;
    category: "Rent" | "Book" | "Sports" | "Buy";
    tagline: string;
    title: string;
    description: string;
    primaryCtaText: string;
    primaryCtaHref: string;
    secondaryCtaText: string;
    secondaryCtaHref: string;
    stats: string[];
    image: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
}

interface BannerSlideMeta {
    id: "rent" | "book" | "sports" | "buy";
    category: "Rent" | "Book" | "Sports" | "Buy";
    primaryCtaHref: string;
    secondaryCtaHref: string;
    image: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
}

const SLIDE_METAS: BannerSlideMeta[] = [
    {
        id: "rent",
        category: "Rent",
        primaryCtaHref: "/rent",
        secondaryCtaHref: "/rent/family-apartments",
        image: "/banners/banner-rent.jpg",
        icon: Home,
        accentColor: "from-emerald-500 to-teal-400",
    },
    {
        id: "book",
        category: "Book",
        primaryCtaHref: "/book",
        secondaryCtaHref: "/book/resorts",
        image: "/banners/banner-book.jpg",
        icon: Hotel,
        accentColor: "from-cyan-400 to-emerald-400",
    },
    {
        id: "sports",
        category: "Sports",
        primaryCtaHref: "/sports",
        secondaryCtaHref: "/sports/tournaments",
        image: "/banners/banner-sports.jpg",
        icon: Trophy,
        accentColor: "from-amber-400 to-emerald-400",
    },
    {
        id: "buy",
        category: "Buy",
        primaryCtaHref: "/buy",
        secondaryCtaHref: "/buy/new-developments",
        image: "/banners/banner-buy.jpg",
        icon: Building2,
        accentColor: "from-emerald-400 to-teal-300",
    },
];

const AUTOPLAY_INTERVAL = 6000;
const SLIDES_COUNT = SLIDE_METAS.length;

export const HomeBanners = () => {
    const t = useTranslations("Home.banners");
    const tTabs = useTranslations("Home.searchBar.tabs");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const bannerSlides: BannerSlide[] = SLIDE_METAS.map((meta) => {
        const stats: string[] = [t(`${meta.id}.stats.0`), t(`${meta.id}.stats.1`), t(`${meta.id}.stats.2`)];
        return {
            id: meta.id,
            category: meta.category,
            tagline: t(`${meta.id}.tagline`),
            title: t(`${meta.id}.title`),
            description: t(`${meta.id}.description`),
            primaryCtaText: t(`${meta.id}.primaryCta`),
            primaryCtaHref: meta.primaryCtaHref,
            secondaryCtaText: t(`${meta.id}.secondaryCta`),
            secondaryCtaHref: meta.secondaryCtaHref,
            stats,
            image: meta.image,
            badge: t(`${meta.id}.badge`),
            icon: meta.icon,
            accentColor: meta.accentColor,
        };
    });

    const currentSlide = bannerSlides[currentIndex];

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % SLIDES_COUNT);
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + SLIDES_COUNT) % SLIDES_COUNT);
    }, []);

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    // Autoplay interval
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES_COUNT);
        }, AUTOPLAY_INTERVAL);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <section aria-label="FindBookStay Featured Banners" className="relative w-full overflow-hidden bg-black text-white select-none" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {/* Background Carousel */}
            <div className="relative w-full min-h-125 h-135 sm:h-145 md:h-155 lg:h-162.5">
                {bannerSlides.map((slide, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10 pointer-events-none" : "opacity-0 z-0 pointer-events-none"}`}>
                            <Image src={slide.image} alt={slide.title} fill priority={index === 0} sizes="100vw" className="object-cover object-center scale-105" />
                            {/* Cinematic contrast gradients - preserve deep dark contrast in both light and dark modes */}
                            <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/75 to-black/35 pointer-events-none" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />
                        </div>
                    );
                })}

                {/* Banner Content Container (strict container mx-auto px-4) */}
                <div className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-between pt-5 sm:pt-9 pb-20 sm:pb-24 md:pb-28 pointer-events-auto">
                    {/* Top: 4 Purpose Tabs */}
                    <div className="grid grid-cols-4 gap-1.5 sm:flex sm:items-center sm:gap-2 max-w-md sm:max-w-none relative z-30">
                        {bannerSlides.map((slide, index) => {
                            const isActive = index === currentIndex;
                            const IconComponent = slide.icon;
                            return (
                                <button
                                    key={slide.id}
                                    type="button"
                                    onClick={() => goToSlide(index)}
                                    className={`inline-flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${isActive ? "bg-white text-zinc-950 shadow-md scale-102 font-bold" : "bg-white/15 text-white/80 hover:bg-white/25 hover:text-white backdrop-blur-md"}`}
                                >
                                    <IconComponent className="size-3 sm:size-3.5 shrink-0" />
                                    <span className="truncate">{tTabs(slide.id)}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Middle: Slide Headline & CTA */}
                    <div className="max-w-2xl space-y-2.5 sm:space-y-4 my-auto relative z-30">
                        <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-300 text-[10.5px] sm:text-xs font-medium">
                            <Sparkles className="size-3 sm:size-3.5 animate-pulse" />
                            <span>{currentSlide.tagline}</span>
                        </div>

                        <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.2]">{currentSlide.title}</h1>

                        <p className="text-xs sm:text-base md:text-lg text-white/85 leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">{currentSlide.description}</p>

                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                            {currentSlide.stats.map((stat, i) => (
                                <span key={i} className={`items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-[10.5px] sm:text-xs text-white/90 ${i > 1 ? "hidden sm:inline-flex" : "inline-flex"}`}>
                                    <CheckCircle2 className="size-3 text-emerald-400" />
                                    {stat}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                            <Link href={currentSlide.primaryCtaHref} className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-primary/30 hover:scale-[1.02] cursor-pointer">
                                <span>{currentSlide.primaryCtaText}</span>
                                <ArrowRight className="size-4" />
                            </Link>

                            <Link href={currentSlide.secondaryCtaHref} className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-md border border-white/15 transition-all duration-200 cursor-pointer">
                                <span>{currentSlide.secondaryCtaText}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Bottom: Progress Dots & Arrow Controls */}
                    <div className="flex items-center justify-between pt-3 pb-2 border-t border-white/10 relative z-30">
                        {/* Progress Dots on Left */}
                        <div className="flex items-center gap-2">
                            {bannerSlides.map((slide, index) => {
                                const isActive = index === currentIndex;
                                return <button key={slide.id} type="button" aria-label={`Go to slide ${index + 1}`} onClick={() => goToSlide(index)} className={`transition-all duration-300 rounded-full cursor-pointer ${isActive ? "w-8 h-2 bg-emerald-400" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`} />;
                            })}
                        </div>

                        {/* Arrow Buttons Pair on Right */}
                        <div className="flex items-center gap-2 relative z-40">
                            <button
                                type="button"
                                aria-label="Previous banner"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handlePrev();
                                }}
                                className="size-9 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all cursor-pointer relative z-50 pointer-events-auto"
                            >
                                <ArrowLeft className="size-4 pointer-events-none" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next banner"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleNext();
                                }}
                                className="size-9 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all cursor-pointer relative z-50 pointer-events-auto"
                            >
                                <ArrowRight className="size-4 pointer-events-none" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeBanners;
