import { ImageSource } from "expo-image";

const CATEGORIAS: Record<string, ImageSource> = {
  combos: require("../../assets/tienda/combos.png"),
  palomitas: require("../../assets/tienda/palomitas.png"),
  bebidas: require("../../assets/tienda/bebidas.png"),
  golosinas: require("../../assets/tienda/golosinas.png"),
};

const PRODUCTOS: Record<string, ImageSource> = {
  "combo pareja": require("../../assets/tienda/productos/combo-pareja.png"),
  "combo pochoclo + gaseosa": require("../../assets/tienda/productos/combo-pochoclo-gaseosa.png"),
  "palomitas grandes": require("../../assets/tienda/productos/palomitas-grandes.png"),
  "palomitas medianas": require("../../assets/tienda/productos/palomitas-medianas.png"),
  "gaseosa xl": require("../../assets/tienda/productos/gaseosa-xl.png"),
  "agua mineral": require("../../assets/tienda/productos/agua-mineral.png"),
  "nachos con queso": require("../../assets/tienda/productos/nachos-queso.png"),
  chocolate: require("../../assets/tienda/productos/chocolate.png"),
  gomitas: require("../../assets/tienda/productos/gomitas.png"),
};

const clave = (nombre: string) => nombre.trim().toLowerCase();

export const imagenCategoria = (categoria: string): ImageSource =>
  CATEGORIAS[categoria] ?? CATEGORIAS.combos;

export const imagenCandy = (nombre: string, categoria: string): ImageSource =>
  PRODUCTOS[clave(nombre)] ?? imagenCategoria(categoria);

export const descripcionCandy: Record<string, string> = {
  combos: "Ideal para compartir en la función",
  palomitas: "Recién hechas, con manteca",
  bebidas: "Bien frías para acompañar",
  golosinas: "El dulce que no puede faltar",
};

const DESCRIPCIONES: Record<string, string> = {
  "combo pareja": "Pochoclo grande + 2 gaseosas para compartir",
  "combo pochoclo + gaseosa": "Pochoclo mediano + gaseosa, listo para la función",
  "palomitas grandes": "Balde grande recién hecho, con manteca",
  "palomitas medianas": "Balde mediano recién hecho, con manteca",
  "gaseosa xl": "Vaso bien frío, con hielo",
  "agua mineral": "Sin gas, bien fría",
  "nachos con queso": "Con queso cheddar y jalapeños",
  chocolate: "Tableta de chocolate con leche",
  gomitas: "Surtidas y frutales",
};

export const descripcionProducto = (nombre: string, categoria: string): string =>
  DESCRIPCIONES[clave(nombre)] ?? descripcionCandy[categoria] ?? "";
