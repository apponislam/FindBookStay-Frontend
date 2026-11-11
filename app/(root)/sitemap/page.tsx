import type { Metadata } from "next";
import SitemapView from "@/components/sitemap/SitemapView";

export const metadata: Metadata = {
    title: "Platform Sitemap & Complete Directory | FindBookStay",
    description: "Explore all verified property listings to buy, homes to rent, luxury hotel suites, and sports turf reservations on FindBookStay.com.",
};

const SitemapPage = () => {
    return <SitemapView />;
};

export default SitemapPage;
