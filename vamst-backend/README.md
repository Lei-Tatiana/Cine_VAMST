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

## Estructura

```
vamst-backend/
├── .env.example
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
   - `VAMST backend escuchando en http://localhost:3001`
   - `Base de datos conectada (...)` (si falla, muestra el motivo y qué revisar)
4. Abrir en el navegador `http://TU_IP:3001/api/salud` (desde la compu y desde el celular).
   Debe responder `{"ok":true,"data":{"api":"ok","baseDeDatos":"ok"}}`.

## Endpoints

| Método | Ruta | Para qué |
|---|---|---|
| GET | `/api/salud` | Comprueba que la API y la base responden |
| GET | `/api/peliculas` | Cartelera |
| GET | `/api/peliculas/:id` | Detalle de una película |
| GET | `/api/peliculas/:id/funciones` | Funciones (ordenadas por fecha) |
| GET | `/api/funciones/:id/asientos` | Asientos con estado y precio |
| POST | `/api/reservas` | Crear reserva `{ usuarioId, funcionId, asientosIds }` → `{ id, codigo, total }` (409 si un asiento ya fue reservado) |
| GET | `/api/usuarios/:id/reservas` | "Mis tickets" del perfil |
| POST | `/api/auth/registro` / `/api/auth/login` | Cuenta de usuario |
| GET | `/api/candy` · POST `/api/candy/pedidos` | Candy bar |

