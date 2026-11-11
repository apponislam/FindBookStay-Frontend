import React from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

interface SitemapItem {
    name: string;
    desc: string;
    href: string;
    badge?: string;
}

interface SitemapSection {
    id: string;
    number: string;
    title: string;
    href: string;
    items: SitemapItem[];
}

const SECTIONS: SitemapSection[] = [
    {
        id: "buy",
        number: "01",
        title: "Buy Properties",
        href: "/buy",
        items: [
            {
                name: "Residential Properties",
                desc: "Family flats, townhouses and homes in prime vetted neighborhoods",
                href: "/buy/residential",
            },
            {
                name: "Commercial Properties",
                desc: "Corporate offices, retail plazas, shopping centers and commercial plots",
                href: "/buy/commercial",
            },
            {
                name: "Apartments & Flats",
                desc: "Modern luxury high-rise condominium units and cozy apartments",
                href: "/buy/apartments",
            },
            {
                name: "Houses & Villas",
                desc: "Independent duplexes, standalone executive homes and private villas",
                href: "/buy/houses",
            },
            {
                name: "Land & Plots",
                desc: "Verified residential, commercial and farmland plots with vetted title deeds",
                href: "/buy/land",
            },
            {
                name: "New Developments",
                desc: "Pre-launch gated communities, off-plan projects and developer deals",
                href: "/buy/new-developments",
                badge: "New",
            },
        ],
    },
    {
        id: "rent",
        number: "02",
        title: "Rent Properties",
        href: "/rent",
        items: [
            {
                name: "Family Apartments",
                desc: "2 to 4-bedroom rental flats in secure, family-friendly communities",
                href: "/rent/family-apartments",
            },
            {
                name: "Family Houses",
                desc: "Full independent duplexes, standalone villas and multi-story homes",
                href: "/rent/family-houses",
            },
            {
                name: "Bachelor Seats",
                desc: "Single and shared seats with high-speed WiFi, meal services and all utilities",
                href: "/rent/bachelor-seats",
                badge: "Popular",
            },
            {
                name: "Shared Rooms",
                desc: "Budget-conscious shared living spaces with verified flatmates",
                href: "/rent/shared-rooms",
            },
            {
                name: "Monthly Sublets",
                desc: "Furnished short and medium-term monthly leases for professionals",
                href: "/rent/sublets",
            },
            {
                name: "Commercial Rentals",
                desc: "Corporate office spaces, retail storefronts, showrooms and commercial floors",
                href: "/rent/commercial",
            },
        ],
    },
    {
        id: "book",
        number: "03",
        title: "Book Stays",
        href: "/book",
        items: [
            {
                name: "Boutique & City Hotels",
                desc: "Handpicked 5-star, business and boutique hotels in prime city centers",
                href: "/book/hotels",
            },
            {
                name: "Scenic Resorts",
                desc: "Lakeside retreats, mountain lodges, beach resorts and nature escapes",
                href: "/book/resorts",
                badge: "Hot",
            },
            {
                name: "Guest Houses & B&Bs",
                desc: "Cozy home-style bed & breakfast stays with hospitable local hosts",
                href: "/book/guest-houses",
            },
            {
                name: "Holiday Homes",
                desc: "Private seaside villas, rustic mountain cabins and vacation cottages",
                href: "/book/holiday-homes",
            },
            {
                name: "Serviced Short Stays",
                desc: "Executive suites with fully equipped kitchens, workspaces and concierge",
                href: "/book/short-stay",
            },
            {
                name: "Luxury VIP Suites",
                desc: "Exclusive presidential penthouses, private pool villas and weekend retreats",
                href: "/book/luxury",
            },
        ],
    },
    {
        id: "sports",
        number: "04",
        title: "Sports & Turfs",
        href: "/sports",
        items: [
            {
                name: "Turf Booking",
                desc: "FIFA-standard artificial grass soccer and cricket turfs with floodlights",
                href: "/sports/turf-booking",
                badge: "Trending",
            },
            {
                name: "Football Grounds",
                desc: "Full standard size grass grounds for club matches, practice and leagues",
                href: "/sports/football-grounds",
            },
            {
                name: "Indoor Sports Courts",
                desc: "Badminton courts, basketball arenas, table tennis hubs and futsal courts",
                href: "/sports/indoor-sports",
            },
            {
                name: "Swimming & Wellness",
                desc: "Olympic training pools, aquatic centers, wellness clubs and health centers",
                href: "/sports/swimming",
            },
            {
                name: "Tournament Venues",
                desc: "Book complete tournament complexes, grandstands and corporate sports days",
                href: "/sports/tournaments",
            },
            {
                name: "Other Activities",
                desc: "Paintball arenas, bowling alleys, go-kart tracks and recreation centers",
                href: "/sports/other-activities",
            },
        ],
    },
    {
        id: "explore",
        number: "05",
        title: "Explore & Destinations",
        href: "/explore",
        items: [
            {
                name: "Popular Locations",
                desc: "Explore top cities, metropolitan hubs and scenic regional getaways",
                href: "/explore/locations",
            },
            {
                name: "Featured Properties",
                desc: "Curated premium listings with top ratings, verified titles and guest reviews",
                href: "/explore/featured",
            },
            {
                name: "Popular Hotels",
                desc: "Traveler favorite stays across premier international destinations",
                href: "/explore/popular-hotels",
            },
            {
                name: "Recently Added",
                desc: "Latest verified listings updated daily across all marketplace categories",
                href: "/explore/recently-added",
                badge: "Live",
            },
            {
                name: "Verification Guarantee",
                desc: "How we inspect 100% of properties and turfs on-site to eliminate scams",
                href: "/explore/guarantee",
            },
            {
                name: "About FindBookStay",
                desc: "Our platform story, vision, technology and international concierge team",
                href: "/about",
            },
        ],
    },
    {
        id: "company",
        number: "06",
        title: "Company & Resources",
        href: "/about",
        items: [
            {
                name: "Post a Listing",
                desc: "Host portal for homeowners, hoteliers and turf managers to earn safely",
                href: "/post-listing",
                badge: "Host",
            },
            {
                name: "Verification Guarantee",
                desc: "Biometric identity verification, title deed checks and fraud protection",
                href: "/trust",
            },
            {
                name: "Help & Support Center",
                desc: "24/7 concierge assistance, dispute resolution, booking changes and FAQs",
                href: "/help",
            },
            {
                name: "Careers & Team",
                desc: "Join our fast-growing engineering, operations and physical inspection teams",
                href: "/careers",
            },
            {
                name: "Terms of Service",
                desc: "Host obligations, guest cancellation policies, liability and payment rules",
                href: "/terms",
            },
            {
                name: "Privacy Policy",
                desc: "Data encryption, GDPR compliance, cookie policies and user data rights",
                href: "/privacy",
            },
        ],
    },
];

