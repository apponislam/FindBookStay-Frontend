"use client";

import React from "react";
import { Building2, MapPin, Navigation, Sparkles } from "@/components/Icons";
import { RentProperty } from "../types";

interface RentLocationAndNeighborhoodProps {
    property: RentProperty;
}

export const RentLocationAndNeighborhood = ({ property }: RentLocationAndNeighborhoodProps) => {
    const nearby = property.nearbyPlaces || [
        { name: "MRT Metro Station", distance: "6 mins walk (450m)", type: "Metro" },
        { name: "International School & College", distance: "4 mins drive (1.2 km)", type: "School" },
        { name: "Specialized Hospital & Emergency Clinic", distance: "5 mins drive (1.5 km)", type: "Hospital" },
        { name: "Agora / Shwapno Super Shop", distance: "3 mins walk (200m)", type: "Market" },
        { name: "Community Lake Park & Walking Track", distance: "2 mins walk (150m)", type: "Park" },
    ];

    const openInMaps = () => {
        const query = encodeURIComponent(`${property.location.address}, ${property.location.city}`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
    };

    return (
        <section className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-border flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Location & Neighborhood</h2>
                        <p className="text-xs text-muted-foreground">Nearby landmarks, transit, and daily essentials</p>
                    </div>
                </div>

                <button onClick={openInMaps} type="button" className="px-3.5 py-1.5 rounded-xl bg-surface-secondary hover:bg-border text-foreground text-xs font-semibold flex items-center gap-1.5 border border-border transition-all cursor-pointer">
                    <Navigation className="w-3.5 h-3.5 text-primary" />
                    <span>View on Google Maps</span>
                </button>
            </div>

            {/* Address Banner */}
            <div className="p-4 rounded-2xl bg-surface-secondary/70 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Full Verified Address</div>
                    <div className="text-sm font-bold text-foreground mt-0.5">{property.location.address}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                        {property.location.area}, {property.location.city}
                    </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20 shrink-0">Prime Commute Zone</span>
            </div>

            {/* Nearby Highlights List */}
            <div className="space-y-3 pt-1">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Points of Interest & Travel Times
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nearby.map((place, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-surface-secondary/50 border border-border flex items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2.5 truncate">
                                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <Building2 className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-semibold text-foreground truncate">{place.name}</span>
                            </div>
                            <span className="px-2.5 py-1 rounded-lg bg-surface text-muted-foreground text-[11px] font-medium border border-border shrink-0">{place.distance}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
