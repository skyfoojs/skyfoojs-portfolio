"use client";

import { motion } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiPhp,
  SiNodedotjs, SiExpress, SiReact, SiNextdotjs, SiLaravel,
  SiMongodb, SiMysql,
  SiDocker, SiGit, SiPostman, SiTailwindcss, SiFigma
} from "react-icons/si";
import { FaJava, FaDatabase, FaAws } from "react-icons/fa6";

const techCategories = [
  {
    label: "Programming",
    color: "from-sky-500/10 to-blue-500/10 border-sky-500/20",
    dotColor: "bg-sky-400",
    items: [
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={20} /> },
      { name: "TypeScript", icon: <SiTypescript color="#3178C6" size={20} /> },
      { name: "Java", icon: <FaJava color="#ED8B00" size={20} /> },
      { name: "PHP", icon: <SiPhp color="#777BB4" size={20} /> },
      { name: "SQL", icon: <FaDatabase className="text-slate-400" size={18} /> },
    ],
  },
  {
    label: "Frameworks",
    color: "from-violet-500/10 to-purple-500/10 border-violet-500/20",
    dotColor: "bg-violet-400",
    items: [
      { name: "Node.js", icon: <SiNodedotjs color="#339933" size={20} /> },
      { name: "Express", icon: <SiExpress className="text-slate-200" size={20} /> },
      { name: "React", icon: <SiReact color="#61DAFB" size={20} /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-slate-200" size={20} /> },
      { name: "Laravel", icon: <SiLaravel color="#FF2D20" size={20} /> },
    ],
  },
  {
    label: "Databases",
    color: "from-emerald-500/10 to-green-500/10 border-emerald-500/20",
    dotColor: "bg-emerald-400",
    items: [
      { name: "MongoDB", icon: <SiMongodb color="#47A248" size={20} /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" size={20} /> },
    ],
  },
  {
    label: "Tools",
    color: "from-orange-500/10 to-amber-500/10 border-orange-500/20",
    dotColor: "bg-orange-400",
    items: [
      { name: "Docker", icon: <SiDocker color="#2496ED" size={20} /> },
      { name: "Git", icon: <SiGit color="#F05032" size={20} /> },
      { name: "AWS", icon: <FaAws color="#FF9900" size={20} /> },
      { name: "Postman", icon: <SiPostman color="#FF6C37" size={20} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss color="#06B6D4" size={20} /> },
      { name: "Figma", icon: <SiFigma color="#F24E1E" size={20} /> },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-24 relative">
      <div className="absolute inset-0 bg-primary/30 -skew-y-1 -z-10" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">What I work with</span>
          <h2 className="section-heading">Tech Stack</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className={`card-base bg-gradient-to-br ${cat.color} p-6 hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className={`w-2 h-2 rounded-full ${cat.dotColor}`} />
                <h3 className="font-heading font-semibold text-slate-200 text-sm uppercase tracking-wider">
                  {cat.label}
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                {cat.items.map((tech, ti) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.1 + ti * 0.05, duration: 0.3 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group cursor-default"
                  >
                    <span className="flex items-center justify-center w-7 leading-none">
                      {tech.icon}
                    </span>
                    <span className="text-sm text-muted group-hover:text-slate-200 transition-colors font-medium">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
