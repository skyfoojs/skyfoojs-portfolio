# Task: Add "wow-factor" motion and interactions to my portfolio

The content and layout of my portfolio (Next.js + TypeScript + Tailwind + Framer Motion, live at https://www.skyfoojs.com/) are done. It now feels **visually flat**: everything just fades in. I want it to feel premium and memorable, in the style of Awwwards / Linear / Vercel sites, **without hurting performance or readability**.

Don't change any content (text, numbers, links, section order). This task is motion and interaction, plus the project grid layout fix below.

## Step 0: Fix the project grid holes (do this first)
The Projects section currently has layout gaps:
- **An orphan card:** AiGIS sits alone in the left column of the 2-column grid, leaving the right half of the row empty.
- **Stretched cards:** in each row, the shorter card stretches to match its taller neighbour, so Jobee and PadiPro have big empty spaces between their bullets and tags.
- **A placeholder image:** AiGIS shows a text-only placeholder instead of a screenshot.

Fix:
- **No orphans at any breakpoint.** If the last row has a single card, make it span the full width with a horizontal layout (screenshot left, content right), or rebalance the featured set so every row is full. Same rule for the "More projects" grid.
- **No dead space inside cards.** Keep tags and CTA buttons pinned to the bottom (`flex-col` + `mt-auto`) so any extra height sits above the footer rather than in the middle of the content. Better still, trim card content so neighbouring cards are naturally similar in height. If heights still differ a lot, propose a masonry or alternating layout instead of an equal-height grid.
- **AiGIS image:** use `/public/projects/aigis.png`. If the file doesn't exist, add a `TODO(skyfoo): add AiGIS screenshot (dormathon-2026.vercel.app)` and make the fallback a designed placeholder (gradient + icon + project name), not plain text.
- Whatever projects layout you choose in section 2 (stacking cards or horizontal scroll) must follow these rules too, including the mobile single-column fallback.

## Step 1: Plan first
Read the codebase, then propose which effects go where, which libraries you'll add (with bundle-size notes) and how you'll handle mobile and reduced motion. **Wait for my approval before implementing.**

## Effects to implement

### 1. Hero: the first-impression moment
- **Interactive background:** a WebGL or canvas effect that reacts to the cursor, e.g. a slowly moving gradient-mesh shader in the site's blue/purple palette, or a dot grid that ripples or bends around the cursor. Keep it subtle enough that text stays readable. Lazy-load it after first paint so it never blocks LCP.
- **Name reveal:** letters animate in with a stagger (blur → sharp, slight upward motion), then a slow gradient shimmer moves across "Jia Seng".
- **Role text:** replace the plain typewriter with a **text-scramble/decrypt effect** (random characters resolving into "Software Engineer", "Backend & Data Engineering", etc.).
- **Stat strip** under the CTA (3rd / 351 teams · 3rd Runner-Up · 9.3M rows · 40+ APIs): numbers **count up** on load.
- **Magnetic buttons:** the CTAs pull slightly toward the cursor on hover.

### 2. Scrolling
- **Smooth scrolling** with Lenis, integrated with Framer Motion's `useScroll`, and anchor links from the nav still working.
- **Section headings:** masked line reveal (text slides up from behind a clip as it enters the viewport), instead of a fade.
- **Experience:** a vertical timeline line that **draws itself** as you scroll (`pathLength` / `scaleY` tied to scroll progress), with each role's dot lighting up when reached. Stat tiles count up when they enter view.
- **Projects:** pick ONE and propose it in the plan:
  - (a) **Sticky stacking cards:** featured projects pin and stack on top of each other as you scroll, each scaling down slightly under the next; or
  - (b) **Pinned horizontal scroll:** the section pins and the featured projects scroll sideways.
  Non-featured projects stay as a normal grid.
- **Scroll progress bar** at the top of the page in the brand gradient.

### 3. Wall of Fame
- **3D tilt cards** that follow the cursor (perspective + rotateX/Y), with a **holographic foil shine** on the gold cards, like a trading card catching the light.
- The feature card (3rd Place · Malaysia Testing Cup / SDC 3rd Runner-Up) gets a slow-moving **animated gold border** (conic-gradient rotating around the edge).
- A small one-time **confetti/sparkle burst** the first time the section enters view. Tasteful, and less than one second.

### 4. Micro-interactions everywhere
- **Spotlight cards:** every card (experience, projects, tech, education) gets a radial glow that follows the cursor, on the border and faintly on the surface.
- **Nav:** the active-section indicator is a pill that **slides** between items (`layoutId`), with a shrink/blur effect on the navbar after scrolling.
- **Project screenshots:** slight zoom and parallax on hover; the image carousel crossfades.
- **Tech stack:** add an **infinite logo marquee** row (two rows scrolling in opposite directions, pausing on hover) above the categorised grid.
- **Page intro:** a short (< 800 ms) intro where the "FJS" logo draws itself and then moves into the navbar. Only on first visit per session.
- Optional, ask me first: a **custom cursor** (small dot + trailing ring that grows over links). Desktop only.

## Hard constraints
- **Performance:** animate only `transform`, `opacity` and `filter`. Keep 60 fps. Lighthouse Performance ≥ 90 on mobile, no CLS from animations. Lazy-load and code-split heavy pieces (WebGL, confetti).
- **Reduced motion:** with `prefers-reduced-motion`, disable the WebGL background, scramble, tilt, parallax, confetti, smooth scroll and the intro; show content instantly with simple fades.
- **Mobile/touch:** no hover-only effects on touch devices. Replace cursor-based effects with static versions. On mobile, use the simplest projects layout (no pinning if it feels janky).
- **Readability first:** content must never be hidden, half-transparent or unreadable mid-animation. Entrance animations ≤ 0.6 s and trigger early.
- **Libraries:** prefer Framer Motion + Lenis + small hand-written components. If you need WebGL, use something light (OGL or a single raw shader) rather than full three.js unless you justify it. Make every effect a reusable component (e.g. `<SpotlightCard>`, `<MagneticButton>`, `<ScrambleText>`, `<TiltCard>`, `<CountUp>`).
- TypeScript strict, no `any`. `npm run build` and `npm run lint` must pass.

## Done means
- No grid holes or stretched empty cards in Projects at 375px, 768px or 1280px+.
- Every effect above is implemented (or explicitly skipped, with the reason).
- You've checked desktop (1280px+), tablet (768px) and mobile (375px), plus reduced-motion mode. Describe what you checked.
- Report Lighthouse scores before and after.
