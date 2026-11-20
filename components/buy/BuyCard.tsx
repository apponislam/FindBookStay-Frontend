"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize2, ShieldCheck, Heart, Star, ArrowRight, ArrowLeft, Share2, Building } from "@/components/Icons";
import { BuyProperty } from "./types";

interface BuyCardProps {
    property: BuyProperty;
    viewMode?: "grid" | "list";
}

export const BuyCard = ({ property, viewMode = "grid" }: BuyCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const images = property.images && property.images.length > 0 ? property.images : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"];

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
                    title: property.title,
                    text: `${property.title} in ${property.location.area} - ${property.priceFormatted}`,
                    url: window.location.href,
                });
            } catch {
                // Ignore cancel
            }
        } else if (typeof navigator !== "undefined" && navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    if (viewMode === "list") {
        return (
            <div className="group bg-white dark:bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row relative">
                {/* Image Section */}
                <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0 overflow-hidden bg-surface-secondary">
                    <Image src={images[currentImageIndex]} alt={property.title} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Badges on Image */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-sm">{property.badge || property.categoryLabel}</span>
                        {property.verified && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 dark:bg-card/90 backdrop-blur-md text-white border border-white/10 shadow-sm">
                                <ShieldCheck className="size-3 text-emerald-400" />
                                Verified Title
                            </span>
                        )}
                    </div>

                    {/* Heart & Share Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                        <button type="button" onClick={handleShare} aria-label="Share property" className="size-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer backdrop-blur-md border border-white/10">
                            <Share2 className="size-3.5" />
                        </button>
                        <button type="button" onClick={toggleSave} aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"} className="size-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer backdrop-blur-md border border-white/10">
                            <Heart className={`size-4 transition-colors ${isSaved ? "fill-rose-500 text-rose-500" : "text-white group-hover:text-rose-400"}`} />
                        </button>
                    </div>

                    {/* Slider Controls */}
                    {images.length > 1 && (
                        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button type="button" onClick={prevImage} aria-label="Previous image" className="size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer shadow-md">
                                <ArrowLeft className="size-3.5" />
                            </button>
                            <button type="button" onClick={nextImage} aria-label="Next image" className="size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer shadow-md">
                                <ArrowRight className="size-3.5" />
                            </button>
                        </div>
                    )}

                    {/* Dots indicator */}
                    {images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
                            {images.map((_, idx) => (
                                <span key={idx} className={`size-1.5 rounded-full transition-all ${idx === currentImageIndex ? "w-4 bg-white" : "bg-white/50"}`} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                    <div>
                        {/* Rating & Status */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5 text-xs">
                                <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/40 px-2 py-0.5 rounded-md text-xs">
                                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                                    {property.rating.toFixed(1)}
                                </span>
                                <span className="text-muted-foreground text-[11px]">({property.reviewsCount} reviews)</span>
                            </div>
                            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/40">{property.completionStatus}</span>
                        </div>

                        {/* Title */}
                        <Link href={`/buy/${property.slug}`} className="block font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1.5">
                            {property.title}
                        </Link>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                            <MapPin className="size-3.5 text-accent shrink-0" />
                            <span className="truncate">{property.location.address}</span>
                        </div>

                        {/* Specs Grid */}
                        <div className="flex items-center gap-4 py-2 px-3 rounded-xl bg-surface-secondary/70 text-xs font-semibold text-foreground mb-3 flex-wrap">
                            {property.beds > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <Bed className="size-3.5 text-primary" />
                                    <span>
                                        {property.beds} {property.beds === 1 ? "Bed" : "Beds"}
                                    </span>
                                </div>
                            )}
                            {property.baths > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <Bath className="size-3.5 text-primary" />
                                    <span>
                                        {property.baths} {property.baths === 1 ? "Bath" : "Baths"}
                                    </span>
                                </div>
                            )}
                            {property.sqft > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <Maximize2 className="size-3.5 text-primary" />
                                    <span>{property.sqft.toLocaleString()} sqft</span>
                                </div>
                            )}
                            {property.pricePerSqft && (
                                <>
                                    <span className="text-muted-foreground/40 hidden sm:inline">&middot;</span>
                                    <span className="text-muted-foreground text-[11px] hidden sm:inline">{property.pricePerSqft}</span>
                                </>
                            )}
                        </div>

                        {/* Amenities Tags */}
                        {property.amenities && property.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {property.amenities.slice(0, 4).map((amenity, idx) => (
                                    <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-secondary text-muted-foreground">
                                        {amenity}
                                    </span>
                                ))}
                                {property.amenities.length > 4 && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md text-muted-foreground">+{property.amenities.length - 4} more</span>}
                            </div>
                        )}

                        <div className="text-[11px] text-muted-foreground">
                            Developer / Seller: <span className="font-bold text-foreground">{property.developer.name}</span>
                        </div>
                    </div>

                    {/* Price and Action Footer */}
                    <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                        <div>
                            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Asking Price</div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl md:text-2xl font-extrabold text-primary">{property.priceFormatted}</span>
                                {property.pricePerSqft && <span className="text-[11px] font-medium text-muted-foreground">({property.pricePerSqft})</span>}
                            </div>
                        </div>

                        <Link href={`/buy/${property.slug}`} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all flex items-center justify-center gap-1.5 shadow-sm group/btn cursor-pointer">
                            <Building className="size-3.5" />
                            <span>Inquire Now</span>
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
                <Image src={images[currentImageIndex]} alt={property.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-sm">{property.badge || property.categoryLabel}</span>
                    {property.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 dark:bg-card/90 backdrop-blur-md text-white border border-white/10 shadow-sm">
                            <ShieldCheck className="size-3 text-emerald-400" />
                            Verified
                        </span>
                    )}
                </div>

                {/* Heart & Share Buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button type="button" onClick={handleShare} aria-label="Share property" className="size-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer backdrop-blur-md border border-white/10">
                        <Share2 className="size-3.5" />
                    </button>
                    <button type="button" onClick={toggleSave} aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"} className="size-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer backdrop-blur-md border border-white/10">
                        <Heart className={`size-4 transition-colors ${isSaved ? "fill-rose-500 text-rose-500" : "text-white group-hover:text-rose-400"}`} />
                    </button>
                </div>

                {/* Next / Prev Slider Controls */}
                {images.length > 1 && (
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button type="button" onClick={prevImage} aria-label="Previous image" className="size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer shadow-md">
                            <ArrowLeft className="size-3.5" />
                        </button>
                        <button type="button" onClick={nextImage} aria-label="Next image" className="size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer shadow-md">
                            <ArrowRight className="size-3.5" />
                        </button>
                    </div>
                )}

                {/* Dots indicator */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
                        {images.map((_, idx) => (
                            <span key={idx} className={`size-1.5 rounded-full transition-all ${idx === currentImageIndex ? "w-4 bg-white" : "bg-white/50"}`} />
                        ))}
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                    {/* Rating & Completion Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1 text-xs">
                            <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/40 px-2 py-0.5 rounded-md text-[11px]">
                                <Star className="size-3 fill-amber-500 text-amber-500" />
                                {property.rating.toFixed(1)}
                            </span>
                            <span className="text-muted-foreground text-[11px]">({property.reviewsCount})</span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/40">{property.completionStatus}</span>
                    </div>

                    {/* Title */}
                    <Link href={`/buy/${property.slug}`} className="block font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1.5">
                        {property.title}
                    </Link>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <MapPin className="size-3.5 text-accent shrink-0" />
                        <span className="truncate">
                            {property.location.area}, {property.location.city}
                        </span>
                    </div>

                    {/* Specs Row */}
                    <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-surface-secondary/70 text-xs font-semibold text-foreground mb-3">
                        {property.beds > 0 && (
                            <div className="flex items-center gap-1">
                                <Bed className="size-3.5 text-primary" />
                                <span>
                                    {property.beds} {property.beds === 1 ? "Bed" : "Beds"}
                                </span>
                            </div>
                        )}
                        {property.baths > 0 && (
                            <div className="flex items-center gap-1">
                                <Bath className="size-3.5 text-primary" />
                                <span>{property.baths} Bath</span>
                            </div>
                        )}
                        {property.sqft > 0 && (
                            <div className="flex items-center gap-1">
                                <Maximize2 className="size-3.5 text-primary" />
                                <span>{property.sqft.toLocaleString()} sqft</span>
                            </div>
                        )}
                    </div>

                    {/* Amenities Badges */}
                    {property.amenities && property.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {property.amenities.slice(0, 3).map((amenity, idx) => (
                                <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-secondary text-muted-foreground">
                                    {amenity}
                                </span>
                            ))}
                            {property.amenities.length > 3 && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md text-muted-foreground">+{property.amenities.length - 3}</span>}
                        </div>
                    )}
                </div>

                {/* Price and Action Footer */}
                <div className="pt-3 border-t border-border flex items-center justify-between gap-2 mt-auto">
                    <div>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Price</div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-extrabold text-primary">{property.priceFormatted}</span>
                        </div>
                    </div>

                    <Link href={`/buy/${property.slug}`} className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all flex items-center gap-1 shadow-sm group/btn cursor-pointer">
                        <span>Details</span>
                        <ArrowRight className="size-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
