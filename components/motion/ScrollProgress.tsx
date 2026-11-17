"use client";

import { motion, useScroll } from "framer-motion";

/** 2px brand-gradient bar at the top of the page, scaled with scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent via-accent-2 to-fuchsia-400"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
