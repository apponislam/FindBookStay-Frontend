import React, { Suspense } from "react";
import { Metadata } from "next";
import { SportsListings } from "@/components/sports/SportsListings";

export const metadata: Metadata = {
    title: "Book Sports Turfs, Football Grounds & Arenas in Bangladesh | FindBookStay",
    description:
        "Instant hourly booking for artificial grass soccer & cricket turfs, indoor badminton courts, Olympic swimming pools, and corporate tournament grounds across Dhaka and Bangladesh.",
};

const SportsPageLoading = () => {
    return (
        <div className="py-12 animate-pulse space-y-6">
            <div className="h-8 bg-zinc-200 rounded-xl w-1/3" />
            <div className="h-4 bg-zinc-100 rounded-lg w-1/2" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
                <div className="hidden lg:block h-96 bg-zinc-100 rounded-2xl" />
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-80 bg-zinc-100 rounded-2xl" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function SportsPage() {
    return (
        <main className="min-h-screen bg-background pb-16">
            <div className="container mx-auto px-4">
                <Suspense fallback={<SportsPageLoading />}>
                    <SportsListings />
                </Suspense>
            </div>
        </main>
    );
}
