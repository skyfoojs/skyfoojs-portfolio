"use client";

import { useEffect } from "react";
import { useMotionPrefs } from "@/components/motion/useMotionPrefs";

/**
 * One document-level pointer listener for every <SpotlightCard>. Writes the
 * cursor position into CSS variables on the hovered card:
 *   --sx / --sy  pixels from the card's top-left (spotlight glow)
 *   --px / --py  -0.5…0.5 from the card's centre (screenshot parallax)
 * Fine pointers only; no React state, so nothing re-renders.
 */
export default function SpotlightTracker() {
  const { finePointer } = useMotionPrefs();

  useEffect(() => {
    if (!finePointer) return;
    let raf = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      if (!last || !(last.target instanceof Element)) return;
      const card = last.target.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = last.clientX - rect.left;
      const y = last.clientY - rect.top;
      card.style.setProperty("--sx", `${x.toFixed(1)}px`);
      card.style.setProperty("--sy", `${y.toFixed(1)}px`);
      card.style.setProperty("--px", (x / rect.width - 0.5).toFixed(3));
      card.style.setProperty("--py", (y / rect.height - 0.5).toFixed(3));
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [finePointer]);

  return null;
}
