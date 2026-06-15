import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? 64 : size === "sm" ? 32 : 42;
  const textSize =
    size === "lg" ? "text-4xl md:text-6xl" : size === "sm" ? "text-lg" : "text-2xl md:text-3xl";

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
