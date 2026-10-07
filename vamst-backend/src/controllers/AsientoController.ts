import { Request, Response } from "express";
import { AsientoRepository } from "../repositories/AsientoRepository";
import { FuncionRepository } from "../repositories/FuncionRepository";

export class AsientoController {
  static async listarPorFuncion(req: Request, res: Response) {
    try{
      const funcionId = Number(req.params.id);
      const asientos = await AsientoRepository.listarPorFuncion(funcionId);

      const funcion = await FuncionRepository.buscarPorId(funcionId);

      if(!funcion){
        return res.status(404).json({ok: false, error: {mensaje: "Función no encontrada"}});

      }

      const data = asientos.map((a) => a.toJSON(funcion.getPrecioBase()));
      res.json({ok: true, data});
    } catch (e:any){
      res.status(500).json({ok: false, error: {mensaje: e.mensaje}});
    }
  }
}
