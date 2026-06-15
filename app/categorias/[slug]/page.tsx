import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExpedienteCard from "@/components/ExpedienteCard";
import { getExpedientesByCategory } from "@/lib/expedientes";
import { CATEGORIES, getCategoryBySlug, SITE } from "@/lib/site";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `${SITE.url}/categorias/${category.slug}` },
  };
}

export default function CategoriaPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const expedientes = getExpedientesByCategory(category.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="border-b border-gris/30 pb-4">
        <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">Categoría</p>
        <h1 className="mt-2 font-display text-3xl uppercase tracking-wide text-marfil md:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 font-body text-sm text-beige/70">{category.description}</p>
      </header>

      {expedientes.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expedientes.map((expediente) => (
            <ExpedienteCard key={expediente.slug} expediente={expediente} />
          ))}
        </div>
      ) : (
        <p className="mt-8 font-body text-sm text-beige/60">
          Aún no hay expedientes catalogados en esta categoría.
        </p>
      )}
    </div>
  );
}
