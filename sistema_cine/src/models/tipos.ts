export type EstadoPelicula = "estreno" | "preventa" | "proximo";

export interface Pelicula {
  id: number;
  titulo: string;
  sinopsis: string;
  duracionMin: number;
  clasificacion: string;
  genero: string;
  posterUrl: string;
  estado: EstadoPelicula;
}

export interface Funcion {
  id: number;
  peliculaId: number;
  salaId: number;
  fechaHora: string; 
  formato: string;
  precioBase: number;
}

export type TipoAsiento = "comun" | "accesible";
export type EstadoAsiento = "disponible" | "ocupado";

export interface Asiento {
  id: number;
  fila: string;
  numero: number;
  tipo: TipoAsiento;
  estado: EstadoAsiento;
  precio: number; 
}

export interface ProductoCandy {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}


export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}


export interface ReservaCreada {
  id: number;
  codigo: string; // "VAMST-00042"
  total: number;
}

// Una reserva ya hecha, para dibujar el ticket en "Mis tickets" (GET /usuarios/:id/reservas)
export interface ReservaDetalle {
  id: number;
  codigo: string;
  estado: string;
  total: number;
  creadaEn: string;
  pelicula: string;
  formato: string;
  fechaHora: string;
  sala: string;
  asientos: string[]; // ["A1", "A2"]
}

export interface Salud {
  api: string;
  baseDeDatos: string;
}


export type RespuestaApi<T> =
  | { ok: true; data: T }
  | { ok: false; error: { mensaje: string } };


export interface PedidoCandy {
  id: number;
  codigo: string; // "CANDY-00007"
  total: number;
  creadaEn: string;
  items: { nombre: string; precio: number; cantidad: number }[];
}