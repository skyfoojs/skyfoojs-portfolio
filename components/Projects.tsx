import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import MoreProjects from "@/components/projects/MoreProjects";
import { CompactProjectCard, FeaturedProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/portfolio";

/**
 * Grid spans for the last "More projects" card so the last row is always
 * full: at md (2 columns) an odd last card spans both; at lg (3 columns) it
 * spans whatever is left in its row.
 */
function lastRowSpan(index: number, count: number): string {
  if (index !== count - 1) return "";
  const md = count % 2 === 1 ? "md:col-span-2" : "";
  const lgRemainder = count % 3;
  const lg = lgRemainder === 1 ? "lg:col-span-3" : lgRemainder === 2 ? "lg:col-span-2" : "lg:col-span-1";
  return `${md} ${lg}`;
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="container-page">
        <SectionHeader
          id="projects-heading"
          eyebrow="What I've built"
          title="Projects"
          description="Competition entries, hackathon builds and coursework."
        />

        {/* 3 columns ≥ 1024px (3 on top, 2 below). At md (2 columns) an odd last card spans both. */}
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featured.map((project, i) => (
            <li
              key={project.slug}
              className={i === featured.length - 1 && featured.length % 2 === 1 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Reveal delay={(i % 3) * 0.05} className="h-full">
                <FeaturedProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>

        {more.length > 0 && (
          <MoreProjects count={more.length}>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {more.map((project, i) => (
                <li key={project.slug} className={lastRowSpan(i, more.length)}>
                  <CompactProjectCard project={project} />
                </li>
              ))}
            </ul>
          </MoreProjects>
        )}
      </div>
    </section>
  );
}
