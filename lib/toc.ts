export interface TocItem {
  depth: 2 | 3;
  text: string;
  slug: string;
}

// Mirrors the slug algorithm used by rehype-slug / github-slugger closely
// enough for internal anchor links generated from MDX headings.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];
  const seen = new Map<string, number>();

  for (const line of lines) {
    const match = line.match(/^(##|###)\s+(.*)$/);
    if (!match) continue;
    const depth = match[1].length === 2 ? 2 : 3;
    const text = match[2].replace(/[#*_`]/g, "").trim();
    let slug = slugify(text);
    const count = seen.get(slug) ?? 0;
    if (count > 0) slug = `${slug}-${count}`;
    seen.set(slugify(text), count + 1);
    items.push({ depth, text, slug });
  }

  return items;
}
