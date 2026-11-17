"use client";

import { useSyncExternalStore } from "react";

export const MEDIA = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  /** Mouse or trackpad: cursor-driven effects only run here, never on touch. */
  finePointer: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 1024px)",
} as const;

/** Server snapshot is `false`, so SSR markup is always the plain, static version. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export interface MotionPrefs {
  reduced: boolean;
  finePointer: boolean;
  /** Cursor-driven effects allowed: fine pointer and no reduced-motion preference. */
  rich: boolean;
}

export function useMotionPrefs(): MotionPrefs {
  const reduced = useMediaQuery(MEDIA.reducedMotion);
  const finePointer = useMediaQuery(MEDIA.finePointer);
  return { reduced, finePointer, rich: finePointer && !reduced };
}

/** Non-hook check for code outside React (lazy-loaded effects). */
export function matches(query: string): boolean {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}
