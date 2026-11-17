"use client";

import type { TechItem } from "@/data/portfolio";
import { techIcons } from "@/components/ui/icons";

export interface LogoMarqueeProps {
  rows: readonly (readonly TechItem[])[];
}

function Row({ items, reverse }: { items: readonly TechItem[]; reverse: boolean }) {
  // Two copies side by side; the track moves by exactly one copy (-50%) and loops.
  const track = [...items, ...items];
  return (
    <div className="marquee-row">
      <ul className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}>
        {track.map((item, i) => {
          const { Icon, color } = techIcons[item.icon];
          return (
            <li
              key={`${item.name}-${i}`}
              className="inline-flex h-[38px] shrink-0 items-center gap-2 rounded-full border border-line bg-surface/80 px-4 text-sm font-medium text-body"
            >
              <Icon size={16} color={color} />
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Infinite logo marquee rows: alternating directions, pause on hover, pure
 * CSS transform animation. Loaded lazily by <LazyLogoMarquee>.
 */
export default function LogoMarquee({ rows }: LogoMarqueeProps) {
  return (
    <>
      {rows.map((items, i) => (
        <Row key={i} items={items} reverse={i % 2 === 1} />
      ))}
    </>
  );
}
