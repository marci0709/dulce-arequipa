import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { infoStock } from "@/lib/stock";

function ProductCard({
  nombre,
  descripcion,
  precio,
  precio_final,
  descuento = 0,
  imagen,
  categoria,
  stock,
  estado_stock,
  onVerDetalle,
}) {
  const agotado = estado_stock === "agotado";
  const enOferta = descuento > 0;
  const precioFinal = precio_final ?? precio;
  const info = infoStock(estado_stock, stock);

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onVerDetalle}
      onKeyDown={(e) => e.key === "Enter" && onVerDetalle?.()}
      className="h-full cursor-pointer overflow-hidden pt-0 transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        {imagen ? (
          <img
            src={imagen}
            alt={nombre}
            className={`h-48 w-full object-cover ${agotado ? "opacity-50 grayscale" : ""}`}
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-purple-100 text-5xl">
            🍰
          </div>
        )}
        {agotado && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            AGOTADO
          </span>
        )}
        {enOferta && !agotado && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow">
            -{descuento}%
          </span>
        )}
      </div>

      <CardContent className="flex-1 space-y-2">
        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
          {categoria}
        </Badge>
        <CardTitle className="text-lg">{nombre}</CardTitle>
        <CardDescription>{descripcion}</CardDescription>
      </CardContent>

      <CardFooter className="flex-wrap items-end justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-purple-600">
            S/ {precioFinal.toFixed(2)}
          </span>
          {enOferta && (
            <span className="text-sm text-gray-400 line-through">
              S/ {precio.toFixed(2)}
            </span>
          )}
        </div>
        <span className={info.clase}>{info.texto}</span>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;