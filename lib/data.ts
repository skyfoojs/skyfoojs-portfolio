import React from "react";
import { CgWorkAlt } from "react-icons/cg";
// import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import tastybyteImg from "@/public/tastybyte.jpg";
import medidocAiImg from "@/public/medidoc-ai.jpeg";
import okujobseekerImg from "@/public/okujobseeker.png";
import azoneImg from "@public/azone.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Diploma in Information Technology",
    location: "Sunway College - Kuala Lumpur",
    description:
      "Graduated with a CGPA of 3.95, building a solid foundation in programming, databases, networking, and software development through hands-on projects and practical experience.",
    icon: React.createElement(LuGraduationCap),
    date: "August 2023 - August 2025",
  },
  {
    title: "Node.js Backend Web Developer Intern",
    location: "Continental Tyre (PJ) Malaysia",
    description:
      "Developed a Desk Booking System with Node.js, Express, and TypeScript, featuring secure JWT authentication, recurring bookings, and automated desk release via CronJobs. Integrated MongoDB with optimized schema design, containerized the app using Docker, and implemented file storage on Azure Blob. Ensured clean, maintainable, and scalable code through best practices and close frontend collaboration.",
    icon: React.createElement(CgWorkAlt),
    date: "April 2025 - July 2025",
  },
  {
    title: "Bachelor's Degree of Software Engineering",
    location: "Sunway University - Kuala Lumpur",
    description:
      "Currently pursuing a Bachelor's Degree of Software Engineering at Sunway University, focusing on advanced software design, system architecture, and modern development practices to build scalable and efficient applications.",
    icon: React.createElement(LuGraduationCap),
    date: "September 2025 - present",
  },
] as const;

export const projectsData = [
  {
    title: "aZone",
    description:
      "aZone is a web-based University Subject Enrollment Platform developed as a Software Engineering assignment for the Bachelor of Software Engineering program at Sunway University (September 2025 Intake). The system is designed to simplify and improve the subject registration process for university students.",
    link: "https://github.com/iZ86/SEG2202SE",
    tags: ["React", "Express.js", "Tailwind", "TypeScript", "MySQL2"],
    imageUrl: azoneImg,
  },
  {
    title: "TastyByte",
    description:
      "My Final Year Project for Diploma in Information Technology @ Sunway College. This is a restaurant web-based ordering system designed to enhance order accuracy, speed up service, and improve customer satisfaction through efficient, streamlined food ordering.",
    tags: ["Blade", "Tailwind", "Laravel", "PHP", "MySQL"],
    link: "https://github.com/skyfoojs/TastyByte_FYP",
    imageUrl: tastybyteImg,
  },
  {
    title: "MediDoc AI",
    description:
      "MediDoc AI is an AI-Powered Intelligent Medical Document Query Tool that aims to help employees in the healthcare industry go through large number of medical documents with ease using queries. This project is made to solve a problem statement provided by the greataihackathon.",
    link: "https://github.com/skyfoojs/greataihackathon",
    tags: ["Next.js", "TypeScript", "Tailwind", "AWS Bedrock", "AWS Amplify", "AWS S3"],
    imageUrl: medidocAiImg,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "Tailwind",
  "JavaScript",
  "TypeScript",
  "Express.js",
  "Node.js",
  "React",
  "Next.js",
  "Java",
  "Docker",
  "Git",
  "MongoDB",
  "MySQL",
  "PHP",
  "Laravel",
  "RESTful APIs",
  "Figma",
  "YOLOv8",
] as const;
