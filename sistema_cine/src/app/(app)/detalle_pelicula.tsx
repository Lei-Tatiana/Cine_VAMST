import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import Chip from "../../components/Chip";
import BotonRojo from "../../components/BotonRojo";
import TarjetaPelicula from "../../components/TarjetaPelicula";
import { colores } from "../../constants/colores";
import { getFunciones, getPeliculaPorId, getPeliculas } from "../../services/api";
import { formatearDuracion, formatearFecha, formatearHora, formatearPrecio } from "../../utils/formato";
import { Funcion, Pelicula } from "../../models/tipos";
import { useMenuLateral } from "../../hooks/useMenuLateral";

export default function DetallePelicula() {
  useMenuLateral(false);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const peliculaId = Number(id);

  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [sugeridas, setSugeridas] = useState<Pelicula[]>([]);
  const [dia, setDia] = useState("");
  const [funcionId, setFuncionId] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(() => {
    setCargando(true);
    setError("");
    Promise.all([getPeliculaPorId(peliculaId), getFunciones(peliculaId), getPeliculas()])
      .then(([pelicula, funciones, todas]) => {
        setPelicula(pelicula);
        setFunciones(funciones);
        setSugeridas(todas.filter((p) => p.id !== peliculaId));
        const primerDia = funciones.length ? formatearFecha(funciones[0].fechaHora) : "";
        setDia(primerDia);
        setFuncionId(funciones.length ? funciones[0].id : null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [peliculaId]);

  useEffect(cargar, [cargar]);

  const dias = [...new Set(funciones.map((f) => formatearFecha(f.fechaHora)))];
  const funcionesDelDia = funciones.filter((f) => formatearFecha(f.fechaHora) === dia);
  const funcion = funciones.find((f) => f.id === funcionId) ?? null;

  const elegirDia = (d: string) => {
    setDia(d);
    const primera = funciones.find((f) => formatearFecha(f.fechaHora) === d);
    setFuncionId(primera ? primera.id : null);
  };

  const irAAsientos = () => {
    if (!funcion || !pelicula) return;
    router.push({
      pathname: "/seleccionar_asientos",
      params: {
        funcionId: String(funcion.id),
        pelicula: pelicula.titulo,
        formato: funcion.formato,
        fechaHora: funcion.fechaHora,
        sala: `Sala ${funcion.salaId}`,
        precioBase: String(funcion.precioBase),
      },
    });
  };

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado titulo="Detalle" volver menu={false} />

      {cargando ? (
        <View style={estilos.centro}>
          <ActivityIndicator size="large" color={colores.rojo} />
        </View>
      ) : error || !pelicula ? (
        <View style={estilos.centro}>
          <Ionicons name="cloud-offline-outline" size={48} color={colores.gris} />
          <Text style={estilos.errorTexto}>No se pudo cargar la película</Text>
          <Text style={estilos.errorDetalle}>{error}</Text>
          <View style={estilos.reintentar}>
            <BotonRojo texto="Reintentar" onPress={cargar} />
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={estilos.contenido}>
          <View style={estilos.ficha}>
            <Image source={{ uri: pelicula.posterUrl }} style={estilos.poster} contentFit="cover" />
            <View style={estilos.fichaInfo}>
              <Text style={estilos.titulo}>{pelicula.titulo}</Text>
              <View style={estilos.info}>
                <Ionicons name="time-outline" size={16} color={colores.gris} />
                <Text style={estilos.infoTexto}>{formatearDuracion(pelicula.duracionMin)}</Text>
              </View>
              <View style={estilos.info}>
                <Ionicons name="film-outline" size={16} color={colores.gris} />
                <Text style={estilos.infoTexto}>{pelicula.genero}</Text>
              </View>
              <Text style={estilos.edad}>{pelicula.clasificacion}</Text>
            </View>
          </View>

          <Text style={estilos.sinopsis}>{pelicula.sinopsis}</Text>

          {pelicula.estado === "proximo" ? (
            <View style={estilos.proximamente}>
              <Ionicons name="calendar-outline" size={18} color={colores.gris} />
              <Text style={estilos.proximamenteTexto}>Disponible próximamente</Text>
            </View>
          ) : (
            <>
              <Text style={estilos.seccion}>Horarios y salas</Text>
              {dias.length === 0 ? (
                <Text style={estilos.sinFunciones}>No hay funciones programadas para esta película.</Text>
              ) : (
                <>
                  <View style={estilos.chips}>
                    {dias.map((d) => (
                      <Chip key={d} texto={d} activo={d === dia} onPress={() => elegirDia(d)} />
                    ))}
                  </View>
                  <View style={estilos.chips}>
                    {funcionesDelDia.map((f) => (
                      <Chip
                        key={f.id}
                        texto={formatearHora(f.fechaHora)}
                        activo={f.id === funcionId}
                        onPress={() => setFuncionId(f.id)}
                      />
                    ))}
                  </View>
                  {funcion ? (
                    <Text style={estilos.funcionDetalle}>
                      {funcion.formato} · Sala {funcion.salaId} · {formatearPrecio(funcion.precioBase)}
                    </Text>
                  ) : null}
                  <View style={estilos.boton}>
                    <BotonRojo
                      texto="Seleccionar asientos / continuar"
                      desactivado={!funcion}
                      onPress={irAAsientos}
                    />
                  </View>
                </>
              )}
            </>
          )}

          {sugeridas.length > 0 ? (
            <>
              <Text style={estilos.seccion}>También te podría gustar</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.carrusel}>
                {sugeridas.map((p) => (
                  <TarjetaPelicula
                    key={p.id}
                    titulo={p.titulo}
                    posterUrl={p.posterUrl}
                    onPress={() => router.replace({ pathname: "/detalle_pelicula", params: { id: String(p.id) } })}
                  />
                ))}
              </ScrollView>
            </>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, paddingBottom: 40 },
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10 },
  errorTexto: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 8 },
  errorDetalle: { color: colores.gris, textAlign: "center" },
  reintentar: { marginTop: 12, width: "60%" },
  ficha: { flexDirection: "row", gap: 16 },
  poster: { width: 120, height: 175, borderRadius: 10, backgroundColor: colores.tarjeta },
  fichaInfo: { flex: 1, justifyContent: "center", gap: 8 },
  titulo: { color: colores.texto, fontSize: 24, fontWeight: "bold" },
  info: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoTexto: { color: colores.gris },
  edad: {
    alignSelf: "flex-start",
    color: colores.texto,
    borderWidth: 1,
    borderColor: colores.gris,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
  sinopsis: { color: colores.gris, lineHeight: 21, marginTop: 16 },
  proximamente: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.tarjeta,
  },
  proximamenteTexto: { color: colores.gris, fontWeight: "600" },
  seccion: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 28, marginBottom: 12 },
  sinFunciones: { color: colores.gris },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 10 },
  funcionDetalle: { color: colores.gris, marginTop: 4 },
  boton: { marginTop: 14 },
  carrusel: { gap: 12 },
});