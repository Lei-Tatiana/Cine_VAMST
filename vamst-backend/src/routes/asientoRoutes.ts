import { Router } from "express";
import { AsientoController } from "../controllers/AsientoController";

const router = Router();

router.get("/funciones/:id/asientos", AsientoController.listarPorFuncion);

export default router;
