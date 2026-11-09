import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/auth/registro", AuthController.registro);
router.post("/auth/login", AuthController.login);
<<<<<<< HEAD
router.post("/auth/recuperar", AuthController.solicitarRecuperacion);
router.post("/auth/restablecer", AuthController.restablecerPassword);
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78

export default router;
