export function infoStock(estado, stock) {
  if (estado === "agotado") {
    return { texto: "Agotado", clase: "text-sm font-semibold text-red-500" };
  }
  if (estado === "bajo") {
    return {
      texto: `¡Últimas ${stock} unidades!`,
      clase: "text-sm font-semibold text-amber-600",
    };
  }
  return { texto: `Stock: ${stock}`, clase: "text-sm text-gray-500" };
}