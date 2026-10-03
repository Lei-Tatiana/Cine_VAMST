// REPOSITORIO de funciones. Alimenta los horarios que se ven en
// detalle_pelicula.tsx.

import { pool } from "../config/db";
import { Funcion } from "../models/Funcion";

export const FuncionRepository = {
  async listarPorPelicula(peliculaId: number): Promise<Funcion[]> {
    // TODO: SELECT * FROM funciones WHERE pelicula_id = ?
    return [];
  },
};
