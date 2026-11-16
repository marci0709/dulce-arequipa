import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import { getProductos, getCategorias } from "@/services/api";

function App() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [datosProductos, datosCategorias] = await Promise.all([
          getProductos(),
          getCategorias(),
        ]);
        setProductos(datosProductos);
        setCategorias(datosCategorias.map((categoria) => categoria.nombre));
      } catch (err) {
        setError(
          "No se pudo cargar el catálogo. Verifica que el servidor Django esté en ejecución."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  const productosFiltrados =
    categoriaActiva === "Todas"
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaActiva);

  return (
    <div className="flex min-h-screen flex-col bg-purple-50">
      <Header />

      <section id="inicio" className="bg-gradient-to-b from-purple-100 to-purple-50">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <h1 className="font-titulo text-3xl font-bold text-purple-700 sm:text-4xl">
            Pastelería artesanal en Arequipa
          </h1>
          <p className="mt-3 text-gray-600">
            Tortas, cupcakes, galletas y postres hechos con insumos frescos
            para tus celebraciones.
          </p>
        </div>
      </section>

      <main id="catalogo" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <h2 className="font-titulo mb-6 text-2xl font-bold text-purple-700">Nuestro catálogo</h2>

        {cargando && (
          <p className="py-10 text-center text-purple-600">Cargando catálogo...</p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-center text-red-600">{error}</p>
        )}

        {!cargando && !error && (
          <>
            <CategoryFilter
              categorias={categorias}
              categoriaActiva={categoriaActiva}
              onSeleccionar={setCategoriaActiva}
            />
            <ProductList productos={productosFiltrados} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;