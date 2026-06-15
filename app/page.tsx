import Link from "next/link";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import ExpedienteCard from "@/components/ExpedienteCard";
import { getAllExpedientes } from "@/lib/expedientes";
import { SITE } from "@/lib/site";

export default function HomePage() {
  const latest = getAllExpedientes().slice(0, 6);

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
