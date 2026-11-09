

import Constants from "expo-constants";
import {
  Asiento,
  Funcion,
  MetodoPago,
  Pelicula,
  ProductoCandy,
  PedidoCandy,
  ReservaCreada,
  ReservaDetalle,
  RespuestaApi,
  Salud,
  Usuario,
} from "../models/tipos";


const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${host}:3001/api`;

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


export const getSalud = () => pedir<Salud>("/salud");

export const getPeliculas = () => pedir<Pelicula[]>("/peliculas");

export const getPeliculaPorId = (id: number) => pedir<Pelicula>(`/peliculas/${id}`);

export const getFunciones = (peliculaId: number) =>
  pedir<Funcion[]>(`/peliculas/${peliculaId}/funciones`);

export const getAsientos = (funcionId: number) =>
  pedir<Asiento[]>(`/funciones/${funcionId}/asientos`);

export const crearReserva = (
  usuarioId: number,
  funcionId: number,
  asientosIds: number[],
  metodoPago: MetodoPago
) =>
  pedir<ReservaCreada>("/reservas", {
    method: "POST",
    body: JSON.stringify({ usuarioId, funcionId, asientosIds, metodoPago }),
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

export const getProductosCandy = (categoria?: string) =>
  pedir<ProductoCandy[]>(`/candy${categoria ? `?categoria=${categoria}` : ""}`);

export const crearPedidoCandy = (
  usuarioId: number,
  items: { productoId: number; cantidad: number }[],
  metodoPago: MetodoPago
) =>
  pedir<ReservaCreada>("/candy/pedidos", {
    method: "POST",
    body: JSON.stringify({ usuarioId, items, metodoPago }),
  });

export const getMisReservas = (usuarioId: number) =>
  pedir<ReservaDetalle[]>(`/usuarios/${usuarioId}/reservas`);

export const getMisPedidosCandy = (usuarioId: number) =>
  pedir<PedidoCandy[]>(`/usuarios/${usuarioId}/pedidos-candy`);