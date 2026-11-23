"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    ShieldCheck,
    Heart,
    Star,
    ArrowRight,
    ArrowLeft,
    Share2,
    Clock,
    Zap,
} from "@/components/Icons";
import { SportsVenue } from "./types";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

interface SportsCardProps {
    venue: SportsVenue;
    viewMode?: "grid" | "list";
}

export const SportsCard = ({ venue, viewMode = "grid" }: SportsCardProps) => {
    const { locale } = useLocale();
    const isBn = locale === "bn";

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const images =
        venue.images && venue.images.length > 0
            ? venue.images
            : ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80"];

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const toggleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved((prev) => !prev);
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: venue.name,
                    text: `${venue.name} in ${venue.location.area} - ${venue.priceFormatted} ${venue.priceUnit}`,
                    url: window.location.href,
                });
            } catch {
                // Ignore cancel
            }
        } else if (typeof navigator !== "undefined" && navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            alert(isBn ? "লিংক কপি করা হয়েছে!" : "Link copied to clipboard!");
        }
    };

    const formattedRating = isBn ? toBengaliDigits(venue.rating.toFixed(1)) : venue.rating.toFixed(1);
    const formattedReviews = isBn ? toBengaliDigits(venue.reviewsCount) : venue.reviewsCount;
    const formattedPrice = isBn && venue.hourlyPrice ? `৳${toBengaliDigits(venue.hourlyPrice.toLocaleString())}` : venue.priceFormatted;

    if (viewMode === "list") {
        return (
            <div className="group bg-white dark:bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row relative">
                {/* Image Section */}
                <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0 overflow-hidden bg-surface-secondary">
                    <Image
                        src={images[currentImageIndex]}
                        alt={venue.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Badges on Image */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-sm">
                            {venue.badge || venue.categoryLabel}
                        </span>
                        {venue.verified && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 dark:bg-card/90 backdrop-blur-md text-white border border-white/10 shadow-sm">
                                <ShieldCheck className="size-3 text-emerald-400" />
                                {isBn ? "যাচাইকৃত অ্যারেনা" : "Verified Arena"}
                            </span>
                        )}
                    </div>

                    {/* Heart & Share Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                        <button
                            type="button"
                            onClick={handleShare}
                            aria-label={isBn ? "শেয়ার করুন" : "Share venue"}
                            className="size-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer backdrop-blur-md border border-white/10"
                        >
                            <Share2 className="size-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={toggleSave}
                            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                            className="size-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer backdrop-blur-md border border-white/10"
                        >
                            <Heart
                                className={`size-4 transition-colors ${
                                    isSaved
                                        ? "fill-rose-500 text-rose-500"
                                        : "text-white group-hover:text-rose-400"
                                }`}
                            />
                        </button>
                    </div>

                    {/* Slider Controls */}
                    {images.length > 1 && (
                        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                                type="button"
                                onClick={prevImage}
                                aria-label="Previous image"
                                className="size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer shadow-md"
                            >
                                <ArrowLeft className="size-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={nextImage}
                                aria-label="Next image"
                                className="size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer shadow-md"
                            >
                                <ArrowRight className="size-3.5" />
                            </button>
                        </div>
                    )}

                    {/* Dots indicator */}
                    {images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
                            {images.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`size-1.5 rounded-full transition-all ${
                                        idx === currentImageIndex
                                            ? "w-4 bg-white"
                                            : "bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                    <div>
                        {/* Rating & Sports Tags */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-xs">
                                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                                    {formattedRating}
                                </span>
                                <span className="text-muted-foreground text-[11px]">
                                    ({formattedReviews} {isBn ? "রিভিউ" : "reviews"})
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                {venue.sports.map((sport, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full"
                                    >
                                        {sport}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <Link
                            href={`/sports/${venue.slug}`}
                            className="block font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1.5"
                        >
                            {venue.name}
                        </Link>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                            <MapPin className="size-3.5 text-accent shrink-0" />
                            <span className="truncate">{venue.location.address}</span>
                        </div>

                        {/* Specs & Surface Bar */}
                        <div className="flex items-center gap-3 py-2 px-3 rounded-xl bg-surface-secondary/70 text-xs font-semibold text-foreground mb-3 flex-wrap">
                            <span className="text-primary font-bold">{venue.surfaceType}</span>
                            <span className="text-muted-foreground/40">&middot;</span>
                            <span>{venue.capacity}</span>
                        </div>

                        {/* Next Available Slot */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl mb-3">
                            <Clock className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{isBn ? "পরবর্তী স্লট:" : "Next Slot:"} {venue.nextSlot}</span>
                        </div>

                        {/* Amenities Chips */}
                        {venue.amenities && venue.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {venue.amenities.slice(0, 4).map((amenity, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-secondary text-muted-foreground"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                                {venue.amenities.length > 4 && (
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md text-muted-foreground">
                                        +{isBn ? toBengaliDigits(venue.amenities.length - 4) : venue.amenities.length - 4} {isBn ? "আরও" : "more"}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Price and Action Footer */}
                    <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                        <div>
                            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                                {isBn ? "ঘণ্টাপ্রতি স্লট রেট" : "Hourly Slot Rate"}
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl md:text-2xl font-extrabold text-primary">
                                    {formattedPrice}
                                </span>
                                <span className="text-xs font-semibold text-muted-foreground">
                                    {isBn ? "/ঘণ্টা" : venue.priceUnit}
                                </span>
                            </div>
                        </div>

                        <Link
                            href={`/sports/${venue.slug}`}
                            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all flex items-center justify-center gap-1.5 shadow-sm group/btn cursor-pointer"
                        >
                            <Zap className="size-3.5 text-primary-foreground" />
                            <span>{isBn ? "স্লট বুক করুন" : "Book Slot"}</span>
                            <ArrowRight className="size-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Grid View Card (Default)
    return (
        <div className="group bg-white dark:bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image Header with Carousel */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-secondary">
                <Image
                    src={images[currentImageIndex]}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-sm">
                        {venue.badge || venue.categoryLabel}
                    </span>
                    {venue.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 dark:bg-card/90 backdrop-blur-md text-white border border-white/10 shadow-sm">
                            <ShieldCheck className="size-3 text-emerald-400" />
                            {isBn ? "যাচাইকৃত" : "Verified"}
                        </span>
                    )}
                </div>

                {/* Heart & Share Buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                        type="button"
                        onClick={handleShare}
                        aria-label={isBn ? "শেয়ার করুন" : "Share venue"}
                        className="size-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer backdrop-blur-md border border-white/10"
                    >
                        <Share2 className="size-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={toggleSave}
                        aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                        className="size-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer backdrop-blur-md border border-white/10"
                    >
                        <Heart
                            className={`size-4 transition-colors ${
                                isSaved
                                    ? "fill-rose-500 text-rose-500"
                                    : "text-white group-hover:text-rose-400"
                            }`}
                        />
                    </button>
                </div>

                {/* Next / Prev Slider Controls */}
                {images.length > 1 && (
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                            type="button"
                            onClick={prevImage}
                            aria-label="Previous image"
                            className="size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer shadow-md"
                        >
                            <ArrowLeft className="size-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={nextImage}
                            aria-label="Next image"
                            className="size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer shadow-md"
                        >
                            <ArrowRight className="size-3.5" />
                        </button>
                    </div>
                )}

                {/* Dots indicator */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
                        {images.map((_, idx) => (
                            <span
                                key={idx}
                                className={`size-1.5 rounded-full transition-all ${
                                    idx === currentImageIndex
                                        ? "w-4 bg-white"
                                        : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                    {/* Rating & Sport Tag */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1 text-xs">
                            <span className="inline-flex items-center gap-1 font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-[11px]">
                                <Star className="size-3 fill-amber-500 text-amber-500" />
                                {formattedRating}
                            </span>
                            <span className="text-muted-foreground text-[11px]">
                                ({formattedReviews})
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            {venue.sports.slice(0, 2).map((sport, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full"
                                >
                                    {sport}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <Link
                        href={`/sports/${venue.slug}`}
                        className="block font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1.5"
                    >
                        {venue.name}
                    </Link>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <MapPin className="size-3.5 text-accent shrink-0" />
                        <span className="truncate">{venue.location.area}, {venue.location.city}</span>
                    </div>

                    {/* Surface & Capacity */}
                    <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-surface-secondary/70 text-xs font-semibold text-foreground mb-3">
                        <span className="text-primary font-bold truncate">{venue.surfaceType}</span>
                        <span className="text-muted-foreground text-[11px] shrink-0">{venue.capacity}</span>
                    </div>

                    {/* Next Available Slot */}
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-xl mb-3">
                        <Clock className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{venue.nextSlot}</span>
                    </div>
                </div>

                {/* Price and Action Footer */}
                <div className="pt-3 border-t border-border flex items-center justify-between gap-2 mt-auto">
                    <div>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">
                            {isBn ? "প্রতি ঘণ্টা" : "Per Hour"}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-extrabold text-primary">
                                {formattedPrice}
                            </span>
                            <span className="text-[11px] font-semibold text-muted-foreground">
                                {isBn ? "/ঘণ্টা" : venue.priceUnit}
                            </span>
                        </div>
                    </div>

                    <Link
                        href={`/sports/${venue.slug}`}
                        className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all flex items-center gap-1 shadow-sm group/btn cursor-pointer"
                    >
                        <Zap className="size-3 text-primary-foreground" />
                        <span>{isBn ? "বুকিং" : "Book"}</span>
                        <ArrowRight className="size-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
