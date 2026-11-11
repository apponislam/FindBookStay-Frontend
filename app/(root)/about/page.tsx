import React from "react";
import type { Metadata } from "next";
import siteData from "@/constants/siteData";
import AboutView from "@/components/about/AboutView";

export const metadata: Metadata = {
    title: `About Us | ${siteData.name}`,
    description:
        "Learn about FindBookStay's mission to create an international verified marketplace for home rentals, hotel stays, sports turf reservations, and property buying.",
};

const AboutPage = () => {
    return <AboutView />;
};

export default AboutPage;
