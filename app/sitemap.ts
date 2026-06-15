import type { MetadataRoute } from "next";
import { getAllExpedientes } from "@/lib/expedientes";
import { CATEGORIES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/expedientes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/categorias`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE.url}/categorias/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const expedienteRoutes: MetadataRoute.Sitemap = getAllExpedientes().map((e) => ({
    url: `${SITE.url}/expedientes/${e.slug}`,
    lastModified: e.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...expedienteRoutes];
}
