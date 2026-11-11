import React from "react";
import { Building2, Hotel, Trophy, Home } from "@/components/Icons";

export interface ServiceItem {
    id: string;
    label: string;
    tagline: string;
    info: string;
    href: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
}

export const SERVICES: ServiceItem[] = [
    {
        id: "rent",
        label: "Rent Homes & Seats",
        tagline: "Rentals",
        info: "Flats, family houses, bachelor seats & sublets",
        href: "/post-listing?type=rent",
        icon: Building2,
    },
    {
        id: "book",
        label: "Book Stays & Resorts",
        tagline: "Stays",
        info: "Boutique hotels, nature resorts & holiday homes",
        href: "/post-listing?type=book",
        icon: Hotel,
    },
    {
        id: "sports",
        label: "Sports & Turfs",
        tagline: "Turfs",
        info: "Football & cricket turfs, indoor courts",
        href: "/post-listing?type=sports",
        icon: Trophy,
    },
    {
        id: "buy",
        label: "Buy Real Estate",
        tagline: "Real Estate",
        info: "Residential duplexes, luxury apartments & land plots",
        href: "/post-listing?type=buy",
        icon: Home,
    },
];

export default SERVICES;
