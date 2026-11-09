<<<<<<< HEAD

=======
// ÚNICO archivo que le habla al backend (vamst-backend). Ninguna pantalla
// debería hacer fetch() directo: todas llaman a funciones de acá.
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78

import Constants from "expo-constants";
import {
  Asiento,
  Funcion,
<<<<<<< HEAD
  MetodoPago,
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  Pelicula,
  ProductoCandy,
  PedidoCandy,
  ReservaCreada,
  ReservaDetalle,
  RespuestaApi,
  Salud,
  Usuario,
} from "../models/tipos";

<<<<<<< HEAD

const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${host}:3001/api`;
=======
// Dirección del backend. Orden de prioridad:
//  1) EXPO_PUBLIC_API_URL (archivo .env del frontend), ej: http://192.168.0.15:3000/api
//  2) La IP de la compu que Expo Go nos da en hostUri (celular físico en la misma Wi-Fi)
//  3) localhost (navegador web)
// OJO: si abrís Expo con --tunnel, hostUri es una dirección de ngrok y el backend
// (puerto 3000) NO es accesible por ahí: en ese caso hay que definir EXPO_PUBLIC_API_URL.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${host}:3000/api`;
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78

if (__DEV__) console.log(`[API] El frontend le habla al backend en ${BASE_URL}`);

const TIEMPO_MAXIMO_MS = 8000;

async function pedir<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO_MS);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${ruta}`, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
      signal: controlador.signal,
    });
  } catch {
<<<<<<< HEAD

=======
    // Sin esto, con una IP equivocada la pantalla se quedaba cargando para siempre
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    throw new Error(
      `No se pudo conectar con el servidor (${BASE_URL}). Revisá que el backend esté encendido y que el celular esté en la misma red Wi-Fi que la compu.`
    );
  } finally {
    clearTimeout(temporizador);
  }

  let cuerpo: RespuestaApi<T>;
  try {
    cuerpo = (await res.json()) as RespuestaApi<T>;
  } catch {
    throw new Error(`El servidor respondió algo inesperado (HTTP ${res.status}) en ${ruta}.`);
  }
  if (!cuerpo.ok) throw new Error(cuerpo.error.mensaje);
  return cuerpo.data;
}

<<<<<<< HEAD

=======
// Para saber si la API y la base de datos están vivas.
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
export const getSalud = () => pedir<Salud>("/salud");

export const getPeliculas = () => pedir<Pelicula[]>("/peliculas");

export const getPeliculaPorId = (id: number) => pedir<Pelicula>(`/peliculas/${id}`);

export const getFunciones = (peliculaId: number) =>
  pedir<Funcion[]>(`/peliculas/${peliculaId}/funciones`);

export const getAsientos = (funcionId: number) =>
  pedir<Asiento[]>(`/funciones/${funcionId}/asientos`);

<<<<<<< HEAD
export const crearReserva = (
  usuarioId: number,
  funcionId: number,
  asientosIds: number[],
  metodoPago: MetodoPago
) =>
  pedir<ReservaCreada>("/reservas", {
    method: "POST",
    body: JSON.stringify({ usuarioId, funcionId, asientosIds, metodoPago }),
=======
export const crearReserva = (usuarioId: number, funcionId: number, asientosIds: number[]) =>
  pedir<ReservaCreada>("/reservas", {
    method: "POST",
    body: JSON.stringify({ usuarioId, funcionId, asientosIds }),
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  });

export const registrarUsuario = (nombre: string, email: string, password: string) =>
  pedir<Usuario>("/auth/registro", {
    method: "POST",
    body: JSON.stringify({ nombre, email, password }),
  });

export const loginUsuario = (email: string, password: string) =>
  pedir<Usuario>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

<<<<<<< HEAD
export const solicitarCodigoRecuperacion = (email: string) =>
  pedir<{ enviado: boolean; codigo?: string; destino?: string }>("/auth/recuperar", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const restablecerPassword = (email: string, codigo: string, password: string) =>
  pedir<{ actualizado: boolean }>("/auth/restablecer", {
    method: "POST",
    body: JSON.stringify({ email, codigo, password }),
  });

=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
export const getProductosCandy = (categoria?: string) =>
  pedir<ProductoCandy[]>(`/candy${categoria ? `?categoria=${categoria}` : ""}`);

export const crearPedidoCandy = (
<<<<<<< HEAD
  usuarioId: number,
  items: { productoId: number; cantidad: number }[],
  metodoPago: MetodoPago
) =>
  pedir<ReservaCreada>("/candy/pedidos", {
    method: "POST",
    body: JSON.stringify({ usuarioId, items, metodoPago }),
=======
  usuarioId: number | null,
  items: { productoId: number; cantidad: number }[]
) =>
  pedir<ReservaCreada>("/candy/pedidos", {
    method: "POST",
    body: JSON.stringify({ usuarioId, items }),
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  });

export const getMisReservas = (usuarioId: number) =>
  pedir<ReservaDetalle[]>(`/usuarios/${usuarioId}/reservas`);

export const getMisPedidosCandy = (usuarioId: number) =>
  pedir<PedidoCandy[]>(`/usuarios/${usuarioId}/pedidos-candy`);