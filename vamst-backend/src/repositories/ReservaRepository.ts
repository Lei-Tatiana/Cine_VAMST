import { RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import { Reserva } from "../models/Reserva";
import { ReservaDetalleDTO } from "../types/dto";
import { codigoReserva } from "../utils/codigoReserva";

export const ReservaRepository = {
  async crear(reserva: Reserva, metodoPago: string): Promise<number> {
  const conexion = await pool.getConnection();
    try{
      await conexion.beginTransaction();

      const [resultado]: any = await conexion.query(
        "INSERT INTO reservas (usuario_id, funcion_id, total, metodo_pago, estado) VALUES (?, ?, ?, ?, 'confirmada')",
        [reserva.usuarioId, reserva.funcionId, reserva.getTotal(), metodoPago]
      );
      const reservaId = resultado.insertId;

      for (const asiento  of reserva.getAsientos()){
        await conexion.query(
          "INSERT INTO reserva_asientos (reserva_id, funcion_id, asiento_id, precio) VALUES (?, ?, ?, ?)",
          [reservaId, reserva.funcionId, asiento.id, asiento.calcularPrecio(reserva.getPrecioBase())]
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
  // Reservas de un usuario (las más nuevas primero), con película, función, sala y asientos.
  async listarPorUsuario(usuarioId: number): Promise<ReservaDetalleDTO[]> {
    const [filas] = await pool.query<RowDataPacket[]>(
      `SELECT r.id, r.total, r.metodo_pago, r.estado, r.creada_en,
              p.titulo AS pelicula, f.formato, f.fecha_hora, s.nombre AS sala,
              GROUP_CONCAT(CONCAT(a.fila, a.numero) ORDER BY a.fila, a.numero SEPARATOR ',') AS asientos
       FROM reservas r
       JOIN funciones f ON f.id = r.funcion_id
       JOIN peliculas p ON p.id = f.pelicula_id
       JOIN salas s ON s.id = f.sala_id
       JOIN reserva_asientos ra ON ra.reserva_id = r.id
       JOIN asientos a ON a.id = ra.asiento_id
       WHERE r.usuario_id = ?
       GROUP BY r.id, r.total, r.metodo_pago, r.estado, r.creada_en, p.titulo, f.formato, f.fecha_hora, s.nombre
       ORDER BY r.creada_en DESC, r.id DESC`,
      [usuarioId]
    );
    return filas.map((f) => ({
      id: f.id,
      codigo: codigoReserva(f.id),
      estado: f.estado,
      total: f.total,
      metodoPago: f.metodo_pago,
      creadaEn: f.creada_en,
      pelicula: f.pelicula,
      formato: f.formato,
      fechaHora: f.fecha_hora,
      sala: f.sala,
      asientos: String(f.asientos).split(","),
    }));
  },
};
