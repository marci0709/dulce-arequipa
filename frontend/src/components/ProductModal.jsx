import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getRecomendados } from "@/services/api";
import { infoStock } from "@/lib/stock";

function ProductModal({ producto, onCerrar, onSeleccionar }) {
  const [recomendados, setRecomendados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const contenedor = useRef(null);

  const { nombre, descripcion, precio, precio_final, descuento = 0, imagen, categoria } = producto;
  const enOferta = descuento > 0;
  const precioFinal = precio_final ?? precio;
  const info = infoStock(producto.estado_stock, producto.stock);

  useEffect(() => {
    let vigente = true;
    setCargando(true);
    contenedor.current?.scrollTo({ top: 0, behavior: "smooth" });

    getRecomendados(producto.id)
      .then((datos) => vigente && setRecomendados(datos))
      .catch(() => vigente && setRecomendados([]))
      .finally(() => vigente && setCargando(false));

    return () => {
      vigente = false;
    };
  }, [producto.id]);

  useEffect(() => {
    const alPresionar = (e) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", alPresionar);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = "";
    };
  }, [onCerrar]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
      onClick={onCerrar}
    >
      <div
        ref={contenedor}
        role="dialog"
        aria-modal="true"
        aria-label={nombre}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="relative">
          {imagen ? (
            <img src={imagen} alt={nombre} className="h-56 w-full object-cover sm:h-72" />
          ) : (
            <div className="flex h-56 w-full items-center justify-center bg-purple-100 text-6xl">
              🍰
            </div>
          )}
          <button
            onClick={onCerrar}
            aria-label="Cerrar"
            className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-purple-700 shadow"
          >
            ✕
          </button>
          {enOferta && (
            <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow">
              -{descuento}%
            </span>
          )}
        </div>

        <div className="space-y-3 p-5">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            {categoria}
          </Badge>
          <h3 className="font-titulo text-2xl font-bold text-purple-700">{nombre}</h3>
          <p className="text-gray-600">{descripcion}</p>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-purple-600">
              S/ {precioFinal.toFixed(2)}
            </span>
            {enOferta && (
              <span className="text-gray-400 line-through">S/ {precio.toFixed(2)}</span>
            )}
          </div>
          <p className={info.clase}>{info.texto}</p>
        </div>

        <div className="border-t border-purple-100 bg-purple-50 p-5">
          <h4 className="font-titulo mb-3 text-lg font-bold text-purple-700">
            También te puede gustar
          </h4>

          {cargando && <p className="text-sm text-gray-500">Buscando recomendaciones...</p>}

          {!cargando && recomendados.length === 0 && (
            <p className="text-sm text-gray-500">Por ahora no hay recomendaciones.</p>
          )}

          {!cargando && recomendados.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {recomendados.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onSeleccionar(r)}
                  className="overflow-hidden rounded-lg border border-purple-100 bg-white text-left shadow-sm transition hover:shadow-md"
                >
                  {r.imagen ? (
                    <img src={r.imagen} alt={r.nombre} className="h-24 w-full object-cover" />
                  ) : (
                    <div className="flex h-24 w-full items-center justify-center bg-purple-100 text-3xl">
                      🍰
                    </div>
                  )}
                  <div className="p-2">
                    <p className="line-clamp-1 text-sm font-semibold text-gray-800">
                      {r.nombre}
                    </p>
                    <p className="text-sm font-bold text-purple-600">
                      S/ {(r.precio_final ?? r.precio).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductModal;