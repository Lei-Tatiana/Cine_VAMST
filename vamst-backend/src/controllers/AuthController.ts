import { Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import bcrypt from "bcrypt";

export class AuthController {
  static async registro(req: Request, res: Response) {
    try{
      const {nombre, email, password} = req.body;
      if(!nombre || !email || !password){
        return res.status(400).json({ok: false, error: {mensaje: "Faltan datos"}});
      }

      const existente = await UsuarioRepository.buscarPorEmail(email);
      if (existente){
        return res.status(400).json({ok: false, error:{mensaje: "Este mail ya está registrado"}});
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const usuario = await UsuarioRepository.crear(nombre, email, passwordHash);
       res.status(201).json({ ok: true, data: usuario.toJSON() });
    } catch (e:any){
        res.status(500).json({ ok: false, error: { mensaje: e.message } });
    }
  }

  static async login(req: Request, res: Response) {
     try{
      const {email, password} = req.body;
      const usuario = await UsuarioRepository.buscarPorEmail(email);
      if(!usuario){
        return res.status(401).json({ok: false, error:{mensaje: "Credenciales inválidas"}});
      }

      res.json({ok: true, data: usuario.toJSON()});
     }catch (e:any){
      res.status(500).json({ok: false, error: {mensaje: e.message}});
     }
  }
}
