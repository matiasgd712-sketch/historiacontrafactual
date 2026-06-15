import type { Plausibilidad } from "@/lib/expedientes";

const STYLES: Record<Plausibilidad, string> = {
  Alta: "border-rojo text-rojo",
  Media: "border-beige text-beige",
  Baja: "border-gris text-gris",
};

export default function PlausibilityBadge({ level }: { level: Plausibilidad }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest2 ${STYLES[level]}`}
    >
      <span className="block h-1.5 w-1.5 bg-current" />
      Plausibilidad {level}
    </span>
  );
}
