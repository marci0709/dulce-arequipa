function PromoBanner({ maxDescuento }) {
  if (!maxDescuento) return null;

  return (
    <div className="bg-purple-600 px-4 py-2 text-center text-sm font-medium text-white">
      🎉 Hasta {maxDescuento}% de descuento en productos seleccionados ·{" "}
      <a href="#ofertas" className="underline hover:text-purple-100">
        Ver ofertas
      </a>
    </div>
  );
}

export default PromoBanner;