import { GraduationCap } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { education } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="section">
      <div className="container-page">
        <SectionHeader id="education-heading" eyebrow="Academic background" title="Education" />

        <ul className="grid gap-4 md:grid-cols-2">
          {education.map((item, i) => (
            <li key={item.slug}>
              <Reveal delay={i * 0.04} className="h-full">
                <article className="card flex h-full items-start gap-4 p-5 sm:p-6">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent"
                  >
                    <GraduationCap size={20} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold leading-snug text-fg">{item.qualification}</h3>
                    <p className="mt-1 font-medium text-accent">{item.institution}</p>
                    <p className="mt-1 text-sm text-body">
                      {item.period} · {item.location}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
