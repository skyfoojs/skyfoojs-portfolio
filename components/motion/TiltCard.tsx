"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useMotionPrefs } from "@/components/motion/useMotionPrefs";

interface TiltCardProps {
  children: ReactNode;
  /** Maximum rotation in degrees. */
  max?: number;
  /** Holographic foil shine that follows the cursor (gold cards). */
  foil?: boolean;
  className?: string;
}

const spring = { stiffness: 220, damping: 20, mass: 0.5 };

/**
 * 3D tilt toward the cursor (perspective + rotateX/Y) with an optional foil
 * shine, like a trading card catching the light. Fine pointers only; on
 * touch and with reduced motion the card stays flat and `foil` cards get a
 * static sheen instead (CSS, see .foil-static).
 */
export default function TiltCard({ children, max = 6, foil = false, className = "" }: TiltCardProps) {
  const { rich } = useMotionPrefs();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const shineX = useSpring(50, spring);
  const shineY = useSpring(50, spring);
  const shineOpacity = useSpring(0, spring);
  const shineTransform = useMotionTemplate`translate(${shineX}%, ${shineY}%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!rich || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * max);
    rotateX.set((0.5 - py) * 2 * max);
    // The shine layer is 2× the card, so -50%…0% sweeps it across.
    shineX.set(-50 + px * 50);
    shineY.set(-50 + py * 50);
    shineOpacity.set(1);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    shineOpacity.set(0);
  };

  return (
    <div className={`[perspective:1000px] ${className}`} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div
        className="relative h-full [transform-style:preserve-3d]"
        style={rich ? { rotateX, rotateY } : undefined}
      >
        {children}
        {foil &&
          (rich ? (
            <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <motion.span className="foil-shine" style={{ transform: shineTransform, opacity: shineOpacity }} />
            </span>
          ) : (
            <span aria-hidden className="foil-static pointer-events-none absolute inset-0 rounded-2xl" />
          ))}
      </motion.div>
    </div>
  );
}
