import type { TocItem } from "@/lib/toc";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Índice del expediente" className="border border-gris/30 bg-negro/40 p-5">
      <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">Índice</p>
      <ol className="mt-3 space-y-2 font-body text-sm">
        {items.map((item) => (
          <li key={item.slug} className={item.depth === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.slug}`}
              className="text-beige/80 hover:text-rojo transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
