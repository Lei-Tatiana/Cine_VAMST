// Esta carpeta es OPCIONAL. Podés usarla para "tipos" (interfaces de
// TypeScript) que describan la forma de los datos que llegan del backend,
// para que las pantallas y services/api.ts estén bien tipados.
//
// No hace falta que sean clases con lógica (eso vive en el backend);
//
// acá alcanza con describir la forma de los datos.
//
// Ejemplo de lo que podría ir acá:
//
// export interface Pelicula {
//   id: number;
//   titulo: string;
//   sinopsis: string;
//   duracionMin: number;
//   clasificacion: string;
//   genero: string;
//   posterUrl: string;
// }
//
// export interface Asiento {
//   id: number;
//   fila: string;
//   numero: number;
//   tipo: "comun" | "accesible";
//   estado: "disponible" | "ocupado";
// }
//
// TODO: definir acá Pelicula, Funcion, Asiento, Reserva, ProductoCandy
