import { Pressable, StyleSheet, Text } from "react-native";
import { colores } from "../constants/colores";

type Props = { texto: string; activo?: boolean; onPress: () => void };

export default function Chip({ texto, activo = false, onPress }: Props) {
  return (
<<<<<<< HEAD
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [estilos.chip, activo && estilos.activo, pressed && estilos.presionado]}
    >
      <Text style={[estilos.texto, activo && estilos.textoActivo]}>{texto}</Text>
=======
    <Pressable onPress={onPress} style={[estilos.chip, activo && estilos.activo]}>
      <Text style={estilos.texto}>{texto}</Text>
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
  presionado: { opacity: 0.8 },
  texto: { color: colores.texto, fontSize: 14 },
  textoActivo: { fontWeight: "700" },
=======
  texto: { color: colores.texto, fontSize: 14 },
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
});
