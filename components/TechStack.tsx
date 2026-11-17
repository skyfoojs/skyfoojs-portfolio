import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { techIcons } from "@/components/ui/icons";
import { techStack } from "@/data/portfolio";

export default function TechStack() {
  return (
    <section id="tech" aria-labelledby="tech-heading" className="section">
      <div className="container-page">
        <SectionHeader id="tech-heading" eyebrow="What I work with" title="Tech stack" />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((category, i) => (
            <li key={category.label}>
              <Reveal delay={(i % 3) * 0.04} className="h-full">
                <div className="card h-full p-5 sm:p-6">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">{category.label}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {category.items.map((item) => {
                      const { Icon, color } = techIcons[item.icon];
                      return (
                        <li
                          key={item.name}
                          className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface-raised/70 px-3 py-2 text-sm font-medium text-fg"
                        >
                          <Icon size={16} color={color} aria-hidden />
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
