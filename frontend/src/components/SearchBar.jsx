function SearchBar({ busqueda, onBuscar, orden, onOrdenar }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="search"
          value={busqueda}
          onChange={(e) => onBuscar(e.target.value)}
          placeholder="Buscar tortas, cupcakes, galletas..."
          className="w-full rounded-lg border border-purple-300 bg-white py-2 pl-10 pr-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
        />
      </div>

      <select
        value={orden}
        onChange={(e) => onOrdenar(e.target.value)}
        className="rounded-lg border border-purple-300 bg-white px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
      >
        <option value="relevancia">Ordenar: destacados</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
        <option value="nombre">Nombre: A a Z</option>
      </select>
    </div>
  );
}

export default SearchBar;