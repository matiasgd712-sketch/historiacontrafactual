import Link from "next/link";
import Image from "next/image";
import BrandMark from "./BrandMark";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? 48 : 56;
  const textSize = size === "sm" ? "text-lg" : "text-2xl md:text-3xl";

  if (size === "lg") {
    return (
      <Link href="/" className="group inline-flex">
        <Image
          src="/brand/logo.png"
          alt="Historia Contrafactual"
          width={320}
          height={320}
          priority
          className="w-48 transition-transform group-hover:scale-[1.02] sm:w-64 md:w-72"
        />
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
