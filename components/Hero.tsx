"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, ChevronRight, Sparkles } from "lucide-react";

const typingTexts = [
  "Node.js Developer",
  "MERN Stack Engineer",
  "TypeScript Enthusiast",
  "Fullstack Developer",
];

function useTypingEffect(texts: string[]) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return displayText;
}

/* Floating orb component */
function Orb({ className, delay = 0, duration = 8 }: { className: string; delay?: number; duration?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none ${className}`}
      animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Hero() {
  const typedText = useTypingEffect(typingTexts);
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.02);
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.02);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Aurora animated background ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#020617]" />

        {/* Dot grid */}
        <div className="absolute inset-0 dot-bg opacity-40" />

        {/* Aurora layers */}
        <div
          className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[140vw] h-[80vh] opacity-60 animate-aurora"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #38BDF820 0deg, #818CF820 90deg, #EC489920 180deg, #38BDF820 270deg, #38BDF820 360deg)",
            filter: "blur(80px)",
          }}
        />

        {/* Floating orbs */}
        <Orb className="w-[500px] h-[500px] bg-sky-500 -top-32 -left-32" delay={0} duration={10} />
        <Orb className="w-[400px] h-[400px] bg-indigo-600 top-1/4 -right-20" delay={2} duration={12} />
        <Orb className="w-[300px] h-[300px] bg-pink-500 bottom-0 left-1/4" delay={4} duration={9} />
        <Orb className="w-[250px] h-[250px] bg-violet-500 top-1/2 left-1/2" delay={3} duration={11} />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#020617_100%)]" />
      </div>

      {/* ── Mouse parallax container ── */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="section-container flex flex-col items-center text-center pt-28 pb-20 z-10 w-full"
      >
        {/* Badge */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border text-sm font-medium"
          style={{
            background: "rgba(56,189,248,0.08)",
            borderColor: "rgba(56,189,248,0.3)",
            color: "#7DD3FC",
            boxShadow: "0 0 30px rgba(56,189,248,0.1), inset 0 0 20px rgba(56,189,248,0.05)",
          }}
        >
          <Sparkles size={13} className="text-accent" />
          <span>Available for opportunities</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div> */}

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold leading-[1.05] tracking-tight mb-5"
          style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)" }}
        >
          <span className="text-slate-100">Foo </span>
          <span className="gradient-text">Jia Seng</span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-3 mb-6"
          style={{ minHeight: "2.5rem" }}
        >
          <span className="font-heading text-xl sm:text-2xl md:text-3xl text-slate-300 font-semibold">
            {typedText}
          </span>
          <span
            className="inline-block w-[3px] h-8 bg-accent rounded-full"
            style={{ animation: "pulse 0.9s step-end infinite" }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-muted text-base sm:text-lg max-w-lg leading-relaxed mb-10"
        >
          Building scalable web applications with{" "}
          <span className="text-sky-300 font-medium">Node.js</span>,{" "}
          <span className="text-sky-300 font-medium">TypeScript</span>, and modern cloud
          technologies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <button onClick={() => scrollTo("#projects")} className="btn-primary">
            <span>View Projects</span>
            <ChevronRight size={16} />
          </button>
          <button onClick={() => scrollTo("#contact")} className="btn-secondary">
            Contact Me
            <Mail size={16} />
          </button>
          <a
            href="/docs/FooJiaSeng_Resume.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 text-muted hover:text-slate-200 font-medium px-5 py-3 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-white/10 text-sm"
          >
            <Download size={15} />
            Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center gap-3 mb-16"
        >
          {[
            { icon: Github, href: "https://github.com/skyfoojs", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/foo-jia-seng/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:skyfoojs@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.08, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl text-muted hover:text-accent transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => scrollTo("#about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.5, 1] }}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
          className="flex flex-col items-center gap-2 text-muted/50 hover:text-accent transition-colors"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
    </section>
  );
}
