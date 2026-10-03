// REPOSITORIO de reservas. Acá es donde conviene usar una TRANSACCIÓN:
// si falla la inserción de un asiento, hay que deshacer toda la reserva,
// no dejarla a medias.

import { pool } from "../config/db";
import { Reserva } from "../models/Reserva";

export const ReservaRepository = {
  async crear(reserva: Reserva): Promise<number> {
    // TODO: 1) pool.getConnection() y connection.beginTransaction()
    //       2) INSERT INTO reservas (...)
    //       3) por cada asiento, INSERT INTO reserva_asientos (...)
    //          (acá puede fallar por el UNIQUE si alguien más reservó primero)
    //       4) connection.commit() si todo salió bien,
    //          connection.rollback() si algo falló
    //       5) devolver el id de la reserva creada
    return 0;
  },
};
