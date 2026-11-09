import { Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import bcrypt from "bcrypt";
<<<<<<< HEAD
import { correoConfigurado, enviarCodigoRecuperacion } from "../utils/mailer";

export class AuthController {
  static async registro(req: Request, res: Response) {
    try{
      const {nombre, email, password} = req.body;
      if(!nombre || !email || !password){
        return res.status(400).json({ok: false, error: {mensaje: "Faltan datos"}});
      }
      if(String(password).length < 6){
        return res.status(400).json({ok: false, error: {mensaje: "La contraseña debe tener al menos 6 caracteres"}});
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
=======
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
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    }
  }

  static async login(req: Request, res: Response) {
<<<<<<< HEAD
     try{
      const {email, password} = req.body;
      const usuario = await UsuarioRepository.buscarPorEmail(email);
      if(!usuario){
        return res.status(401).json({ok: false, error:{mensaje: "Credenciales inválidas"}});
      }

      const passwordValida = await bcrypt.compare(password, usuario.getPasswordHash());
      if(!passwordValida){
        return res.status(401).json({ok: false, error:{mensaje: "Credenciales inválidas"}});
      }

      res.json({ok: true, data: usuario.toJSON()});
     }catch (e:any){
      res.status(500).json({ok: false, error: {mensaje: e.message}});
     }
  }

  static async solicitarRecuperacion(req: Request, res: Response) {
    try {
      const email = String(req.body.email ?? "").trim();
      if (!email) {
        return res.status(400).json({ ok: false, error: { mensaje: "Ingresá tu mail" } });
      }

      const usuario = await UsuarioRepository.buscarPorEmail(email);
      if (!usuario) {
        return res.status(404).json({ ok: false, error: { mensaje: "No existe una cuenta con ese mail" } });
      }

      const codigo = String(Math.floor(100000 + Math.random() * 900000));
      await UsuarioRepository.guardarCodigoRecuperacion(email, codigo);

      if (!correoConfigurado) {

        return res.json({ ok: true, data: { enviado: false, codigo } });
      }

      try {
        await enviarCodigoRecuperacion(email, codigo);
      } catch (e: any) {
        console.error("No se pudo enviar el mail de recuperación:", e?.message ?? e);
        return res.status(502).json({
          ok: false,
          error: { mensaje: "No se pudo enviar el mail. Revisá la configuración SMTP e intentá de nuevo." },
        });
      }

      res.json({ ok: true, data: { enviado: true, destino: email } });
=======
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
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    } catch (e: any) {
      res.status(500).json({ ok: false, error: { mensaje: e.message } });
    }
  }
<<<<<<< HEAD

  static async restablecerPassword(req: Request, res: Response) {
    try {
      const email = String(req.body.email ?? "").trim();
      const codigo = String(req.body.codigo ?? "").trim();
      const password = String(req.body.password ?? "");

      if (!email || !codigo || !password) {
        return res.status(400).json({ ok: false, error: { mensaje: "Faltan datos" } });
      }
      if (password.length < 6) {
        return res.status(400).json({ ok: false, error: { mensaje: "La contraseña debe tener al menos 6 caracteres" } });
      }

      const codigoValido = await UsuarioRepository.validarCodigoRecuperacion(email, codigo);
      if (!codigoValido) {
        return res.status(400).json({ ok: false, error: { mensaje: "El código es inválido o expiró" } });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      await UsuarioRepository.actualizarPasswordHash(email, passwordHash);
      await UsuarioRepository.marcarCodigoRecuperacionUsado(email);

      res.json({ ok: true, data: { actualizado: true } });
    } catch (e: any) {
      res.status(500).json({ ok: false, error: { mensaje: e.message } });
    }
  }
}
=======
}
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
