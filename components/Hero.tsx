"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Mail, Trophy } from "lucide-react";
import { profile } from "@/data/portfolio";
import { SocialIcon } from "@/components/ui/icons";
import HeroBackground from "@/components/motion/HeroBackground";
import MagneticButton from "@/components/motion/MagneticButton";
import NameReveal from "@/components/motion/NameReveal";

const TYPE_MS = 65;
const DELETE_MS = 35;
const HOLD_MS = 1800;
const GAP_MS = 350;

function useTypewriter(words: readonly string[], enabled: boolean): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = words[wordIndex] ?? "";
    const atEnd = !deleting && length === word.length;
    const atStart = deleting && length === 0;
    const delay = atEnd ? HOLD_MS : atStart ? GAP_MS : deleting ? DELETE_MS : TYPE_MS;

    const timer = window.setTimeout(() => {
      if (atEnd) {
        setDeleting(true);
      } else if (atStart) {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setLength((l) => l + (deleting ? -1 : 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [enabled, words, wordIndex, length, deleting]);

  return (words[wordIndex] ?? "").slice(0, length);
}

const longestRole = profile.roles.reduce((a, b) => (b.length > a.length ? b : a), "");

// Transform only, never opacity: hero text is visible on first paint, so
// LCP doesn't wait for hydration.
const enter = (delay: number) => ({
  initial: { y: 10 },
  animate: { y: 0 },
  transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const typed = useTypewriter(profile.roles, !reduceMotion);

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <HeroBackground />

      <div className="container-page flex flex-col items-center justify-center pb-12 pt-28 sm:min-h-[80svh] sm:pb-16 text-center">
        <motion.a
          {...enter(0)}
          href={profile.heroHighlight.href}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-1.5 text-sm font-medium text-amber-200 transition-colors hover:border-amber-300/70"
        >
          <Trophy size={14} aria-hidden className="text-amber-300" />
          {profile.heroHighlight.label}
        </motion.a>

        <NameReveal
          id="hero-heading"
          firstName={profile.firstName}
          lastName={profile.lastName}
          className="font-heading font-bold leading-[1.05] tracking-tight text-fg"
          style={{ fontSize: "clamp(2.75rem, 9vw, 5.75rem)" }}
        />

        <motion.p {...enter(0.1)} className="mt-5 font-heading text-xl font-semibold text-body sm:text-2xl md:text-3xl">
          {/* Typewriter: the longest role reserves the space so nothing shifts. */}
          <span className="sr-only">{profile.roles.join(" · ")}</span>
          {reduceMotion ? (
            <span aria-hidden>{profile.roles.join(" · ")}</span>
          ) : (
            <span aria-hidden className="inline-grid">
              <span className="invisible col-start-1 row-start-1 whitespace-nowrap px-2">{longestRole}</span>
              <span className="col-start-1 row-start-1 whitespace-nowrap text-center">
                {typed}
                <span className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.15em] animate-pulse rounded-full bg-accent" />
              </span>
            </span>
          )}
        </motion.p>

        <motion.p {...enter(0.15)} className="mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">
          {profile.heroSummary}
        </motion.p>

        {/* CTAs: transform only, never faded, so they don't look disabled on load. */}
        <motion.div
          initial={{ y: 8 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            <a href="#projects" className="btn btn-primary">
              View projects <ArrowRight size={16} aria-hidden />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contact" className="btn btn-secondary">
              Contact me <Mail size={16} aria-hidden />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Download size={16} aria-hidden /> Resume
            </a>
          </MagneticButton>
        </motion.div>

        <ul className="mt-10 flex items-center gap-3">
          {profile.socials.map((s) => (
            <li key={s.kind}>
              <a
                href={s.href}
                target={s.kind === "email" ? undefined : "_blank"}
                rel={s.kind === "email" ? undefined : "noopener noreferrer"}
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-surface/70 text-body transition-colors hover:border-accent/60 hover:text-accent"
              >
                <SocialIcon kind={s.kind} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
