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

  async crearPedido(
    usuarioId: number | null,
    items: { nombre: string; precio: number; cantidad: number }[],
    total: number
  ): Promise<number> {
    const [resultado]: any = await pool.query(
      "INSERT INTO pedidos_candy (usuario_id, items, total) VALUES (?, ?, ?)",
      [usuarioId, JSON.stringify(items), total]
    );
    return resultado.insertId;
  },

    async listarPedidosPorUsuario(usuarioId: number) {
    const [filas] = await pool.query<RowDataPacket[]>(
      "SELECT id, items, total, creada_en FROM pedidos_candy WHERE usuario_id = ? ORDER BY creada_en DESC, id DESC",
      [usuarioId]
    );
    return filas.map((f) => ({
      id: f.id,
      codigo: `CANDY-${String(f.id).padStart(5, "0")}`,
      total: f.total,
      creadaEn: f.creada_en,
      items: typeof f.items === "string" ? JSON.parse(f.items) : f.items,
    }));
  },
};



