import { Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
// TODO: import bcrypt from "bcrypt";

export class AuthController {
  static async registro(req: Request, res: Response) {
    // TODO: 1) sacar nombre, email, password de req.body
    //       2) hashear el password con bcrypt.hash(password, 10)
    //       3) UsuarioRepository.crear(nombre, email, hash)
    //       4) OJO: nunca devolver el password_hash en la respuesta
  }

  static async login(req: Request, res: Response) {
    // TODO: 1) buscar el usuario por email
    //       2) comparar el password con bcrypt.compare
    //       3) si coincide, devolver los datos del usuario (sin el hash)
    //          si no, 401 "credenciales inválidas"
  }
}
