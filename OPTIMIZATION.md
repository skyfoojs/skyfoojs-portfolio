# Task: Update and redesign my portfolio (Next.js + TypeScript + Tailwind + Framer Motion)

You're working on my personal portfolio (live at https://www.skyfoojs.com/). Two goals:
1. **Content:** bring every detail up to date using the verified facts below plus my resume.
2. **UI:** make the design noticeably more polished and memorable without changing the tech stack.

## Sources of truth
- The **Verified facts** section below (taken from my LinkedIn, Nov 2026) and `/public/docs/resume.pdf` are the ONLY sources for facts.
- **Never invent** numbers, placements, metrics, star counts or links. If something is missing, leave a clearly marked `// TODO(skyfoo): ...` and list it in your final summary.
- If the resume and the verified facts disagree (dates, CGPA, titles, placements), don't pick one silently. List each conflict in your summary and use the **verified facts** for now.
- Don't put any file other than the downloadable resume in `/public/docs/` (anything in `/public` is publicly served).

---

## Verified facts

### Experience (newest first)
**1. Software Engineer (Contract) — Polaris Net Sdn. Bhd.**
Feb 2026 – Sep 2026 · Kuala Lumpur · Hybrid · BRP team (cloud analytics & reporting)
- Migrated Amazon QuickSight datasets from Athena to Redshift, replacing full refreshes with incremental updates and cutting refresh time by ~70%
- Built and managed AWS Glue ETL workflows processing 9.3M rows into Amazon Redshift and S3
- Developed and maintained interactive QuickSight dashboards embedded in PHP-based applications used by 140 partners
- Automated a daily sales reporting system (PHPMailer + Linux crontab), deployed to production
- Tech: AWS Glue, Redshift, S3, Athena, QuickSight, PHP (Laravel), MySQL, Linux

**2. Web Backend Node.js Developer Intern — Continental**
Apr 2025 – Jul 2025 · Petaling Jaya · On-site
- Sole backend developer: built and maintained 40+ RESTful APIs for a Desk Booking System supporting 100+ employees
- Designed MongoDB (Mongoose) schemas with indexing and validation; average API response times of 50–400 ms
- Implemented JWT authentication and authorization across internal applications
- Containerised backend services with Docker, working closely with the frontend team
- Built cron-based desk auto-release logic with timezone support, reclaiming 5–10 unused bookings daily; integrated Azure Blob Storage for file uploads
- Tech: Node.js, Express, TypeScript, MongoDB, Docker, JWT, Azure Blob Storage

(Leave out non-tech jobs.)

### Education
- **Bachelor of Software Engineering — Sunway University**, Sep 2025 – Sep 2027 (expected). CGPA: **3.78** on LinkedIn. The site currently says 3.88; flag this and use the resume's value if it differs. Dean's List: **September 2025** and **May 2026**.
- **Diploma in Information Technology — Sunway College**, Aug 2023 – Aug 2025. CGPA **3.95**.

### Wall of Fame (hackathons & honours)
1. **SDC Hackathon 2026 @ Xiamen University Malaysia — 🏆 3rd Runner-Up** (AIVersecity Domain 1). 24-hour on-site hackathon, 110+ teams in the domain. Team "Claypot Chicken Rice". Project: **Jobee**. → **Feature card (strongest result).**
2. **Project 2030: MyAI Future Hackathon (GDG on Campus UTM) — Finalist**, Student Category, Padi & Plates track (one of 5 finalist teams in the track; did not place in the final). Team "Four Little Pigs". Project: **PadiPro**. Label it exactly "Finalist", **not** "Top 5 nationally" or any podium wording.
3. **Dean's List, Sunway University** — September 2025 and May 2026.
4. **Diploma in IT graduated with CGPA 3.95**, Sunway College.

(Great Malaysia AI Hackathon 2025 / MediDocAI had no placement, so it stays out of the Wall of Fame and appears only as a project.)

### Projects (in this display order)
1. **Jobee** — gamified AI career companion with a bee theme (SDC Hackathon 2026, 3rd Runner-Up).
   - Forecasts job demand under three AI futures (accelerates / holds steady / slows down) with a LightGBM model that can be retrained live on chosen year ranges. **My part: built the LightGBM career-growth prediction model** (trained on US labour market data).
   - Reads your resume and ranks matching roles with a transparent scoring formula
   - Builds a step-by-step learning roadmap with free and HRD Corp-claimable courses
   - Maps every role and skill to the UN SDGs
   - Links: Live https://jobee-sdchack.replit.app/ · Demo https://youtu.be/kjiKR2WKz94 · Code https://github.com/jimmerino2/sdc_hackathon_2026
   - Tech: TypeScript, LightGBM (Python), `TODO(skyfoo): confirm the rest of the stack`
