"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    degree: "Bachelor in Software Engineering",
    institution: "Sunway University",
    period: "September 2025 – Present",
    status: "In Progress",
    statusColor: "bg-accent/10 text-accent border-accent/20",
    highlights: [
      "Dean's List Award",
      "Active in hackathons",
      "Full-stack development project exposure",
    ],
    gradient: "from-sky-500/5 to-transparent",
    border: "border-sky-500/20",
    icon: GraduationCap,
    iconColor: "text-accent",
  },
  {
    degree: "Diploma in Information Technology",
    institution: "Sunway College",
    period: "August 2023 – August 2025",
    status: "CGPA 3.95",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    highlights: [
      "Graduated with CGPA 3.95",
      "Strong foundation in programming and algorithms",
      "Database design and web development fundamentals",
    ],
    gradient: "from-emerald-500/5 to-transparent",
    border: "border-emerald-500/20",
    icon: Award,
    iconColor: "text-emerald-400",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">Academic background</span>
          <h2 className="section-heading">Education</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {education.map((edu, i) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className={`card-base bg-gradient-to-br ${edu.gradient} border ${edu.border} p-6 flex flex-col gap-5 transition-all duration-300`}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-card">
                    <Icon size={22} className={edu.iconColor} />
                  </div>
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full border font-semibold ${edu.statusColor}`}
                  >
                    {edu.status}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-heading font-bold text-slate-100 text-base mb-1 leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-accent text-sm font-medium mb-1">{edu.institution}</p>
                  <p className="text-muted text-xs">{edu.period}</p>
                </div>

                {/* Highlights */}
                <ul className="flex flex-col gap-2">
                  {edu.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-xs text-muted"
                    >
                      <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
