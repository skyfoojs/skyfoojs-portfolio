"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        Currently pursuing a degree in{" "}
        <span className="font-medium">Software Engineering</span>. I love
        participating in various types of{" "}
        <span className="font-medium">hackathons</span>.{" "}
        <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I <span className="underline">love</span> the
        feeling of finally figuring out a solution to a problem. My core stack
        is{" "}
        <span className="font-medium">
          React, Express.js, and MongoDB/MySQL
        </span>
        . I am also familiar with{" "}
        <span className="font-medium">TypeScript, MySQL2, and Mongoose</span>.
        I am always looking forward to learn new technologies and skills.
      </p>

      <p>
        <span className="italic">When I&apos;m not coding</span>, I enjoy{" "}
        <span className="font-medium">working out in</span> the gym. I also
        enjoy <span className="font-medium">learning new things</span>. I am
        currently learning about{" "}
        <span className="font-medium">stock investment</span>.
      </p>
    </motion.section>
  );
}
