import Image from "next/image";
import { ArrowRight, Award as AwardIcon, ExternalLink, Medal, Trophy } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { awards, projects, type Award, type AwardKind } from "@/data/portfolio";
import { findPublicImage } from "@/lib/assets";

const kindIcon: Record<AwardKind, typeof Trophy> = {
  podium: Trophy,
  finalist: Medal,
  academic: AwardIcon,
};

/**
 * Bento layout (lg, 4 columns), filled in data order with dense packing:
 *   [ feature  2×2 ][ feature  2×2 ]
 *   [  wide   wide ][ std ][  std  ]
 * md: 2 columns, feature and wide span both. Mobile: 1 column.
 */
const layoutSpan: Record<Award["layout"], string> = {
  feature: "md:col-span-2 lg:row-span-2",
  wide: "md:col-span-2",
  standard: "",
};

function AwardCard({ award }: { award: Award }) {
  const Icon = kindIcon[award.kind];
  // TODO(skyfoo): add event photos at /public/awards/<slug>.jpg (sdc-hackathon-2026, myai-future-hackathon, ...).
  const photo = findPublicImage("awards", award.slug, ["jpg", "jpeg", "png", "webp"]);
  const project = award.projectSlug ? projects.find((p) => p.slug === award.projectSlug) : undefined;
  const big = award.layout === "feature";

  return (
    <article
      id={`award-${award.slug}`}
      className={`card card-interactive card-interactive-gold relative flex h-full flex-col overflow-hidden ${
        big ? "border-amber-400/35 bg-gradient-to-br from-amber-400/[0.08] via-surface to-surface" : "border-amber-400/15"
      }`}
    >
      {photo ? (
        <div className={`relative w-full ${big ? "aspect-[16/9]" : "aspect-[16/7]"}`}>
          <Image
            src={photo}
            alt={`${award.event}: ${award.rank}`}
            fill
            sizes={big ? "(min-width: 1024px) 36rem, 100vw" : "(min-width: 1024px) 18rem, 100vw"}
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-transparent" />
        </div>
      ) : (
        big && (
          <div
            aria-hidden
            className="relative flex aspect-[16/7] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_120%,rgb(251_191_36/0.25),transparent_65%)]"
          >
            <Trophy size={72} strokeWidth={1.25} className="text-amber-300/80" />
          </div>
        )
      )}

      <div className={`flex flex-1 flex-col ${big ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>
        <div className="flex items-start justify-between gap-3">
          <span
            aria-hidden
            className={`flex shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 ${
              big ? "h-12 w-12" : "h-10 w-10"
            }`}
          >
            <Icon size={big ? 24 : 20} />
          </span>
          <span className="text-sm font-medium text-muted">{award.year}</span>
        </div>

        <p className={`mt-4 w-fit rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 font-semibold text-amber-200 ${big ? "text-sm" : "text-xs"}`}>
          {award.rank}
        </p>
        <h3 className={`mt-3 font-heading font-bold leading-snug text-fg ${big ? "text-2xl sm:text-3xl" : "text-lg"}`}>
          {award.event}
        </h3>
        <p className="mt-1 text-sm font-medium text-amber-100/80">{award.organiser}</p>
        <p className={`mt-3 leading-relaxed text-body ${big ? "text-base" : "text-sm"}`}>{award.description}</p>

        {(project || award.proofUrl) && (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
            {project && (
              <a
                href={`#project-${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                See {project.title} <ArrowRight size={14} aria-hidden />
              </a>
            )}
            {award.proofUrl && (
              <a
                href={award.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                View official results <ExternalLink size={14} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function WallOfFame() {
  return (
    <section id="awards" aria-labelledby="awards-heading" className="section relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(50rem_24rem_at_20%_30%,rgb(251_191_36/0.06),transparent_70%)]"
      />
      <div className="container-page">
        <SectionHeader
          id="awards-heading"
          eyebrow="Hackathons & honours"
          title="Wall of Fame"
          tone="gold"
        />

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-flow-row-dense lg:grid-cols-4 lg:gap-5">
          {awards.map((award, i) => (
            <li key={award.slug} className={layoutSpan[award.layout]}>
              <Reveal delay={i * 0.04} className="h-full">
                <AwardCard award={award} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
