export default function References({
  bibliography,
  sources,
}: {
  bibliography: string[];
  sources: string[];
}) {
  if (bibliography.length === 0 && sources.length === 0) return null;

  return (
    <div className="mt-12 grid gap-px border border-gris/30 bg-gris/20 sm:grid-cols-2">
      {bibliography.length > 0 && (
        <div className="bg-negro/60 p-5">
          <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">Bibliografía</p>
          <ul className="mt-3 space-y-2 font-body text-sm text-beige/80">
            {bibliography.map((item, i) => (
              <li key={i} className="leading-snug">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {sources.length > 0 && (
        <div className="bg-negro/60 p-5">
          <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">Fuentes</p>
          <ul className="mt-3 space-y-2 font-body text-sm text-beige/80">
            {sources.map((item, i) => (
              <li key={i} className="leading-snug">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
