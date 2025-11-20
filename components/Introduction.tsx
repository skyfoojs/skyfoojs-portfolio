"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Introduction() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-28 relative z-10"
    >

      <div className="flex items-center justify-center mb-8">
        <div className="relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.2 }}
          >

            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

            <Image
              src="/FooJiaSeng.jpeg"
              alt="Foo Jia Seng"
              width="192"
              height="192"
              quality={95}
              priority={true}
              className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-2xl"
            />
          </motion.div>

          <motion.span
            className="absolute bottom-2 right-2 text-5xl hover:rotate-12 transition cursor-pointer origin-bottom-right"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 font-medium !leading-[1.5]"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="font-bold text-4xl sm:text-6xl tracking-tight text-gray-900 dark:text-white">
          Hello, I&apos;m{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
            Foo Jia Seng
          </span>
        </span>

        <p className="mt-6 text-lg sm:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light">
          Software Engineering Student @{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            Sunway University
          </span>
        </p>

        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Passionate about building web applications and exploring new
          technologies. Turning complex problems into elegant solutions.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            "Full-Stack Dev",
            "Problem Solver",
            "Tech Enthusiast",
            "MERN Stack",
          ].map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform cursor-default"
            >
              ✨ {skill}
            </span>
          ))}
        </div>
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-105 active:scale-105 transition shadow-lg hover:shadow-purple-500/30 dark:bg-white dark:text-gray-900"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>

        <Link
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-105 active:scale-105 transition cursor-pointer border border-black/10 dark:bg-white/10 dark:text-white dark:border-white/10 shadow-md hover:shadow-lg"
          href="/CV.pdf"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </Link>

        <div className="flex gap-3 sm:ml-2">
          <Link
            className="bg-white p-4 text-gray-700 hover:text-[#0077b5] flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer border border-black/10 dark:bg-white/10 dark:text-white/60 dark:hover:text-[#0077b5] shadow-md"
            href="https://www.linkedin.com/in/foo-jia-seng/"
            target="_blank"
          >
            <BsLinkedin />
          </Link>

          <Link
            className="bg-white p-4 text-gray-700 hover:text-gray-900 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer border border-black/10 dark:bg-white/10 dark:text-white/60 dark:hover:text-white shadow-md"
            href="https://github.com/skyfoojs"
            target="_blank"
          >
            <FaGithubSquare />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
