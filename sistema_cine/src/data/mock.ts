// Datos de ejemplo con la MISMA forma que la API (ver models/tipos.ts). HASTA CONECTAR LA API
import { Asiento, Funcion, Pelicula, ProductoCandy } from "../models/tipos";

export const peliculasMock: Pelicula[] = [
  {
    id: 1,
    titulo: "Batman",
    sinopsis: "El caballero oscuro vuelve a Gotham para enfrentar una nueva amenaza.",
    duracionMin: 176,
    clasificacion: "+13",
    genero: "Acción",
    posterUrl: "https://placehold.co/300x450/1e1e1e/ffffff?text=Batman",
  },
  {
    id: 2,
    titulo: "Intensamente 2",
    sinopsis: "Riley crece y llegan nuevas emociones a su cabeza.",
    duracionMin: 96,
    clasificacion: "ATP",
    genero: "Animación",
    posterUrl: "https://placehold.co/300x450/1e1e1e/ffffff?text=Intensamente+2",
  },
];

export const funcionesMock: Funcion[] = [
  { id: 1, peliculaId: 1, salaId: 1, fechaHora: "2026-11-13T20:00:00.000Z", formato: "2D Doblada", precioBase: 6000 },
  { id: 2, peliculaId: 1, salaId: 1, fechaHora: "2026-11-13T22:30:00.000Z", formato: "2D Subtitulada", precioBase: 6000 },
  { id: 3, peliculaId: 2, salaId: 2, fechaHora: "2026-11-14T16:00:00.000Z", formato: "2D Doblada", precioBase: 5500 },
];

// Sala de 5 filas x 8 asientos (misma distribución que la pantalla de diseño)
const ESTADOS = ["LLLOOLLL", "LLLLLLLL", "AALLLLOO", "LLOOOOLL", "LLLLLLLL"]; // L libre, O ocupado, A accesible
const PRECIO_BASE = 6000;

export const asientosMock: Asiento[] = ["A", "B", "C", "D", "E"].flatMap((fila, i) =>
  ESTADOS[i].split("").map((c, n): Asiento => ({
    id: i * 8 + n + 1,
    fila,
    numero: n + 1,
    tipo: c === "A" ? "accesible" : "comun",
    estado: c === "O" ? "ocupado" : "disponible",
    precio: c === "A" ? PRECIO_BASE * 0.8 : PRECIO_BASE,
  }))
);

export const productosCandyMock: ProductoCandy[] = [
  { id: 1, nombre: "Combo Pochoclo + Gaseosa", categoria: "combos", precio: 7500, stock: 50 },
  { id: 2, nombre: "Gaseosa grande", categoria: "bebidas", precio: 3000, stock: 80 },
  { id: 3, nombre: "Chocolate", categoria: "golosinas", precio: 2000, stock: 40 },
];