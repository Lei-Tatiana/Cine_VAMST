import { Pressable, StyleSheet, Text } from "react-native";
import { colores } from "../constants/colores";

type Props = { texto: string; onPress: () => void; desactivado?: boolean };

export default function BotonRojo({ texto, onPress, desactivado = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={desactivado}
      style={[estilos.boton, desactivado && estilos.desactivado]}
    >
      <Text style={estilos.texto}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: {
    backgroundColor: colores.rojo,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  desactivado: { opacity: 0.4 },
  texto: { color: colores.texto, fontSize: 16, fontWeight: "bold" },
});
