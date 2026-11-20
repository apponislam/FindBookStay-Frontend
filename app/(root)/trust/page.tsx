import React from "react";
import type { Metadata } from "next";
import TrustView from "@/components/trust/TrustView";

export const metadata: Metadata = {
    title: "Verification Guarantee — Trust & Safety | FindBookStay",
    description:
        "Learn about FindBookStay's 4-pillar verification guarantee: 100% physically inspected rental homes, authenticated vacation stays, live-locked sports turfs, and vetted land titles.",
};

const TrustPage = () => {
    return <TrustView />;
};

export default TrustPage;
