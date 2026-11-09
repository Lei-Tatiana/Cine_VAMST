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
<<<<<<< HEAD
    usuarioId: number,
    items: { nombre: string; precio: number; cantidad: number }[],
    total: number,
    metodoPago: string
  ): Promise<number> {
    const [resultado]: any = await pool.query(
      "INSERT INTO pedidos_candy (usuario_id, items, total, metodo_pago) VALUES (?, ?, ?, ?)",
      [usuarioId, JSON.stringify(items), total, metodoPago]
=======
    usuarioId: number | null,
    items: { nombre: string; precio: number; cantidad: number }[],
    total: number
  ): Promise<number> {
    const [resultado]: any = await pool.query(
      "INSERT INTO pedidos_candy (usuario_id, items, total) VALUES (?, ?, ?)",
      [usuarioId, JSON.stringify(items), total]
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    );
    return resultado.insertId;
  },

    async listarPedidosPorUsuario(usuarioId: number) {
    const [filas] = await pool.query<RowDataPacket[]>(
<<<<<<< HEAD
      "SELECT id, items, total, metodo_pago, creada_en FROM pedidos_candy WHERE usuario_id = ? ORDER BY creada_en DESC, id DESC",
=======
      "SELECT id, items, total, creada_en FROM pedidos_candy WHERE usuario_id = ? ORDER BY creada_en DESC, id DESC",
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
      [usuarioId]
    );
    return filas.map((f) => ({
      id: f.id,
      codigo: `CANDY-${String(f.id).padStart(5, "0")}`,
      total: f.total,
<<<<<<< HEAD
      metodoPago: f.metodo_pago,
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
      creadaEn: f.creada_en,
      items: typeof f.items === "string" ? JSON.parse(f.items) : f.items,
    }));
  },
};



