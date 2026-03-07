"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/skyfoojs", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/foo-jia-seng", label: "LinkedIn" },
  { icon: Mail, href: "mailto:skyfoojs@gmail.com", label: "Email" },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#tech", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-card-border bg-primary/30">
      <div className="section-container py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <button
              onClick={scrollToTop}
              className="font-heading font-bold text-xl text-slate-100 hover:text-accent transition-colors mb-3"
            >
              Foo <span className="gradient-text">Jia Seng</span>
            </button>
            <p className="text-muted text-sm leading-relaxed">
              Software Engineering student & backend developer building
              scalable systems with modern technologies.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading font-semibold text-slate-200 text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-heading font-semibold text-slate-200 text-sm uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2.5 card-base glow-border text-muted hover:text-accent transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted flex items-center gap-1.5">
            Built with <Heart size={11} className="text-red-400 fill-red-400" /> by Foo Jia Seng · {new Date().getFullYear()}
          </p>
          <p className="text-xs text-muted">
            Next.js · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
