"use client";

import { motion } from "framer-motion";
import { Building2, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    company: "Continental",
    role: "Web Backend Node.js Developer Intern",
    period: "April 2025 - July 2025",
    type: "Internship",
    responsibilities: [
      "Built REST APIs using Node.js + Express for internal tooling",
      "Designed MongoDB schemas for optimal query performance",
      "Implemented JWT authentication and middleware security",
      "Docker containerization for consistent dev environments",
      "Developed cron-based desk auto-release automation system",
    ],
    color: "border-accent/30",
    dotColor: "bg-accent",
    badge: "bg-accent/10 text-accent border-accent/20",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 bg-primary/20 -skew-y-1 -z-10" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">Work history</span>
          <h2 className="section-heading">Experience</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Timeline dot */}
              <div className="flex flex-col items-center pt-1.5">
                <div
                  className={`w-3 h-3 rounded-full ${exp.dotColor} shadow-[0_0_12px_rgba(56,189,248,0.4)] flex-shrink-0`}
                />
                <div className="w-px flex-1 bg-card-border mt-2" />
              </div>

              {/* Content */}
              <div className={`card-base border-l-2 ${exp.color} bg-card/60 p-6 mb-8 flex-1 hover:bg-card transition-colors`}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Building2 size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-100 text-lg">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-muted">{exp.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium ${exp.badge}`}
                    >
                      {exp.type}
                    </span>
                    <span className="text-xs text-muted bg-primary/50 px-3 py-1.5 rounded-full border border-card-border">
                      {exp.period}
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {exp.responsibilities.map((resp, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05, duration: 0.3 }}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-accent flex-shrink-0 mt-0.5"
                      />
                      {resp}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
