"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface MaskedRevealProps {
  children: ReactNode;
  delay?: number;
}

/**
 * Text slides up from behind a clip as it enters the viewport (≤ 0.5 s,
 * triggered 80px before it's visible). The padding/negative margin pair
 * keeps descenders from being cut off. With reduced motion, MotionConfig
 * skips the transform and the text is simply there.
 */
export default function MaskedReveal({ children, delay = 0 }: MaskedRevealProps) {
  return (
    <span className="-mb-[0.15em] block overflow-hidden pb-[0.15em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "0px 0px 80px 0px" }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
