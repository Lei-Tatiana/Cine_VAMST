import { pool } from "../config/db";
import { Funcion } from "../models/Funcion";
import { RowDataPacket } from "mysql2";

export const FuncionRepository = {
  async listarPorPelicula(peliculaId: number): Promise<Funcion[]> {
    const[filas] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM funciones WHERE pelicula_id = ?",
      [peliculaId]
    );
    return filas.map(
      (f) => 
        new Funcion(f.id, f.pelicula_id, f.sala_id, f.fecha_hora, f.formato, f.precio_base)
    );
  },
  async buscarPorId(id: number): Promise<Funcion | null> {
    const [filas] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM funciones WHERE id = ?",
      [id]
    );
    if (filas.length === 0) return null;
    const f = filas[0];
    return new Funcion(f.id, f.pelicula_id, f.sala_id, f.fecha_hora, f.formato, f.precio_base);
  }
};
