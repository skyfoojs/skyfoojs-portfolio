"use client";

import { motion } from "framer-motion";
import { User, MapPin, GraduationCap, Code } from "lucide-react";
import Image from "next/image";

const timeline = [
  {
    year: "September 2025 - Present",
    title: "Bachelor in Software Engineering",
    company: "Sunway University",
    desc: "Currently pursuing degree, having a CGPA of 3.88.",
  },
  {
    year: "April 2025 - July 2025",
    title: "Node.js Web Backend Intern",
    company: "Continental Tyre PJ Malaysia Sdn Bhd",
    desc: "Built REST APIs with Node.js + Express, containerized with Docker.",
  },
  {
    year: "August 2023 - August 2025",
    title: "Diploma in Information Technology",
    company: "Sunway College",
    desc: "Graduated with CGPA 3.95, strong foundation in software development.",
  },
];

const skills = [
  "Node.js", "TypeScript", "React", "Next.js",
  "MongoDB", "MySQL", "Docker", "AWS",
  "Express", "Laravel", "Git", "REST APIs",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">Get to know me</span>
          <h2 className="section-heading">About Me</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Profile image + stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start gap-8"
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="w-56 h-56 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-2xl">
                <Image
                  src="/images/FooJiaSeng.jpeg"
                  alt="Foo Jia Seng"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent/10 border border-accent/30 rounded-xl px-4 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-300 font-medium">Open to work</span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col gap-3">
              {[
                { icon: MapPin, text: "Malaysia" },
                { icon: GraduationCap, text: "Sunway University" },
                { icon: Code, text: "Backend Developer" },
                { icon: User, text: "Software Engineering Student" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-muted">
                  <Icon size={16} className="text-accent flex-shrink-0" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio + Skills + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Bio */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-slate-100 mb-4">
                Hi there! 👋
              </h3>
              <p className="text-muted leading-relaxed text-base">
                I am a{" "}
                <span className="text-slate-200">Software Engineering student</span> from
                Malaysia with strong experience in backend development using{" "}
                <span className="text-accent">Node.js</span>,{" "}
                <span className="text-accent">Express</span>, and{" "}
                <span className="text-accent">TypeScript</span>. I enjoy designing
                scalable APIs, optimizing database performance, and building full-stack
                web applications using modern technologies.
              </p>
            </div>

            {/* Skills chips */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                Core Skills
              </h4>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    className="text-xs bg-accent/10 text-accent border border-accent/20 px-3 py-1.5 rounded-lg font-medium hover:bg-accent/20 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Mini Timeline */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                Timeline
              </h4>
              <div className="flex flex-col gap-4">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      {i < timeline.length - 1 && (
                        <div className="w-px flex-1 bg-card-border mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-accent text-xs font-semibold">
                          {item.year}
                        </span>
                        <span className="text-xs text-muted">·</span>
                        <span className="text-xs text-muted">{item.company}</span>
                      </div>
                      <p className="text-sm text-slate-200 font-medium">{item.title}</p>
                      <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
