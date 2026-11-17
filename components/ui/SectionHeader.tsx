import Reveal from "@/components/motion/Reveal";
import MaskedReveal from "@/components/motion/MaskedReveal";

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "default" | "gold";
}

export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  tone = "default",
}: SectionHeaderProps) {
  return (
    <div className="mb-10 md:mb-12 max-w-2xl">
      <Reveal>
        <p className={`eyebrow ${tone === "gold" ? "text-amber-300" : "text-accent"}`}>{eyebrow}</p>
      </Reveal>
      <h2 id={id} className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-fg">
        <MaskedReveal delay={0.05}>{title}</MaskedReveal>
      </h2>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-3 text-body text-base leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
