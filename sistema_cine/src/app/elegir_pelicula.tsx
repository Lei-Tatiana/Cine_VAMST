import { useRef } from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../components/Encabezado";
import Chip from "../components/Chip";
import TarjetaPelicula from "../components/TarjetaPelicula";
import { colores } from "../constants/colores";

export default function ElegirPelicula() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const posiciones = useRef<{ [seccion: string]: number }>({});

  // Guarda dónde empieza cada sección para poder saltar hasta ella
  const guardar = (seccion: string) => (e: LayoutChangeEvent) => {
    posiciones.current[seccion] = e.nativeEvent.layout.y;
  };

  const irA = (seccion: string) => {
    scrollRef.current?.scrollTo({ y: posiciones.current[seccion], animated: true });
  };

  const verDetalle = () => router.push("/detalle_pelicula");

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado
        titulo="VAMST CINE"
        derecha={
          <>
            <Ionicons name="search" size={22} color={colores.texto} />
            <View style={estilos.login}>
              <Ionicons name="person" size={20} color={colores.texto} />
              <Text style={estilos.loginTexto}>Login</Text>
            </View>
          </>
        }
      />

      <ScrollView ref={scrollRef} contentContainerStyle={estilos.contenido}>
        <View style={estilos.banner}>
          <Text style={estilos.bannerTexto}>Carrusel de anuncios / banner</Text>
        </View>

        <Text style={estilos.subtitulo}>Navegación rápida</Text>
        <View style={estilos.chips}>
          <Chip texto="#Cartelera" onPress={() => irA("cartelera")} />
          <Chip texto="#Preventa" onPress={() => irA("preventa")} />
          <Chip texto="#Estrenos" onPress={() => irA("estrenos")} />
        </View>

        <View onLayout={guardar("cartelera")}>
          <Text style={estilos.seccion}>En cartelera</Text>
          <View style={estilos.fila}>
            <TarjetaPelicula titulo="Batman" boton="Comprar" onPress={verDetalle} />
            <TarjetaPelicula titulo="Duna" boton="Comprar" onPress={verDetalle} />
          </View>
        </View>

        <View onLayout={guardar("preventa")}>
          <Text style={estilos.seccion}>En preventa</Text>
          <View style={estilos.fila}>
            <TarjetaPelicula titulo="Wicked" boton="Reservar" onPress={verDetalle} />
            <TarjetaPelicula titulo="Moana 2" boton="Reservar" onPress={verDetalle} />
          </View>
        </View>

        <View onLayout={guardar("estrenos")}>
          <Text style={estilos.seccion}>Estrenos</Text>
          <View style={estilos.fila}>
            <TarjetaPelicula titulo="Gladiador II" boton="Comprar" onPress={verDetalle} />
            <TarjetaPelicula titulo="Intensamente 2" boton="Comprar" onPress={verDetalle} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, paddingBottom: 40 },
  login: { flexDirection: "row", alignItems: "center", gap: 4 },
  loginTexto: { color: colores.texto },
  banner: {
    height: 140,
    borderRadius: 12,
    backgroundColor: colores.tarjeta,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTexto: { color: colores.gris },
  subtitulo: { color: colores.gris, marginTop: 20, marginBottom: 8 },
  chips: { flexDirection: "row", gap: 8 },
  seccion: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 28, marginBottom: 12 },
  fila: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
});
