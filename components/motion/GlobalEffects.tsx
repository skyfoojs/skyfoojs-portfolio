"use client";

import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SpotlightTracker from "@/components/motion/SpotlightTracker";
import dynamic from "next/dynamic";

// Desktop-only, so it's a separate chunk that touch devices never need to parse up front.
const CustomCursor = dynamic(() => import("@/components/motion/CustomCursor"), { ssr: false });

/** Page-wide effects mounted once in the root layout. */
export default function GlobalEffects() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <SpotlightTracker />
      <CustomCursor />
    </>
  );
}
