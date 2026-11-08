import { Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import bcrypt from "bcrypt";
import { RegistroUsuarioDTO, LoginDTO } from "../types/dto";

export class AuthController {
  static async registro(req: Request, res: Response) {
    try {
      // Usar el DTO que definió Tati (solo tipado, no cambia la funcionalidad)
      const { nombre, email, password } = req.body as RegistroUsuarioDTO;

      if (!nombre?.trim() || !email?.trim() || !password) {
        return res.status(400).json({ ok: false, error: { mensaje: "Faltan datos: nombre, email y contraseña son obligatorios" } });
      }

      // Validación de formato de email (agregada)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({ ok: false, error: { mensaje: "El email no tiene un formato válido" } });
      }

      // Validación de longitud mínima de contraseña (agregada)
      if (password.length < 4) {
        return res.status(400).json({ ok: false, error: { mensaje: "La contraseña debe tener al menos 4 caracteres" } });
      }

      const existente = await UsuarioRepository.buscarPorEmail(email.trim().toLowerCase());
      if (existente) {
        // CAMBIO: antes era 400. Email duplicado es un CONFLICTO → 409.
        return res.status(409).json({ ok: false, error: { mensaje: "Este email ya está registrado. Probá iniciar sesión." } });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const usuario = await UsuarioRepository.crear(nombre.trim(), email.trim().toLowerCase(), passwordHash);
      res.status(201).json({ ok: true, data: usuario.toJSON() });
    } catch (e: any) {
      res.status(500).json({ ok: false, error: { mensaje: e.message } });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      // Usar el DTO de Tati (solo tipado)
      const { email, password } = req.body as LoginDTO;

      if (!email?.trim() || !password) {
        return res.status(400).json({ ok: false, error: { mensaje: "Email y contraseña son obligatorios" } });
      }

      const usuario = await UsuarioRepository.buscarPorEmail(email.trim().toLowerCase());
      if (!usuario) {
        return res.status(401).json({ ok: false, error: { mensaje: "Credenciales inválidas" } });
      }

      // Esto YA ESTABA bien en el original: bcrypt.compare
      const passwordValida = await bcrypt.compare(password, usuario.getPasswordHash());
      if (!passwordValida) {
        return res.status(401).json({ ok: false, error: { mensaje: "Credenciales inválidas" } });
      }

      res.json({ ok: true, data: usuario.toJSON() });
    } catch (e: any) {
      res.status(500).json({ ok: false, error: { mensaje: e.message } });
    }
  }
}