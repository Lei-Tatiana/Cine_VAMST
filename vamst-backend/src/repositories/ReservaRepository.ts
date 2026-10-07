import { PoolConnection } from "mysql2";
import { pool } from "../config/db";
import { Reserva } from "../models/Reserva";

export const ReservaRepository = {
  async crear(reserva: Reserva): Promise<number> {
  const conexion = await pool.getConnection();
    try{
      await conexion.beginTransaction();

      const [resultado]: any = await conexion.query(
        "INSERT INTO reservas (usuario_id, funcion_id, total, estado) VALUES (?, ?, ?, 'confirmada')",
        [reserva.usuarioId, reserva.funcionId, reserva.getTotal()]
      );
      const reservaId = resultado.insertId;

      for (const asiento  of reserva.getAsientos()){
        await conexion.query(
          "INSERT INTO reserva_asientos (reserva_id, funcion_id, asiento_id, precio) VALUES (?, ?, ?, ?)",
          [reservaId, reserva.funcionId, asiento.id, asiento.calcularPrecio(0)]
        );
      }

      await conexion.commit();
      return reservaId;
    } catch (error){
      await conexion.rollback();
      throw error;
    } finally{
      conexion.release();
    }
  },
};
