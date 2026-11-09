<<<<<<< HEAD
import type { ComponentProps } from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
=======
import { Pressable, StyleSheet, Text, View } from "react-native";
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";

<<<<<<< HEAD
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
=======
type Props = { titulo: string; boton?: string; posterUrl?: string; onPress: () => void };

export default function TarjetaPelicula({ titulo, boton, posterUrl, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={estilos.tarjeta}>
      <View style={estilos.poster}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={estilos.posterImagen} contentFit="cover" />
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
        ) : (
          <Text style={estilos.posterTexto}>PÓSTER</Text>
        )}
      </View>
<<<<<<< HEAD
      <Text style={[estilos.titulo, compacta && estilos.tituloCompacto]} numberOfLines={1}>
=======
      <Text style={estilos.titulo} numberOfLines={1}>
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
        {titulo}
      </Text>
      {boton ? (
        <View style={estilos.boton}>
<<<<<<< HEAD
          <Ionicons name={icono ?? "ticket-outline"} size={15} color={colores.texto} />
=======
          <Ionicons name="ticket-outline" size={16} color={colores.texto} />
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
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
=======
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
  posterImagen: { width: "100%", height: "100%", borderRadius: 8 },
  titulo: { color: colores.texto, fontWeight: "bold", marginTop: 8 },
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
  botonTexto: { color: colores.texto, fontWeight: "bold", fontSize: 13 },
=======
  botonTexto: { color: colores.texto, fontWeight: "bold" },
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
});
