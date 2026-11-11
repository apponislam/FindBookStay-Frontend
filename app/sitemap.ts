import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/constants/routes";

const BASE_URL = "https://findbookstay.com";
const STATIC_DATE = new Date("2026-01-01T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: STATIC_DATE,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/post-listing`,
            lastModified: STATIC_DATE,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/sitemap`,
            lastModified: STATIC_DATE,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: STATIC_DATE,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/trust`,
            lastModified: STATIC_DATE,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/help`,
            lastModified: STATIC_DATE,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/careers`,
            lastModified: STATIC_DATE,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: STATIC_DATE,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: STATIC_DATE,
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];

    // Add main category index pages and their subcategory pages
    for (const category of CATEGORIES) {
        sitemapEntries.push({
            url: `${BASE_URL}${category.href}`,
            lastModified: STATIC_DATE,
            changeFrequency: "daily",
            priority: 0.9,
        });

        for (const item of category.items) {
            sitemapEntries.push({
                url: `${BASE_URL}${item.href}`,
                lastModified: STATIC_DATE,
                changeFrequency: "weekly",
                priority: 0.8,
            });
        }
    }

    return sitemapEntries;
}
