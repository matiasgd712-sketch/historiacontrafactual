import type { Metadata } from "next";
import CategoryList from "@/components/CategoryList";

export const metadata: Metadata = {
  title: "Categorías",
  description: "Líneas temáticas del archivo de Historia Contrafactual.",
};

export default function CategoriasPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="border-b border-gris/30 pb-4">
        <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">Clasificación</p>
        <h1 className="mt-2 font-display text-3xl uppercase tracking-wide text-marfil md:text-4xl">
          Categorías
        </h1>
        <p className="mt-2 font-body text-sm text-beige/70">
          El archivo organiza los expedientes en nueve líneas temáticas.
        </p>
      </header>
      <div className="mt-8">
        <CategoryList />
      </div>
    </div>
  );
}
