import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { CategorySlug } from "./site";

const CONTENT_DIR = path.join(process.cwd(), "content", "expedientes");

export type Plausibilidad = "Alta" | "Media" | "Baja";

export interface ExpedienteFrontmatter {
  title: string;
  code: string;
  excerpt: string;
  status: string;
  accessLevel?: string;
  plausibility: Plausibilidad;
  plausibilityScore?: string;
  divergenceDate: string;
  hypothesis?: string;
  date: string;
  categories: CategorySlug[];
  image: string;
  bibliography: string[];
  sources: string[];
}

export interface Expediente extends ExpedienteFrontmatter {
  slug: string;
  content: string;
  readingMinutes: number;
}

function readFile(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

export function getExpedienteSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getExpedienteBySlug(slug: string): Expediente {
  const { data, content } = readFile(slug);
  const stats = readingTime(content);
  return {
    slug,
    content,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    ...(data as ExpedienteFrontmatter),
  };
}

export function getAllExpedientes(): Expediente[] {
  return getExpedienteSlugs()
    .map((slug) => getExpedienteBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getExpedientesByCategory(category: CategorySlug): Expediente[] {
  return getAllExpedientes().filter((e) => e.categories.includes(category));
}

export function searchExpedientes(query: string): Expediente[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllExpedientes().filter((e) => {
    const haystack = [e.title, e.code, e.excerpt, ...e.categories].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}
