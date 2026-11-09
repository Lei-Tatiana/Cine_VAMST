import { Router } from "express";
import { ReservaController } from "../controllers/ReservaController";

const router = Router();

router.post("/reservas", ReservaController.crear);
router.get("/usuarios/:id/reservas", ReservaController.listarPorUsuario);

export default router;
