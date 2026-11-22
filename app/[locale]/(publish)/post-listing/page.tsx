import { Metadata } from "next";
import Link from "next/link";
import {
    Home,
    Hotel,
    Trophy,
    Building2,
    ArrowRight,
    ShieldCheck,
} from "@/components/Icons";

export const metadata: Metadata = {
    title: "Publish Listing Studio | FindBookStay",
    description: "Choose your category to publish a listing across all 4 pillars of FindBookStay.",
};

const PILLARS = [
    {
        id: "rent",
        title: "Rent Homes & Seats",
        badge: "Direct Listing",
        tag: "TENANTS & FAMILIES",
        desc: "List family apartments, bachelor seats, sublets, duplexes, or rooms for rent with direct tenant verification.",
        icon: Home,
        href: "/post-listing/rent",
        cta: "Start Rental Listing",
        stats: "3,800+ Active Inquiries This Week",
        color: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
        badgeColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    },
    {
        id: "book",
        title: "Book Stays & Resorts",
        badge: "Direct Booking",
        tag: "TRAVELERS & GUESTS",
        desc: "Publish boutique resorts, seaside villas, vacation cottages, or city hotels with direct guest reservations.",
        icon: Hotel,
        href: "/post-listing/book",
        cta: "Start Resort Listing",
        stats: "Cox's Bazar, Sajek, Sylhet Getaways",
        color: "hover:border-teal-500/50 hover:shadow-teal-500/10",
        badgeColor: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
    },
    {
        id: "sports",
        title: "Sports & Turfs",
        badge: "Hourly Slots",
        tag: "PLAYERS & TEAMS",
        desc: "List artificial football turfs, indoor cricket arenas, and badminton courts for tournament and match slots.",
        icon: Trophy,
        href: "/post-listing/sports",
        cta: "Start Turf Listing",
        stats: "Instant WhatsApp & Call Bookings",
        color: "hover:border-amber-500/50 hover:shadow-amber-500/10",
        badgeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    },
    {
        id: "buy",
        title: "Buy Real Estate",
        badge: "Verified Deed",
        tag: "DIRECT BUYERS",
        desc: "Sell residential flats, duplexes, approved plots, and commercial floors with direct buyer inquiries.",
        icon: Building2,
        href: "/post-listing/buy",
        cta: "Start Property Listing",
        stats: "Dhaka, Chittagong Prime Properties",
        color: "hover:border-blue-500/50 hover:shadow-blue-500/10",
        badgeColor: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
    },
];

export default function PublishIndexPage() {
    return (
        <div className="container mx-auto px-4 py-12 sm:py-16 max-w-6xl">
            {/* Studio Hero Header */}
            <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-wide">
                    <span className="size-2 rounded-full bg-accent" />
                    <span>FINDBOOKSTAY LISTING STUDIO &bull; 100% FREE PUBLISHING</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
                    Which Type of Space Would You Like to Publish?
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Choose from one of our four core pillars below. Experience our 5-step guided wizard with live feed preview and direct verified inquiries.
                </p>
            </div>

            {/* 4 Pillar Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PILLARS.map((p) => {
                    const Icon = p.icon;
                    return (
                        <Link
                            key={p.id}
                            href={p.href}
                            className={`group relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${p.color}`}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="size-14 rounded-2xl bg-surface-secondary dark:bg-surface text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300 shadow-xs">
                                        <Icon className="size-7" />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${p.badgeColor}`}>
                                            {p.badge}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <span className="text-[11px] font-black tracking-wider text-accent uppercase">
                                        {p.tag}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                                        {p.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {p.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                                    <ShieldCheck className="size-4 text-accent" />
                                    {p.stats}
                                </span>

                                <span className="inline-flex items-center gap-2 text-xs font-black text-primary group-hover:text-accent transition-colors">
                                    <span>{p.cta}</span>
                                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

