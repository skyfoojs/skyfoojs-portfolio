"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion, type Variants } from "framer-motion";

const fadeInAnimationVariants: Variants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My Technical Arsenal</SectionHeading>

      <ul className="flex flex-wrap justify-center gap-3 text-lg text-gray-800">
        {skillsData.map((skill, index) => (
          <motion.li
            className="bg-white/50 border border-black/10 rounded-2xl px-6 py-3 dark:bg-white/10 dark:text-white/80 dark:border-white/5 backdrop-blur-md shadow-sm cursor-grab active:cursor-grabbing"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
            whileHover={{
              scale: 1.1,
              y: -5,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
