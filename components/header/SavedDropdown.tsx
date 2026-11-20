"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, X, MapPin } from "@/components/Icons";
import { SavedListingItem } from "@/constants/savedData";

interface SavedDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    savedItems: SavedListingItem[];
    onRemoveItem: (id: string, e: React.MouseEvent) => void;
}

export const SavedDropdown = ({ isOpen, onClose, savedItems, onRemoveItem }: SavedDropdownProps) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Mobile Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 sm:hidden animate-in fade-in duration-200" onClick={onClose} aria-hidden="true" />

            <div className="fixed inset-x-3 top-16 max-h-[82vh] z-50 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2.5 sm:w-95 sm:max-h-130 rounded-3xl bg-white dark:bg-card border border-border shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150" role="dialog" aria-label="Saved Listings Dropdown">
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between bg-surface/50 shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-foreground">Saved Listings</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-primary/15 text-primary">{savedItems.length} items</span>
                    </div>
                    {/* Mobile Close Button */}
                    <button type="button" onClick={onClose} className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-secondary sm:hidden cursor-pointer" aria-label="Close saved listings">
                        <X className="size-4" />
                    </button>
                </div>

                {/* Saved Items Feed */}
                <div className="max-h-95 overflow-y-auto divide-y divide-border/60 scrollbar-thin">
                    {savedItems.length === 0 ? (
                        <div className="p-8 text-center space-y-2">
                            <div className="size-10 rounded-full bg-surface-secondary text-muted-foreground flex items-center justify-center mx-auto">
                                <Heart className="size-5" />
                            </div>
                            <p className="text-xs font-bold text-foreground">No saved listings yet</p>
                            <p className="text-[11px] text-muted-foreground">Click the heart icon on any flat, resort, or turf to save it for later.</p>
                        </div>
                    ) : (
                        savedItems.slice(0, 4).map((item) => (
                            <div key={item.id} className="p-3.5 flex items-center gap-3 transition-colors hover:bg-surface-secondary/70 group relative">
                                <Link href={item.href} onClick={onClose} className="relative size-16 rounded-2xl overflow-hidden bg-zinc-900 shrink-0 block cursor-pointer">
                                    <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                </Link>

                                <Link href={item.href} onClick={onClose} className="min-w-0 flex-1 space-y-1 block cursor-pointer">
                                    <div className="flex items-center gap-1.5">
                                        <span className="px-1.5 py-0.2 rounded-md bg-accent/10 text-accent text-[9px] font-extrabold uppercase tracking-wider">{item.category}</span>
                                    </div>
                                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">{item.title}</p>
                                    <div className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
                                        <MapPin className="size-3 text-primary shrink-0" />
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                    <p className="text-xs font-extrabold text-foreground">
                                        {item.price} <span className="text-[10px] font-normal text-muted-foreground">{item.pricePeriod}</span>
                                    </p>
                                </Link>

                                <button type="button" onClick={(e) => onRemoveItem(item.id, e)} className="size-7 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors shrink-0 cursor-pointer" title="Remove from saved">
                                    <X className="size-3.5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Bottom Footer */}
                <div className="p-3 border-t border-border bg-surface/50 text-center">
                    <Link href="/saved" onClick={onClose} className="inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-primary hover:text-primary-hover transition-colors w-full py-1 cursor-pointer">
                        <span>View all saved listings</span>
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SavedDropdown;
