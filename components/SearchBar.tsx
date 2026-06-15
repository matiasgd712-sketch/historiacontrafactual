export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/buscar" method="get" role="search" className="flex w-full max-w-xl">
      <label htmlFor="q" className="sr-only">
        Buscar expedientes
      </label>
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Buscar por código, título o categoría..."
        className="flex-1 border border-gris/40 bg-negro px-4 py-3 font-body text-sm text-marfil placeholder:text-gris focus:border-rojo focus:outline-none"
      />
      <button
        type="submit"
        className="border border-l-0 border-gris/40 bg-rojo px-5 font-mono text-xs uppercase tracking-widest2 text-marfil transition-colors hover:bg-rojo/80"
      >
        Buscar
      </button>
    </form>
  );
}
