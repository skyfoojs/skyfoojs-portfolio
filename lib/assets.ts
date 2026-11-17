import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Returns the public URL of `/<dir>/<slug>.<ext>` for the first extension that
 * exists on disk, or null. Runs at build time (the page is statically
 * prerendered), so missing images fall back to placeholders without 404s.
 */
export function findPublicImage(
  dir: string,
  slug: string,
  extensions: readonly string[] = ["png", "jpg", "jpeg", "webp", "svg"],
): string | null {
  for (const ext of extensions) {
    const relative = `${dir}/${slug}.${ext}`;
    if (fs.existsSync(path.join(PUBLIC_DIR, relative))) return `/${relative}`;
  }
  return null;
}

/**
 * Returns every image for a project in /public/<dir>, ordered for a carousel:
 * `<slug>.<ext>` first (if present), then `<slug>_1`, `<slug>_2`, … by number
 * (so _10 comes after _9).
 */
export function findNumberedImages(dir: string, slug: string): string[] {
  const folder = path.join(PUBLIC_DIR, dir);
  if (!fs.existsSync(folder)) return [];
  const pattern = new RegExp(`^${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:_(\\d+))?\\.(png|jpe?g|webp)$`, "i");

  return fs
    .readdirSync(folder)
    .map((file) => ({ file, match: pattern.exec(file) }))
    .filter((entry): entry is { file: string; match: RegExpExecArray } => entry.match !== null)
    .map(({ file, match }) => ({ file, order: match[1] === undefined ? 0 : Number(match[1]) }))
    .sort((a, b) => a.order - b.order)
    .map(({ file }) => `/${dir}/${file}`);
}
