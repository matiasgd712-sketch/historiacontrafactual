import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllExpedientes,
  getExpedienteBySlug,
  getExpedienteSlugs,
} from "@/lib/expedientes";
import { getCategoryBySlug, SITE } from "@/lib/site";
import { extractToc } from "@/lib/toc";
import { formatDate } from "@/lib/format";
import DossierHeader from "@/components/DossierHeader";
import TableOfContents from "@/components/TableOfContents";
import References from "@/components/References";
import MdxContent from "@/components/MdxContent";
import ExpedienteCard from "@/components/ExpedienteCard";
import ExpedienteImage from "@/components/ExpedienteImage";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getExpedienteSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const slugs = getExpedienteSlugs();
  if (!slugs.includes(params.slug)) return {};

  const expediente = getExpedienteBySlug(params.slug);
  const url = `${SITE.url}/expedientes/${expediente.slug}`;

  return {
    title: `${expediente.code} — ${expediente.title}`,
    description: expediente.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${expediente.code} — ${expediente.title}`,
      description: expediente.excerpt,
      publishedTime: expediente.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${expediente.code} — ${expediente.title}`,
      description: expediente.excerpt,
    },
  };
}

export default function ExpedientePage({ params }: Props) {
  const slugs = getExpedienteSlugs();
  if (!slugs.includes(params.slug)) notFound();

  const expediente = getExpedienteBySlug(params.slug);
  const toc = extractToc(expediente.content);

  const related = getAllExpedientes()
    .filter(
      (e) =>
        e.slug !== expediente.slug &&
        e.categories.some((c) => expediente.categories.includes(c))
    )
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: expediente.title,
    description: expediente.excerpt,
    datePublished: expediente.date,
    inLanguage: "es",
    identifier: expediente.code,
    about: expediente.categories.map((c) => getCategoryBySlug(c)?.name).filter(Boolean),
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
    mainEntityOfPage: `${SITE.url}/expedientes/${expediente.slug}`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DossierHeader expediente={expediente} />

      {expediente.image.startsWith("/") && (
        <ExpedienteImage
          image={expediente.image}
          code={expediente.code}
          alt={expediente.title}
          className="mt-6 aspect-[16/10] w-full"
          sizes="(min-width: 1024px) 800px, 100vw"
        />
      )}

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <article className="order-2 lg:order-1">
          <MdxContent source={expediente.content} />
          <References bibliography={expediente.bibliography} sources={expediente.sources} />
        </article>

        <aside className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-6">
            <TableOfContents items={toc} />
            <div className="mt-6 border border-gris/30 bg-negro/40 p-5 font-mono text-xs uppercase tracking-widest2 text-gris">
              <p>Última revisión</p>
              <p className="mt-1 text-marfil">{formatDate(expediente.updated ?? expediente.date)}</p>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="border-b border-gris/30 pb-3">
            <h2 className="font-display text-2xl uppercase tracking-wide text-marfil md:text-3xl">
              Expedientes relacionados
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <ExpedienteCard key={e.slug} expediente={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
