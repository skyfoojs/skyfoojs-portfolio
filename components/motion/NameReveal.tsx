"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";

interface NameRevealProps {
  id: string;
  firstName: string;
  lastName: string;
  className?: string;
  style?: CSSProperties;
}

const letterStyle = (i: number): CSSProperties => ({ "--i": i } as CSSProperties);
const glyph = (ch: string) => (ch === " " ? "\u00a0" : ch);

/**
 * Hero <h1>. Each letter sharpens from a blur while rising slightly (CSS
 * keyframes, so it starts on first paint and never waits for hydration;
 * letters stay fully opaque so LCP isn't delayed). Then a light band sweeps
 * across the gradient last name every few seconds.
 *
 * Every gradient letter gets its own slice of one shared gradient (measured
 * below), because `background-clip: text` on a parent doesn't reliably
 * cover transformed children in Safari. The shimmer is a copy of the word
 * seen through a moving window: both layers only use `transform`.
 */
export default function NameReveal({ id, firstName, lastName, className, style }: NameRevealProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const firstLetters = [...firstName];
  const lastLetters = [...lastName];

  useLayoutEffect(() => {
    const word = wordRef.current;
    if (!word) return;
    const measure = () => {
      const width = word.offsetWidth;
      word.querySelectorAll<HTMLElement>("[data-slice]").forEach((el) => {
        el.style.backgroundSize = `${width}px 100%`;
        el.style.backgroundPosition = `${-el.offsetLeft}px 0`;
      });
    };
    measure();
    // Re-measure when the web font swaps in or the viewport resizes.
    const observer = new ResizeObserver(measure);
    observer.observe(word);
    return () => observer.disconnect();
  }, []);

  return (
    <h1 id={id} className={className} style={style}>
      <span className="sr-only">
        {firstName} {lastName}
      </span>
      <span aria-hidden>
        <span className="inline-block whitespace-nowrap">
          {firstLetters.map((ch, i) => (
            <span key={i} className="name-letter" style={letterStyle(i)}>
              {glyph(ch)}
            </span>
          ))}
        </span>{" "}
        <span ref={wordRef} className="relative inline-block whitespace-nowrap">
          {lastLetters.map((ch, i) => (
            <span
              key={i}
              data-slice
              className="name-letter name-gradient-letter"
              style={letterStyle(firstLetters.length + 1 + i)}
            >
              {glyph(ch)}
            </span>
          ))}
          <span className="name-shimmer">
            <span className="name-shimmer-inner">
              {lastLetters.map((ch, i) => (
                <span key={i} data-slice className="name-shimmer-letter">
                  {glyph(ch)}
                </span>
              ))}
            </span>
          </span>
        </span>
      </span>
    </h1>
  );
}
