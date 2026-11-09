import { Router } from "express";
import { CandyController } from "../controllers/CandyController";

const router = Router();

router.get("/candy", CandyController.listar);
router.post("/candy/pedidos", CandyController.crearPedido);
router.get("/usuarios/:id/pedidos-candy", CandyController.listarPedidosPorUsuario);
export default router;
