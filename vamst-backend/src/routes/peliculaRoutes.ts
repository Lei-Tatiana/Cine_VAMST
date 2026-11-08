// RUTA: solo conecta una URL + método HTTP con una función del controlador.
// Nada de lógica acá, ni una línea.

import { Router } from "express";
import { PeliculaController } from "../controllers/PeliculaController";

const router = Router();

router.get("/peliculas", PeliculaController.listar);
router.get("/peliculas/:id", PeliculaController.obtenerPorId);
router.get("/peliculas/:id/funciones", PeliculaController.obtenerFunciones);

export default router;
