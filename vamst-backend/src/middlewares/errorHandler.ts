// (Opcional, para más adelante) Middleware central de errores.
// En vez de repetir try/catch en cada controlador, podés atrapar
// los errores acá y devolver siempre el mismo formato de respuesta.

import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  // TODO: loggear el error y responder
  // res.status(500).json({ ok: false, error: { mensaje: err.message } })
}
