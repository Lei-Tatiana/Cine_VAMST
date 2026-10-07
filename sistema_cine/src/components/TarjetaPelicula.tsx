import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";

type Props = { titulo: string; boton?: string; onPress: () => void };

export default function TarjetaPelicula({ titulo, boton, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={estilos.tarjeta}>
      <View style={estilos.poster}>
        <Text style={estilos.posterTexto}>PÓSTER</Text>
      </View>
      <Text style={estilos.titulo} numberOfLines={1}>
        {titulo}
      </Text>
      {boton ? (
        <View style={estilos.boton}>
          <Ionicons name="ticket-outline" size={16} color={colores.texto} />
          <Text style={estilos.botonTexto}>{boton}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    width: 150,
    backgroundColor: colores.tarjeta,
    borderRadius: 10,
    padding: 8,
  },
  poster: {
    height: 200,
    borderRadius: 8,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  posterTexto: { color: colores.gris },
  titulo: { color: colores.texto, fontWeight: "bold", marginTop: 8 },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colores.rojo,
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 8,
  },
  botonTexto: { color: colores.texto, fontWeight: "bold" },
});
