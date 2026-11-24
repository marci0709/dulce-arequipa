# Dulce Arequipa 🍰

Tienda virtual de pastelería. Frontend en ReactJS con Vite, Tailwind CSS y shadcn/ui, y backend en Django REST Framework.

## Funcionalidades

- Diseño responsivo con menú móvil y filtro de categorías deslizable
- Gestión de inventario: stock, stock mínimo, productos agotados y activación desde el panel de administración
- Búsqueda por texto, filtro por categoría, orden por precio o nombre y filtro de ofertas
- Promociones y descuentos: banner, sección de ofertas, etiqueta de porcentaje y precio tachado
- Recomendaciones de productos por categoría, cercanía de precio y ofertas

## Ejecutar el backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Panel de administración: http://127.0.0.1:8000/admin/

API:
- http://127.0.0.1:8000/api/productos/
- http://127.0.0.1:8000/api/categorias/
- http://127.0.0.1:8000/api/productos/1/recomendados/

## Ejecutar el frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación: http://localhost:5173

Los productos se cargan desde el panel de administración, después de crear las categorías.