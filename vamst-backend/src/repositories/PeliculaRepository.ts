import { pool } from "../config/db";
import { Pelicula } from "../models/Pelicula";
import { RowDataPacket } from "mysql2";

export const PeliculaRepository =
{
  async listarTodas(): Promise<Pelicula[]> {
  const [filas] = await pool.query<RowDataPacket[]>("SELECT * FROM peliculas");
  return filas.map(
<<<<<<< HEAD
    (f) => new Pelicula(f.id, f.titulo, f.sinopsis, f.duracion_min, f.clasificacion, f.genero, f.poster_url, f.estado)
=======
    (f) => new Pelicula(f.id, f.titulo, f.sinopsis, f.duracion_min, f.clasificacion, f.genero, f.poster_url)
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  );
  },

  async buscarPorId(id:number): Promise<Pelicula | null>{
    const [filas] = await pool.query<RowDataPacket[]>("SELECT * FROM peliculas WHERE id = ?",[id]);
    if(filas.length === 0) return null;
    const f = filas[0];
<<<<<<< HEAD
      return new Pelicula(f.id, f.titulo, f.sinopsis, f.duracion_min, f.clasificacion, f.genero, f.poster_url, f.estado);
=======
      return new Pelicula(f.id, f.titulo, f.sinopsis, f.duracion_min, f.clasificacion, f.genero, f.poster_url);
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  },
};