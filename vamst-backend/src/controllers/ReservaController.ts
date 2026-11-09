import { Request, Response } from "express";
import { AsientoRepository } from "../repositories/AsientoRepository";
import { FuncionRepository } from "../repositories/FuncionRepository";
<<<<<<< HEAD
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

      // Los ids tienen que ser enteros positivos y sin repetir.
      const ids = asientosIds.map(Number);
=======
import { ReservaRepository } from "../repositories/ReservaRepository";
import { Reserva } from "../models/Reserva";
import { codigoReserva } from "../utils/codigoReserva";
import { CrearReservaDTO } from "../types/dto"; // ← DTO de Tati

export class ReservaController {
  static async crear(req: Request, res: Response) {
    try {
      // Tipar con el DTO (lo único que agregamos)
      const { usuarioId, funcionId, asientosIds } = req.body as CrearReservaDTO;

      if (!usuarioId || !funcionId || !Array.isArray(asientosIds) || asientosIds.length === 0) {
        return res.status(400).json({ ok: false, error: { mensaje: "Faltan datos: usuarioId, funcionId y asientosIds son obligatorios" } });
      }

      // Los ids pueden llegar como strings desde el frontend: convertir SIEMPRE.
      const ids = asientosIds.map(Number);

>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
      const idsValidos =
        Number.isInteger(Number(usuarioId)) && Number.isInteger(Number(funcionId)) &&
        ids.every((id) => Number.isInteger(id) && id > 0) &&
        new Set(ids).size === ids.length;
<<<<<<< HEAD
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
=======

      if (!idsValidos) {
        return res.status(400).json({ ok: false, error: { mensaje: "Datos inválidos: los IDs deben ser enteros positivos sin repetir" } });
      }

      const funcion = await FuncionRepository.buscarPorId(Number(funcionId));
      if (!funcion) {
        return res.status(404).json({ ok: false, error: { mensaje: "Función no encontrada" } });
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
      }

      const todosLosAsientos = await AsientoRepository.listarPorFuncion(Number(funcionId));
      const seleccionados = todosLosAsientos.filter((a) => ids.includes(a.id));
<<<<<<< HEAD
      if(seleccionados.length !== ids.length){
        return res.status(400).json({ok: false, error:{mensaje: "Alguno de los asientos no existe"}});
      }

      // Si alguno ya está ocupado, reservar() lanza un error: se responde 409 (conflicto).
      if(seleccionados.some((a) => a.getEstado() === "ocupado")){
        return res.status(409).json({ok: false, error:{mensaje: "Alguno de los asientos ya fue reservado. Volvé a elegir."}});
=======

      if (seleccionados.length !== ids.length) {
        return res.status(400).json({ ok: false, error: { mensaje: "Alguno de los asientos no existe o no pertenece a esta función" } });
      }

      if (seleccionados.some((a) => a.getEstado() === "ocupado")) {
        return res.status(409).json({ ok: false, error: { mensaje: "Alguno de los asientos ya fue reservado. Volvé a elegir." } });
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
      }

      const reserva = new Reserva(Number(usuarioId), Number(funcionId), seleccionados, funcion.getPrecioBase());
      reserva.confirmar();
<<<<<<< HEAD

      const reservaId = await ReservaRepository.crear(reserva, metodo);
      res.status(201).json({ok: true, data:{id: reservaId, codigo: codigoReserva(reservaId), total: reserva.getTotal()}});
    } catch (e:any){
      // Dos personas eligieron el mismo asiento a la vez: lo frena el UNIQUE de reserva_asientos.
      if(e.code === "ER_DUP_ENTRY"){
        return res.status(409).json({ok: false, error:{mensaje: "Alguno de los asientos ya fue reservado. Volvé a elegir."}});
      }

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
=======
      const reservaId = await ReservaRepository.crear(reserva);

      res.status(201).json({
        ok: true,
        data: { id: reservaId, codigo: codigoReserva(reservaId), total: reserva.getTotal() },
      });
    } catch (e: any) {
      // Protección REAL contra doble reserva concurrente
      if (e.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ ok: false, error: { mensaje: "Alguno de los asientos ya fue reservado. Volvé a elegir." } });
      }
      if (e.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(404).json({ ok: false, error: { mensaje: "Usuario no encontrado. Volvé a iniciar sesión." } });
      }
      res.status(500).json({ ok: false, error: { mensaje: e.message } });
    }
  }

  static async listarPorUsuario(req: Request, res: Response) {
    try {
      const usuarioId = Number(req.params.id);
      if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
        return res.status(400).json({ ok: false, error: { mensaje: "Usuario inválido" } });
      }
      const reservas = await ReservaRepository.listarPorUsuario(usuarioId);
      res.json({ ok: true, data: reservas });
    } catch (e: any) {
      res.status(500).json({ ok: false, error: { mensaje: e.message } });
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    }
  }
}
