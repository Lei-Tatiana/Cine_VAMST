import { ImageSource } from "expo-image";

const IMAGENES: Record<string, ImageSource> = {
  combos: require("../../assets/tienda/combos.png"),
  palomitas: require("../../assets/tienda/palomitas.png"),
  bebidas: require("../../assets/tienda/bebidas.png"),
  golosinas: require("../../assets/tienda/golosinas.png"),
};

// Las fotos del candy bar son locales: la base no guarda imágenes de productos.
export const imagenCandy = (categoria: string): ImageSource => IMAGENES[categoria] ?? IMAGENES.combos;

export const descripcionCandy: Record<string, string> = {
  combos: "Ideal para compartir en la función",
  palomitas: "Recién hechas, con manteca",
  bebidas: "Bien frías para acompañar",
  golosinas: "El dulce que no puede faltar",
};
