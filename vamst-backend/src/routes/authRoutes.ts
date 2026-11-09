import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/auth/registro", AuthController.registro);
router.post("/auth/login", AuthController.login);
router.post("/auth/recuperar", AuthController.solicitarRecuperacion);
router.post("/auth/restablecer", AuthController.restablecerPassword);

export default router;
