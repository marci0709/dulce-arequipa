import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ProductCard({ nombre, descripcion, precio, imagen, categoria, stock }) {
  const agotado = stock === 0;

  return (
    <Card className="h-full overflow-hidden pt-0 transition-shadow hover:shadow-lg">
      {imagen ? (
        <img src={imagen} alt={nombre} className="h-48 w-full object-cover" />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-purple-100 text-5xl">
          🍰
        </div>
      )}

      <CardContent className="flex-1 space-y-2">
        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
          {categoria}
        </Badge>
        <CardTitle className="text-lg">{nombre}</CardTitle>
        <CardDescription>{descripcion}</CardDescription>
      </CardContent>

      <CardFooter className="justify-between">
        <span className="text-xl font-bold text-purple-600">
          S/ {precio.toFixed(2)}
        </span>
        <span
          className={
            agotado ? "text-sm font-medium text-red-500" : "text-sm text-gray-500"
          }
        >
          {agotado ? "Agotado" : `Stock: ${stock}`}
        </span>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;