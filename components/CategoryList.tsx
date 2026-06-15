import Link from "next/link";
import { CATEGORIES } from "@/lib/site";

export default function CategoryList() {
  return (
    <ul className="grid grid-cols-1 gap-px border border-gris/30 bg-gris/30 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((category, i) => (
        <li key={category.slug} className="bg-negro">
          <Link
            href={`/categorias/${category.slug}`}
            className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-negro/60"
          >
            <span className="font-mono text-xs text-gris">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-xl uppercase tracking-wide text-marfil group-hover:text-rojo transition-colors">
              {category.name}
            </span>
            <span className="font-body text-sm text-beige/70">{category.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
