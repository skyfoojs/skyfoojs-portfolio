import Image from "next/image";
import { Briefcase, Code2, GraduationCap, MapPin } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { profile } from "@/data/portfolio";
import photo from "@/public/images/FooJiaSeng.jpeg";

const factIcons = [MapPin, Code2, GraduationCap, Briefcase] as const;

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <div className="container-page">
        <SectionHeader id="about-heading" eyebrow="Get to know me" title="About me" />

        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,15rem)_1fr] lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14">
          <Reveal className="mx-auto w-full max-w-[15rem] md:mx-0 md:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line-strong bg-surface">
              <Image
                src={photo}
                alt={profile.photo.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 18rem, 15rem"
                className="object-cover"
                style={{ objectPosition: profile.photo.objectPosition }}
              />
            </div>
            {profile.openToWork && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-400" />
                Open to work
              </p>
            )}
          </Reveal>

          <Reveal delay={0.05} className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-body md:text-lg">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              {profile.facts.map(({ label, value }, i) => {
                const Icon = factIcons[i % factIcons.length] ?? MapPin;
                return (
                  // dt/dd must be direct children of the group <div>, so the icon sits inside <dt>.
                  <div key={label} className="card p-4">
                    <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
                      <Icon size={18} aria-hidden className="shrink-0 text-accent" />
                      {label}
                    </dt>
                    <dd className="mt-0.5 pl-[30px] text-sm font-medium text-fg">{value}</dd>
                  </div>
                );
              })}
            </dl>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Core skills</h3>
              <ul className="flex flex-wrap gap-2">
                {profile.coreSkills.map((skill) => (
                  <li key={skill} className="chip border-accent/25 bg-accent/10 text-sky-200">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
