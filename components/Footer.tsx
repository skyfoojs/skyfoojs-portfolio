import { navSections, profile } from "@/data/portfolio";
import { SocialIcon } from "@/components/ui/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="container-page py-10 md:py-12">
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr_auto]">
          <div>
            <a href="#top" className="font-heading text-xl font-bold text-fg">
              {profile.firstName} <span className="gradient-text">{profile.lastName}</span>
            </a>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-body">
              Software Engineer · Backend & Data Engineering · {profile.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Sections</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navSections.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-sm text-body hover:text-accent">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Connect</h2>
            <ul className="flex gap-2">
              {profile.socials.map((s) => (
                <li key={s.kind}>
                  <a
                    href={s.href}
                    target={s.kind === "email" ? undefined : "_blank"}
                    rel={s.kind === "email" ? undefined : "noopener noreferrer"}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong text-body hover:border-accent/60 hover:text-accent"
                  >
                    <SocialIcon kind={s.kind} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p>Next.js · TypeScript · Tailwind CSS · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
