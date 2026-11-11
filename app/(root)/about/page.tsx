import React from "react";
import type { Metadata } from "next";
import siteData from "@/constants/siteData";
import AboutView from "@/components/about/AboutView";

export const metadata: Metadata = {
    title: `About Us | ${siteData.name}`,
    description:
        "Learn about FindBookStay's mission to create an international verified marketplace for property buying, home rentals, hotel stays, and sports turf reservations.",
};

const AboutPage = () => {
    return <AboutView />;
};

export default AboutPage;
