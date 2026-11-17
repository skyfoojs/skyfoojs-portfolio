import { BarChart3, ExternalLink, PlayCircle, Trophy, Medal } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { awardForProject, type Project, type ProjectLinkKind } from "@/data/portfolio";
import { findNumberedImages } from "@/lib/assets";
import ProjectCarousel from "@/components/projects/ProjectCarousel";

function LinkIcon({ kind }: { kind: ProjectLinkKind }) {
  if (kind === "code") return <FaGithub size={14} aria-hidden />;
  if (kind === "demo") return <PlayCircle size={14} aria-hidden />;
  if (kind === "results") return <BarChart3 size={14} aria-hidden />;
  return <ExternalLink size={14} aria-hidden />;
}

function ProjectLinks({ project }: { project: Project }) {
  const links = project.links.filter((l) => l.href.trim() !== "");
  if (links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
          <a
            key={`${link.kind}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title}: ${link.label}${link.kind === "code" ? " source code" : ""} (opens in a new tab)`}
            className={`btn btn-sm ${link.kind === "live" || link.kind === "results" ? "btn-primary" : "btn-secondary"}`}
          >
            <LinkIcon kind={link.kind} />
            {link.label}
          </a>
      ))}
    </div>
  );
}

function AwardBadge({ slug }: { slug: string }) {
  const award = awardForProject(slug);
  if (!award) return null;
  const Icon = award.kind === "podium" ? Trophy : Medal;
  return (
    <a
      href={`#award-${award.slug}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-1 text-xs font-semibold text-amber-200 hover:border-amber-300/70"
    >
      <Icon size={12} aria-hidden className="text-amber-300" />
      {award.rank}
    </a>
  );
}

function Screenshot({ project }: { project: Project }) {
  // TODO(skyfoo): add screenshots at /public/projects/<slug>_1.png, _2.png, … (aigis).
  const images = findNumberedImages("projects", project.imageName ?? project.slug);
  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden border-b border-line bg-surface-raised">
      {images.length > 0 ? (
        <ProjectCarousel images={images} title={project.title} />
      ) : (
        <div aria-hidden className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-dots opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(56_189_248/0.18),transparent_60%),radial-gradient(circle_at_80%_90%,rgb(129_140_248/0.16),transparent_60%)]" />
          <span className="relative px-6 text-center font-heading text-2xl font-bold text-fg/80 sm:text-3xl">
            {project.title.split(":")[0]}
          </span>
        </div>
      )}
    </div>
  );
}

function Tags({ project }: { project: Project }) {
  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
      {project.tech.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <AwardBadge slug={project.slug} />
      {project.hackathon && (
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-sky-200">
          Hackathon
        </span>
      )}
    </div>
  );
}

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="card card-interactive group flex h-full flex-col overflow-hidden"
    >
      <Screenshot project={project} />
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <Meta project={project} />
        <div>
          <h3 className="font-heading text-xl font-bold leading-snug text-fg">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {project.context}
            {project.period ? ` · ${project.period}` : ""}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{project.tagline}</p>
        </div>

        <ul className="flex flex-col gap-2">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-body">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>

        {project.contribution && (
          <p className="rounded-xl border border-accent/25 bg-accent/[0.07] px-4 py-3 text-sm leading-relaxed text-body">
            <span className="font-semibold text-accent">My part: </span>
            {project.contribution}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-4 border-t border-line pt-4">
          <Tags project={project} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="card card-interactive flex h-full flex-col gap-3 p-5"
    >
      <Meta project={project} />
      <div>
        <h3 className="font-heading text-lg font-bold text-fg">{project.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {project.context}
          {project.period ? ` · ${project.period}` : ""}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-body">
        {project.tagline} {project.bullets.join(". ")}.
      </p>
      <div className="mt-auto flex flex-col gap-4 pt-2">
        <Tags project={project} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
