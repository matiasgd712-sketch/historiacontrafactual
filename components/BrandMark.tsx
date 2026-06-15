// Marca gráfica de Historia Contrafactual: estrella central, brújula segmentada
// y dos rumbos alternativos (las "flechas" que cruzan el círculo).
export default function BrandMark({
  size = 42,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Brújula: anillo exterior segmentado */}
      <circle
        cx="200"
        cy="200"
        r="170"
        stroke="#D6C7AE"
        strokeWidth="24"
        fill="none"
        strokeDasharray="120 40"
        transform="rotate(-12 200 200)"
      />
      {/* Brújula: anillo interior segmentado */}
      <circle
        cx="200"
        cy="200"
        r="120"
        stroke="#D6C7AE"
        strokeWidth="18"
        fill="none"
        strokeDasharray="90 35"
        transform="rotate(35 200 200)"
      />
      {/* Acento gris en el anillo interior */}
      <circle
        cx="200"
        cy="200"
        r="120"
        stroke="#8C8C8C"
        strokeWidth="18"
        fill="none"
        strokeDasharray="46 708"
        strokeDashoffset="540"
        transform="rotate(35 200 200)"
      />

      {/* Rumbo alternativo: noreste */}
      <path d="M236 164 L372 28 L330 76 L300 60 Z" fill="#B12A1E" />
      {/* Rumbo alternativo: suroeste */}
      <path d="M164 236 L28 372 L70 324 L100 340 Z" fill="#B12A1E" />

      {/* Estrella central */}
      <path
        d="M200 130 L215.9 178.1 L266.6 178.4 L225.7 208.3 L241.2 256.6 L200 227 L158.9 256.6 L174.3 208.3 L133.4 178.4 L184.1 178.1 Z"
        fill="#B12A1E"
      />
    </svg>
  );
}
