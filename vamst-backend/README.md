<<<<<<< HEAD
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
=======
# VAMST Backend — esqueleto

Cada archivo tiene comentarios `// TODO:` marcando qué falta escribir.
Segui el orden sugerido para que en cada paso tengas algo que probar.

## Orden sugerido

1. `database/schema.sql` → correrlo en MySQL (crea la base y las tablas)
2. `database/seed.sql` → correrlo después (carga datos de ejemplo)
3. `src/config/db.ts` → conexión al pool de MySQL
4. `src/models/Pelicula.ts` → el modelo más simple, para arrancar
5. `src/repositories/PeliculaRepository.ts` → primera consulta SQL real
6. `src/controllers/PeliculaController.ts`
7. `src/routes/peliculaRoutes.ts`
8. `src/app.ts` → conectar todo y probar `GET /api/peliculas` con Postman
9. Repetir el mismo circuito (modelo → repositorio → controlador → ruta)
   para Asiento, Reserva, Usuario y ProductoCandy.
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78

## Estructura

```
vamst-backend/
├── .env.example
<<<<<<< HEAD
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

=======
├── package.json
├── tsconfig.json
├── database/
│   ├── schema.sql
│   └── seed.sql
└── src/
    ├── app.ts
    ├── config/
    │   └── db.ts
    ├── models/
    │   ├── Pelicula.ts
    │   ├── Asiento.ts (abstracta)
    │   ├── AsientoComun.ts
    │   ├── AsientoAccesible.ts
    │   ├── Usuario.ts
    │   ├── Funcion.ts
    │   └── Reserva.ts
    ├── repositories/
    │   ├── PeliculaRepository.ts
    │   ├── FuncionRepository.ts
    │   ├── AsientoRepository.ts
    │   ├── ReservaRepository.ts
    │   ├── UsuarioRepository.ts
    │   └── ProductoCandyRepository.ts
    ├── controllers/
    │   ├── PeliculaController.ts
    │   ├── AsientoController.ts
    │   ├── ReservaController.ts
    │   ├── AuthController.ts
    │   └── CandyController.ts
    ├── routes/
    │   ├── peliculaRoutes.ts
    │   ├── asientoRoutes.ts
    │   ├── reservaRoutes.ts
    │   ├── authRoutes.ts
    │   └── candyRoutes.ts
    ├── middlewares/
    │   └── errorHandler.ts
    └── types/
        └── dto.ts
```

## Probar que todo está conectado

1. Correr `database/schema.sql` y después `database/seed.sql` en MySQL.
2. Copiar `.env.example` como `.env` y completar `DB_PASSWORD`.
3. `npm run dev`. En la consola tienen que aparecer **dos** líneas:
   - `VAMST backend escuchando en http://localhost:3000`
   - `Base de datos conectada (...)` (si falla, muestra el motivo y qué revisar)
4. Abrir en el navegador `http://TU_IP:3000/api/salud` (desde la compu y desde el celular).
   Debe responder `{"ok":true,"data":{"api":"ok","baseDeDatos":"ok"}}`.

>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
## Endpoints

| Método | Ruta | Para qué |
|---|---|---|
| GET | `/api/salud` | Comprueba que la API y la base responden |
| GET | `/api/peliculas` | Cartelera |
| GET | `/api/peliculas/:id` | Detalle de una película |
| GET | `/api/peliculas/:id/funciones` | Funciones (ordenadas por fecha) |
| GET | `/api/funciones/:id/asientos` | Asientos con estado y precio |
<<<<<<< HEAD
| POST | `/api/reservas` | Crear reserva `{ usuarioId, funcionId, asientosIds, metodoPago }` → `{ id, codigo, total }` (409 si un asiento ya fue reservado) |
| GET | `/api/usuarios/:id/reservas` | "Mis tickets" del perfil |
| POST | `/api/auth/registro` / `/api/auth/login` | Cuenta de usuario |
| POST | `/api/auth/recuperar` / `/api/auth/restablecer` | Código de 6 dígitos y cambio de contraseña |
| GET | `/api/candy` | Productos del candy bar |
| POST | `/api/candy/pedidos` | Pedido `{ usuarioId, items, metodoPago }` (requiere sesión) |
| GET | `/api/usuarios/:id/pedidos-candy` | Historial de compras del candy bar |

`metodoPago` acepta `tarjeta`, `mercadopago` o `efectivo`. El cobro es simulado (proyecto demo).
=======
| POST | `/api/reservas` | Crear reserva `{ usuarioId, funcionId, asientosIds }` → `{ id, codigo, total }` (409 si un asiento ya fue reservado) |
| GET | `/api/usuarios/:id/reservas` | "Mis tickets" del perfil |
| POST | `/api/auth/registro` / `/api/auth/login` | Cuenta de usuario |
| GET | `/api/candy` · POST `/api/candy/pedidos` | Candy bar |

>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
