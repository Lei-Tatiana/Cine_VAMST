// Este es el controlador con más responsabilidad del proyecto:
// valida los datos, arma los objetos del Modelo, y recién ahí
// le pide al Repositorio que guarde. La lógica de cálculo de precio
// NO va acá: va dentro de Asiento.calcularPrecio().

import { Request, Response } from "express";
import { AsientoRepository } from "../repositories/AsientoRepository";
import { ReservaRepository } from "../repositories/ReservaRepository";
import { Reserva } from "../models/Reserva";

export class ReservaController {
  static async crear(req: Request, res: Response) {
    // TODO: 1) sacar funcionId y asientosIds del req.body
    //       2) validar que vengan (si no, 400)
    //       3) buscar los asientos reales con AsientoRepository
    //       4) armar new Reserva(usuarioId, funcionId, asientos, precioBase)
    //       5) reserva.calcularTotal()
    //       6) ReservaRepository.crear(reserva)
    //       7) si algo falla (ej: asiento ya ocupado), responder 400
    //          con el mensaje de error; si sale bien, 201 con la reserva
  }
}
