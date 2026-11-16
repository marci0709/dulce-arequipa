function Header() {
  return (
    <header className="border-b border-purple-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍰</span>
          <span className="font-titulo text-xl font-bold text-purple-500 sm:text-2xl">
            Dulce Arequipa
          </span>
        </div>

        <nav className="flex gap-4 text-sm font-medium text-gray-700 sm:gap-6">
          <a href="#inicio" className="hover:text-purple-500">Inicio</a>
          <a href="#catalogo" className="hover:text-purple-500">Catálogo</a>
          <a href="#contacto" className="hover:text-purple-500">Contacto</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;