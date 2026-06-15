import Link from "next/link";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import ExpedienteCard from "@/components/ExpedienteCard";
import ArchivePlaceholder from "@/components/ArchivePlaceholder";
import PlausibilityBadge from "@/components/PlausibilityBadge";
import { getAllExpedientes } from "@/lib/expedientes";
import { SITE } from "@/lib/site";

export default function HomePage() {
  const all = getAllExpedientes();
  const featured = all.find((e) => e.code === "HC-001") ?? all[0];
  const latest = all.filter((e) => e.slug !== featured.slug).slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Identidad */}
      <section className="border border-gris/30 bg-archive-grain px-6 py-14 text-center sm:py-20">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <p className="mt-6 font-mono text-sm uppercase tracking-widest2 text-rojo">
          {SITE.slogan}
        </p>
        <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-beige/80 md:text-lg">
          {SITE.name} es un archivo digital de escenarios históricos alternativos plausibles.
          Cada expediente analiza, con rigor documental, cómo podría haber evolucionado el curso
          de los acontecimientos si un punto de divergencia clave hubiese ocurrido de otra forma.
          No es ficción: es reconstrucción histórica especulativa.
        </p>
        <div className="mt-8 flex justify-center">
          <SearchBar />
        </div>
      </section>

      {/* Expediente insignia */}
      <section className="mt-16">
        <div className="border-b border-gris/30 pb-3">
          <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">Expediente insignia</p>
        </div>
        <Link
          href={`/expedientes/${featured.slug}`}
          className="group mt-6 grid grid-cols-1 gap-0 border border-gris/30 bg-negro/40 transition-colors hover:border-rojo md:grid-cols-2"
        >
          <ArchivePlaceholder
            variant={featured.image}
            code={featured.code}
            className="aspect-[4/3] md:aspect-auto md:h-full"
          />
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest2 text-gris">
              <span className="text-rojo">{featured.code}</span>
              <span>{featured.status}</span>
            </div>
            <h2 className="font-display text-3xl uppercase leading-tight text-marfil group-hover:text-rojo transition-colors md:text-4xl">
              {featured.title}
            </h2>
            <p className="font-body text-sm text-beige/80 md:text-base">{featured.excerpt}</p>
            {featured.hypothesis && (
              <p className="border-l-2 border-rojo pl-4 font-body text-sm italic text-beige/70">
                {featured.hypothesis}
              </p>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
              <PlausibilityBadge level={featured.plausibility} />
              {featured.plausibilityScore && (
                <span className="font-mono text-[11px] text-beige/60">{featured.plausibilityScore}</span>
              )}
              <span className="font-mono text-xs uppercase tracking-widest2 text-marfil group-hover:text-rojo transition-colors">
                Abrir expediente →
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Últimos expedientes */}
      <section className="mt-16">
        <div className="flex items-baseline justify-between border-b border-gris/30 pb-3">
          <h2 className="font-display text-2xl uppercase tracking-wide text-marfil md:text-3xl">
            Últimos expedientes
          </h2>
          <Link
            href="/expedientes"
            className="font-mono text-xs uppercase tracking-widest2 text-rojo hover:text-marfil transition-colors"
          >
            Ver todos →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((expediente) => (
            <ExpedienteCard key={expediente.slug} expediente={expediente} />
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="mt-16">
        <div className="border-b border-gris/30 pb-3">
          <h2 className="font-display text-2xl uppercase tracking-wide text-marfil md:text-3xl">
            Categorías del archivo
          </h2>
        </div>
        <div className="mt-6">
          <CategoryList />
        </div>
      </section>
    </div>
  );
}
