import Reveal from "@/components/motion/Reveal";

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
    <Reveal className="mb-10 md:mb-12 max-w-2xl">
      <p className={`eyebrow ${tone === "gold" ? "text-amber-300" : "text-accent"}`}>{eyebrow}</p>
      <h2 id={id} className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-fg">
        {title}
      </h2>
      {description && <p className="mt-3 text-body text-base leading-relaxed">{description}</p>}
    </Reveal>
  );
}
