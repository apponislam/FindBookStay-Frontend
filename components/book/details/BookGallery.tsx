"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Heart, Share2, ShieldCheck, X } from "@/components/Icons";
import { BookStay } from "../types";

interface BookGalleryProps {
    stay: BookStay;
}

export const BookGallery = ({ stay }: BookGalleryProps) => {
    const images = stay.images && stay.images.length > 0 ? stay.images : ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"];

    const [activeIdx, setActiveIdx] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: stay.title,
                    text: `${stay.title} in ${stay.location.area} - ${stay.priceFormatted}`,
                    url: window.location.href,
                });
            } catch {
                // Ignore cancel
            }
        } else if (typeof navigator !== "undefined" && navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const nextImage = () => {
        setActiveIdx((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-border shadow-sm">
            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    {stay.badge || stay.categoryLabel}
                </span>
                {stay.verified && (
                    <span className="px-3 py-1.5 rounded-xl bg-primary/90 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1 border border-white/10 shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                        Verified Stay
                    </span>
                )}
            </div>

            {/* Top Action Buttons */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button onClick={handleShare} type="button" aria-label="Share stay" className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm">
                    <Share2 className="w-4 h-4" />
                </button>
                <button onClick={() => setIsSaved(!isSaved)} type="button" aria-label="Save stay" className={`p-2.5 rounded-full backdrop-blur-md border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm ${isSaved ? "bg-rose-500 text-white border-rose-400" : "bg-black/60 hover:bg-black/80 text-white"}`}>
                    <Heart className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
                </button>
            </div>

            {copied && <div className="absolute top-16 right-4 z-30 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium shadow-lg animate-in fade-in">Link copied to clipboard!</div>}

            {/* Main Visual Display */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden group">
                <Image src={images[activeIdx]} alt={`${stay.title} - photo ${activeIdx + 1}`} fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" className="object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer" onClick={() => setIsLightboxOpen(true)} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Arrows */}
                {images.length > 1 && (
                    <>
                        <button onClick={prevImage} type="button" aria-label="Previous photo" className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 cursor-pointer">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextImage} type="button" aria-label="Next photo" className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 cursor-pointer">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}

                {/* Bottom Bar: Counter & Lightbox Button */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                    <button onClick={() => setIsLightboxOpen(true)} type="button" className="px-3.5 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                        <Camera className="w-4 h-4 text-accent" />
                        <span>View All {images.length} Photos</span>
                    </button>
                    <span className="px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white/90 text-xs font-mono font-medium border border-white/15">
                        {activeIdx + 1} / {images.length}
                    </span>
                </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="p-3 bg-slate-950/80 backdrop-blur-md border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-thin">
                    {images.map((img, i) => (
                        <button key={i} onClick={() => setActiveIdx(i)} type="button" className={`relative h-14 w-20 sm:h-16 sm:w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${activeIdx === i ? "border-accent ring-2 ring-accent/30 scale-102" : "border-transparent opacity-60 hover:opacity-100"}`}>
                            <Image src={img} alt={`Thumbnail ${i + 1}`} fill sizes="96px" className="object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Lightbox Modal */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
                        <div>
                            <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{stay.title}</h3>
                            <p className="text-xs text-white/60">
                                Photo {activeIdx + 1} of {images.length}
                            </p>
                        </div>
                        <button onClick={() => setIsLightboxOpen(false)} type="button" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="relative flex-1 my-4 flex items-center justify-center">
                        <div className="relative w-full h-full max-h-[75vh]">
                            <Image src={images[activeIdx]} alt={`${stay.title} full view`} fill sizes="100vw" className="object-contain" />
                        </div>

                        {images.length > 1 && (
                            <>
                                <button onClick={prevImage} type="button" aria-label="Previous image" className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button onClick={nextImage} type="button" aria-label="Next image" className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
                        {images.map((img, idx) => (
                            <button key={idx} onClick={() => setActiveIdx(idx)} type="button" className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${activeIdx === idx ? "border-accent scale-105" : "border-transparent opacity-50 hover:opacity-100"}`}>
                                <Image src={img} alt={`Thumb ${idx + 1}`} fill sizes="80px" className="object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};
