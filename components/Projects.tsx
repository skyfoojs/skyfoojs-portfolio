import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import MoreProjects from "@/components/projects/MoreProjects";
import { CompactProjectCard, FeaturedProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/portfolio";

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

        <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {featured.map((project, i) => (
            <li key={project.slug}>
              <Reveal delay={(i % 2) * 0.05} className="h-full">
                <FeaturedProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>

        {more.length > 0 && (
          <MoreProjects count={more.length}>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {more.map((project) => (
                <li key={project.slug}>
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
