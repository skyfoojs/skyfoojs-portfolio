"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, GitFork, ExternalLink } from "lucide-react";

const GITHUB_USERNAME = "skyfoojs";

const pinnedRepos = [
  {
    name: "MediDocAI",
    description: "AI-powered medical document query tool with AWS Bedrock integration.",
    stars: 12,
    forks: 3,
    language: "TypeScript",
    langColor: "#3178C6",
    url: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    name: "aZone",
    description: "University enrollment system with RBAC and scalable REST APIs.",
    stars: 8,
    forks: 2,
    language: "TypeScript",
    langColor: "#3178C6",
    url: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    name: "TastyByte",
    description: "Full-stack restaurant ordering system built with Laravel and MySQL.",
    stars: 5,
    forks: 1,
    language: "PHP",
    langColor: "#777BB4",
    url: `https://github.com/${GITHUB_USERNAME}`,
  },
];

export default function GithubStats() {
  const chartColor = "38BDF8";
  const statsTheme = "transparent";
  const textColor = "94A3B8";
  const titleColor = "38BDF8";

  return (
    <section id="github" className="py-24 relative">
      <div className="absolute inset-0 bg-primary/20 -skew-y-1 -z-10" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">Open Source</span>
          <h2 className="section-heading">GitHub Activity</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 gap-6 mb-8"
        >
          {/* GitHub Stats Card */}
          <div className="card-base p-4 flex items-center justify-center overflow-hidden">
            <Image
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=${statsTheme}&hide_border=true&title_color=${titleColor}&text_color=${textColor}&icon_color=${titleColor}`}
              alt="GitHub Stats"
              width={450}
              height={180}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Top Languages Card */}
          <div className="card-base p-4 flex items-center justify-center overflow-hidden">
            <Image
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=${statsTheme}&hide_border=true&title_color=${titleColor}&text_color=${textColor}&icon_color=${titleColor}`}
              alt="Top Languages"
              width={450}
              height={180}
              className="w-full h-auto"
              unoptimized
            />
          </div>
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-base p-4 mb-10 overflow-hidden"
        >
          <p className="text-xs text-muted mb-3 font-semibold uppercase tracking-wider">
            Contribution Graph
          </p>
          <div className="w-full rounded-lg overflow-hidden">
            <Image
              src={`https://ghchart.rshah.org/${chartColor}/${GITHUB_USERNAME}`}
              alt="GitHub Contribution Graph"
              width={900}
              height={130}
              className="w-full h-auto dark:invert-0"
              unoptimized
            />
          </div>
        </motion.div>

        {/* Pinned/Latest Repos */}
        <div>
          <h3 className="font-heading font-semibold text-slate-200 text-sm uppercase tracking-wider mb-5">
            Latest Repositories
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedRepos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="card-base glow-border p-5 flex flex-col gap-3 group transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-heading font-semibold text-slate-100 text-sm group-hover:text-accent transition-colors">
                    {repo.name}
                  </h4>
                  <ExternalLink
                    size={14}
                    className="text-muted group-hover:text-accent transition-colors flex-shrink-0 mt-0.5"
                  />
                </div>
                <p className="text-xs text-muted leading-relaxed flex-1">
                  {repo.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.langColor }}
                    />
                    <span className="text-xs text-muted">{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted">
                    <Star size={11} />
                    <span className="text-xs">{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted">
                    <GitFork size={11} />
                    <span className="text-xs">{repo.forks}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
