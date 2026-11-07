export interface CrearReservaDTO {
  usuarioId: number;
  funcionId: number;
  asientosIds: number[];
}

export interface RegistroUsuarioDTO {
  nombre: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
export interface RespuestaOk<T> { ok: true; data: T; }
export interface RespuestaError { ok: false; error: { mensaje: string }; }

export interface ReservaCreadaDTO { id: number; total: number; }