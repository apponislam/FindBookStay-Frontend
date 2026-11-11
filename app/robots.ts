import type { MetadataRoute } from "next";
import siteData from "@/constants/siteData";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/account/", "/admin/"],
            },
            {
                userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended", "Applebot-Extended", "cohere-ai"],
                allow: ["/", "/llms.txt", "/llms-full.txt", "/sitemap.xml"],
            },
        ],
        sitemap: `${siteData.url}/sitemap.xml`,
        host: siteData.url,
    };
}
