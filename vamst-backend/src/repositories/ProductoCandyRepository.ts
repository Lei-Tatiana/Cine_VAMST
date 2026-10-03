// REPOSITORIO del candy bar. Alimenta tienda.tsx.

import { pool } from "../config/db";

export const ProductoCandyRepository = {
  async listarTodos(categoria?: string) {
    // TODO: SELECT * FROM productos_candy
    // (si viene "categoria", agregar WHERE categoria = ?)
    return [];
  },
};
