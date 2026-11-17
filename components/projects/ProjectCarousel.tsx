"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCarouselProps {
  images: readonly string[];
  title: string;
}

const SWIPE_THRESHOLD_PX = 40;
const imageClass = "object-cover object-top";
const sizes = "(min-width: 768px) 36rem, 100vw";

/** Screenshot slider: arrow buttons, dots, swipe and ←/→ keys. No autoplay. */
export default function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const count = images.length;

  if (count === 1) {
    return <Image src={images[0] ?? ""} alt={`Screenshot of ${title}`} fill sizes={sizes} className={imageClass} />;
  }

  const go = (next: number) => setIndex((next + count) % count);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") startX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) go(dx < 0 ? index + 1 : index - 1);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (startX.current = null)}
      className="group/carousel absolute inset-0 touch-pan-y select-none focus-visible:outline-offset-[-3px]"
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className="relative h-full w-full shrink-0"
          >
            <Image
              src={src}
              alt={`Screenshot ${i + 1} of ${title}`}
              fill
              sizes={sizes}
              draggable={false}
              className={imageClass}
            />
          </div>
        ))}
      </div>

      {(["prev", "next"] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={() => go(dir === "prev" ? index - 1 : index + 1)}
          aria-label={dir === "prev" ? "Previous screenshot" : "Next screenshot"}
          className={`absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/70 text-fg backdrop-blur transition-opacity hover:bg-background/90 focus-visible:opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 ${
            dir === "prev" ? "left-2" : "right-2"
          }`}
        >
          {dir === "prev" ? <ChevronLeft size={18} aria-hidden /> : <ChevronRight size={18} aria-hidden />}
        </button>
      ))}

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 rounded-full border border-white/10 bg-background/70 px-1 backdrop-blur">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show screenshot ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className="flex h-6 w-5 items-center justify-center"
          >
            <span
              aria-hidden
              className={`block h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-accent" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Screenshot {index + 1} of {count}
      </p>
    </div>
  );
}
