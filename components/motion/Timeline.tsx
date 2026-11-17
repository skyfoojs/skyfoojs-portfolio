"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMotionPrefs } from "@/components/motion/useMotionPrefs";

/** Where in the viewport the line's tip sits (0 = top, 1 = bottom). */
const TIP = 0.7;

/**
 * Vertical timeline whose line draws itself with scroll (`scaleY`, so it's
 * transform-only). The tip stays at 70% of the viewport height; each
 * `[data-timeline-dot]` inside gets `data-active` once the tip passes it.
 * With reduced motion the line is fully drawn and every dot is lit.
 */
export default function Timeline({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${TIP}`, `end ${TIP}`] });

  const updateDots = (progress: number) => {
    const root = ref.current;
    if (!root) return;
    const height = root.offsetHeight || 1;
    root.querySelectorAll<HTMLElement>("[data-timeline-dot]").forEach((dot) => {
      const at = (dot.getBoundingClientRect().top - root.getBoundingClientRect().top) / height;
      dot.dataset.active = String(reduced || progress >= at);
    });
  };

  useMotionValueEvent(scrollYProgress, "change", updateDots);
  useEffect(() => updateDots(scrollYProgress.get()));

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-line" />
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-fuchsia-400"
        style={{ scaleY: reduced ? 1 : scrollYProgress }}
      />
      {children}
    </div>
  );
}
