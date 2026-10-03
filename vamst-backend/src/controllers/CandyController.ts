import { Request, Response } from "express";
import { ProductoCandyRepository } from "../repositories/ProductoCandyRepository";

export class CandyController {
  static async listar(req: Request, res: Response) {
    // TODO: usar el query param "categoria" (req.query.categoria) si viene,
    // y llamar a ProductoCandyRepository.listarTodos(categoria)
  }
}
