import { useEffect, useState } from "react";
import PromoBanner from "@/components/PromoBanner";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import { getProductos, getCategorias } from "@/services/api";
import ProductModal from "@/components/ProductModal";

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const precioDe = (producto) => producto.precio_final ?? producto.precio;

function App() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("relevancia");
  const [soloOfertas, setSoloOfertas] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
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

  const texto = normalizar(busqueda.trim());

  const maxDescuento = Math.max(0, ...productos.map((p) => p.descuento ?? 0));

  const ofertas = productos
    .filter((p) => p.descuento > 0 && p.estado_stock !== "agotado")
    .slice(0, 4);

  const productosFiltrados = productos
    .filter((producto) => {
      const coincideCategoria =
        categoriaActiva === "Todas" || producto.categoria === categoriaActiva;
      const coincideTexto =
        texto === "" ||
        normalizar(
          `${producto.nombre} ${producto.descripcion} ${producto.categoria}`
        ).includes(texto);
      const coincideOferta = !soloOfertas || producto.descuento > 0;
      return coincideCategoria && coincideTexto && coincideOferta;
    })
    .sort((a, b) => {
      if (orden === "precio-asc") return precioDe(a) - precioDe(b);
      if (orden === "precio-desc") return precioDe(b) - precioDe(a);
      if (orden === "nombre") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  const hayFiltros = busqueda !== "" || categoriaActiva !== "Todas" || soloOfertas;

  function limpiarFiltros() {
    setBusqueda("");
    setCategoriaActiva("Todas");
    setOrden("relevancia");
    setSoloOfertas(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-purple-50">
      <PromoBanner maxDescuento={maxDescuento} />
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

      {ofertas.length > 0 && (
        <section id="ofertas" className="mx-auto w-full max-w-6xl px-4 pt-8">
          <h2 className="font-titulo mb-6 text-2xl font-bold text-rose-500">
            🔥 Ofertas de la semana
          </h2>
          <ProductList productos={ofertas} onSeleccionar={setSeleccionado} />
        </section>
      )}

      <main id="catalogo" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <h2 className="font-titulo mb-6 text-2xl font-bold text-purple-700">
          Nuestro catálogo
        </h2>

        {cargando && (
          <p className="py-10 text-center text-purple-600">Cargando catálogo...</p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-center text-red-600">{error}</p>
        )}

        {!cargando && !error && (
          <>
            <SearchBar
              busqueda={busqueda}
              onBuscar={setBusqueda}
              orden={orden}
              onOrdenar={setOrden}
            />

            <CategoryFilter
              categorias={categorias}
              categoriaActiva={categoriaActiva}
              onSeleccionar={setCategoriaActiva}
            />

            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <span>
                  {productosFiltrados.length}{" "}
                  {productosFiltrados.length === 1 ? "producto" : "productos"}
                </span>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={soloOfertas}
                    onChange={(e) => setSoloOfertas(e.target.checked)}
                    className="size-4 accent-purple-600"
                  />
                  Solo ofertas
                </label>
              </div>
              {hayFiltros && (
                <button
                  onClick={limpiarFiltros}
                  className="font-medium text-purple-600 hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <ProductList productos={productosFiltrados} onSeleccionar={setSeleccionado} />
          </>
        )}
      </main>

      <Footer />
      {seleccionado && (
        <ProductModal
          producto={seleccionado}
          onCerrar={() => setSeleccionado(null)}
          onSeleccionar={setSeleccionado}
        />
      )}
    </div>
  );
}

export default App;