2. **PadiPro** — AI agricultural assistant for paddy farmers (Project 2030: MyAI Future Hackathon finalist).
   - Text, image or voice input to diagnose crop issues (nutrient deficiencies, pests), with an intent-verification + contextual-analysis pipeline that returns recovery steps and timelines
   - Available via WhatsApp for low-digital-adoption rural users; supports SDG 2: Zero Hunger
   - Links: Demo https://youtu.be/98X_2u7aDBE · Backend https://github.com/iZ86/myaihackathonbackend-PadiPro · Frontend https://github.com/iZ86/myaihackathonfrontend-PadiPro
   - Tech: React, Node.js, Express, TypeScript, Firebase (Firestore), Google Cloud Run, Cloud Storage, Vertex AI, Gemini, Genkit, WhatsApp API
3. **APRIL Group — Shipping Document Verification** (Averis x Monash Hackathon 2026; organised by Averis, Malaysia Digital, GDG Monash University Malaysia and Monash University Malaysia Tech Club). Team of 5.
   - Watches a shipping-ops inbox, classifies every email into 5 categories (document comparison, new SI request, invoice query, general, spam)
   - Extracts 7 key fields (shipper, consignee, notify party, ports of loading/discharge, container count, gross weight) from the Shipping Instruction and draft Bill of Lading (PDF / DOCX / DOC / XLSX), compares them and names every mismatch side by side
   - Sends anything uncertain (missing attachment, unreadable scan, missing value) to a human Review queue instead of guessing
   - Three modes: single-email API, batch zip upload with `submission.json` export, and a live product with Google sign-in, Gmail sync, dashboard and a 3D globe of shipment routes
   - Links: Live https://averisxmonash.vercel.app/ · Demo https://youtu.be/FO73hUW1DNM · Code https://github.com/iZ86/averisxmonash
   - Tech: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase (Postgres + Storage), OpenRouter (LLM), Gmail API, Zod, globe.gl
   - No award: no badge, and don't add it to the Wall of Fame.
4. **AiGIS: AI Guardian Intelligence System** (Dormathon 2026). Hospital inventory risk and decision-support tool for a single facility.
   - Forecasts medical item usage (Holt trend + weighted moving average with day-of-week patterns removed), with safety stock, reorder points and projected run-out dates
   - Reads WHO Disease Outbreak News and Malaysian MOH press statements; LLM "councils" screen articles for relevance, check credibility and severity, and turn them into a usage multiplier on the forecast
   - Automatically drafts purchase orders before stock runs out. A person reviews every order before anything goes to a supplier
   - Weekly self-scoring of forecast accuracy against recorded usage
   - Links: Live https://dormathon-2026.vercel.app/ · Code https://github.com/skyfoojs/dormathon-2026
   - Tech: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Radix UI, Recharts, TanStack Query/Table, Zod, Supabase (Postgres), OpenRouter (LLM)
   - No award: no badge, and don't add it to the Wall of Fame.
5. **MediDocAI** — AI-powered medical document query tool (Great Malaysia AI Hackathon 2025, Sep 2025). Lets healthcare staff query large volumes of medical documents. Tech: Next.js, TypeScript, AWS Bedrock, Amplify, DynamoDB, S3 (keep the existing tags). No award: no badge. `TODO(skyfoo): links`
6. **aZone** — university subject enrollment platform (Oct–Dec 2025, Software Engineering coursework at Sunway University). Built to fix the existing enrollment system crashing under peak load; role-based access control and scalable REST APIs. Tech: React, Node.js, Express, MySQL. `TODO(skyfoo): links`
7. **TastyByte** — restaurant food ordering system (Dec 2024 – Mar 2025, Sunway College). Improves order accuracy and service speed. Tech: Laravel, MySQL, Tailwind CSS, JavaScript. `TODO(skyfoo): links`

Give the first four (Jobee, PadiPro, APRIL Group, AiGIS) larger "featured" cards in a 2×2 grid. MediDocAI, aZone and TastyByte can be compact cards (or behind a "More projects" toggle). Optionally add a small "Hackathon" tag to the hackathon builds (Jobee, PadiPro, APRIL Group, AiGIS, MediDocAI); only Jobee and PadiPro get award badges.

