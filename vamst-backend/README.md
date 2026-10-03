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
    │   ├── Cliente.ts
    │   ├── Administrador.ts
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
