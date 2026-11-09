<<<<<<< HEAD
export type EstadoPelicula = "estreno" | "preventa" | "proximo";

export type MetodoPago = "tarjeta" | "mercadopago" | "efectivo";
=======
// Tipos (interfaces) que describen la forma EXACTA de lo que devuelve el backend.
// Los nombres de campo coinciden con los toJSON() de vamst-backend/src/models.
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78

export interface Pelicula {
  id: number;
  titulo: string;
  sinopsis: string;
  duracionMin: number;
  clasificacion: string;
  genero: string;
  posterUrl: string;
<<<<<<< HEAD
  estado: EstadoPelicula;
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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

<<<<<<< HEAD

=======
// Una reserva ya hecha, para dibujar el ticket en "Mis tickets" (GET /usuarios/:id/reservas)
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
export interface ReservaDetalle {
  id: number;
  codigo: string;
  estado: string;
  total: number;
<<<<<<< HEAD
  metodoPago: MetodoPago | null;
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
  codigo: string;
  total: number;
  metodoPago: MetodoPago | null;
=======
  codigo: string; // "CANDY-00007"
  total: number;
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  creadaEn: string;
  items: { nombre: string; precio: number; cantidad: number }[];
}