"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Bed,
    Bath,
    Users,
    ShieldCheck,
    Heart,
    Star,
    ArrowRight,
    ArrowLeft,
    Share2,
    Sparkles,
} from "@/components/Icons";
import { BookStay } from "./types";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

interface BookCardProps {
    stay: BookStay;
    viewMode?: "grid" | "list";
}

export const BookCard = ({ stay, viewMode = "grid" }: BookCardProps) => {
    const { locale } = useLocale();
    const isBn = locale === "bn";

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const images =
        stay.images && stay.images.length > 0
            ? stay.images
            : ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"];

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
                    title: stay.title,
                    text: `${stay.title} in ${stay.location.area} - ${stay.priceFormatted} / night`,
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

    const getRatingLabel = (rating: number) => {
        if (isBn) {
            if (rating >= 4.9) return "অসাধারণ";
            if (rating >= 4.8) return "চমৎকার";
            if (rating >= 4.6) return "অনবদ্য";
            return "খুব ভালো";
        }
        if (rating >= 4.9) return "Exceptional";
        if (rating >= 4.8) return "Superb";
        if (rating >= 4.6) return "Wonderful";
        return "Very Good";
    };

    const formattedRating = isBn ? toBengaliDigits(stay.rating.toFixed(1)) : stay.rating.toFixed(1);
    const formattedReviews = isBn ? toBengaliDigits(stay.reviewsCount) : stay.reviewsCount;
    const formattedGuests = isBn ? toBengaliDigits(stay.maxGuests) : stay.maxGuests;
    const formattedBeds = isBn ? toBengaliDigits(stay.bedrooms) : stay.bedrooms;
    const formattedBaths = isBn ? toBengaliDigits(stay.baths) : stay.baths;
    const formattedPrice = isBn && stay.price ? `৳${toBengaliDigits(stay.price.toLocaleString())}` : stay.priceFormatted;

    if (viewMode === "list") {
        return (
            <div className="group bg-white dark:bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row relative">
                {/* Image Section */}
                <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0 overflow-hidden bg-surface-secondary">
                    <Image
                        src={images[currentImageIndex]}
                        alt={stay.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Badges on Image */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-sm">
                            {stay.badge || stay.categoryLabel}
                        </span>
                        {stay.verified && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 dark:bg-card/90 backdrop-blur-md text-white shadow-sm border border-white/10">
                                <ShieldCheck className="size-3 text-accent" />
                                {isBn ? "যাচাইকৃত" : "Verified"}
                            </span>
                        )}
                    </div>

                    {/* Heart & Share Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                        <button
                            type="button"
                            onClick={handleShare}
                            aria-label={isBn ? "শেয়ার করুন" : "Share stay"}
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

                {/* Content Section */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                    <div>
                        {/* Rating & Availability */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5 text-xs">
                                <span className="inline-flex items-center gap-1 font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-[11px]">
                                    <Star className="size-3 fill-amber-500 text-amber-500" />
                                    {formattedRating}
                                </span>
                                <span className="font-bold text-foreground text-xs">
                                    {getRatingLabel(stay.rating)}
                                </span>
                                <span className="text-text-secondary text-[11px]">
                                    ({formattedReviews} {isBn ? "রিভিউ" : "reviews"})
                                </span>
                            </div>
                            <span className="text-[11px] font-semibold text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
                                {stay.categoryLabel}
                            </span>
                        </div>

                        {/* Title */}
                        <Link
                            href={`/book/${stay.slug}`}
                            className="block font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1.5"
                        >
                            {stay.title}
                        </Link>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-3">
                            <MapPin className="size-3.5 text-accent shrink-0" />
                            <span className="truncate">{stay.location.address}</span>
                        </div>

                        {/* Specs Bar */}
                        <div className="flex items-center gap-4 py-2 px-3 rounded-xl bg-surface-secondary/70 text-xs font-semibold text-foreground mb-3 flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <Users className="size-3.5 text-primary" />
                                <span>{isBn ? `সর্বোচ্চ ${formattedGuests} জন অতিথি` : `Up to ${stay.maxGuests} Guests`}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Bed className="size-3.5 text-primary" />
                                <span>{formattedBeds} {isBn ? "বেডরুম" : stay.bedrooms === 1 ? "Bedroom" : "Bedrooms"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Bath className="size-3.5 text-primary" />
                                <span>{formattedBaths} {isBn ? "বাথ" : "Bath"}</span>
                            </div>
                        </div>

                        {/* Amenities Chips */}
                        {stay.amenities && stay.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {stay.amenities.slice(0, 4).map((amenity, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-secondary text-text-secondary"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                                {stay.amenities.length > 4 && (
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md text-text-secondary">
                                        +{isBn ? toBengaliDigits(stay.amenities.length - 4) : stay.amenities.length - 4} {isBn ? "আরও" : "more"}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Cancellation note */}
                        <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Sparkles className="size-3 shrink-0" />
                            <span>{stay.cancellationPolicy}</span>
                        </div>
                    </div>

                    {/* Price and Action Footer */}
                    <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                        <div>
                            <div className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                                {isBn ? "শুরু হচ্ছে" : "Starting From"}
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl md:text-2xl font-extrabold text-primary">
                                    {formattedPrice}
                                </span>
                                <span className="text-xs font-semibold text-text-secondary">
                                    {isBn ? "/রাত" : stay.pricePeriod}
                                </span>
                            </div>
                        </div>

                        <Link
                            href={`/book/${stay.slug}`}
                            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all flex items-center justify-center gap-1.5 shadow-sm group/btn cursor-pointer"
                        >
                            <span>{isBn ? "রিজার্ভ করুন" : "Reserve Stay"}</span>
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
                    alt={stay.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-sm">
                        {stay.badge || stay.categoryLabel}
                    </span>
                    {stay.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 dark:bg-card/90 backdrop-blur-md text-white shadow-sm border border-white/10">
                            <ShieldCheck className="size-3 text-accent" />
                            {isBn ? "যাচাইকৃত" : "Verified"}
                        </span>
                    )}
                </div>

                {/* Heart & Share Buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                        type="button"
                        onClick={handleShare}
                        aria-label={isBn ? "শেয়ার করুন" : "Share stay"}
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
                    {/* Rating & Category */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1 text-xs">
                            <span className="inline-flex items-center gap-1 font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-[11px]">
                                <Star className="size-3 fill-amber-500 text-amber-500" />
                                {formattedRating}
                            </span>
                            <span className="text-[11px] font-bold text-foreground">
                                {getRatingLabel(stay.rating)}
                            </span>
                            <span className="text-text-secondary text-[11px]">
                                ({formattedReviews})
                            </span>
                        </div>
                        <span className="text-[10px] font-semibold text-text-secondary bg-surface-secondary px-2 py-0.5 rounded-full">
                            {stay.categoryLabel}
                        </span>
                    </div>

                    {/* Title */}
                    <Link
                        href={`/book/${stay.slug}`}
                        className="block font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1.5"
                    >
                        {stay.title}
                    </Link>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-3">
                        <MapPin className="size-3.5 text-accent shrink-0" />
                        <span className="truncate">{stay.location.area}, {stay.location.city}</span>
                    </div>

                    {/* Specs Row */}
                    <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-surface-secondary/70 text-xs font-semibold text-foreground mb-3">
                        <div className="flex items-center gap-1">
                            <Users className="size-3.5 text-primary" />
                            <span>{formattedGuests} {isBn ? "জন অতিথি" : "Guests"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bed className="size-3.5 text-primary" />
                            <span>{formattedBeds} {isBn ? "বেড" : stay.bedrooms === 1 ? "Bed" : "Beds"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath className="size-3.5 text-primary" />
                            <span>{formattedBaths} {isBn ? "বাথ" : "Bath"}</span>
                        </div>
                    </div>

                    {/* Amenities Badges */}
                    {stay.amenities && stay.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {stay.amenities.slice(0, 3).map((amenity, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-secondary text-text-secondary"
                                >
                                    {amenity}
                                </span>
                            ))}
                            {stay.amenities.length > 3 && (
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md text-text-secondary">
                                    +{isBn ? toBengaliDigits(stay.amenities.length - 3) : stay.amenities.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Price and Action Footer */}
                <div className="pt-3 border-t border-border flex items-center justify-between gap-2 mt-auto">
                    <div>
                        <div className="text-[10px] uppercase font-bold text-text-secondary">
                            {isBn ? "প্রতি রাত" : "Per Night"}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-extrabold text-primary">
                                {formattedPrice}
                            </span>
                            <span className="text-[11px] font-semibold text-text-secondary">
                                {isBn ? "/রাত" : stay.pricePeriod}
                            </span>
                        </div>
                    </div>

                    <Link
                        href={`/book/${stay.slug}`}
                        className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all flex items-center gap-1 shadow-sm group/btn cursor-pointer"
                    >
                        <span>{isBn ? "রিজার্ভ" : "Reserve"}</span>
                        <ArrowRight className="size-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
