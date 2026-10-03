// REPOSITORIO de asientos. OJO ACÁ: según el campo "tipo" de la fila,
// hay que instanciar AsientoComun o AsientoAccesible (no siempre la misma clase).
// Esto alimenta seleccionar_asientos.tsx.

import { pool } from "../config/db";
import { Asiento } from "../models/Asiento";
import { AsientoComun } from "../models/AsientoComun";
import { AsientoAccesible } from "../models/AsientoAccesible";

export const AsientoRepository = {
  async listarPorFuncion(funcionId: number): Promise<Asiento[]> {
    // TODO: 1) SELECT de asientos de la sala de esa función
    //       2) por cada fila, si tipo === "accesible" -> new AsientoAccesible(...)
    //          si no -> new AsientoComun(...)
    //       3) también hay que cruzar con reserva_asientos para saber
    //          cuáles ya están ocupados en ESA función puntual
    return [];
  },
};
