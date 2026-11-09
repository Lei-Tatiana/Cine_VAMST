# VAMST Backend

API REST del sistema de cine VAMST (Express + TypeScript + MySQL).

## Puesta en marcha

1. Crear la base y cargar los datos en MySQL:
   - `database/schema.sql` → esquema completo (tablas, columnas y relaciones).
   - `database/seed.sql` → películas, salas, asientos, funciones y productos del candy bar.
   - Si la base ya existía de una versión anterior, aplicar solo las migraciones pendientes de `database/migraciones/` (son idempotentes).
2. Copiar `.env.example` como `.env` y completar los datos de conexión y SMTP.
3. `npm install`
4. `npm run dev`

En la consola tienen que aparecer **dos** líneas:

- `VAMST backend escuchando en http://localhost:3001`
- `Base de datos conectada (...)` (si falla, muestra el motivo y qué revisar)

Comprobar con `GET http://localhost:3001/api/salud`: debe responder
`{"ok":true,"data":{"api":"ok","baseDeDatos":"ok"}}`.

> Si no se configura SMTP, el endpoint de recuperación devuelve el código en la respuesta (modo demo) y la app lo muestra en pantalla.

## Estructura

```
vamst-backend/
├── .env.example
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── migraciones/
└── src/
    ├── app.ts
    ├── config/db.ts
    ├── models/
    ├── repositories/
    ├── controllers/
    ├── routes/
    ├── middlewares/errorHandler.ts
    ├── types/dto.ts
    └── utils/
```

## Endpoints

| Método | Ruta | Para qué |
|---|---|---|
| GET | `/api/salud` | Comprueba que la API y la base responden |
| GET | `/api/peliculas` | Cartelera |
| GET | `/api/peliculas/:id` | Detalle de una película |
| GET | `/api/peliculas/:id/funciones` | Funciones (ordenadas por fecha) |
| GET | `/api/funciones/:id/asientos` | Asientos con estado y precio |
| POST | `/api/reservas` | Crear reserva `{ usuarioId, funcionId, asientosIds, metodoPago }` → `{ id, codigo, total }` (409 si un asiento ya fue reservado) |
| GET | `/api/usuarios/:id/reservas` | "Mis tickets" del perfil |
| POST | `/api/auth/registro` / `/api/auth/login` | Cuenta de usuario |
| POST | `/api/auth/recuperar` / `/api/auth/restablecer` | Código de 6 dígitos y cambio de contraseña |
| GET | `/api/candy` | Productos del candy bar |
| POST | `/api/candy/pedidos` | Pedido `{ usuarioId, items, metodoPago }` (requiere sesión) |
| GET | `/api/usuarios/:id/pedidos-candy` | Historial de compras del candy bar |

`metodoPago` acepta `tarjeta`, `mercadopago` o `efectivo`. El cobro es simulado (proyecto demo).