"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useMotionPrefs } from "@/components/motion/useMotionPrefs";

/**
 * One-time gold sparkle burst (< 1 s) the first time its parent section
 * scrolls into view. The canvas code is a separate chunk loaded only then.
 * Skipped with reduced motion. Place inside a `relative` container.
 */
export default function SparkleBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduced } = useMotionPrefs();
  const inView = useInView(canvasRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!inView || reduced || !canvas) return;
    let stop: (() => void) | null = null;
    let cancelled = false;
    void import("@/lib/fx/sparkle").then(({ burst }) => {
      if (!cancelled) stop = burst(canvas);
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [inView, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-1/2 h-64 w-full max-w-xl -translate-y-1/2"
    />
  );
}
