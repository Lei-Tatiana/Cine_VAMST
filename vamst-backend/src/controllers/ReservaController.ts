import { Request, Response } from "express";
import { AsientoRepository } from "../repositories/AsientoRepository";
import { FuncionRepository } from "../repositories/FuncionRepository";
import { PeliculaRepository } from "../repositories/PeliculaRepository";
import { ReservaRepository } from "../repositories/ReservaRepository";
import { Reserva } from "../models/Reserva";
import { codigoReserva } from "../utils/codigoReserva";

const metodosPago = ["tarjeta", "mercadopago", "efectivo"];

export class ReservaController {
  static async crear(req: Request, res: Response) {
    try{
      const {usuarioId, funcionId, asientosIds, metodoPago} = req.body;
      if(!usuarioId || !funcionId || !Array.isArray(asientosIds) || asientosIds.length === 0){
        return res.status(400).json({ok: false, error:{mensaje: "Faltan datos"}});
      }
      const metodo = metodosPago.includes(metodoPago) ? metodoPago : "tarjeta";

      // Los ids tienen que ser enteros positivos y sin repetir
      const ids = asientosIds.map(Number);
      const idsValidos =
        Number.isInteger(Number(usuarioId)) && Number.isInteger(Number(funcionId)) &&
        ids.every((id) => Number.isInteger(id) && id > 0) &&
        new Set(ids).size === ids.length;
      if(!idsValidos){
        return res.status(400).json({ok: false, error:{mensaje: "Datos inválidos"}});
      }

      const funcion = await FuncionRepository.buscarPorId(Number(funcionId));
      if(!funcion){
        return res.status(404).json({ok: false, error:{mensaje: "Función no encontrada"}});
      }

      const pelicula = await PeliculaRepository.buscarPorId(funcion.getPeliculaId());
      if(pelicula?.getEstado() === "proximo"){
        return res.status(400).json({ok: false, error:{mensaje: "La película todavía no está a la venta"}});
      }

      const todosLosAsientos = await AsientoRepository.listarPorFuncion(Number(funcionId));
      const seleccionados = todosLosAsientos.filter((a) => ids.includes(a.id));
      if(seleccionados.length !== ids.length){
        return res.status(400).json({ok: false, error:{mensaje: "Alguno de los asientos no existe"}});
      }

      // Si alguno ya está ocupado, reservar() lanza un error: se responde 409 (conflicto)
      if(seleccionados.some((a) => a.getEstado() === "ocupado")){
        return res.status(409).json({ok: false, error:{mensaje: "Alguno de los asientos ya fue reservado. Volvé a elegir."}});
      }

      const reserva = new Reserva(Number(usuarioId), Number(funcionId), seleccionados, funcion.getPrecioBase());
      reserva.confirmar();

      const reservaId = await ReservaRepository.crear(reserva, metodo);
      res.status(201).json({ok: true, data:{id: reservaId, codigo: codigoReserva(reservaId), total: reserva.getTotal()}});
    } catch (e:any){
      // Dos personas eligieron el mismo asiento a la vez: lo frena el UNIQUE de reserva_asientos
      if(e.code === "ER_DUP_ENTRY"){
        return res.status(409).json({ok: false, error:{mensaje: "Alguno de los asientos ya fue reservado. Volvé a elegir."}});
      }
      // El usuario no existe (clave foránea)
      if(e.code === "ER_NO_REFERENCED_ROW_2"){
        return res.status(404).json({ok: false, error:{mensaje: "Usuario no encontrado. Volvé a iniciar sesión."}});
      }
      res.status(500).json({ok: false, error: {mensaje: e.message}});
    }
  }

  // GET /api/usuarios/:id/reservas  ->  "Mis tickets" del perfil
  static async listarPorUsuario(req: Request, res: Response) {
    try{
      const usuarioId = Number(req.params.id);
      if(!Number.isInteger(usuarioId) || usuarioId <= 0){
        return res.status(400).json({ok: false, error:{mensaje: "Usuario inválido"}});
      }
      const reservas = await ReservaRepository.listarPorUsuario(usuarioId);
      res.json({ok: true, data: reservas});
    } catch (e:any){
      res.status(500).json({ok: false, error: {mensaje: e.message}});
    }
  }
}
