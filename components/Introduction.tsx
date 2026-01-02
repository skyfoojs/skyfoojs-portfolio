"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { OrbitingCircles } from "./ui/orbiting-circles";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare, FaJava, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiTypescript,
  SiExpress,
  SiLaravel,
  SiMongodb,
  SiPostman,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { DiMysql, DiGit } from "react-icons/di";

export default function Introduction() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="my-28 w-full sm:mb-0 scroll-mt-28 relative z-10 justify-center"
    >
      <div className="flex justify-center 2xl:gap-x-48 xl:gap-x-24 mt-10">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center sm:mb-8">
            <motion.h1
              className="mb-10 mt-4 px-4 font-extrabold flex flex-col text-gray-700 dark:text-gray-300 text-center sm:text-left"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="sm:text-2xl text-xl tracking-tight dark:text-white">
                Hi, I&apos;m{" "}
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-500 dark:from-purple-300 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-pulse xl:text-8xl lg:text-7xl md:text-6xl sm:text-6xl text-5xl py-2">
                Foo Jia Seng
              </span>
              <p className="mt-6 text-lg sm:text-xl md:text-2xl">
                Software Engineering Student @
                <span className="dark:text-white"> Sunway University</span>
              </p>

              <p className="dark:text-gray-400 max-w-lg opacity-70 mt-4 dark:opacity-90 font-medium">
                Passionate about building web applications and exploring new
                technologies. Turning complex problems into elegant solutions.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
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
          </div>

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

            <a
              className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-105 active:scale-105 transition cursor-pointer border border-black/10 dark:bg-white/10 dark:text-white dark:border-white/10 shadow-md hover:shadow-lg"
              href="/Foo Jia Seng_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
              <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
            </a>

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
        </div>

        <motion.div
          className="relative flex lg:w-[500px] flex-col items-center justify-center overflow-hidden w-0"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <OrbitingCircles
            className="w-[200px] h-[200px]"
            duration={30}
            radius={180}
          >
            <FaJava size={55} className="text-[#007396]" />
            <SiTypescript size={55} className="text-[#3178C6]" />
            <FaNodeJs size={55} className="text-[#339933]" />
            <FaReact size={55} className="text-[#61DAFB]" />
            <SiExpress size={55} className="text-black dark:text-white" />
            <SiLaravel size={55} className="text-[#FF2D20]" />
          </OrbitingCircles>

          <OrbitingCircles
            radius={100}
            reverse
            speed={2}
            duration={60}
            className="w-[100px] h-[100px]"
          >
            <DiMysql size={45} className="text-[#007073] dark:text-[#03d2d9]" />
            <SiMongodb size={35} className="text-green-500" />
            <VscVscode size={35} className="text-blue-400" />
            <DiGit size={35} className="text-[#F14E32] dark:text-[#F14E32]" />
            <SiPostman size={35} className="text-[#FF6C37]" />
          </OrbitingCircles>
        </motion.div>
      </div>
    </section>
  );
}
