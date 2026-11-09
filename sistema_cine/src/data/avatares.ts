import { ImageSource } from "expo-image";

export type AvatarId =
  | "cabra"
  | "pinguino"
  | "dibujo"
  | "muneca"
  | "muneco"
  | "tortuga"
  | "mono"
  | "gato"
  | "mapache"
  | "hamster"
  | "peluche"
  | "perrito"
  | "pochoclos";

export type Avatar = {
  id: AvatarId;
  nombre: string;
  imagen: ImageSource;
};

export const AVATARES: Avatar[] = [
  { id: "cabra", nombre: "Cabra", imagen: require("../../assets/avatares/cabra.jpeg") },
  { id: "pinguino", nombre: "Pingüino", imagen: require("../../assets/avatares/pinguino.jpeg") },
  { id: "dibujo", nombre: "Dibujo", imagen: require("../../assets/avatares/dibujo.jpeg") },
  { id: "muneca", nombre: "Muñeca", imagen: require("../../assets/avatares/muneca.jpeg") },
  { id: "muneco", nombre: "Muñeco", imagen: require("../../assets/avatares/muneco.jpeg") },
  { id: "tortuga", nombre: "Tortuga", imagen: require("../../assets/avatares/tortuga.jpeg") },
  { id: "mono", nombre: "Mono", imagen: require("../../assets/avatares/mono.jpeg") },
  { id: "gato", nombre: "Gato", imagen: require("../../assets/avatares/gato.jpeg") },
  { id: "mapache", nombre: "Mapache", imagen: require("../../assets/avatares/mapache.jpeg") },
  { id: "hamster", nombre: "Hámster", imagen: require("../../assets/avatares/hamster.jpeg") },
  { id: "peluche", nombre: "Peluche", imagen: require("../../assets/avatares/peluche.jpeg") },
  { id: "perrito", nombre: "Perrito", imagen: require("../../assets/avatares/perrito.jpeg") },
  { id: "pochoclos", nombre: "Pochoclos", imagen: require("../../assets/avatares/pochoclos.png") },
];

export const avatarPorId = (id?: string | null): Avatar | undefined =>
  AVATARES.find((a) => a.id === id);
