import Link from "next/link";
import { CATEGORIES, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-gris/30 bg-negro">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl uppercase tracking-wide text-marfil">{SITE.name}</p>
            <p className="mt-2 font-body text-sm text-beige/70">{SITE.slogan}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-gris">Categorías</p>
            <ul className="mt-3 space-y-2 font-body text-sm text-beige/80">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categorias/${c.slug}`} className="hover:text-rojo transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-gris">Archivo</p>
            <ul className="mt-3 space-y-2 font-body text-sm text-beige/80">
              <li>
                <Link href="/expedientes" className="hover:text-rojo transition-colors">
                  Todos los expedientes
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="hover:text-rojo transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/buscar" className="hover:text-rojo transition-colors">
                  Buscar en el archivo
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-gris/20 pt-6 font-mono text-[11px] uppercase tracking-widest2 text-gris sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE.name} — Archivo de realidades plausibles.</p>
          <p>Reconstrucciones históricas con fines analíticos y educativos.</p>
        </div>
      </div>
    </footer>
  );
}