### Tech stack additions
Add if missing: AWS Glue, Redshift, S3, Athena, QuickSight, Azure Blob Storage, Firebase, Supabase, Google Cloud Run, Vertex AI / Gemini, OpenRouter, Python (LightGBM), Linux / cron, Vercel. Group them sensibly (e.g. Languages · Backend · Frontend · Data & Cloud · AI/ML · Tools).

### Misc
- Location: Selangor, Malaysia
- Hero tagline/roles should reflect: Software Engineer · Backend & Data Engineering · 2× hackathon finalist (one podium: 3rd Runner-Up)
- LinkedIn: https://www.linkedin.com/in/foo-jia-seng/ · GitHub: github.com/skyfoojs

---

## Step 1: Explore and plan (no code changes yet)
- Read the project structure, find where each section's content lives (hard-coded JSX vs data files) and read the resume.
- Propose a plan: content changes per section, UI changes, and a refactor to move all content into a single typed data file (e.g. `src/data/portfolio.ts`) so future updates are one-file edits.
- Show me the plan and wait for my approval before implementing.

## Step 2: Content updates
- Apply everything in **Verified facts**: experience (Polaris above Continental), projects, tech stack and CGPA everywhere.
- Project cards: screenshot slot (`/public/projects/<slug>.png`, with a styled placeholder if the image is missing), "Live", "Demo" and "Code" buttons (hide any whose URL is empty) and tech tags. A project linked to an award shows a small award badge (e.g. "🏆 3rd Runner-Up").

## Step 3: Restructure sections
New order:
**Hero → About → Experience → Wall of Fame → Projects → Tech Stack → Education → Contact → Footer**

- **About:** short bio, photo, location/role facts and core-skill tags. **Remove the timeline** (experience and education have their own sections).
- **Remove the GitHub Activity section entirely** (stats cards, contribution graph, latest repos) along with any now-unused code and dependencies. Update the nav and footer links to match the new sections.
- **Education:** keep it lean (degree, institution, dates). Dean's List and CGPA live in the Wall of Fame so they aren't repeated.

## Step 4: New "Wall of Fame" section
- Content: the Wall of Fame list in Verified facts, using exact wording for placements.
- Layout: a responsive **bento grid**. SDC Hackathon 2026 (3rd Runner-Up) gets the large feature card, the rest smaller cards.
- Each card: trophy/medal icon, event name, rank badge, year, a one-line description and an optional event photo (`/public/awards/<slug>.jpg`, with a graceful fallback if missing). If the award has a matching project, link to its project card.
- Use a **gold/amber accent** for this section to set it apart from the site's blue/purple palette while keeping it on-theme.

## Step 5: UI improvements
Fix these known issues:
- **Scroll animations are too slow.** Text sits half-transparent mid-scroll, and the hero buttons look disabled on load. Cut durations to ~0.3–0.4s, trigger earlier (viewport margin), use `once: true` and respect `prefers-reduced-motion`.
- **Low contrast:** body text is grey on dark navy. Raise it to at least WCAG AA (4.5:1) for body text.
- **About photo:** sits low with a big empty gap above it. Align it with the top of the text, crop it tighter (`object-position`) and size it consistently.
- **Hero typewriter:** make sure the role strings render fully and the layout doesn't shift while it types.

General polish:
- Consistent spacing scale, section rhythm and max-widths; tighten the oversized vertical gaps between sections.
- Better project cards: image on top, hover lift/glow, clear CTAs.
- Experience cards: company logo slot, clearer date/role hierarchy, impact numbers visually emphasised (~70%, 9.3M rows, 140 partners, 40+ APIs).
- Subtle, tasteful touches only, e.g. a gentle background gradient or noise texture, an active-section highlight in the nav. Don't add effects for their own sake.
- **Mobile:** test at 375px, 768px and 1280px. Add a working mobile nav (hamburger/sheet), make sure nothing overflows and the bento grid collapses cleanly.
- Accessibility: semantic headings, alt text, focus-visible styles, keyboard-navigable nav.
- Update `<title>`, meta description and Open Graph tags to match the new content.

## Constraints
- Keep Next.js, TypeScript, Tailwind and Framer Motion. Don't add a UI library unless you justify it in the plan.
- TypeScript strict, no `any`, no unused code left behind.
- Don't touch deployment config unless necessary.

## Done means
- `npm run build` and `npm run lint` pass with no errors.
- You've checked each breakpoint (describe what you checked).
- Final summary covering: what changed per section, all `TODO(skyfoo)` items (missing photos, links, placements) and any resume vs verified-facts conflicts.
