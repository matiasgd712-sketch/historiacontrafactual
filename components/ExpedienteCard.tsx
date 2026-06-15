import Link from "next/link";
import type { Expediente } from "@/lib/expedientes";
import { getCategoryBySlug } from "@/lib/site";
import { formatDate } from "@/lib/format";
import PlausibilityBadge from "./PlausibilityBadge";
import ArchivePlaceholder from "./ArchivePlaceholder";

export default function ExpedienteCard({ expediente }: { expediente: Expediente }) {
  return (
    <Link
      href={`/expedientes/${expediente.slug}`}
      className="group flex flex-col border border-gris/30 bg-negro/40 transition-colors hover:border-rojo"
    >
      <ArchivePlaceholder variant={expediente.image} code={expediente.code} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest2 text-gris">
          <span className="text-rojo">{expediente.code}</span>
          <span>{formatDate(expediente.date)}</span>
        </div>
        <h3 className="font-display text-2xl uppercase leading-tight text-marfil group-hover:text-rojo transition-colors">
          {expediente.title}
        </h3>
        <p className="font-body text-sm text-beige/80 line-clamp-3">{expediente.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <PlausibilityBadge level={expediente.plausibility} />
          <div className="flex flex-wrap gap-2">
            {expediente.categories.slice(0, 2).map((cat) => {
              const category = getCategoryBySlug(cat);
              if (!category) return null;
              return (
                <span
                  key={cat}
                  className="font-mono text-[10px] uppercase tracking-widest2 text-beige/60"
                >
                  {category.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
