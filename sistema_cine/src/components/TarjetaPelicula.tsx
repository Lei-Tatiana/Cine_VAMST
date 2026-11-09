import type { ComponentProps } from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";

type Props = {
  titulo: string;
  boton?: string;
  icono?: ComponentProps<typeof Ionicons>["name"];
  posterUrl?: string;
  compacta?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export default function TarjetaPelicula({ titulo, boton, icono, posterUrl, compacta = false, style, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        estilos.tarjeta,
        compacta && estilos.tarjetaCompacta,
        style,
        pressed && estilos.presionada,
      ]}
    >
      <View style={estilos.poster}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={estilos.posterImagen} contentFit="cover" transition={180} />
        ) : (
          <Text style={estilos.posterTexto}>PÓSTER</Text>
        )}
      </View>
      <Text style={[estilos.titulo, compacta && estilos.tituloCompacto]} numberOfLines={1}>
        {titulo}
      </Text>
      {boton ? (
        <View style={estilos.boton}>
          <Ionicons name={icono ?? "ticket-outline"} size={15} color={colores.texto} />
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
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  tarjetaCompacta: { width: 112, padding: 6 },
  presionada: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  poster: {
    width: "100%",
    aspectRatio: 0.67,
    borderRadius: 9,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  posterTexto: { color: colores.gris },
  posterImagen: { width: "100%", height: "100%", borderRadius: 9 },
  titulo: { color: colores.texto, fontSize: 14, fontWeight: "700", marginTop: 8 },
  tituloCompacto: { fontSize: 12, marginTop: 6 },
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
  botonTexto: { color: colores.texto, fontWeight: "bold", fontSize: 13 },
});
