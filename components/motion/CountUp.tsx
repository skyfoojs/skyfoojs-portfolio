"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { useMotionPrefs } from "@/components/motion/useMotionPrefs";

interface CountUpProps {
  /** Display string such as "~70%", "9.3M rows" or "40+ APIs". */
  value: string;
  duration?: number;
  className?: string;
}

interface ParsedValue {
  prefix: string;
  number: number;
  decimals: number;
  suffix: string;
}

/** Splits "9.3M rows" into "", 9.3, "M rows". Ranges ("50–400 ms") and non-numbers return null. */
function parse(value: string): ParsedValue | null {
  const match = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!match) return null;
  const [, prefix = "", digits = "", suffix = ""] = match;
  if (/\d/.test(suffix)) return null;
  return { prefix, number: Number(digits), decimals: digits.split(".")[1]?.length ?? 0, suffix };
}

/**
 * Counts the number in `value` up from zero when it scrolls into view.
 * Server-rendered with the final value (so crawlers, no-JS and screen
 * readers get it), and the final value also reserves the width so the
 * count never shifts the layout. Static with reduced motion.
 */
export default function CountUp({ value, duration = 1.1, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotionPrefs();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const parsed = parse(value);

  // Reset to zero on mount while it's still off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || reduced || inView) return;
    el.textContent = `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`;
    // Only on mount / preference change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || reduced || !inView) return;
    const controls = animate(0, parsed.number, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => {
        el.textContent = `${parsed.prefix}${n.toFixed(parsed.decimals)}${parsed.suffix}`;
      },
    });
    return () => {
      controls.stop();
      el.textContent = value;
    };
    // `parsed` is derived from `value`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="inline-grid tabular-nums">
        <span className="invisible col-start-1 row-start-1">{value}</span>
        <span ref={ref} className="col-start-1 row-start-1">
          {value}
        </span>
      </span>
    </span>
  );
}
