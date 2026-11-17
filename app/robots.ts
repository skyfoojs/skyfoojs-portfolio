import type { MetadataRoute } from "next";
import { profile } from "@/data/portfolio";

// "*" covers search engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended, …). Add a per-bot rule here to block one.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${profile.siteUrl}/sitemap.xml`,
    host: profile.siteUrl,
  };
}
