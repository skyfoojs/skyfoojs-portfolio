"use client";

import { useEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/motion/useMotionPrefs";

const INTERACTIVE = 'a, button, [role="button"], label, summary, select';
const TEXT_ENTRY = 'input, textarea, [contenteditable="true"]';
const RING_LERP = 0.2;

/**
 * Small dot that tracks the pointer exactly plus a ring that trails it and
 * grows over links and buttons. Desktop (fine pointer) only, never with
 * reduced motion. Over text fields it hides so the native I-beam shows.
 * Positions are written straight to `transform`; the rAF loop stops once
 * the ring has caught up.
 */
export default function CustomCursor() {
  const { rich } = useMotionPrefs();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!rich || !dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const target = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const setState = (state: "hidden" | "default" | "hover") => {
      dot.dataset.state = state;
      ring.dataset.state = state;
    };

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * RING_LERP;
      ringPos.y += (target.y - ringPos.y) * RING_LERP;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      const settled = Math.abs(target.x - ringPos.x) < 0.1 && Math.abs(target.y - ringPos.y) < 0.1;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = target.x;
        ringPos.y = target.y;
        setState("default");
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e: PointerEvent) => {
      if (!(e.target instanceof Element) || !visible) return;
      if (e.target.closest(TEXT_ENTRY)) setState("hidden");
      else setState(e.target.closest(INTERACTIVE) ? "hover" : "default");
    };

    const onLeave = () => {
      visible = false;
      setState("hidden");
    };
    const onDown = () => ring.classList.add("is-pressed");
    const onUp = () => ring.classList.remove("is-pressed");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      root.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
    };
  }, [rich]);

  if (!rich) return null;
  return (
    <>
      <div ref={ringRef} aria-hidden className="cursor-ring" data-state="hidden">
        <span />
      </div>
      <div ref={dotRef} aria-hidden className="cursor-dot" data-state="hidden">
        <span />
      </div>
    </>
  );
}
