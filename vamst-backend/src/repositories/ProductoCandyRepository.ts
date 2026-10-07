import { pool } from "../config/db";
import { RowDataPacket } from "mysql2";

export interface ProductoCandy{
    id: number,
    nombre: string, 
    categoria: string, 
    precio: number,
    stock: number
}

export const ProductoCandyRepository = {
  async listarTodos(categoria?: string):Promise<ProductoCandy[]> {
    const [filas] = categoria
    ? await pool.query<RowDataPacket[]>(
      "SELECT * FROM productos_candy WHERE categoria = ?",
      [categoria]
    )
    :await pool.query<RowDataPacket[]>("SELECT * FROM productos_candy");

    return filas as ProductoCandy[];
  },
};
