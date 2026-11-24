import { Button } from "@/components/ui/button";

function CategoryFilter({ categorias, categoriaActiva, onSeleccionar }) {
  const opciones = ["Todas", ...categorias];

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
      {opciones.map((categoria) => {
        const activa = categoriaActiva === categoria;
        return (
          <Button
            key={categoria}
            variant={activa ? "default" : "outline"}
            onClick={() => onSeleccionar(categoria)}
            className={
              "shrink-0 " +
              (activa
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "border-purple-300 text-purple-700 hover:bg-purple-100")
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