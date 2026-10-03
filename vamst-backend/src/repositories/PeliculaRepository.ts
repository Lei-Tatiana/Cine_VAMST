import { pool } from "../config/db";
import { Pelicula } from "../models/Pelicula";
import { RowDataPacket } from "mysql2";

export const PeliculaRepository =
{
  async listarTodas(): Promise<Pelicula[]> {
  const [filas] = await pool.query<RowDataPacket[]>("SELECT * FROM PELICULAS");
  return filas.map(
    (f) => new Pelicula(f.id, f.titulo, f.sinopsis, f.duracion_min, f.clasificacion, f.genero, f.poster_url)
  );
  },

  async buscarPorId(id:number): Promise<Pelicula | null>{
    const [filas] = await pool.query<RowDataPacket[]>("SELECT * FROM Peliculas WHERE id=?",[id]);
    if(filas.length === 0) return null;
    const f = filas[0];
      return new Pelicula(f.id, f.titulo, f.sinopsis, f.duracion_min, f.clasificacion, f.genero, f.poster_url);
  },
};