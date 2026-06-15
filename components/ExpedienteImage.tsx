import Image from "next/image";
import ArchivePlaceholder from "./ArchivePlaceholder";

export default function ExpedienteImage({
  image,
  code,
  alt,
  className = "",
  sizes,
}: {
  image: string;
  code?: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  if (image.startsWith("/")) {
    return (
      <div className={`relative overflow-hidden bg-negro ${className}`}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 border border-gris/20" />
        {code && (
          <span className="absolute bottom-2 right-2 bg-negro/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest2 text-marfil/80">
            {code}
          </span>
        )}
      </div>
    );
  }

  return <ArchivePlaceholder variant={image} code={code} className={className} />;
}
