import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type SpotlightCardProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Card with a cursor-following glow on its border and, fainter, its surface.
 * Server component: the cursor position comes from <SpotlightTracker>, which
 * sets --sx/--sy on the hovered `.spotlight` element. The glow layers only
 * move with `transform` (see globals.css) and only show on fine pointers.
 */
export default function SpotlightCard<T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...rest
}: SpotlightCardProps<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag className={`spotlight relative isolate ${className}`} {...rest}>
      <span aria-hidden className="spotlight-surface">
        <span className="spotlight-blob" />
      </span>
      <span aria-hidden className="spotlight-ring">
        <span className="spotlight-blob" />
      </span>
      {children}
    </Tag>
  );
}
