"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ExternalLink } from "@/components/Icons";
import { ChatListingContext, MessagePillar } from "@/constants/messagesData";
import { useLocale } from "@/hooks/useLocale";

interface ListingDetailCardProps {
    listing: ChatListingContext;
    category: MessagePillar;
}

export const ListingDetailCard = ({ listing, category }: ListingDetailCardProps) => {
    const { isBn, locale } = useLocale();

    return (
        <div className="rounded-2xl border border-border overflow-hidden bg-surface-secondary/40 dark:bg-surface/30 p-3.5 space-y-3 shadow-2xs">
            <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden border border-border">
                <Image src={listing.image} alt={listing.title} fill className="object-cover" />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white">{category.toUpperCase()}</span>
            </div>

            <div className="space-y-1">
                <h4 className="text-xs sm:text-[13px] font-black text-foreground line-clamp-2">{isBn ? listing.titleBn : listing.title}</h4>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <MapPin className="size-3 text-accent shrink-0" />
                    <span className="truncate">{isBn ? listing.locationBn : listing.location}</span>
                </p>
            </div>

            <div className="pt-2 border-t border-border flex items-baseline justify-between">
                <span className="text-sm font-black text-primary">
                    {isBn ? listing.priceBn : listing.price}
                    <span className="text-xs text-muted-foreground font-normal ml-0.5">{isBn ? listing.priceUnitBn : listing.priceUnit}</span>
                </span>
            </div>

            {/* Specs / Amenities Chips */}
            {listing.specs && listing.specs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                    {listing.specs.map((sp, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white dark:bg-card border border-border text-foreground">
                            {isBn ? sp.bn : sp.en}
                        </span>
                    ))}
                </div>
            )}

            <Link href={`/${locale}${listing.href}`} className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover shadow-2xs transition-colors">
                <span>{isBn ? "সম্পূর্ণ বিজ্ঞাপন দেখুন" : "View Full Listing"}</span>
                <ExternalLink className="size-3.5" />
            </Link>
        </div>
    );
};

export default ListingDetailCard;
