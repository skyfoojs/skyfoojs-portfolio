import type Lenis from "lenis";

/** The page's Lenis instance, if smooth scrolling is active (it isn't with reduced motion). */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
}

/** Pause/resume smooth scrolling, e.g. while the mobile menu locks the page. */
export function setScrollLocked(locked: boolean): void {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}
