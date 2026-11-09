import { ImageSource } from "expo-image";

export type AvatarId = "popcorn" | "reel" | "glasses" | "ticket" | "clapper" | "projector";

export type Avatar = {
  id: AvatarId;
  nombre: string;
  imagen: ImageSource;
};

export const AVATARES: Avatar[] = [
  { id: "popcorn", nombre: "Pochoclo", imagen: require("../../assets/avatares/popcorn.png") },
  { id: "reel", nombre: "Rollo de cine", imagen: require("../../assets/avatares/reel.png") },
  { id: "glasses", nombre: "Lentes 3D", imagen: require("../../assets/avatares/glasses.png") },
  { id: "ticket", nombre: "Entrada", imagen: require("../../assets/avatares/ticket.png") },
  { id: "clapper", nombre: "Claqueta", imagen: require("../../assets/avatares/clapper.png") },
  { id: "projector", nombre: "Proyector", imagen: require("../../assets/avatares/projector.png") },
];

export const avatarPorId = (id?: string | null): Avatar | undefined =>
  AVATARES.find((a) => a.id === id);
