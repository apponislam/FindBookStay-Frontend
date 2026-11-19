import React from "react";
import type { Metadata } from "next";
import HomeBanners from "@/components/home/HomeBanners";
import HomeSearchBar from "@/components/home/HomeSearchBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedRentals from "@/components/home/FeaturedRentals";
import TrendingStays from "@/components/home/TrendingStays";
import SportsVenues from "@/components/home/SportsVenues";
import FeaturedBuyProperties from "@/components/home/FeaturedBuyProperties";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HostBannerCTA from "@/components/home/HostBannerCTA";

export const metadata: Metadata = {
    title: "FindBookStay | Verified Home Rentals, Stays, Sports Turfs & Properties",
    description:
        "Rent verified flats and bachelor seats, book luxury hotels and scenic resorts, reserve floodlit sports turfs, and buy prime real estate properties on FindBookStay.",
};

const HomePage = () => {
    return (
        <main className="flex-1 w-full flex flex-col">
            {/* 1. Hero Banners Carousel */}
            <HomeBanners />

            {/* 2. Floating Multi-Purpose Search Bar */}
            <HomeSearchBar />

            {/* 3. Browse By Category */}
            <CategoryGrid />

            {/* 4. Featured Verified Rentals (Rent Pillar) */}
            <FeaturedRentals />

            {/* 5. Trending Stays & Resorts (Book Pillar) */}
            <TrendingStays />

            {/* 6. Live Turf & Arena Booking (Sports Pillar) */}
            <SportsVenues />

            {/* 7. Prime Properties for Sale (Buy Pillar) */}
            <FeaturedBuyProperties />

            {/* 8. Why Choose Us (Trust & Verification Framework) */}
            <WhyChooseUs />

            {/* 9. Partner / Host Listing Call-to-Action */}
            <HostBannerCTA />
        </main>
    );
};

export default HomePage;
