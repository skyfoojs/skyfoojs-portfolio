import type { ReactNode } from "react";
import { Calendar, MapPin } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import SpotlightCard from "@/components/motion/SpotlightCard";
import Timeline from "@/components/motion/Timeline";
import SectionHeader from "@/components/ui/SectionHeader";
import { experience } from "@/data/portfolio";

/** Wraps any stat value that appears in the bullet text in <strong>. */
function emphasise(text: string, values: readonly string[]): ReactNode[] {
  const needles = values
    // Prefer the full value ("9.3M rows"), fall back to the number ("40+").
    .map((v) => (text.includes(v) ? v : (v.split(" ")[0] ?? v)))
    .filter((v) => text.includes(v))
    .sort((a, b) => b.length - a.length);
  if (needles.length === 0) return [text];

  const escaped = needles.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    needles.includes(part) ? (
      <strong key={i} className="font-semibold text-fg">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <div className="container-page">
        <SectionHeader id="experience-heading" eyebrow="Work history" title="Experience" />

        <Timeline>
        <ol className="flex flex-col gap-6 pl-7 sm:pl-10">
          {experience.map((item) => (
            <li key={item.slug} className="relative">
              <span
                aria-hidden
                data-timeline-dot
                className="timeline-dot absolute -left-7 top-7 sm:-left-10 sm:top-8"
              />
              <Reveal>
                <SpotlightCard as="article" className="card p-5 sm:p-7">
                  <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-bold leading-snug text-fg sm:text-xl">{item.role}</h3>
                      <p className="mt-0.5 font-medium text-accent">{item.company}</p>
                      {item.team && <p className="mt-1 text-sm text-muted">{item.team}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5 text-sm text-body sm:items-end sm:text-right">
                      <span className="inline-flex items-center gap-1.5 font-medium text-fg">
                        <Calendar size={14} aria-hidden className="text-muted" />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} aria-hidden className="text-muted" />
                        {item.location} · {item.workMode}
                      </span>
                      <span className="chip w-fit">{item.employmentType}</span>
                    </div>
                  </header>

                  <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                    {item.stats.map((stat) => (
                      <div
                        key={stat.value}
                        className="flex flex-col-reverse rounded-xl border border-line bg-surface-raised/60 px-4 py-3"
                      >
                        <dt className="mt-0.5 text-sm text-body">{stat.label}</dt>
                        <dd className="font-heading text-2xl font-bold text-fg">
                          <CountUp value={stat.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-6 flex flex-col gap-2.5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[0.9375rem] leading-relaxed text-body">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{emphasise(bullet, item.stats.map((s) => s.value))}</span>
                      </li>
                    ))}
                  </ul>

                  <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                    {item.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ol>
        </Timeline>
      </div>
    </section>
  );
}
