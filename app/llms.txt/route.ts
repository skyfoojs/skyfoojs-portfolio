import { awards, education, experience, profile, projects, seo } from "@/data/portfolio";

// Plain-text site summary for LLM crawlers (https://llmstxt.org), built from data/portfolio.ts.
export const dynamic = "force-static";

function build(): string {
  const site = profile.siteUrl;
  const lines: string[] = [
    `# ${profile.name}`,
    "",
    `> ${seo.description}`,
    "",
    ...profile.bio,
    "",
    "## Experience",
    "",
    ...experience.map(
      (e) => `- ${e.role}, ${e.company} (${e.period}, ${e.location}): ${e.bullets[0] ?? ""}`,
    ),
    "",
    "## Awards",
    "",
    ...awards.map((a) => {
      const proof = a.proofUrl ? ` Results: ${a.proofUrl}` : "";
      const name = a.rank === a.event ? a.event : `${a.rank}, ${a.event}`;
      return `- ${name} (${a.organiser}, ${a.year}). ${a.description}${proof}`;
    }),
    "",
    "## Projects",
    "",
    ...projects.map((p) => {
      const link = p.links.find((l) => l.href.trim() !== "");
      const title = link ? `[${p.title}](${link.href})` : p.title;
      return `- ${title}: ${p.tagline} ${p.context}. Tech: ${p.tech.join(", ")}.`;
    }),
    "",
    "## Education",
    "",
    ...education.map((e) => `- ${e.qualification}, ${e.institution} (${e.period})`),
    "",
    "## Links",
    "",
    `- [Portfolio](${site})`,
    `- [Resume (PDF)](${site}${profile.resumeUrl})`,
    ...profile.socials.map((s) => `- [${s.label}](${s.href})`),
    "",
  ];
  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
