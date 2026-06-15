import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest2 text-rojo">Expediente no localizado</p>
      <h1 className="mt-4 font-display text-4xl uppercase tracking-wide text-marfil md:text-6xl">
        Error 404
      </h1>
      <p className="mt-4 max-w-md font-body text-sm text-beige/70">
        El documento solicitado no existe en este archivo o ha sido reclasificado.
      </p>
      <Link
        href="/"
        className="mt-8 border border-gris/40 px-5 py-3 font-mono text-xs uppercase tracking-widest2 text-marfil transition-colors hover:border-rojo hover:text-rojo"
      >
        Volver al archivo
      </Link>
    </div>
  );
}
