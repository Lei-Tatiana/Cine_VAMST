import { Request, Response } from "express";
import { AsientoRepository } from "../repositories/AsientoRepository";
import { FuncionRepository } from "../repositories/FuncionRepository";
import { ReservaRepository } from "../repositories/ReservaRepository";
import { Reserva } from "../models/Reserva";

export class ReservaController {
  static async crear(req: Request, res: Response) {
    try{
      const {usuarioId, funcionId, asientosIds} = req.body;
      if(!usuarioId || !funcionId || !asientosIds?.length){
        return res.status(400).json({ok: false, error:{mensaje: "Faltan datos"}});
      }

      const funcion = await FuncionRepository.buscarPorId(funcionId);
      if(!funcion){
        return res.status(404).json({ok: false, error:{mensaje: "Función no encontrada"}});
      }

      const todosLosAsientos = await AsientoRepository.listarPorFuncion(funcionId);
      const seleccionados = todosLosAsientos.filter((a) => asientosIds.includes(a.id));

      const reserva = new Reserva(usuarioId, funcionId, seleccionados, funcion.getPrecioBase());
      reserva.calcularTotal();

      const reservaId = await ReservaRepository.crear(reserva);
      res.status(201).json({ok: true, data:{id: reservaId, total: reserva.getTotal()}});
    } catch (e:any){
      res.status(400).json({ok: false, error: {mensaje: e.message}});
    }
  }
}
