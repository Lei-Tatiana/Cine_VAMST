import { pool } from "../config/db";
import { Asiento } from "../models/Asiento";
import { AsientoComun } from "../models/AsientoComun";
import { AsientoAccesible } from "../models/AsientoAccesible";
import { RowDataPacket } from "mysql2";

export const AsientoRepository = {
  async listarPorFuncion(funcionId: number): Promise<Asiento[]> {
    const [filas] = await pool.query<RowDataPacket[]>(
         `SELECT a.id, a.fila, a.numero, a.tipo,
          CASE WHEN ra.asiento_id IS NULL THEN 'disponible' ELSE 'ocupado' END AS estado
          FROM asientos a
          JOIN funciones f ON f.sala_id = a.sala_id
          LEFT JOIN reserva_asientos ra
          ON ra.asiento_id = a.id AND ra.funcion_id = f.id
          WHERE f.id = ?`,
          [funcionId]
    );
    return filas.map((f) => {
      const estado = f.estado as "disponible" | "ocupado";
      if (f.tipo === "accesible"){
        return new AsientoAccesible(f.id, f.fila, f.numero, estado);
      }
      return new AsientoComun(f.id, f.fila, f.numero, estado);
    });
  },

};
