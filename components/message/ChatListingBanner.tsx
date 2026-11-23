"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ExternalLink } from "@/components/Icons";
import { ChatListingContext } from "@/constants/messagesData";
import { useLocale } from "@/hooks/useLocale";

interface ChatListingBannerProps {
    listing: ChatListingContext;
    onOpenDetails?: () => void;
}

export const ChatListingBanner = ({ listing, onOpenDetails }: ChatListingBannerProps) => {
    const { isBn, locale } = useLocale();

    return (
        <div className="px-4 sm:px-6 py-2.5 bg-white/90 dark:bg-card/90 backdrop-blur-md border-b border-border/80 flex items-center justify-between gap-3 text-xs shrink-0 shadow-2xs select-none">
            <div
                onClick={onOpenDetails}
                className="flex items-center gap-3 min-w-0 cursor-pointer group"
                title={isBn ? "বিস্তারিত দেখতে ক্লিক করুন" : "Click to view details"}
            >
                <div className="relative size-10 rounded-xl overflow-hidden shrink-0 border border-border group-hover:opacity-90 transition-opacity">
                    <Image
                        src={listing.image}
                        alt={listing.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="min-w-0 space-y-0.5">
                    <h4 className="font-extrabold text-foreground truncate text-xs sm:text-[13px] group-hover:text-primary transition-colors">
                        {isBn ? listing.titleBn : listing.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground truncate">
                        <MapPin className="size-3 text-accent shrink-0" />
                        <span className="truncate">
                            {isBn ? listing.locationBn : listing.location}
                        </span>
                        <span className="font-black text-primary ml-1 shrink-0">
                            {isBn ? listing.priceBn : listing.price} {isBn ? listing.priceUnitBn : listing.priceUnit}
                        </span>
                    </div>
                </div>
            </div>

            <Link
                href={`/${locale}${listing.href}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-secondary dark:bg-surface hover:bg-surface-secondary/80 border border-border text-xs font-bold text-foreground transition-colors shrink-0 shadow-2xs"
            >
                <span>{isBn ? "লিস্টিং দেখুন" : "View"}</span>
                <ExternalLink className="size-3 text-muted-foreground" />
            </Link>
        </div>
    );
};

export default ChatListingBanner;

