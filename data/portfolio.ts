/**
 * Single source of truth for all portfolio content.
 * Sources: LinkedIn (Nov 2026) and /public/docs/resume.pdf. Where the two
 * disagreed, the resume wins, except Dean's List dates (LinkedIn).
 * Never add numbers, placements or links that aren't in those sources.
 */

/* ───────────────────────── Types ───────────────────────── */

export interface NavSection {
  id: string;
  label: string;
}

export interface SocialLink {
  kind: "github" | "linkedin" | "email";
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  location: string;
  locationMapUrl: string;
  email: string;
  phone: { display: string; href: string };
  resumeUrl: string;
  siteUrl: string;
  /** Strings cycled by the hero typewriter. */
  roles: readonly string[];
  /** Static line under the typewriter. */
  heroHighlight: { label: string; href: string };
  heroSummary: string;
  bio: readonly string[];
  facts: readonly { label: string; value: string }[];
  coreSkills: readonly string[];
  openToWork: boolean;
  photo: { alt: string; objectPosition: string };
  socials: readonly SocialLink[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Experience {
  slug: string;
  role: string;
  company: string;
  employmentType: string;
  period: string;
  location: string;
  workMode: string;
  team?: string;
  stats: readonly Stat[];
  /** Substrings in bullets that match a stat value are emphasised. */
  bullets: readonly string[];
  tech: readonly string[];
}

export type AwardKind = "podium" | "finalist" | "academic";

export interface Award {
  slug: string;
  event: string;
  organiser: string;
  rank: string;
  year: string;
  description: string;
  kind: AwardKind;
  /** Bento size: "feature" = large 2×2 card, "wide" = 2 columns, "standard" = 1 cell. */
  layout: "feature" | "wide" | "standard";
  projectSlug?: string;
  /** Public results page or other proof. */
  proofUrl?: string;
}

export type ProjectLinkKind = "live" | "demo" | "code" | "results";

export interface ProjectLink {
  kind: ProjectLinkKind;
  label: string;
  /** Empty string = not available yet; the button is hidden. */
  href: string;
}

export interface Project {
  slug: string;
  /** File prefix in /public/projects (<name>.png, <name>_1.png, …). Defaults to slug. */
  imageName?: string;
  title: string;
  tagline: string;
  context: string;
  period?: string;
  bullets: readonly string[];
  contribution?: string;
  tech: readonly string[];
  links: readonly ProjectLink[];
  featured: boolean;
  hackathon: boolean;
}

export type TechIconKey =
  | "typescript" | "javascript" | "python" | "java" | "php" | "sql" | "html" | "css"
  | "nodejs" | "express" | "laravel" | "rest" | "jwt" | "mongodb" | "mysql"
  | "react" | "nextjs" | "tailwind"
  | "aws" | "azure" | "firebase" | "supabase" | "googlecloud" | "vercel"
  | "lightgbm" | "gemini" | "openrouter"
  | "docker" | "git" | "linux" | "postman" | "figma";

export interface TechItem {
  name: string;
  icon: TechIconKey;
}

export interface TechCategory {
  label: string;
  items: readonly TechItem[];
}

export interface Education {
  slug: string;
  qualification: string;
  institution: string;
  period: string;
  location: string;
}

/* ───────────────────────── Content ───────────────────────── */

export const navSections: readonly NavSection[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "awards", label: "Wall of Fame" },
  { id: "projects", label: "Projects" },
  { id: "tech", label: "Tech Stack" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const profile: Profile = {
  name: "Foo Jia Seng",
  firstName: "Foo",
  lastName: "Jia Seng",
  location: "Selangor, Malaysia",
  locationMapUrl: "https://maps.app.goo.gl/tk2SpNd8mUDbRkyeA",
  email: "skyfoojs@gmail.com",
  phone: { display: "+60 17-268 1225", href: "tel:+60172681225" },
  resumeUrl: "/docs/resume.pdf",
  siteUrl: "https://www.skyfoojs.com",
  roles: ["Software Engineer", "Backend & Data Engineering", "2× Hackathon Winner, 1x Finalist"],
  heroHighlight: { label: "3rd Runner-Up · SDC Hackathon 2026", href: "#award-sdc-hackathon-2026" },
  heroSummary:
    "I build backend services and data pipelines: REST APIs in Node.js and TypeScript, AWS Glue ETL into Redshift, and QuickSight analytics.",
  bio: [
    "I'm a Software Engineering student at Sunway University who works mostly on the backend and data side.",
    "As a contract software engineer at Polaris Net, I moved Amazon QuickSight datasets from Athena to Redshift and built AWS Glue ETL workflows. Before that, I was the sole backend developer on Continental's desk booking system.",
    "Outside work I compete: 3rd of 351 teams nationwide at the Malaysia Testing Cup 2026, and 3rd Runner-Up at SDC Hackathon 2026 with Jobee.",
  ],
  facts: [
    { label: "Location", value: "Selangor, Malaysia" },
    { label: "Focus", value: "Backend & Data Engineering" },
    { label: "Studying", value: "Software Engineering, Sunway University" },
    { label: "Latest role", value: "Contract Software Engineer, Polaris Net" },
  ],
  coreSkills: [
    "Node.js", "TypeScript", "Express", "REST APIs", "MongoDB", "MySQL",
    "AWS Glue", "Redshift", "QuickSight", "Docker", "React", "Next.js",
  ],
  openToWork: false,
  photo: { alt: "Portrait of Foo Jia Seng", objectPosition: "50% 22%" },
  socials: [
    { kind: "github", label: "GitHub", href: "https://github.com/skyfoojs" },
    { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/foo-jia-seng/" },
    { kind: "email", label: "Email", href: "mailto:skyfoojs@gmail.com" },
  ],
};

export const experience: readonly Experience[] = [
  {
    slug: "polaris-net",
    role: "Contract Software Engineer",
    company: "Polaris Net Sdn. Bhd.",
    employmentType: "Contract",
    period: "Feb 2026 – Sep 2026",
    location: "Bangsar South, Kuala Lumpur",
    workMode: "Hybrid",
    team: "BRP team · cloud analytics & reporting",
    stats: [
      { value: "~70%", label: "less dataset refresh time" },
      { value: "9.3M rows", label: "processed by AWS Glue ETL" },
      { value: "140 partners", label: "using embedded dashboards" },
    ],
    bullets: [
      "Migrated Amazon QuickSight datasets from Athena to Redshift, replacing full refreshes with incremental updates and cutting refresh time by ~70%",
      "Built and managed AWS Glue ETL workflows processing 9.3M rows into Amazon Redshift and S3",
      "Developed and maintained interactive QuickSight dashboards embedded in PHP-based applications used by 140 partners",
      "Automated a daily sales reporting system (PHPMailer + Linux crontab), deployed to production",
    ],
    tech: ["AWS Glue", "Redshift", "S3", "Athena", "QuickSight", "PHP (Laravel)", "MySQL", "Linux"],
  },
  {
    slug: "continental",
    role: "Web Backend Node.js Developer Intern",
    company: "Continental Tyre (PJ) Malaysia Sdn. Bhd.",
    employmentType: "Internship",
    period: "Apr 2025 – Aug 2025",
    location: "Petaling Jaya, Selangor",
    workMode: "On-site",
    stats: [
      { value: "40+ APIs", label: "built as sole backend developer" },
      { value: "100+ employees", label: "on the desk booking system" },
      { value: "50–400 ms", label: "average API response time" },
    ],
    bullets: [
      "Sole backend developer: built and maintained 40+ RESTful APIs for a Desk Booking System supporting 100+ employees across 1 floor",
      "Designed MongoDB (Mongoose) schemas with indexing and validation; average API response times of 50–400 ms",
      "Implemented JWT authentication and authorization across internal applications",
      "Containerised backend services with Docker, working closely with the frontend team",
      "Built cron-based desk auto-release logic with timezone support, reclaiming 5–10 unused bookings daily; integrated Azure Blob Storage for file uploads",
    ],
    tech: ["Node.js", "Express", "TypeScript", "MongoDB", "Docker", "JWT", "Azure Blob Storage"],
  },
];

export const awards: readonly Award[] = [
  {
    slug: "malaysia-testing-cup-2026",
    event: "Malaysia Testing Cup 2026: Malaysia Qualifier",
    organiser: "Malaysian Software Testing Board (MSTB) · World's Best Tester",
    rank: "3rd Place · 351 teams",
    year: "2026",
    description:
      "3rd of 351 teams across Malaysia, scoring 106.5 / 130 from World's Best Tester judges. Three hours to plan, test and report on an application nobody had seen before. The top 10 go on to represent Malaysia at the World's Best Tester final. Team “Claypot Chicken Rice”.",
    kind: "podium",
    layout: "feature",
    proofUrl: "https://www.worldbesttester.com/results/malaysia-testing-cup-2026-malaysia-qualifier-0zkwe5us",
    projectSlug: "malaysia-testing-cup",
  },
  {
    slug: "sdc-hackathon-2026",
    event: "SDC Hackathon 2026",
    organiser: "Xiamen University Malaysia",
    rank: "3rd Runner-Up",
    year: "2026",
    description:
      "24-hour on-site hackathon, AIVersecity Domain 1, with 110+ teams in the domain. Team “Claypot Chicken Rice” built Jobee.",
    kind: "podium",
    layout: "feature",
    projectSlug: "jobee",
  },
  {
    slug: "myai-future-hackathon",
    event: "Project 2030: MyAI Future Hackathon",
    organiser: "GDG on Campus UTM",
    rank: "Top 5 Finalist",
    year: "2026",
    description:
      "Student Category, Padi & Plates track, representing Sunway University. Team “Four Little Pigs” built PadiPro.",
    kind: "finalist",
    layout: "wide",
    projectSlug: "padipro",
  },
  {
    slug: "deans-list",
    event: "Dean's List",
    organiser: "Sunway University",
    rank: "Dean's List",
    year: "2025 – 2026",
    description: "Awarded for September 2025 and May 2026. Current CGPA 3.78.",
    kind: "academic",
    layout: "standard",
  },
  {
    slug: "diploma-cgpa",
    event: "Diploma in Information Technology",
    organiser: "Sunway College",
    rank: "CGPA 3.95",
    year: "2025",
    description: "Graduated in August 2025 with a CGPA of 3.95.",
    kind: "academic",
    layout: "standard",
  },
];

export const projects: readonly Project[] = [
  {
    slug: "malaysia-testing-cup",
    title: "Malaysia Testing Cup 2026: Meja Marmar",
    tagline: "Three hours of black-box testing on an app we had never seen, judged on the whole testing process.",
    context: "Malaysia Testing Cup 2026 · team of 2",
    period: "Nov 2026",
    imageName: "malaysia_wbt",
    bullets: [
      "Tested Meja Marmar, a food-court ordering app and its Dapur staff console, against its requirements spec (MEJ-FRS-001)",
      "Risk-based test plan over 12 areas, using exploratory testing, equivalence partitioning, boundary value analysis and state transition testing",
      "Submitted 28 bug reports with reproduction steps and screenshot evidence, plus a test summary report",
      "Critical finds included refunds larger than the amount paid, a paid cash tray that could still be cancelled with no refund, and a cancelled ticket that could be refunded twice",
      "Prepared Markdown templates and Python helper scripts before the event for the test plan, bug reports, bug index and summary report",
    ],
    contribution:
      "Owned the staff side (kitchen display, payments and top-ups, manager setup, tickets and refunds, roles and security, accessibility and responsive) and wrote 21 of the team's 28 bug reports.",
    tech: [
      "Black-box testing", "Exploratory testing", "Equivalence partitioning", "Boundary value analysis",
      "State transition testing", "Python", "Markdown", "Claude Code",
    ],
    links: [
      {
        kind: "results",
        label: "Results",
        href: "https://www.worldbesttester.com/results/malaysia-testing-cup-2026-malaysia-qualifier-0zkwe5us",
      },
      // TODO(skyfoo): jimmerino2/malaysia_wbt_2026 is private; add the URL here if it is made public.
      { kind: "code", label: "Code", href: "" },
    ],
    featured: true,
    hackathon: false,
  },
  {
    slug: "jobee",
    title: "Jobee",
    tagline: "Gamified AI career companion with a bee theme.",
    context: "SDC Hackathon 2026",
    bullets: [
      "Forecasts job demand under three AI futures (accelerates / holds steady / slows down) with a LightGBM model that can be retrained live on chosen year ranges",
      "Reads your resume and ranks matching roles with a transparent scoring formula",
      "Builds a step-by-step learning roadmap with free and HRD Corp-claimable courses",
      "Maps every role and skill to the UN SDGs",
    ],
    contribution: "Built the LightGBM career-growth prediction model, trained on US labour market data.",
    // Stack from the repo README.
    tech: [
      "Vue 3", "Vite", "TypeScript", "Python", "FastAPI", "Pydantic", "Supabase",
      "pandas", "NumPy", "scikit-learn", "LightGBM", "Replit",
    ],
    links: [
      { kind: "live", label: "Live", href: "https://jobee-sdchack.replit.app/" },
      { kind: "demo", label: "Demo", href: "https://youtu.be/kjiKR2WKz94" },
      { kind: "code", label: "Code", href: "https://github.com/jimmerino2/sdc_hackathon_2026" },
    ],
    featured: true,
    hackathon: true,
  },
  {
    slug: "padipro",
    title: "PadiPro",
    tagline: "AI agricultural assistant for paddy farmers.",
    context: "Project 2030: MyAI Future Hackathon",
    period: "Apr 2026 – May 2026",
    bullets: [
      "Text, image or voice input to diagnose crop issues (nutrient deficiencies, pests)",
      "Intent-verification and contextual-analysis pipeline that returns recovery steps and timelines",
      "Available via WhatsApp for low-digital-adoption rural users; supports SDG 2: Zero Hunger",
    ],
    tech: [
      "React", "Node.js", "Express", "TypeScript", "Firebase (Firestore)", "Google Cloud Run",
      "Cloud Storage", "Vertex AI", "Gemini", "Genkit", "WhatsApp API", "Google Maps API",
    ],
    links: [
      // TODO(skyfoo): add a live URL for PadiPro if one exists.
      { kind: "live", label: "Live", href: "" },
      { kind: "demo", label: "Demo", href: "https://youtu.be/98X_2u7aDBE" },
      { kind: "code", label: "Backend", href: "https://github.com/iZ86/myaihackathonbackend-PadiPro" },
      { kind: "code", label: "Frontend", href: "https://github.com/iZ86/myaihackathonfrontend-PadiPro" },
    ],
    featured: true,
    hackathon: true,
  },
  {
    slug: "april-group",
    imageName: "april",
    title: "APRIL Group: Shipping Document Verification",
    tagline: "Checks shipping documents against each other so ops staff don't have to.",
    context: "Averis x Monash Hackathon 2026 · team of 5",
    bullets: [
      "Watches a shipping-ops inbox and classifies every email into 5 categories (document comparison, new SI request, invoice query, general, spam)",
      "Extracts 7 key fields from the Shipping Instruction and draft Bill of Lading (PDF / DOCX / DOC / XLSX), compares them and names every mismatch side by side",
      "Sends anything uncertain (missing attachment, unreadable scan, missing value) to a human Review queue instead of guessing",
      "Three modes: single-email API, batch zip upload with submission.json export, and a live product with Google sign-in, Gmail sync, dashboard and a 3D globe of shipment routes",
    ],
    tech: [
      "Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase", "OpenRouter",
      "Gmail API", "Zod", "globe.gl",
    ],
    links: [
      { kind: "live", label: "Live", href: "https://averisxmonash.vercel.app/" },
      { kind: "demo", label: "Demo", href: "https://youtu.be/FO73hUW1DNM" },
      { kind: "code", label: "Code", href: "https://github.com/iZ86/averisxmonash" },
    ],
    featured: true,
    hackathon: true,
  },
  {
    slug: "aigis",
    title: "AiGIS: AI Guardian Intelligence System",
    tagline: "Hospital inventory risk and decision support for a single facility.",
    context: "Dormathon 2026",
    bullets: [
      "Forecasts medical item usage (Holt trend + weighted moving average with day-of-week patterns removed), with safety stock, reorder points and projected run-out dates",
      "Reads WHO Disease Outbreak News and Malaysian MOH press statements; LLM “councils” screen articles for relevance, credibility and severity, and turn them into a usage multiplier on the forecast",
      "Drafts purchase orders before stock runs out; a person reviews every order before anything goes to a supplier",
      "Scores its own forecast accuracy weekly against recorded usage",
    ],
    tech: [
      "Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Radix UI", "Recharts",
      "TanStack Query/Table", "Zod", "Supabase", "OpenRouter",
    ],
    links: [
      { kind: "live", label: "Live", href: "https://dormathon-2026.vercel.app/" },
      // TODO(skyfoo): add a demo video for AiGIS if one exists.
      { kind: "demo", label: "Demo", href: "" },
      { kind: "code", label: "Code", href: "https://github.com/skyfoojs/dormathon-2026" },
    ],
    featured: true,
    hackathon: true,
  },
  {
    slug: "medidocai",
    title: "MediDocAI",
    tagline: "AI-powered medical document query tool.",
    context: "Great Malaysia AI Hackathon 2025",
    period: "Sep 2025",
    bullets: [
      "Lets healthcare staff query large volumes of medical documents",
      "Real-time chat and session persistence with DynamoDB and AWS AppSync; secure uploads to S3",
    ],
    tech: ["Next.js", "React", "TypeScript", "Amazon Bedrock", "Amazon S3", "DynamoDB", "AWS AppSync"],
    links: [
      // TODO(skyfoo): add live and demo links for MediDocAI.
      { kind: "live", label: "Live", href: "" },
      { kind: "demo", label: "Demo", href: "" },
      { kind: "code", label: "Code", href: "https://github.com/skyfoojs/greataihackathon-MediDocAI" },
    ],
    featured: false,
    hackathon: true,
  },
  {
    slug: "azone",
    title: "aZone",
    tagline: "University subject enrollment platform.",
    context: "Software Engineering coursework, Sunway University",
    period: "Oct 2025 – Dec 2025",
    bullets: [
      "Built to fix the existing enrollment system crashing under peak load",
      "Role-based access control and scalable REST APIs",
    ],
    tech: ["React", "Node.js", "Express", "TypeScript", "MySQL"],
    links: [
      // TODO(skyfoo): add live and demo links for aZone.
      { kind: "live", label: "Live", href: "" },
      { kind: "demo", label: "Demo", href: "" },
      { kind: "code", label: "Code", href: "https://github.com/iZ86/SEG2202SE-aZone" },
    ],
    featured: false,
    hackathon: false,
  },
  {
    slug: "tastybyte",
    title: "TastyByte",
    tagline: "Restaurant food ordering system.",
    context: "Sunway College",
    period: "Dec 2024 – Mar 2025",
    bullets: ["Improves order accuracy and service speed"],
    tech: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    links: [
      // TODO(skyfoo): add live and demo links for TastyByte.
      { kind: "live", label: "Live", href: "" },
      { kind: "demo", label: "Demo", href: "" },
      { kind: "code", label: "Code", href: "https://github.com/skyfoojs/TastyByte_FYP" },
    ],
    featured: false,
    hackathon: false,
  },
];

export const techStack: readonly TechCategory[] = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "PHP", icon: "php" },
      { name: "SQL", icon: "sql" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "Laravel", icon: "laravel" },
      { name: "REST APIs", icon: "rest" },
      { name: "JWT", icon: "jwt" },
      { name: "MongoDB (Mongoose)", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    label: "Data & Cloud",
    items: [
      { name: "AWS Glue", icon: "aws" },
      { name: "Amazon Redshift", icon: "aws" },
      { name: "Amazon S3", icon: "aws" },
      { name: "Amazon Athena", icon: "aws" },
      { name: "Amazon QuickSight", icon: "aws" },
      { name: "Azure Blob Storage", icon: "azure" },
      { name: "Firebase", icon: "firebase" },
      { name: "Supabase", icon: "supabase" },
      { name: "Google Cloud Run", icon: "googlecloud" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { name: "LightGBM (Python)", icon: "lightgbm" },
      { name: "Vertex AI / Gemini", icon: "gemini" },
      { name: "Amazon Bedrock", icon: "aws" },
      { name: "OpenRouter", icon: "openrouter" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "Linux / cron", icon: "linux" },
      { name: "Postman", icon: "postman" },
      { name: "Figma", icon: "figma" },
    ],
  },
];

export const education: readonly Education[] = [
  {
    slug: "sunway-university",
    qualification: "Bachelor of Software Engineering",
    institution: "Sunway University",
    period: "Sep 2025 – Sep 2027 (expected)",
    location: "Petaling Jaya, Malaysia",
  },
  {
    slug: "sunway-college",
    qualification: "Diploma in Information Technology",
    institution: "Sunway College",
    period: "Aug 2023 – Aug 2025",
    location: "Petaling Jaya, Malaysia",
  },
];

export const seo = {
  title: "Foo Jia Seng | Software Engineer · Backend & Data Engineering",
  description:
    "Foo Jia Seng is a software engineer in Selangor, Malaysia working on backend and data engineering: Node.js APIs, AWS Glue ETL, Redshift and QuickSight. 3rd Runner-Up at SDC Hackathon 2026.",
  keywords: [
    "Foo Jia Seng", "Software Engineer", "Backend Developer", "Data Engineering", "Node.js",
    "TypeScript", "AWS Glue", "Amazon Redshift", "QuickSight", "Malaysia", "Portfolio",
  ],
} as const;

export function awardForProject(slug: string): Award | undefined {
  return awards.find((a) => a.projectSlug === slug);
}
