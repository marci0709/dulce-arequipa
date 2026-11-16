import ProductCard from "@/components/ProductCard";

function ProductList({ productos }) {
  if (productos.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        No hay productos en esta categoría.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((producto) => (
        <ProductCard key={producto.id} {...producto} />
      ))}
    </div>
  );
}

export default ProductList;