import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { Pelicula } from "../models/tipos";
import { formatearDuracion } from "../utils/formato";

type Props = {
  peliculas: Pelicula[];
  onPress: (pelicula: Pelicula) => void;
  intervaloMs?: number;
  margenHorizontal?: number;
};

const ETIQUETA: Record<Pelicula["estado"], { texto: string; color: string }> = {
  estreno: { texto: "EN CARTELERA", color: colores.rojo },
  preventa: { texto: "PREVENTA", color: colores.dorado },
  proximo: { texto: "PRÓXIMAMENTE", color: colores.gris },
};

// Carrusel destacado del inicio: muestra películas con su póster y una llamada a la acción.
export default function CarruselPeliculas({ peliculas, onPress, intervaloMs = 5000, margenHorizontal = 16 }: Props) {
  const { width } = useWindowDimensions();
  const ancho = width - margenHorizontal * 2;
  const lista = useRef<FlatList<Pelicula>>(null);
  const indiceActual = useRef(0);
  const tocando = useRef(false);
  const [indice, setIndice] = useState(0);

  const irA = (nuevo: number) => {
    if (peliculas.length === 0) return;
    indiceActual.current = nuevo;
    setIndice(nuevo);
    lista.current?.scrollToOffset({ offset: nuevo * ancho, animated: true });
  };

  useEffect(() => {
    if (peliculas.length < 2) return;
    const reloj = setInterval(() => {
      if (tocando.current) return;
      irA((indiceActual.current + 1) % peliculas.length);
    }, intervaloMs);
    return () => clearInterval(reloj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peliculas.length, intervaloMs, ancho]);

  const alTerminarDeDeslizar = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nuevo = Math.round(e.nativeEvent.contentOffset.x / ancho);
    indiceActual.current = nuevo;
    setIndice(nuevo);
    tocando.current = false;
  };

  if (peliculas.length === 0) return null;

  return (
    <View style={[estilos.contenedor, { width: ancho }]}>
      <FlatList
        ref={lista}
        data={peliculas}
        keyExtractor={(p) => String(p.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: ancho }}
        getItemLayout={(_, i) => ({ length: ancho, offset: ancho * i, index: i })}
        onScrollBeginDrag={() => { tocando.current = true; }}
        onMomentumScrollEnd={alTerminarDeDeslizar}
        renderItem={({ item }) => {
          const etiqueta = ETIQUETA[item.estado];
          return (
            <Pressable
              style={({ pressed }) => [estilos.slide, { width: ancho }, pressed && estilos.slidePresionado]}
              onPress={() => onPress(item)}
            >
              <Image source={{ uri: item.posterUrl }} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={22} />
              <View style={estilos.velo} />
              <Image source={{ uri: item.posterUrl }} style={estilos.poster} contentFit="cover" />

              <View style={[estilos.etiqueta, { backgroundColor: etiqueta.color }]}>
                <Text style={estilos.etiquetaTexto}>{etiqueta.texto}</Text>
              </View>

              <View style={estilos.info}>
                <Text style={estilos.titulo} numberOfLines={2}>{item.titulo}</Text>
                <View style={estilos.meta}>
                  <Ionicons name="film-outline" size={13} color={colores.gris} />
                  <Text style={estilos.metaTexto}>{item.genero}</Text>
                  <Text style={estilos.separador}>·</Text>
                  <Ionicons name="time-outline" size={13} color={colores.gris} />
                  <Text style={estilos.metaTexto}>{formatearDuracion(item.duracionMin)}</Text>
                </View>
                <View style={estilos.cta}>
                  <Ionicons name={item.estado === "proximo" ? "chevron-forward" : "ticket-outline"} size={15} color={colores.texto} />
                  <Text style={estilos.ctaTexto}>{item.estado === "proximo" ? "Ver más" : "Comprar entradas"}</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />

      {peliculas.length > 1 ? (
        <View style={estilos.puntos}>
          {peliculas.map((p, i) => (
            <View key={p.id} style={[estilos.punto, i === indice && estilos.puntoActivo]} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { alignSelf: "center" },
  slide: {
    height: 220,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  slidePresionado: { opacity: 0.92 },
  velo: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(8,8,10,0.62)" },
  poster: {
    position: "absolute",
    right: 16,
    top: 42,
    width: 98,
    height: 148,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "#2a2a2a",
  },
  etiqueta: {
    position: "absolute",
    top: 14,
    left: 14,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  etiquetaTexto: { color: "#101010", fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  info: { position: "absolute", left: 16, right: 128, bottom: 18, gap: 6 },
  titulo: { color: colores.texto, fontSize: 23, fontWeight: "800", lineHeight: 27 },
  meta: { flexDirection: "row", alignItems: "center", gap: 4, flexWrap: "wrap" },
  metaTexto: { color: colores.gris, fontSize: 12 },
  separador: { color: colores.gris, fontSize: 12 },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: colores.rojo,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginTop: 2,
  },
  ctaTexto: { color: colores.texto, fontSize: 13, fontWeight: "700" },
  puntos: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 12 },
  punto: { width: 6, height: 6, borderRadius: 3, backgroundColor: colores.borde, opacity: 0.6 },
  puntoActivo: { width: 18, backgroundColor: colores.rojo, opacity: 1 },
});
