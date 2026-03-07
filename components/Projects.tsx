"use client";

import { motion } from "framer-motion";
import { Github, Bot, BookOpen, UtensilsCrossed } from "lucide-react";

const projects = [
  {
    title: "MediDocAI",
    description:
      "AI-powered medical document query tool that enables intelligent analysis of medical records with real-time chat and secure document storage.",
    icon: Bot,
    iconColor: "text-sky-400",
    iconBg: "bg-sky-400/10",
    tags: ["Next.js", "TypeScript", "AWS Bedrock", "AWS Amplify", "DynamoDB", "AWS S3"],
    features: [
      "AI medical document analysis",
      "Real-time chat system",
      "Secure document storage",
    ],
    gradient: "from-sky-500/10 via-blue-500/5 to-transparent",
    border: "border-sky-500/20 hover:border-sky-400/50",
    tagColor: "bg-sky-900/40 text-sky-300 border-sky-500/20",
    github: "https://github.com/skyfoojs/greataihackathon-MediDocAI",
  },
  {
    title: "aZone",
    description:
      "University Subject Enrollment System with role-based access control and high-performance enrollment management using scalable REST APIs.",
    icon: BookOpen,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-400/10",
    tags: ["React", "Node.js", "Express", "MySQL"],
    features: [
      "Role-based access control",
      "High-performance enrollment",
      "Scalable REST APIs",
    ],
    gradient: "from-violet-500/10 via-purple-500/5 to-transparent",
    border: "border-violet-500/20 hover:border-violet-400/50",
    tagColor: "bg-violet-900/40 text-violet-300 border-violet-500/20",
    github: "https://github.com/iZ86/SEG2202SE-aZone",
  },
  {
    title: "TastyByte",
    description:
      "Restaurant food ordering system with a complete order management pipeline, menu system, and smooth customer experience.",
    icon: UtensilsCrossed,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10",
    tags: ["Laravel", "MySQL", "TailwindCSS", "JavaScript"],
    features: [
      "Restaurant ordering system",
      "Order management",
      "Menu system",
    ],
    gradient: "from-orange-500/10 via-amber-500/5 to-transparent",
    border: "border-orange-500/20 hover:border-orange-400/50",
    tagColor: "bg-orange-900/40 text-orange-300 border-orange-500/20",
    github: "https://github.com/skyfoojs/TastyByte_FYP",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">What I&apos;ve built</span>
          <h2 className="section-heading">Projects</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`group card-base bg-gradient-to-br ${project.gradient} border ${project.border} p-6 flex flex-col gap-5 transition-all duration-300 cursor-default`}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${project.iconBg}`}>
                    <Icon size={22} className={project.iconColor} />
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-slate-100 transition-colors"
                      aria-label={`${project.title} GitHub`}
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>

                {/* Title + Description */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-1.5">
                  {project.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-muted">
                      <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2.5 py-1 rounded-md border font-medium ${project.tagColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
