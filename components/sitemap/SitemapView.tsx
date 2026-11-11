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
        id: "rent",
        number: "01",
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
        number: "02",
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
        number: "03",
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
        id: "buy",
        number: "04",
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
                desc: "Our trust standards, host verification guidelines, and safety practices",
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
                desc: "Host profile verification, authentic specifications and fraud protection",
                href: "/trust",
            },
            {
                name: "Help & Support Center",
                desc: "24/7 concierge assistance, dispute resolution, booking changes and FAQs",
                href: "/help",
            },
            {
                name: "Terms of Service",
                desc: "Host obligations, guest cancellation policies, liability and platform rules",
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
            {/* 1. EDITORIAL HERO HEADER                                       */}
            {/* ============================================================== */}
            <div className="border-b border-[#E2EAE6] bg-linear-to-b from-[#F0F5F3]/80 via-[#F8FAF9] to-white">
                <div className="container mx-auto px-4 py-12 lg:py-16">
                    <div className="max-w-3xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2EAE6] shadow-2xs text-xs font-semibold text-[#073B35]">
                            <span className="size-2 rounded-full bg-[#10B981]" />
                            <span className="uppercase tracking-wider text-[11px] font-bold">Platform Directory</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#073B35] tracking-tight">FindBookStay Sitemap</h1>

                        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">A complete human-readable catalog of all marketplace destinations. Browse property rentals, hotel reservations, sports turf bookings, real estate purchases, and platform legal disclosures.</p>
                    </div>

                    {/* Quick Category Jump Pills */}
                    <div className="flex flex-wrap gap-2 pt-6">
                        {SECTIONS.map((sec) => (
                            <a
                                key={sec.id}
                                href={`#${sec.id}`}
                                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2EAE6] text-[#172B2A] hover:border-[#10B981] hover:text-[#073B35] hover:bg-[#F0F5F3] shadow-2xs transition-all duration-200"
                            >
                                <span className="font-mono text-[#10B981] font-semibold">{sec.number}</span>
                                <span>{sec.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* 2. CATEGORY SECTIONS GRID                                      */}
            {/* ============================================================== */}
            <div className="container mx-auto px-4 py-12 lg:py-16 space-y-16">
                {SECTIONS.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-28 space-y-6">
                        {/* Section Title Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E2EAE6] pb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xl sm:text-2xl font-mono font-bold text-[#10B981]">{section.number}</span>
                                <h2 className="text-xl sm:text-2xl font-bold text-[#073B35]">{section.title}</h2>
                            </div>
                            <Link href={section.href} className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] hover:text-[#059669] transition-colors group">
                                <span>Browse all in {section.title}</span>
                                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>

                        {/* Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.items.map((item, idx) => (
                                <Link key={idx} href={item.href} className="cursor-pointer group flex flex-col justify-between p-4 rounded-xl border border-[#E2EAE6] bg-[#FFFFFF] hover:border-[#10B981]/60 hover:bg-[#F8FAF9] hover:shadow-2xs transition-all duration-200">
                                    <div>
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-sm font-semibold text-[#172B2A] group-hover:text-[#073B35] transition-colors">{item.name}</h3>
                                            {item.badge && <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#073B35] uppercase tracking-wide">{item.badge}</span>}
                                        </div>
                                        <p className="mt-1.5 text-xs text-[#64748B] leading-relaxed line-clamp-2">{item.desc}</p>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-[#E2EAE6]/60 flex items-center justify-between text-xs font-medium text-[#10B981]">
                                        <span className="font-mono text-[11px] text-[#64748B] group-hover:text-[#073B35] transition-colors truncate max-w-50">{item.href}</span>
                                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default SitemapView;
