import { Pressable, StyleSheet, Text } from "react-native";
import { colores } from "../constants/colores";

type Props = { texto: string; activo?: boolean; onPress: () => void };

export default function Chip({ texto, activo = false, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[estilos.chip, activo && estilos.activo]}>
      <Text style={estilos.texto}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.tarjeta,
  },
  activo: { backgroundColor: colores.rojo, borderColor: colores.rojo },
  texto: { color: colores.texto, fontSize: 14 },
});
