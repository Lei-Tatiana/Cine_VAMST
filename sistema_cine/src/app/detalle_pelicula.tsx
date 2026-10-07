import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../components/Encabezado";
import Chip from "../components/Chip";
import BotonRojo from "../components/BotonRojo";
import TarjetaPelicula from "../components/TarjetaPelicula";
import { colores } from "../constants/colores";

const dias = ["Hoy 19", "Dom 20", "Lun 21"];
const horas = ["14:30", "17:15", "20:00"];
const sugeridas = ["Duna", "Wicked", "Moana 2", "Gladiador II"];

export default function DetallePelicula() {
  const router = useRouter();
  const [dia, setDia] = useState("Hoy 19");
  const [hora, setHora] = useState("20:00");

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado
        titulo="Detalle"
        volver
        derecha={<Ionicons name="heart" size={24} color={colores.rojo} />}
      />

      <ScrollView contentContainerStyle={estilos.contenido}>
        <View style={estilos.trailer}>
          <Ionicons name="play-circle" size={56} color={colores.texto} />
          <Text style={estilos.trailerTexto}>Reproductor de tráiler</Text>
        </View>

        <Text style={estilos.titulo}>Batman</Text>
        <View style={estilos.info}>
          <Ionicons name="time-outline" size={18} color={colores.gris} />
          <Text style={estilos.infoTexto}>120 min</Text>
          <Ionicons name="star" size={18} color="#f5c518" />
          <Text style={estilos.infoTexto}>4.8</Text>
          <Text style={estilos.edad}>+13</Text>
        </View>

        <Text style={estilos.seccion}>Horarios y salas</Text>
        <View style={estilos.chips}>
          {dias.map((d) => (
            <Chip key={d} texto={d} activo={d === dia} onPress={() => setDia(d)} />
          ))}
        </View>
        <View style={estilos.chips}>
          {horas.map((h) => (
            <Chip key={h} texto={h} activo={h === hora} onPress={() => setHora(h)} />
          ))}
        </View>

        <View style={estilos.boton}>
          <BotonRojo
            texto="Seleccionar asientos / continuar"
            onPress={() => router.push("/seleccionar_asientos")}
          />
        </View>

        <Text style={estilos.seccion}>También te podría gustar</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.carrusel}
        >
          {sugeridas.map((titulo) => (
            <TarjetaPelicula key={titulo} titulo={titulo} onPress={() => {}} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, paddingBottom: 40 },
  trailer: {
    height: 190,
    borderRadius: 12,
    backgroundColor: colores.tarjeta,
    alignItems: "center",
    justifyContent: "center",
  },
  trailerTexto: { color: colores.gris, marginTop: 6 },
  titulo: { color: colores.texto, fontSize: 24, fontWeight: "bold", marginTop: 20 },
  info: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  infoTexto: { color: colores.gris, marginRight: 10 },
  edad: {
    color: colores.texto,
    borderWidth: 1,
    borderColor: colores.gris,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  seccion: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 28, marginBottom: 12 },
  chips: { flexDirection: "row", gap: 8, marginBottom: 10 },
  boton: { marginTop: 14 },
  carrusel: { gap: 12 },
});
