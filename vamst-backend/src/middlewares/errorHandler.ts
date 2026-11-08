import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Loguear siempre en consola para debug
  console.error("[ERROR]", err);

  // JSON mal formado en el body (express.json() lanza esto)
  if (err?.type === "entity.parse.failed") {
    res.status(400).json({ ok: false, error: { mensaje: "JSON inválido en el cuerpo de la petición" } });
    return;
  }

  // Doble reserva (por si algún controller no lo captura)
  if (err?.code === "ER_DUP_ENTRY") {
    res.status(409).json({ ok: false, error: { mensaje: "Conflicto: uno de los datos ya existe (asiento ya reservado o email duplicado)." } });
    return;
  }

  // Error de conexión a MySQL
  if (err?.code === "ECONNREFUSED" || err?.code === "ER_ACCESS_DENIED_ERROR") {
    res.status(503).json({ ok: false, error: { mensaje: "No se pudo conectar a la base de datos. Revisá el .env y que MySQL esté encendido." } });
    return;
  }

  // Error inesperado
  res.status(500).json({ ok: false, error: { mensaje: err.message || "Error interno del servidor" } });
}
  