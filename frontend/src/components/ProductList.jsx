import ProductCard from "@/components/ProductCard";

function ProductList({ productos, onSeleccionar }) {
  if (productos.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p className="text-4xl">🔎</p>
        <p className="mt-2">No encontramos productos con esos filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          {...producto}
          onVerDetalle={() => onSeleccionar?.(producto)}
        />
      ))}
    </div>
  );
}

export default ProductList;