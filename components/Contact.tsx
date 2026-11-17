"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { profile } from "@/data/portfolio";
import { CONTACT_LIMITS, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";

interface ContactRow {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}

const github = profile.socials.find((s) => s.kind === "github");
const linkedin = profile.socials.find((s) => s.kind === "linkedin");

const rows: ContactRow[] = [
  { icon: <Mail size={16} aria-hidden />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: <Phone size={16} aria-hidden />, label: "Phone", value: profile.phone.display, href: profile.phone.href },
  ...(github
    ? [{ icon: <FaGithub size={16} aria-hidden />, label: "GitHub", value: github.href.replace(/^https?:\/\/(www\.)?/, ""), href: github.href }]
    : []),
  ...(linkedin
    ? [{ icon: <FaLinkedin size={16} aria-hidden />, label: "LinkedIn", value: linkedin.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: linkedin.href }]
    : []),
  { icon: <MapPin size={16} aria-hidden />, label: "Location", value: profile.location, href: profile.locationMapUrl },
];

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const emptyForm: ContactInput = { name: "", email: "", message: "" };

const inputClass =
  "w-full rounded-xl border bg-background/60 px-4 py-3 text-[0.9375rem] text-fg placeholder:text-muted/80 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-accent/30";

export default function Contact() {
  const [form, setForm] = useState<ContactInput>(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as keyof ContactInput;
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: honeypot }),
      });
      const data: { error?: string; errors?: ContactErrors } = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus({ state: "error", message: data.error ?? "Your message couldn't be sent." });
        return;
      }
      setForm(emptyForm);
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again or email me directly." });
    }
  };

  const field = (name: keyof ContactInput) => ({
    id: `contact-${name}`,
    name,
    value: form[name],
    onChange,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: `${inputClass} ${errors[name] ? "border-rose-400/70" : "border-line-strong"}`,
  });

  const fieldError = (name: keyof ContactInput) =>
    errors[name] && (
      <p id={`contact-${name}-error`} className="text-sm text-rose-300">
        {errors[name]}
      </p>
    );

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="container-page">
        <SectionHeader
          id="contact-heading"
          eyebrow="Get in touch"
          title="Contact me"
          description="Have a role, a project or a question? Send a message and it goes straight to my inbox."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
          <Reveal>
            <ul className="flex flex-col gap-3">
              {rows.map((row) => {
                const external = row.href.startsWith("http");
                return (
                  <li key={row.label}>
                    <a
                      href={row.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="card card-interactive flex items-center gap-4 p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        {row.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{row.label}</span>
                        <span className="block truncate text-[0.9375rem] font-medium text-fg">{row.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <form onSubmit={onSubmit} noValidate className="card relative flex flex-col gap-5 p-5 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-sm font-medium text-fg">
                    Name
                  </label>
                  <input {...field("name")} type="text" autoComplete="name" maxLength={CONTACT_LIMITS.name} required />
                  {fieldError("name")}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-sm font-medium text-fg">
                    Email
                  </label>
                  <input
                    {...field("email")}
                    type="email"
                    autoComplete="email"
                    maxLength={CONTACT_LIMITS.email}
                    placeholder="you@example.com"
                    required
                  />
                  {fieldError("email")}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-sm font-medium text-fg">
                  Message
                </label>
                <textarea
                  {...field("message")}
                  rows={6}
                  maxLength={CONTACT_LIMITS.message}
                  placeholder="Tell me about the role or project…"
                  required
                  className={`${field("message").className} resize-y`}
                />
                {fieldError("message")}
              </div>

              {/* Honeypot for bots; hidden from people and assistive tech. */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" disabled={status.state === "sending"} className="btn btn-primary disabled:cursor-wait disabled:opacity-80">
                  {status.state === "sending" ? (
                    <>
                      <Loader2 size={16} aria-hidden className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <Send size={16} aria-hidden />
                    </>
                  )}
                </button>
                <p role="status" aria-live="polite" className="text-sm">
                  {status.state === "sent" && (
                    <span className="inline-flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle2 size={16} aria-hidden /> Thanks! Your message is on its way.
                    </span>
                  )}
                  {status.state === "error" && (
                    <span className="text-rose-300">
                      {status.message}{" "}
                      <a href={`mailto:${profile.email}`} className="underline underline-offset-2 hover:text-rose-200">
                        {profile.email}
                      </a>
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
