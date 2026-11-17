import { awards, education, profile, projects, seo } from "@/data/portfolio";

const site = profile.siteUrl;
const personId = `${site}/#person`;
const websiteId = `${site}/#website`;

function absolute(href: string): string {
  return new URL(href, site).toString();
}

/**
 * schema.org JSON-LD for the home page: a ProfilePage whose main entity is
 * the Person, plus the WebSite and each project. Built from data/portfolio.ts
 * so it never drifts from the visible content.
 */
export function buildStructuredData() {
  const sameAs = profile.socials.filter((s) => s.kind !== "email").map((s) => s.href);
  const [currentStudy, ...pastStudy] = education;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    givenName: profile.lastName,
    familyName: profile.firstName,
    url: site,
    image: absolute("/images/FooJiaSeng.jpeg"),
    email: profile.email,
    jobTitle: "Software Engineer",
    description: seo.description,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Selangor",
      addressCountry: "MY",
    },
    sameAs,
    knowsAbout: [...profile.coreSkills],
    ...(currentStudy && {
      affiliation: { "@type": "CollegeOrUniversity", name: currentStudy.institution },
    }),
    alumniOf: pastStudy.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
    award: awards
      .filter((a) => a.kind !== "academic")
      .map((a) => `${a.rank}, ${a.event} (${a.organiser}, ${a.year})`),
  };

  const projectNodes = projects.map((p) => {
    const sourceCode = p.links.find((l) => l.kind === "code" && l.href.trim() !== "");
    const live = p.links.find((l) => l.kind === "live" && l.href.trim() !== "");
    return {
      "@type": "CreativeWork",
      "@id": `${site}/#project-${p.slug}`,
      name: p.title,
      description: p.tagline,
      creator: { "@id": personId },
      keywords: p.tech.join(", "),
      ...(live && { url: live.href }),
      ...(sourceCode && { codeRepository: sourceCode.href }),
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site,
        name: profile.name,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site}/#profilepage`,
        url: site,
        name: seo.title,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        hasPart: projectNodes.map((p) => ({ "@id": p["@id"] })),
      },
      person,
      ...projectNodes,
    ],
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so content can't close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
