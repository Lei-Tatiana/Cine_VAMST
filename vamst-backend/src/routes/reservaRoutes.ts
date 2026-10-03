import { Router } from "express";
import { ReservaController } from "../controllers/ReservaController";

const router = Router();

router.post("/reservas", ReservaController.crear);

export default router;
