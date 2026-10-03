// Datos de ejemplo para desarrollar las pantallas ANTES de tener
// el backend conectado. Cuando cada pantalla ya use services/api.ts,
// se le puede sacar el import de este archivo.
//
// Mantené la forma de estos objetos igual a lo que devuelve la API real
// (mismos nombres de campo), así el día que conectes de verdad
// el cambio es mínimo.

export const peliculasMock = [
  // TODO: array de objetos { id, titulo, sinopsis, duracionMin,
  //   clasificacion, genero, posterUrl } — para elegir_pelicula.tsx
  //   y detalle_pelicula.tsx
];

export const funcionesMock = [
  // TODO: array de { id, peliculaId, fechaHora, formato, precioBase }
];

export const asientosMock = [
  // TODO: array de { id, fila, numero, tipo: "comun" | "accesible",
  //   estado: "disponible" | "ocupado" } — para seleccionar_asientos.tsx
];

export const productosCandyMock = [
  // TODO: array de { id, nombre, categoria, precio } — para tienda.tsx
];
