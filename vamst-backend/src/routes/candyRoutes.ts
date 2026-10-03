import { Router } from "express";
import { CandyController } from "../controllers/CandyController";

const router = Router();

router.get("/candy", CandyController.listar);

export default router;
