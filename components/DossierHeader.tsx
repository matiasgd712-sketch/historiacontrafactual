import type { Expediente } from "@/lib/expedientes";
import { getCategoryBySlug } from "@/lib/site";
import { formatDate } from "@/lib/format";
import PlausibilityBadge from "./PlausibilityBadge";

export default function DossierHeader({ expediente }: { expediente: Expediente }) {
  return (
    <header className="border border-gris/30 bg-negro/40">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gris/30 px-5 py-3 font-mono text-xs uppercase tracking-widest2 text-gris">
        <span className="text-rojo">Expediente {expediente.code}</span>
        <span>{expediente.status}</span>
      </div>
      <div className="px-5 py-6">
        <h1 className="font-display text-3xl uppercase leading-tight tracking-wide text-marfil md:text-5xl">
          {expediente.title}
        </h1>
        <p className="mt-4 font-body text-base text-beige/80 md:text-lg">{expediente.excerpt}</p>
      </div>
      <dl className="grid grid-cols-2 gap-px border-t border-gris/30 bg-gris/20 text-xs sm:grid-cols-4">
        <div className="bg-negro px-5 py-4">
          <dt className="font-mono uppercase tracking-widest2 text-gris">Fecha de divergencia</dt>
          <dd className="mt-1 font-body text-sm text-marfil">{expediente.divergenceDate}</dd>
        </div>
        <div className="bg-negro px-5 py-4">
          <dt className="font-mono uppercase tracking-widest2 text-gris">Plausibilidad</dt>
          <dd className="mt-1">
            <PlausibilityBadge level={expediente.plausibility} />
          </dd>
        </div>
        <div className="bg-negro px-5 py-4">
          <dt className="font-mono uppercase tracking-widest2 text-gris">Lectura estimada</dt>
          <dd className="mt-1 font-body text-sm text-marfil">{expediente.readingMinutes} min</dd>
        </div>
        <div className="bg-negro px-5 py-4">
          <dt className="font-mono uppercase tracking-widest2 text-gris">Publicación</dt>
          <dd className="mt-1 font-body text-sm text-marfil">{formatDate(expediente.date)}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap gap-2 border-t border-gris/30 px-5 py-3">
        {expediente.categories.map((cat) => {
          const category = getCategoryBySlug(cat);
          if (!category) return null;
          return (
            <span
              key={cat}
              className="border border-gris/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest2 text-beige/70"
            >
              {category.name}
            </span>
          );
        })}
      </div>
    </header>
  );
}
