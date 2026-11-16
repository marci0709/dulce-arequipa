import { Button } from "@/components/ui/button";

function CategoryFilter({ categorias, categoriaActiva, onSeleccionar }) {
  const opciones = ["Todas", ...categorias];

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {opciones.map((categoria) => {
        const activa = categoriaActiva === categoria;
        return (
          <Button
            key={categoria}
            variant={activa ? "default" : "outline"}
            onClick={() => onSeleccionar(categoria)}
            className={
              activa
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "border-purple-300 text-purple-700 hover:bg-purple-100"
            }
          >
            {categoria}
          </Button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;