"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import type { LogoMarqueeProps } from "@/components/motion/LogoMarquee";

const ROW_HEIGHT = 38;
const ROW_GAP = 12;

/**
 * Decorative marquee (the categorised grid lists the same items, so it's
 * hidden from assistive tech). The rows hold ~60 inline SVG icons, so they
 * aren't server-rendered: the chunk loads when the section is within 800px
 * of the viewport, and the container reserves its final height so nothing
 * shifts when it appears.
 */
export default function LazyLogoMarquee({ rows }: LogoMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [Marquee, setMarquee] = useState<ComponentType<LogoMarqueeProps> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void import("@/components/motion/LogoMarquee").then((m) => setMarquee(() => m.default));
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const height = rows.length * ROW_HEIGHT + (rows.length - 1) * ROW_GAP;
  return (
    <div ref={ref} aria-hidden className="marquee mb-8 flex flex-col gap-3" style={{ height }}>
      {Marquee && <Marquee rows={rows} />}
    </div>
  );
}
