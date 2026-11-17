"use client";

import { useEffect } from "react";
import { cancelFrame, frame } from "framer-motion";
import { setLenis } from "@/lib/lenis";
import { useMotionPrefs } from "@/components/motion/useMotionPrefs";


/**
 * Lenis smooth scrolling, driven by Framer Motion's frame loop so `useScroll`
 * values update in the same frame. Touch keeps native scrolling (Lenis
 * default). Off entirely with reduced motion.
 */
export default function SmoothScroll() {
  const { reduced } = useMotionPrefs();

  useEffect(() => {
    if (reduced) return;
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    // Separate chunk, loaded after hydration so it's not on the LCP path.
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.12,
        // Lenis already honours `scroll-padding-top` (globals.css), which keeps anchors below the fixed nav.
        anchors: true,
        stopInertiaOnNavigate: true,
      });
      setLenis(lenis);
      const update = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
      frame.update(update, true);
      cleanup = () => {
        cancelFrame(update);
        setLenis(null);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);

  return null;
}
