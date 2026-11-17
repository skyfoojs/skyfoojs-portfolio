"use client";

import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { ListChecks, X } from "lucide-react";
import { setScrollLocked } from "@/lib/lenis";

interface ProjectDetailsProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * "Details" button + native modal <dialog> holding a project's full write-up,
 * so grid cards stay short enough to scan. The dialog content is
 * server-rendered (in the HTML for crawlers), and <dialog> provides the
 * focus trap, Escape to close and focus return. Clicking the backdrop closes it.
 */
export default function ProjectDetails({ title, subtitle, children }: ProjectDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    return () => setScrollLocked(false);
  }, [open]);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const close = () => dialogRef.current?.close();
  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      <button ref={triggerRef} type="button" onClick={show} aria-haspopup="dialog" className="btn btn-sm btn-ghost">
        <ListChecks size={14} aria-hidden />
        Details
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={onBackdrop}
        data-lenis-prevent
        className="project-dialog m-auto max-h-[85dvh] w-[min(42rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-line-strong bg-surface p-0 text-body backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 id={titleId} className="font-heading text-xl font-bold leading-snug text-fg sm:text-2xl">
                {title}
              </h3>
              <p className="mt-1 text-sm text-muted">{subtitle}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close details"
              className="-mr-2 -mt-1 shrink-0 rounded-lg p-2 text-body hover:bg-white/5 hover:text-fg"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
