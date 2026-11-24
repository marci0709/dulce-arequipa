import { useState } from "react";

const enlaces = [
  { texto: "Inicio", href: "#inicio" },
  { texto: "Ofertas", href: "#ofertas" },
  { texto: "Catálogo", href: "#catalogo" },
  { texto: "Contacto", href: "#contacto" },
];

function Header() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-purple-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍰</span>
          <span className="font-titulo text-xl font-bold text-purple-500 sm:text-2xl">
            Dulce Arequipa
          </span>
        </div>

        <nav className="hidden gap-6 text-sm font-medium text-gray-700 sm:flex">
          {enlaces.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="hover:text-purple-500"
            >
              {enlace.texto}
            </a>
          ))}
        </nav>

        <button
          className="rounded-md p-2 text-2xl leading-none text-purple-600 sm:hidden"
          onClick={() => setAbierto(!abierto)}
          aria-label="Abrir menú"
          aria-expanded={abierto}
        >
          {abierto ? "✕" : "☰"}
        </button>
      </div>

      {abierto && (
        <nav className="flex flex-col border-t border-purple-100 bg-white px-4 py-2 sm:hidden">
          {enlaces.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              onClick={() => setAbierto(false)}
              className="py-3 text-gray-700 hover:text-purple-500"
            >
              {enlace.texto}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;