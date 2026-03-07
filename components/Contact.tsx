"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  MapPin,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "skyfoojs@gmail.com",
    href: "mailto:skyfoojs@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+60 17-268 1225",
    href: "tel:+60172681225",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/skyfoojs",
    href: "https://github.com/skyfoojs",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/foo-jia-seng",
    href: "https://linkedin.com/in/foo-jia-seng",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Selangor, Malaysia",
    href: "https://maps.app.goo.gl/tk2SpNd8mUDbRkyeA",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate form submission
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">Get in touch</span>
          <h2 className="section-heading">Contact Me</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-muted text-sm max-w-md mx-auto">
            Open to internships, full-time roles, and exciting projects. Let&apos;s
            build something great together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-heading font-semibold text-slate-100 mb-2">
              Let&apos;s work together
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Whether you have a project in mind, a role to fill, or just
              want to connect — my inbox is always open.
            </p>

            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 card-base glow-border group transition-all duration-200 hover:bg-card/80"
              >
                <div className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Icon size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-medium">
                    {label}
                  </p>
                  <p className="text-sm text-slate-200 group-hover:text-accent transition-colors font-medium">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="card-base p-8 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-muted uppercase tracking-wider"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="bg-primary/50 border border-card-border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-muted uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="bg-primary/50 border border-card-border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-muted uppercase tracking-wider"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="bg-primary/50 border border-card-border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status !== "idle"}
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  status === "sent"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "btn-primary w-full"
                }`}
              >
                {status === "idle" && (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
                {status === "sending" && (
                  <>
                    <div className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full animate-spin" />
                    Sending...
                  </>
                )}
                {status === "sent" && (
                  <>
                    <CheckCircle size={15} />
                    Message Sent!
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
