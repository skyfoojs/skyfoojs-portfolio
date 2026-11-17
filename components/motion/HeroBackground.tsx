"use client";

import { useEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/motion/useMotionPrefs";

type IdleHandle = { cancel: () => void };

function whenIdle(cb: () => void): IdleHandle {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(cb, { timeout: 2500 });
    return { cancel: () => window.cancelIdleCallback(id) };
  }
  const id = setTimeout(cb, 300);
  return { cancel: () => clearTimeout(id) };
}

/**
 * Hero backdrop. Everyone gets the static CSS gradient + dot grid. On a fine
 * pointer without reduced motion, a WebGL gradient mesh that bends toward
 * the cursor is loaded once the browser is idle after first paint (its own
 * chunk, so it never blocks LCP) and fades in over the static layer.
 */
export default function HeroBackground() {
  const { rich } = useMotionPrefs();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!rich || !canvas) return;
    let stop: (() => void) | null = null;
    let cancelled = false;

    const idle = whenIdle(() => {
      void import("@/lib/fx/gradient-shader").then(({ startGradientShader }) => {
        if (!cancelled) stop = startGradientShader(canvas);
      });
    });

    return () => {
      cancelled = true;
      idle.cancel();
      stop?.();
    };
  }, [rich]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-static-gradient absolute inset-0" />
      {rich && <canvas ref={canvasRef} className="hero-canvas absolute inset-0 h-full w-full" />}
      <div className="absolute inset-0 bg-dots opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
    </div>
  );
}
