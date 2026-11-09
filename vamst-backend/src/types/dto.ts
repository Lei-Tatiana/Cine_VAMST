export interface CrearReservaDTO {
  usuarioId: number;
  funcionId: number;
  asientosIds: number[];
  metodoPago?: "tarjeta" | "mercadopago" | "efectivo";
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

export interface ReservaCreadaDTO { id: number; codigo: string; total: number; }

// Una reserva ya hecha, con todo lo necesario para dibujar el ticket (GET /usuarios/:id/reservas)
export interface ReservaDetalleDTO {
  id: number;
  codigo: string;
  estado: string;
  total: number;
  metodoPago: string | null;
  creadaEn: string;
  pelicula: string;
  formato: string;
  fechaHora: string;
  sala: string;
  asientos: string[]; // ["A1", "A2"]
}

export interface CrearPedidoCandyDTO {
  usuarioId?: number;
  items: { productoId: number; cantidad: number }[];
  metodoPago?: "tarjeta" | "mercadopago" | "efectivo";
}