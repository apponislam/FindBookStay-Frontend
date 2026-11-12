import React from "react";
import type { Metadata } from "next";
import siteData from "@/constants/siteData";
import ContactView from "@/components/contact/ContactView";

export const metadata: Metadata = {
    title: `Contact Us & Concierge Support | ${siteData.name}`,
    description: "Contact FindBookStay. Get direct 24/7 concierge assistance for home rentals, hotel stays, sports turf reservations, property sales, and host partnerships.",
};

const ContactPage = () => {
    return <ContactView />;
};

export default ContactPage;

