# Dulce Arequipa 🍰

Tienda virtual de pastelería. Frontend en ReactJS (Vite, Tailwind CSS, shadcn/ui) y backend en Django REST Framework.

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

API: http://127.0.0.1:8000/api/productos/ y /api/categorias/

## Ejecutar el frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación: http://localhost:5173