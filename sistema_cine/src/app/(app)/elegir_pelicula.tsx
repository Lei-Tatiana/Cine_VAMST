import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import TarjetaPelicula from "../../components/TarjetaPelicula";
import BotonRojo from "../../components/BotonRojo";
import Carrusel from "../../components/Carrusel";
import { colores } from "../../constants/colores";
import { PROMOS } from "../../data/promos";
import { useMenuLateral } from "../../hooks/useMenuLateral";
import { getPeliculas } from "../../services/api";
import { useSesion } from "../../services/sesion";
import { Pelicula } from "../../models/tipos";

const SECCIONES = [
  { estado: "estreno", titulo: "Estrenos", boton: "Comprar", icono: "ticket-outline" },
  { estado: "preventa", titulo: "Preventa", boton: "Preventa", icono: "ticket-outline" },
  { estado: "proximo", titulo: "Próximos estrenos", boton: "Ver más", icono: "chevron-forward" },
] as const;

export default function ElegirPelicula() {
  useMenuLateral(true);
  const router = useRouter();
  const { usuario } = useSesion();
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(() => {
    setCargando(true);
    setError("");
    getPeliculas()
      .then(setPeliculas)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(cargar, [cargar]);

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado
        titulo="VAMST CINE"
        derecha={
          <Pressable onPress={() => router.push("/registro")} style={estilos.login} hitSlop={8}>
            <Ionicons name="person" size={20} color={colores.texto} />
            <Text style={estilos.loginTexto}>{usuario ? usuario.nombre.split(" ")[0] : "Login"}</Text>
          </Pressable>
        }
      />

      {cargando ? (
        <View style={estilos.centro}>
          <ActivityIndicator size="large" color={colores.rojo} />
        </View>
      ) : error ? (
        <View style={estilos.centro}>
          <Ionicons name="cloud-offline-outline" size={48} color={colores.gris} />
          <Text style={estilos.errorTexto}>No se pudo cargar la cartelera</Text>
          <Text style={estilos.errorDetalle}>{error}</Text>
          <View style={estilos.reintentar}>
            <BotonRojo texto="Reintentar" onPress={cargar} />
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={estilos.contenido}>
          <Carrusel promos={PROMOS} onPress={() => router.push("/promociones")} />

          {SECCIONES.map(({ estado, titulo, boton, icono }) => {
            const lista = peliculas.filter((p) => p.estado === estado);
            if (lista.length === 0) return null;
            return (
              <View key={estado}>
                <Text style={estilos.seccion}>{titulo}</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={estilos.carrusel}
                >
                  {lista.map((p) => (
                    <TarjetaPelicula
                      key={p.id}
                      titulo={p.titulo}
                      posterUrl={p.posterUrl}
                      boton={boton}
                      icono={icono}
                      onPress={() => router.push({ pathname: "/detalle_pelicula", params: { id: String(p.id) } })}
                    />
                  ))}
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, paddingBottom: 40 },
  login: { flexDirection: "row", alignItems: "center", gap: 4 },
  loginTexto: { color: colores.texto },
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10 },
  errorTexto: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 8 },
  errorDetalle: { color: colores.gris, textAlign: "center" },
  reintentar: { marginTop: 12, width: "60%" },
  seccion: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 24, marginBottom: 12, textAlign: "center" },
  carrusel: { gap: 12 },
});