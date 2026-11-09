import { Ionicons } from "@expo/vector-icons";
import { ImageSource } from "expo-image";

export type Promo = {
  icono: keyof typeof Ionicons.glyphMap;
  titulo: string;
  detalle: string;
  vigencia: string;
  imagen: ImageSource;
};

export const PROMOS: Promo[] = [
  {
    icono: "ticket-outline",
    titulo: "2x1 los miércoles",
    detalle: "Comprá dos entradas para la misma función y pagá una sola. Válido en todas las salas.",
    vigencia: "Todos los miércoles",
    imagen: require("../../assets/promos/2x1.png"),
  },
  {
    icono: "people-outline",
    titulo: "Combo familiar",
    detalle: "Dos pochoclos grandes, dos gaseosas y nachos con queso para compartir en pantalla grande.",
    vigencia: "Todos los días",
    imagen: require("../../assets/promos/familiar.png"),
  },
  {
    icono: "moon-outline",
    titulo: "Noche de terror",
    detalle: "Después de las 22:00, llevá dos entradas de terror al precio de una. Solo para valientes.",
    vigencia: "Viernes y sábados",
    imagen: require("../../assets/promos/terror.png"),
  },
  {
    icono: "gift-outline",
    titulo: "Cumpleaños VAMST",
    detalle: "En tu cumpleaños te regalamos un pochoclo grande. Mostrá tu DNI en boletería.",
    vigencia: "Todo el año",
    imagen: require("../../assets/promos/cumple.png"),
  },
  {
    icono: "school-outline",
    titulo: "Descuento estudiante",
    detalle: "30% off en tu entrada presentando la credencial del colegio o universidad.",
    vigencia: "De lunes a jueves",
    imagen: require("../../assets/promos/estudiantes.png"),
  },
];
