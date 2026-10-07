import { Request, Response } from "express";
import { ProductoCandyRepository } from "../repositories/ProductoCandyRepository";

export class CandyController {
  static async listar(req: Request, res: Response) {
    try{
      const categoria = req.query.categoria as string | undefined;
      const productos = await ProductoCandyRepository.listarTodos(categoria);
      res.json({ok: true, data: productos});
    } catch(e:any){
      res.status(500).json({ok: true, error:{mensaje: e.message}});
    }
  }
}
