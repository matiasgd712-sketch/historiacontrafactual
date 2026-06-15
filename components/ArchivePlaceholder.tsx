const VARIANTS: Record<string, JSX.Element> = {
  compass: (
    <g>
      <circle cx="200" cy="150" r="120" stroke="#8C8C8C" strokeWidth="2" fill="none" />
      <circle cx="200" cy="150" r="80" stroke="#D6C7AE" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M200 40 L230 150 L200 260 L170 150 Z" fill="#B12A1E" />
      <path d="M90 150 L200 135 L310 150 L200 165 Z" fill="#F2E9DA" opacity="0.25" />
      <circle cx="200" cy="150" r="6" fill="#F2E9DA" />
    </g>
  ),
  star: (
    <g>
      <rect x="40" y="40" width="320" height="220" stroke="#8C8C8C" strokeWidth="1" fill="none" />
      <path
        d="M200 60 L222 130 L296 130 L236 174 L258 244 L200 200 L142 244 L164 174 L104 130 L178 130 Z"
        fill="#B12A1E"
      />
      <path d="M40 250 L150 250 L80 270 Z" fill="#D6C7AE" opacity="0.3" />
    </g>
  ),
  tower: (
    <g>
      <rect x="150" y="60" width="100" height="200" fill="#111111" stroke="#8C8C8C" strokeWidth="2" />
      <rect x="150" y="60" width="100" height="40" fill="#B12A1E" />
      <rect x="120" y="240" width="160" height="20" fill="#D6C7AE" opacity="0.4" />
      <circle cx="200" cy="160" r="28" stroke="#F2E9DA" strokeWidth="2" fill="none" />
      <path d="M186 160 L214 160 M200 146 L200 174" stroke="#F2E9DA" strokeWidth="2" />
    </g>
  ),
  arrow: (
    <g>
      <rect x="40" y="40" width="320" height="220" fill="none" stroke="#8C8C8C" strokeWidth="1" />
      <path d="M70 220 L240 80 L220 80 L320 60 L300 130 L280 110 Z" fill="#B12A1E" />
      <path d="M70 240 L260 240" stroke="#D6C7AE" strokeWidth="3" opacity="0.4" />
      <circle cx="320" cy="60" r="6" fill="#F2E9DA" />
    </g>
  ),
  scroll: (
    <g>
      <rect x="80" y="50" width="240" height="200" fill="none" stroke="#8C8C8C" strokeWidth="1" />
      <rect x="100" y="80" width="200" height="14" fill="#D6C7AE" opacity="0.35" />
      <rect x="100" y="110" width="160" height="10" fill="#D6C7AE" opacity="0.25" />
      <rect x="100" y="132" width="180" height="10" fill="#D6C7AE" opacity="0.25" />
      <rect x="100" y="154" width="120" height="10" fill="#D6C7AE" opacity="0.25" />
      <circle cx="290" cy="220" r="34" fill="#B12A1E" />
      <path d="M276 220 L304 220 M290 206 L290 234" stroke="#111111" strokeWidth="3" />
    </g>
  ),
  rocket: (
    <g>
      <rect x="40" y="40" width="320" height="220" fill="none" stroke="#8C8C8C" strokeWidth="1" />
      <path d="M200 50 L230 180 L200 210 L170 180 Z" fill="#D6C7AE" opacity="0.5" />
      <path d="M185 180 L160 230 L185 215 Z" fill="#B12A1E" />
      <path d="M215 180 L240 230 L215 215 Z" fill="#B12A1E" />
      <circle cx="200" cy="110" r="10" fill="#B12A1E" />
      <path d="M90 250 L310 250" stroke="#8C8C8C" strokeWidth="2" opacity="0.5" />
    </g>
  ),
};

export default function ArchivePlaceholder({
  variant = "compass",
  className = "",
  code,
}: {
  variant?: string;
  className?: string;
  code?: string;
}) {
  const content = VARIANTS[variant] ?? VARIANTS.compass;
  return (
    <div className={`relative overflow-hidden bg-negro ${className}`}>
      <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="300" fill="#111111" />
        {content}
      </svg>
      <div className="pointer-events-none absolute inset-0 border border-gris/20" />
      {code && (
        <span className="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-widest2 text-marfil/60">
          {code}
        </span>
      )}
    </div>
  );
}
