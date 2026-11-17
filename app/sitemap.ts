import type { MetadataRoute } from "next";
import { profile } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: profile.siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.siteUrl}${profile.resumeUrl}`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${profile.siteUrl}/llms.txt`, lastModified, changeFrequency: "monthly", priority: 0.3 },
  ];
}
