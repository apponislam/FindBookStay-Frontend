import React from "react";
import type { Metadata } from "next";
import siteData from "@/constants/siteData";
import HelpView from "@/components/help/HelpView";

export const metadata: Metadata = {
    title: `Help & Support Center | ${siteData.name}`,
    description: "Get 24/7 assistance, answers to frequently asked questions about home rentals, hotel stays, sports turfs, and property purchases on FindBookStay.",
};

const HelpPage = () => {
    return <HelpView />;
};

export default HelpPage;
