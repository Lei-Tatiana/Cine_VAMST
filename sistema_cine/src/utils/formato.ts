// Funciones puras de formato, reutilizables en cualquier pantalla.
// No tienen que saber nada de React ni de la API: solo reciben un
// valor y devuelven un string formateado.

export function formatearPrecio(valor: number): string {
  // TODO: devolver algo como "$1.500" — Intl.NumberFormat("es-AR",
  // { style: "currency", currency: "ARS" }) es una opción prolija
  return "";
}

export function formatearFecha(fecha: Date | string): string {
  // TODO: devolver algo como "Vie 3 Oct" — útil para las tarjetas
  // de función en detalle_pelicula.tsx
  return "";
}

export function formatearHora(fecha: Date | string): string {
  // TODO: devolver algo como "20:30"
  return "";
}

export function formatearDuracion(minutos: number): string {
  // TODO: convertir minutos a algo como "2h 5min"
  return "";
}
