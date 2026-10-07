import { pool } from "../config/db";
import { Usuario } from "../models/Usuario";
import { RowDataPacket } from "mysql2";

export const UsuarioRepository = {
  async crear(nombre: string, email: string, passwordHash: string): Promise<Usuario> {
    const [resultado]: any = await pool.query(
      "INSERT INTO Usuarios (nombre, email, password_hash) VALUES (?, ?, ?)",
      [nombre, email, passwordHash]
    );
    return new Usuario(resultado.insertId, nombre, email, passwordHash);
  },

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const [filas] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM Usuarios WHERE email = ?",
      [email]
    );
    if(filas.length === 0) return null;
    const f = filas[0];
    return new Usuario(f.id, f.nombre, f.email, f.password_hash);
  },
};
