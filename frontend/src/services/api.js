const API_URL = "http://127.0.0.1:8000/api";

async function request(ruta) {
  const respuesta = await fetch(`${API_URL}${ruta}`);

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al consultar ${ruta}`);
  }

  return respuesta.json();
}

export const getProductos = () => request("/productos/");
export const getCategorias = () => request("/categorias/");