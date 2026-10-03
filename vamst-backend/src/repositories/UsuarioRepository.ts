// REPOSITORIO de usuarios. Para registro.tsx y el login.

import { pool } from "../config/db";
import { Usuario } from "../models/Usuario";

export const UsuarioRepository = {
  async crear(nombre: string, email: string, passwordHash: string): Promise<Usuario> {
    // TODO: INSERT INTO usuarios (...)
    throw new Error("no implementado");
  },

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    // TODO: SELECT * FROM usuarios WHERE email = ?
    return null;
  },
};
