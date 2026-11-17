"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function MoreProjects({ count, children }: { count: number; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="more-projects"
          className="btn btn-secondary"
        >
          {open ? "Hide more projects" : `More projects (${count})`}
          <ChevronDown
            size={16}
            aria-hidden
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="more-projects"
            key="more"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
