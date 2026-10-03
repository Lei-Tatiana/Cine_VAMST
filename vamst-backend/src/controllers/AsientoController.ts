import { Request, Response } from "express";
import { AsientoRepository } from "../repositories/AsientoRepository";

export class AsientoController {
  static async listarPorFuncion(req: Request, res: Response) {
    // TODO: usar AsientoRepository.listarPorFuncion(req.params.id)
    // y mapear cada asiento a un objeto plano con toJSON() (si lo agregás al modelo)
  }
}
