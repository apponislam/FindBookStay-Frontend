import type { MetadataRoute } from "next";

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
        sitemap: "https://findbookstay.com/sitemap.xml",
        host: "https://findbookstay.com",
    };
}
