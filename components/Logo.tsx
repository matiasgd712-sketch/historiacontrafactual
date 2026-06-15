import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? 140 : size === "sm" ? 48 : 56;
  const textSize =
    size === "lg" ? "text-4xl md:text-6xl" : size === "sm" ? "text-lg" : "text-2xl md:text-3xl";

  if (size === "lg") {
    return (
      <Link href="/" className="group flex flex-col items-center gap-4">
        <BrandMark size={dims} className="shrink-0" />
        <span className={`font-display ${textSize} tracking-wide leading-none text-marfil group-hover:text-rojo transition-colors text-center`}>
          HISTORIA
          <br />
          CONTRAFACTUAL
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex items-center gap-3 group">
      <BrandMark size={dims} className="shrink-0" />
      <span className={`font-display ${textSize} tracking-wide leading-none text-marfil group-hover:text-rojo transition-colors`}>
        HISTORIA
        <br className="md:hidden" />
        <span className="md:ml-2">CONTRAFACTUAL</span>
      </span>
    </Link>
  );
}
