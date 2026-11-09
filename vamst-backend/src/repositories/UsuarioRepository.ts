import { pool } from "../config/db";
import { Usuario } from "../models/Usuario";
import { RowDataPacket } from "mysql2";

export const UsuarioRepository = {
  async crear(nombre: string, email: string, passwordHash: string): Promise<Usuario> {
    const [resultado]: any = await pool.query(
      "INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)",
      [nombre, email, passwordHash]
    );
    return new Usuario(resultado.insertId, nombre, email, passwordHash);
  },

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const [filas] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if(filas.length === 0) return null;
    const f = filas[0];
    return new Usuario(f.id, f.nombre, f.email, f.password_hash);
  },

  async guardarCodigoRecuperacion(email: string, codigo: string): Promise<void> {
    await pool.query("DELETE FROM codigos_recuperacion WHERE email = ?", [email]);
    await pool.query(
      "INSERT INTO codigos_recuperacion (email, codigo, expira_en) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))",
      [email, codigo]
    );
  },

  async validarCodigoRecuperacion(email: string, codigo: string): Promise<boolean> {
    const [filas] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM codigos_recuperacion WHERE email = ? AND codigo = ? AND usado = 0 AND expira_en > NOW() ORDER BY id DESC LIMIT 1",
      [email, codigo]
    );
    return filas.length > 0;
  },

  async marcarCodigoRecuperacionUsado(email: string): Promise<void> {
    await pool.query("UPDATE codigos_recuperacion SET usado = 1 WHERE email = ?", [email]);
  },

  async actualizarPasswordHash(email: string, passwordHash: string): Promise<void> {
    await pool.query("UPDATE usuarios SET password_hash = ? WHERE email = ?", [passwordHash, email]);
  },
};
