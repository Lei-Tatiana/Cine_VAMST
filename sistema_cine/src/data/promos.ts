import { Ionicons } from "@expo/vector-icons";
import { ImageSource } from "expo-image";

export type Promo = {
  icono: keyof typeof Ionicons.glyphMap;
  titulo: string;
  detalle: string;
  vigencia: string;
  imagen: ImageSource; // { uri: "https://..." } o require("../../assets/promos/2x1.jpg")
};

export const PROMOS: Promo[] = [
  { icono: "ticket-outline", titulo: "2x1 los miércoles", detalle: "...", vigencia: "Todos los miércoles",
    imagen: { uri: "https://placehold.co/800x400/1e1e1e/e50914?text=2x1" } },
  // ...lo mismo en las otras 3, cada una con su imagen
];