import React from "react";
import type { Metadata } from "next";
import HomeBanners from "@/components/home/HomeBanners";

export const metadata: Metadata = {
    title: "FindBookStay | Verified Home Rentals, Stays, Sports Turfs & Properties",
    description:
        "Rent verified flats and bachelor seats, book luxury hotels and scenic resorts, reserve floodlit sports turfs, and buy prime real estate properties on FindBookStay.",
};

const HomePage = () => {
    return (
        <main className="flex-1 w-full flex flex-col">
            <HomeBanners />
        </main>
    );
};

export default HomePage;
