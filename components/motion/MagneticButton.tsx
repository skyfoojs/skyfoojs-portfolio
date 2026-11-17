"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { useMotionPrefs } from "@/components/motion/useMotionPrefs";

interface MagneticButtonProps {
  children: ReactNode;
  /** Fraction of the cursor's distance from the centre the element follows. */
  strength?: number;
  /** Maximum pull in pixels. */
  max?: number;
  className?: string;
}

const spring = { stiffness: 260, damping: 18, mass: 0.4 };
const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

/** Wraps a button/link so it leans toward the cursor on hover. Static on touch and with reduced motion. */
export default function MagneticButton({ children, strength = 0.25, max = 6, className = "" }: MagneticButtonProps) {
  const { rich } = useMotionPrefs();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!rich || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(clamp((e.clientX - (rect.left + rect.width / 2)) * strength, max));
    y.set(clamp((e.clientY - (rect.top + rect.height / 2)) * strength, max));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