const SitemapView = () => {
    return (
        <div className="w-full bg-[#FFFFFF] text-[#172B2A]">
            {/* ============================================================== */}
            {/* 1. EDITORIAL HEADER SECTION                                    */}
            {/* ============================================================== */}
            <div className="border-b border-[#E2EAE6] bg-[#F8FAF9]/70">
                <div className="container mx-auto px-4 py-12 lg:py-16">
                    <div className="max-w-3xl">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#10B981] mb-2">
                            Platform Directory
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#073B35] tracking-tight">
                            Sitemap
                        </h1>
                        <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
                            A clear, complete overview of all verified properties, rental accommodations, hotels, and sports turf facilities across FindBookStay.
                        </p>

                        {/* Quick Jump Category Links */}
                        <div className="mt-8 flex items-center flex-wrap gap-2 text-xs">
                            <span className="text-[#64748B] font-medium mr-1">Jump to:</span>
                            {SECTIONS.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="cursor-pointer px-3 py-1.5 rounded-full border border-[#E2EAE6] bg-white text-[#172B2A] hover:border-[#10B981] hover:text-[#073B35] hover:bg-[#F0F5F3] transition-colors"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* 2. DIRECTORY SECTIONS: CLEAN MULTI-COLUMN LAYOUT               */}
            {/* ============================================================== */}
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                    {SECTIONS.map((section) => (
                        <div
                            key={section.id}
                            id={section.id}
                            className="scroll-mt-28 space-y-4"
                        >
                            {/* Section Header with Number & Index Link */}
                            <div className="pb-3 border-b border-[#E2EAE6] flex items-baseline justify-between">
                                <div className="flex items-center gap-2.5">
                                    <span className="text-xs font-mono font-bold text-[#10B981]">
                                        {section.number}
                                    </span>
                                    <h2 className="text-lg font-bold text-[#073B35] tracking-tight">
                                        {section.title}
                                    </h2>
                                </div>
                                <Link
                                    href={section.href}
                                    className="cursor-pointer text-xs font-semibold text-[#10B981] hover:text-[#059669] transition-colors inline-flex items-center gap-1 group"
                                >
                                    <span>Browse</span>
                                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </div>

                            {/* Section Links List */}
                            <ul className="space-y-3.5 pt-1">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="cursor-pointer group flex items-start justify-between gap-3 text-[#172B2A] hover:text-[#073B35] transition-colors"
                                        >
                                            <div className="space-y-0.5 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-[#172B2A] group-hover:text-[#073B35] group-hover:underline underline-offset-4 decoration-[#10B981] transition-all truncate">
                                                        {item.name}
                                                    </span>
                                                    {item.badge && (
                                                        <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-1">
                                                    {item.desc}
                                                </p>
                                            </div>
                                            <ArrowRight className="size-3.5 text-[#A3B5AE] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#10B981] transition-all shrink-0 mt-0.5" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SitemapView;