import type { Metadata } from "next";
import ExpedienteCard from "@/components/ExpedienteCard";
import SearchBar from "@/components/SearchBar";
import { searchExpedientes } from "@/lib/expedientes";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Buscar expedientes por código, título o categoría.",
  robots: { index: false, follow: true },
};

interface Props {
  searchParams: { q?: string };
}

export default function BuscarPage({ searchParams }: Props) {
  const query = searchParams.q?.trim() ?? "";
  const results = query ? searchExpedientes(query) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="border-b border-gris/30 pb-4">
        <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">Buscador</p>
        <h1 className="mt-2 font-display text-3xl uppercase tracking-wide text-marfil md:text-4xl">
          Buscar en el archivo
        </h1>
      </header>

      <div className="mt-6">
        <SearchBar defaultValue={query} />
      </div>

      {query && (
        <p className="mt-6 font-mono text-xs uppercase tracking-widest2 text-gris">
          {results.length} resultado{results.length === 1 ? "" : "s"} para &ldquo;{query}&rdquo;
        </p>
      )}

      {query && results.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((expediente) => (
            <ExpedienteCard key={expediente.slug} expediente={expediente} />
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <p className="mt-6 font-body text-sm text-beige/60">
          No se encontraron expedientes que coincidan con la búsqueda.
        </p>
      )}
    </div>
  );
}
