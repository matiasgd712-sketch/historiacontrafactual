import type { Metadata } from "next";
import ExpedienteCard from "@/components/ExpedienteCard";
import { getAllExpedientes } from "@/lib/expedientes";

export const metadata: Metadata = {
  title: "Expedientes",
  description: "Archivo completo de expedientes de historia contrafactual, ordenados por fecha de publicación.",
};

export default function ExpedientesPage() {
  const expedientes = getAllExpedientes();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="border-b border-gris/30 pb-4">
        <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">Archivo general</p>
        <h1 className="mt-2 font-display text-3xl uppercase tracking-wide text-marfil md:text-4xl">
          Expedientes
        </h1>
        <p className="mt-2 font-body text-sm text-beige/70">
          {expedientes.length} expediente{expedientes.length === 1 ? "" : "s"} catalogado
          {expedientes.length === 1 ? "" : "s"}.
        </p>
      </header>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {expedientes.map((expediente) => (
          <ExpedienteCard key={expediente.slug} expediente={expediente} />
        ))}
      </div>
    </div>
  );
}
