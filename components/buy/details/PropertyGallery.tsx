"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Heart,
    Share2,
    ShieldCheck,
    Camera,
    ChevronLeft,
    ChevronRight,
    X,
} from "@/components/Icons";
import { BuyProperty } from "../types";

interface PropertyGalleryProps {
    property: BuyProperty;
}

export const PropertyGallery = ({ property }: PropertyGalleryProps) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    const images =
        property.images && property.images.length > 0
            ? property.images
            : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"];

    const handleShare = async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: property.title,
                    text: `${property.title} - ${property.priceFormatted}`,
                    url: window.location.href,
                });
            } catch {
                // Ignore cancel
            }
        } else if (typeof navigator !== "undefined" && navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const nextImage = () => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <div className="relative rounded-3xl overflow-hidden border border-border bg-surface-secondary shadow-md">
                {/* Desktop Grid Layout (1 Main Hero + Side Gallery) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[420px] lg:h-[480px]">
                    {/* Main Hero Photo (Takes 3 Columns on Desktop) */}
                    <div
                        onClick={() => {
                            setCurrentIdx(0);
                            setLightboxOpen(true);
                        }}
                        className="relative md:col-span-3 h-full cursor-pointer group overflow-hidden bg-zinc-900"
                    >
                        <Image
                            src={images[0]}
                            alt={property.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 75vw"
                            className="object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                            {property.verified && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white/95 dark:bg-card/95 backdrop-blur-md text-foreground shadow-md">
                                    <ShieldCheck className="size-4 text-accent" />
                                    <span>Verified Title Deed</span>
                                </span>
                            )}
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-accent/90 text-white backdrop-blur-md shadow-md">
                                {property.badge || property.categoryLabel}
                            </span>
                        </div>
                    </div>

                    {/* Side Thumbnails (1 Column on Desktop) */}
                    <div className="hidden md:flex flex-col gap-2 h-full">
                        {images.slice(1, 3).map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    setCurrentIdx(idx + 1);
                                    setLightboxOpen(true);
                                }}
                                className="relative flex-1 cursor-pointer group overflow-hidden bg-zinc-900 rounded-2xl"
                            >
                                <Image
                                    src={img}
                                    alt={`${property.title} view ${idx + 2}`}
                                    fill
                                    sizes="25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                        ))}

                        {/* View All Photos Button Tile */}
                        <button
                            type="button"
                            onClick={() => {
                                setCurrentIdx(0);
                                setLightboxOpen(true);
                            }}
                            className="relative flex-1 rounded-2xl overflow-hidden bg-zinc-900 group cursor-pointer border border-border"
                        >
                            {images[3] ? (
                                <>
                                    <Image
                                        src={images[3]}
                                        alt="More photos"
                                        fill
                                        sizes="25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                                    />
                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-2">
                                        <Camera className="size-5 mb-1" />
                                        <span className="text-xs font-extrabold">
                                            View all {images.length} photos
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full bg-surface-secondary flex flex-col items-center justify-center text-foreground p-2">
                                    <Camera className="size-5 text-primary mb-1" />
                                    <span className="text-xs font-bold">
                                        View all {images.length} photos
                                    </span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Floating Action Buttons (Top-Right on Mobile & Desktop) */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                    <button
                        type="button"
                        onClick={handleShare}
                        className="size-10 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-md border border-border/80 text-foreground hover:bg-white dark:hover:bg-card hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg cursor-pointer"
                        title={copied ? "Link Copied!" : "Share Property"}
                        aria-label="Share property link"
                    >
                        <Share2 className="size-4" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsSaved(!isSaved)}
                        className="size-10 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-md border border-border/80 text-foreground hover:bg-white dark:hover:bg-card hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg cursor-pointer"
                        title={isSaved ? "Saved to Favorites" : "Save Property"}
                        aria-label="Save property"
                    >
                        <Heart
                            className={`size-4.5 transition-colors ${
                                isSaved ? "fill-accent text-accent" : "text-foreground"
                            }`}
                        />
                    </button>
                </div>

                {/* Mobile View All Button Pill */}
                <button
                    type="button"
                    onClick={() => {
                        setCurrentIdx(0);
                        setLightboxOpen(true);
                    }}
                    className="md:hidden absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold shadow-lg"
                >
                    <Camera className="size-3.5" />
                    <span>1 / {images.length}</span>
                </button>
            </div>

            {/* Lightbox Fullscreen Modal */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
                    {/* Lightbox Header */}
                    <div className="flex items-center justify-between text-white pb-3 border-b border-white/15">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold truncate max-w-xs sm:max-w-md">
                                {property.title}
                            </span>
                            <span className="text-xs text-white/60 font-mono">
                                ({currentIdx + 1} / {images.length})
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setLightboxOpen(false)}
                            className="size-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Close photo viewer"
                        >
                            <X className="size-5" />
                        </button>
                    </div>

                    {/* Lightbox Main Stage */}
                    <div className="relative flex-1 flex items-center justify-center py-4">
                        <div className="relative w-full max-w-5xl h-[60vh] sm:h-[75vh]">
                            <Image
                                src={images[currentIdx]}
                                alt={`${property.title} photo ${currentIdx + 1}`}
                                fill
                                sizes="100vw"
                                className="object-contain"
                            />
                        </div>

                        {/* Previous Button */}
                        <button
                            type="button"
                            onClick={prevImage}
                            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 size-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl"
                            aria-label="Previous photo"
                        >
                            <ChevronLeft className="size-6" />
                        </button>

                        {/* Next Button */}
                        <button
                            type="button"
                            onClick={nextImage}
                            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 size-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl"
                            aria-label="Next photo"
                        >
                            <ChevronRight className="size-6" />
                        </button>
                    </div>

                    {/* Lightbox Bottom Thumbnails */}
                    <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentIdx(idx)}
                                className={`relative size-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                    currentIdx === idx
                                        ? "border-emerald-400 scale-105"
                                        : "border-transparent opacity-50 hover:opacity-100"
                                }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyGallery;
