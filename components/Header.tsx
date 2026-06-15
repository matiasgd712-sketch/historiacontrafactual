import Link from "next/link";
import Logo from "./Logo";

const NAV = [
  { href: "/expedientes", label: "Expedientes" },
  { href: "/categorias", label: "Categorías" },
  { href: "/buscar", label: "Buscar" },
];

export default function Header() {
  return (
    <header className="border-b border-gris/30 bg-negro">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo size="sm" />
        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest2 text-beige">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-rojo transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
